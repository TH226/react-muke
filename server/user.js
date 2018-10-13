const express = require('express')
const Router = express.Router()

//用户相关的

Router.get('/info',function(req,res){
    return res.json({code:1})
})

//用来暴露此页面的接口（加上之后，才可以调用）
module.exports = Router