const {join} = require('path');
// 自动拼接路径 会调用normalize
console.log(join('/user','local','bin/'));