/**
 * 定义分类表的数据结构
 * Users
 **/

const mongoose = require('mongoose')
const {Schema} = mongoose

// 定义分类的表结构
module.exports = new Schema({
  //分类
  name: String
})
