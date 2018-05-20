const {basename,dirname,extname} = require('path');
const filePath = '../README.md';
// 文件名
console.log(basename(filePath));
// 所在文件夹
console.log(dirname(filePath));
// 拓展名
console.log(extname(filePath));