
//  引入express
const express = require('express');
// 引入模板引擎
const swig = require('swig');
const app = express();

// 引入路由
const indexRouter = require('./rouuters/index');
const mainRouter = require('./rouuters/main');

// 设置静态文件的托管，如果访问/public 则转到public下找资源文件，并不解析为html
app.use('/public', express.static(`${__dirname}/public`));
// 设置模板引擎
app.engine('html', swig.renderFile);
//  模板引擎存放目录 第一个参数固定为views
app.set('views', './views');
// 注册模板引擎，第一个参数固定为 view engine
app.set('view engine', 'html');
// 在开发过程中取消模版的缓存
swig.setDefaults({
    cache: false
});

app.use('/', indexRouter);
app.use('/users', mainRouter);


app.listen(8081, (req, res) => {
    console.log('server running at port 8081');
});
