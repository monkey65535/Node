const EventEmitter = require('events')
class CustomEvent extends EventEmitter{

}
const ce = new CustomEvent();
const fm = testMes=>{
    console.log(testMes);
}
ce.on('test', fm)

setInterval(()=>{
    ce.emit('test',2222);
},500);
setTimeout(()=>{
    ce.removeListener('test',fm);
},1500)