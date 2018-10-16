const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')
const _filter = {'pwd':0,'__v':0}
//用户相关的

Router.get('/list',function(req,res){
    // User.remove({},function(){})
    User.find({},function(err,doc){
        return res.json(doc)
    })
})

Router.get('/info',function(req,res){
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})

Router.post('/register',function(req,res){
    // console.log(req.body);
    const {user,pwd,type} = req.body
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        //用save方法，可以拿到用户的id
        userModel.save(function(e,d){
            if(e){
                return res.json({code:1,msg:'后端出错了'})
            }
            const {user,type,_id} = d
            //将id保存在cookie
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
    })
    
})
Router.post('/login',function(req,res){
    const {user,pwd} = req.body
    User.findOne({user:user},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
    
})
function md5Pwd(pwd){
    const salt = 'th_is_good546dsadfdgr!@#~33'
    return utils.md5(utils.md5(pwd+salt))
}
//用来暴露此页面的接口（加上之后，才可以调用）
module.exports = Router