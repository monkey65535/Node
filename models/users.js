/*定义用户类，用于对用户表进行数据操作*/
const mongoose = require('mongoose')
const userSchema = require('../schemas/users')
module.exports = mongoose.model('User', userSchema)
