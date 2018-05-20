const buf = Buffer.from('this is a buffer');
// length 获取buffer的长度，注意 不是BUFF内容的字节数
console.log(buf.length);
const buf2 = Buffer.allocUnsafe(10);
buf2[0] = 2;
console.log(buf2.length);

// toString 转换buffer对象为接受参数对象，不传入参数为utf-8
console.log(buf.toString());
console.log(buf2.toString('base64'));

// fill 修改buffer中的内容
const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);
console.log(buf3.fill(10, 2, 6));

// equals 判断两个buffer中内容是否一致
// indexOf 跟数组和字符串的indexOf方法一致
