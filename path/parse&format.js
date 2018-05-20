const {parse,format} = require('path');
const readMe = '../README.md';

console.log(parse(readMe));
console.log(format(parse(readMe)));
