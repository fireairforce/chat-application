
/**
 * 一般为了防止密码泄露，我们不会采用正常的密码存储方式，
 * 会使用一种叫做md5的加密方式来对密码进行加密,md5是一种非对称的加密方式
 * www.cmd5.com可以测试一下这种加密方式,我们这里使用一个第三方库utility来支持md5
 * 使用的时候utils.md5(pwd)但是这种情况下的加密一般会被其他人在网上通过彩虹表进行暴力破解，
 * 为了防止密码被反向破解我们可以自己再次对密文进行再次加密
 * 例如下面的md5pwd函数，采用的是两次md5加密和一次加盐的方法
 */

const express = require('express')
const utils = require('utility');//md5支持库
 
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd':0,'__v':0}
 
Router.get('/list',function(req, res){
    // User.remove({},function(e,d){}) // 这个表示清除所有的用户信息
    User.find({},function(err,doc){
        return res.json(doc)
    })
})
Router.post('/login', function(req,res){
    const {user, pwd} = req.body
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if (!doc) {
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        res.cookie('userid', doc._id)
        return res.json({code:0,data:doc})
    })
})
Router.post('/register', function(req, res){
    // console.log(res.body);
    const {user, pwd, type} = req.body
    User.findOne({user},function(err,doc){
        if (doc) {
            return res.json({code:1,msg:'用户名重复'})
        }
         
        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function(e,d){
            if (e) {
                return res.json({code:1,msg:'后端出错了'})
            }
            const {user, type, _id} = d
            res.cookie('userid', _id)
            return res.json({code:0,data:{user, type, _id}})
        })
    })
})
Router.get('/info',function(req, res){
    const {userid} = req.cookies
    if (!userid) {
        return res.json({code:1})
    }
    User.findOne({_id:userid} ,_filter , function(err,doc){
        if (err) {
            return res.json({code:1, msg:'后端出错了'})
        }
        if (doc) {
            return res.json({code:0,data:doc})
        }
    })
    // 用户有没有cookie 
})
 
//对密码进行多次加密
function md5Pwd(pwd){
    const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~';
    return utils.md5(utils.md5(pwd+salt))// 直接使用两次md5加密和一次加盐的方法
}
 
 
module.exports = Router

