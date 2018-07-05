const express = require('express')
const router = express.Router()
const User = require('../models/users')

// 定义痛惜的api返回格式
let responseData = null
router.use((req, res, next) => {
  responseData = {
    code: 0,
    message: ''
  }
  next()
})

/**
 * 用户注册 注册逻辑
 * 用户名不能为空
 * 密码不能为空
 * 两次输入密码必须一致
 * 用户名是否已经被注册 （数据库操作）
 *
 * */
router.post('/user/register', (req, res, next) => {
  const {username, password, repassword} = req.body
  if (username === '') {
    responseData = {
      code: 1,
      message: '用户名不能为空'
    }
    res.json(responseData)
    return
  } else if (password === '') {
    responseData = {
      code: 1,
      message: '密码不能为空'
    }
    res.json(responseData)
    return
  } else if (password !== repassword) {
    responseData = {
      code: 1,
      message: '两次输入的密码不一致'
    }
    res.json(responseData)
    return
  }
  // 查询数据库中是否存在这个用户名
  User.findOne({
    username
  })
    .then(userInfo => {
      if (userInfo) {
        // 数据库中有该条记录
        responseData = {
          code: 1,
          message: '用户名已经被注册'
        }
        res.json(responseData)
        return null
      } else {
        // 保存用户信息到数据库
        const user = new User({
          username,
          password
        })
        return user.save()
      }
    })
    .then(newUserInfo => {
      if (newUserInfo) {
        responseData.message = '注册成功'
        res.json(responseData)
      }
    })
})

// 用户登录
router.post('/user/login', (req, res, next) => {
  const {username, password} = req.body
  if (username === '' || password === '') {
    responseData = {
      code: 1,
      message: '用户名或密码不能为空'
    }
    res.json(responseData)
    return
  }
  // 查询数据库中相同用户名和密码的记录是否存在
  User.findOne({
    username,
    password
  }).then(userInfo => {
    if (!userInfo) {
      // 用户名或密码错误
      responseData = {
        code: 2,
        message: '用户名或密码错误'
      }
      res.json(responseData)
    } else {
      let {_id, username} = userInfo
      // 登陆成功
      // 返回登录信息给客户端
      responseData.message = '登陆成功'
      responseData.userInfo = {
        _id,
        username
      }

      // 对浏览器设置一个cookie保存登录状态
      req.cookies.set('userInfo', JSON.stringify({
        _id,
        username
      }))
      res.json(responseData)
    }
  })
})

module.exports = router
