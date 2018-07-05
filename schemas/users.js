/**
 * 定义用户表的数据结构
 * Users
 **/

const mongoose = require('mongoose')
const {Schema} = mongoose

// 定义用户的表结构
module.exports = new Schema({
  //用户名
  username: String,
  //密码
  password: String,
  //用户权限
  isAdmin: {
    type: Boolean,
    default: false
  }
})
