// 输出一个内容占用的字节数
console.log(Buffer.byteLength('test'));
console.log(Buffer.byteLength('测试'));

// 判断是否是一个buffer对象
console.log(Buffer.isBuffer({}))
console.log(Buffer.isBuffer(Buffer.from([1,2,3,4])));

// Buffer.concat 拼接buffer 接受一个数组
const b1 = Buffer.from('test ')
const b2 = Buffer.from('test1 ')
const b3 = Buffer.from('test2 ')
const b4 = Buffer.from('test3 ')
const b5 = Buffer.from('test4 ')

const buf = Buffer.concat([b1,b2,b3,b4,b5]);
console.log(buf.toString());