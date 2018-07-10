const express = require('express')
const path = require('path')
const router = express.Router()
const Category = require('../models/Category')

/*首页*/
router.get('/', (req, res, next) => {
  // 第二个参数传入的是给模板的数据
  const {userInfo} = req
  // 从数据库中读取分类信息
  Category.find().then(categories => {
    res.render('main/index', {
      userInfo,
      categories
    })
  })

  let data = {
    page: req.query.page || 1,
    limit: 30,
    pages: 0,
    skip: 0,
    countNum: 0
  }

  Category.count().then(count => {
    // 计算总页数
    pages = Math.ceil(count / data.limit)
    // 取值不能超过pages
    page = Math.min(data.page, pages)

    skip = (page - 1) * data.limit > 0 ? (page - 1) * data.limit : 0
    countNum = count
    /**
     * 分类排序
     * 1为升序
     * -1为降序
     **/
    return Content.find().sort({_id: 1}).limit(limit).skip(skip).populate('category')
  }).then(contents => {
    res.render('admin/content_index', {
      userInfo: req.userInfo,
      contents: contents,
      count: countNum,
      page,
      limit,
      pages,
      skip
    })
  })
})

module.exports = router
