/*定义用户类，用于对用户表进行数据操作*/
const mongoose = require('mongoose')
const categoriesSchema = require('../schemas/categories')
module.exports = mongoose.model('Category', categoriesSchema)
