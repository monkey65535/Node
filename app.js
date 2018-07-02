const path = require('path')
const express = require('express')
const swig = require('swig')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Cookies = require('cookies')
//初始化express
const app = express()

// 设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应__dirname + '/public'下的文件
app.use('/public', express.static(path.join(__dirname, '/public')))

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile)
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', './views')
//注册所使用的模板引擎，第一个参数必须是 view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine', 'html')
//在开发过程中，需要取消模板缓存
swig.setDefaults({cache: false})
// 定义bpdyParsaer中间件设置
app.use(bodyParser.urlencoded({extended: true}))

// 根据不同的功能划分不同的路由
app.use('/admin', require(path.join(__dirname, '/routers/admin')))
app.use('/api', require(path.join(__dirname, '/routers/api')))
app.use('/', require(path.join(__dirname, '/routers/main')))

mongoose.connect('mongodb://localhost:27017/myblog', (err) => {
  if (err) throw err
  console.log('数据库链接成功')
  app.listen(3000, () => {
    console.log(`server running at port 3000 `)
  })
})


