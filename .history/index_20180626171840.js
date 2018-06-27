const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const routes = require('./routers')
const pkg = require('./package')

const app = express()

// 设置模板
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

// session 中间件
app.use(
  session({
    // 设置cookie中保存 session id 的字段名称
    name: config.session.key,
    // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    secret: config.session.secret,
    // 强制更新 session
    resave: true,
    // 设置为 false，强制创建一个 session，即使用户未登录
    saveUninitialized: false,
    // 过期时间，过期后 cookie 中的 session id 自动删除
    cookie: {
      maxAge: config.session.maxAge
    },
    // 将 session 存储到 mongodb
    store: new MongoStore({
      // mongodb 地址
      url: config.mongodb
    })
  })
)

// flash 中间件，用来显示通知
app.use(flash())

// 路由
routes(app)

// 监听端口
app.listen(config.port, () => {
  console.log(`${pkg.name} listening on port ${config.port}`)
})
