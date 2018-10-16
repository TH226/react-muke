
const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//新建app
const app = express()
app.use(cookieParser())
app.use(bodyParser())
app.use('/user',userRouter)

app.listen(9093,function(){
    console.log('start 9093');
    
})