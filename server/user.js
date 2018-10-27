const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('utility')
const _filter = {'pwd':0,'__v':0}
//用户相关的

// Chat.remove({},function(err,doc){})

Router.get('/list',function(req,res){
    const {type} = req.query
    // User.remove({},function(){})
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc})
    })
})
Router.get('/getmsglist',function(req,res){
    const user = req.cookies.userid
    //先查询到所有的消息列表
    User.find({},function(e,userdoc){
        let users = {}
        userdoc.forEach(v=>{
            //获取用户的名称和头像
            users[v._id] = {name:v.user,avatar:v.avatar}
        })
        //查询出当前用户所有的发出和收到的信息
        Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
            if(!err){
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })
})
//将未读信息修改为已读
Router.post('/readmsg',function(req,res){
    const userid = req.cookies.userid
    const {from} = req.body
    Chat.update(
        {from,to:userid},
        {'$set':{read:true}},
        {'multi':true},
        function(err,doc){
            console.log("user-->readmsg",doc)
            if(!err){
                return res.json({code:0,num:doc.nModified})
            }
            return res.json({code:1,msg:'修改失败'})
        }
    )
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
//更新信息
Router.post('/update',function(req,res){
    const userid = req.cookies.userid
    if(!userid){
        return json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
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