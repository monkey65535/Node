/**
 * webapp 入口文件
 *
 * **/

//  引入express
const express = require('express');
// 引入模板引擎
const swig = require('swig');
const app = express();
app.use('/public', express.static(`${__dirname}/public`));
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');

swig.setDefaults({
    cache: false
});


app.get('/', (req, res, next) => {
    res.render('index');
});


app.listen(8081, (req, res) => {
    console.log('server running at port 8081');
});