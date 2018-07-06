const express = require('express')
const router = express.Router()

const User = require('../models/users')
const Category = require('../models/Category')

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
  let limit = 30
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
      count: countNum,
      page,
      limit,
      pages,
      skip
    })
  })

})

// 文章分类  分类管理
router.get('/category', (req, res) => {
  let page = req.query.page || 1
  let limit = 30
  let pages = 0
  let skip = 0
  let countNum = 0

  Category.count().then(count => {
    // 计算总页数
    pages = Math.ceil(count / limit)
    // 取值不能超过pages
    page = Math.min(page, pages)

    skip = (page - 1) * limit > 0 ? (page - 1) * limit : 0
    countNum = count
    return Category.find().limit(limit).skip(skip)
  }).then(categories => {
    res.render('admin/category_index', {
      userInfo: req.userInfo,
      categories: categories,
      count: countNum,
      page,
      limit,
      pages,
      skip
    })

  })
})

// 文章分类 分类添加
router.get('/category/add', (req, res) => {
  res.render('admin/category_add', {
    userInfo: req.userInfo
  })
})
// 添加分类api
router.post('/category/add', (req, res) => {
  const {name} = req.body
  if (name === '' && name.trim() === '') {
    res.render('admin/error', {
      userInfo: req.userInfo,
      message: '分类名不能为空或空格'
    })
    return
  }
  // 查询数据库种是否有相同字段
  Category.findOne({
    name
  }).then(rs => {
    if (rs) {
      res.render('admin/error', {
        userInfo: req.userInfo,
        message: '分类名已存在'
      })
      return Promise.reject()
    } else {
      return new Category({
        name
      }).save()
    }
  }).then(newCategory => {
    res.render('admin/success', {
      userInfo: req.userInfo,
      message: '保存成功',
      url: '/admin/category'
    })
  })
})

// 文章分类 分类修改
router.get('/category/edit', (req, res) => {
  // 获取要修改的分类的信息并用表单的形式展现
  const _id = req.query.id || ''
  // 获取要修改的分类信息
  Category.findOne({_id}).then(category => {
    if (!category) {
      res.render('admin/error', {
        userInfo: req.userInfo,
        message: '分类名不存在'
      })
      return Promise.reject()
    } else {
      res.render('admin/category_edit', {
        userInfo: req.userInfo,
        category
      })
    }
  })
})

router.post('/category/edit', (req, res) => {
  const {name} = req.body
  const _id = req.query.id || ''

  // 判断分类名是否存在
  Category.findOne({_id}).then(category => {
    if (!category) {
      res.render('admin/error', {
        userInfo: req.userInfo,
        message: '分类信息不存在'
      })
      return Promise.reject()
    } else {
      if (name === category.name) {
        // 当用户没有做任何修改的时候  直接返回修改成功
        res.render('admin/error', {
          userInfo: req.userInfo,
          message: '保存成功',
          url: '/admin/category'
        })
        return Promise.reject()
      } else {
        // 要修改的分类名称是否再数据库种已存在  不允许修改
        return Category.findOne({
          _id: {$ne: _id},
          name
        })
      }
    }
  }).then(sameCategory => {
    if (sameCategory) {
      res.render('admin/error', {
        userInfo: req.userInfo,
        message: '分类名称已存在相同分类'
      })
      return Promise.reject()
    } else {
      return Category.update({_id}, {name})
    }
  }).then(() => {
    res.render('admin/error', {
      userInfo: req.userInfo,
      message: '修改成功',
      url: '/admin/category'
    })
  })
})
// 文章分类 分类删除
router.get('/category/delete', (req, res) => {
  const _id = req.query.id || ''
  Category.remove({
    _id
  }).then(() => {
    res.render('admin/error', {
      userInfo: req.userInfo,
      message: '删除成功',
      url: '/admin/category'
    })
  })
})

module.exports = router
