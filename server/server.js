const model = require('./model')
const cookieParser = require('cookie-parser')
const bodyParser  = require('body-parser')
const express = require('express')
const userRouter = require('./user')

const Chat = model.getModel('chat')

//新建app
const app = express()
//绑定express与scoket.io
const server = require('http').Server(app)
const io = require('socket.io')(server)
//io的监听
io.on('connection',function(socket){
    console.log('user login');
    //监听请求，获取发送的消息
    socket.on('sendmsg',function(data){
        console.log(data);
        //将接收到的消息发送到全局
        // io.emit('recvmsg',data)
        const {from,to,msg} = data
        const chatid = [from,to].sort().join('_')

        //将聊天信息存到数据库中之后，再转发出去
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
    })
})

app.use(cookieParser())
app.use(bodyParser())
app.use('/user',userRouter)

server.listen(9093,function(){
    console.log('start 9093');
    
})