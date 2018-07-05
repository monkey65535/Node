const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/', (req, res, next) => {
  // 第二个参数传入的是给模板的数据
  const {userInfo} = req;
  console.log(userInfo);
  res.render('main/index',{
    userInfo
  })
})

module.exports = router
