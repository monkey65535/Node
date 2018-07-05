const express = require('express')
const router = express.Router()

const User = require('../models/users')

// 公用权限判断
router.use((req, res, next) => {
  if (!req.userInfo.isAdmin) {
    // 当前用户为非管理员用户
    res.send('权限错误，缺少管理员权限')
    return
  }
  next()
})

//管理员首页
router.get('/', (req, res, next) => {
  res.render('admin/index')
})

//用户管理
router.get('/user', (req, res) => {
  /**
   * 查询用户记录
   * 分页逻辑：
   * limit(Number) :限制获取的数据条数
   * skip(Number): 忽略数据的条数
   *
   * 每页显示2条的话
   * 1： 1-2 skip 2
   * 2:  3-4 skip 2
   *
   **/
  let page = req.query.page || 1
  let limit = 2
  let pages = 0
  let skip = 0
  let countNum = 0

  User.count().then(count => {
    // 计算总页数
    pages = Math.ceil(count / limit)
    // 取值不能超过pages
    page = Math.min(page, pages)

    skip = (page - 1) * limit > 0 ? (page - 1) * limit : 0
    countNum = count
    return User.find().limit(limit).skip(skip)
  }).then(users => {
    res.render('admin/user_index', {
      userInfo: req.userInfo,
      users: users,
      count:countNum,
      page,
      limit,
      pages,
      skip
    })
  })

})

module.exports = router
