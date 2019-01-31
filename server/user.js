const express = require('express');
const Router = express.Router()
const model = require('./model');
const User = model.getModel('user')

Router.get('/list',function(req,res){
     User.find({},function(err,doc){  //查询我们用户的列表
         return res.json(doc)
     })
})

Router.post('/register',function(req,res){
    console.log(res.body);
    const {user,pwd,type} = res.body // 传递过来的信息
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        User.create({user,pwd,type},function(e,d){
            if(e){
                return res.json({code:1,msg:'后端出错了'})
            }
            return res.json({code:0})
        })
    })
})

Router.get('/info',function(req,res){
    // 用户没有cookie
    return res.json({code:0})
})

module.exports = Router;
