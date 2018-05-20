const EventEmitter = require('events')
class CustomEvent extends EventEmitter{

}
const ce = new CustomEvent();

ce.on('test', testMes=>{
    console.log(testMes);
})

setInterval(()=>{
    ce.emit('test',2222);
},500);