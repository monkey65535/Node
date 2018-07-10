/**
 * 定义文章内容表的数据结构
 * Users
 **/

const mongoose = require('mongoose')
const {Schema} = mongoose

// 定义文章内容的表结构
module.exports = new Schema({
  // 分类标题
  title: String,
  // 关联字段 分类的ID
  category: {
    // 类型 mongo中的objectID
    type: mongoose.Schema.Types.ObjectId,
    // 引用
    ref: 'Content'
  },
  // 关联字段 用户id
  user: {
    // 类型 mongo中的objectID
    type: mongoose.Schema.Types.ObjectId,
    // 引用
    ref: 'User'
  },
  // 添加时间
  addTime: {
    type: Date,
    default: Date.now()
  },
  // 阅读量
  views: {
    type: Number,
    default: 0
  },
  // 简介
  description: {
    type: String,
    default: ''
  },
  // 内容
  content: {
    type: String,
    default: ''
  }
})
