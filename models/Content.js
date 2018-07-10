/*定义文章模型，用于对文章表进行数据操作*/
const mongoose = require('mongoose')
const contentSchema = require('../schemas/content')
module.exports = mongoose.model('Content', contentSchema)
