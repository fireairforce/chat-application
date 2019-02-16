
/**
 * 一般为了防止密码泄露，我们不会采用正常的密码存储方式，
 * 会使用一种叫做md5的加密方式来对密码进行加密,md5是一种非对称的加密方式
 * www.cmd5.com可以测试一下这种加密方式,我们这里使用一个第三方库utility来支持md5
 * 使用的时候utils.md5(pwd)但是这种情况下的加密一般会被其他人在网上通过彩虹表进行暴力破解，
 * 为了防止密码被反向破解我们可以自己再次对密文进行再次加密
 * 例如下面的md5pwd函数，采用的是两次md5加密和一次加盐的方法
 */

 /**
  * 登录的状态保存我们一般使用的是cookie
  */

const express = require('express')
const utils = require('utility');//md5支持库
 
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd':0,'__v':0} 
// 把这些字段设置成0，之后的返回数据里面就不会显示这些东西
 
Router.get('/list',function(req, res){
    // User.remove({},function(e,d){}) // 这个表示清除所有的用户信息
    User.find({},function(err,doc){
        return res.json(doc)
    })
})

Router.post('/login', function(req,res){
    //登录完成之后，不要让pwd返回
    const {user, pwd} = req.body
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){ //找到用户名和加密后的密码来组成一个查询条件
        if (!doc) { // 这种情况在数据库里面没有找到对应的用户
            return res.json({code:1,msg:'用户名或者密码错误'}) 
        }
        res.cookie('userid', doc._id)　
        return res.json({code:0,data:doc}) //如果已经找到,把登录的数据直接进行返回
    })
})

Router.post('/register', function(req, res){
    // console.log(res.body);
    const {user, pwd, type} = req.body
    User.findOne({user},function(err,doc){
        if (doc) {
            return res.json({code:1,msg:'用户名重复'})
        }
         // 因为create方法不能返回登录的数据，所以这里用save方法
        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function(e,d){
            if (e) { //如果出错
                return res.json({code:1,msg:'后端出错了'})
            }
            const {user, type, _id} = d // 对数据进行一下过滤
            res.cookie('userid', _id) // 这里同时要设置一些cookie，否则没有状态
            return res.json({code:0,data:{user, type, _id}}) //注册之后返回这些信息
        })
    })
})

// 接受user信息的端口
Router.post('/update',function(req,res){
    const userid = req.cookies.userid; //做一次cookie的校验
    if(!userid){
      return json.dumps({code:1})
    }
    const body = req.body.data;
    User.findByIdAndUpdate(userid,body,function(err,doc){
        // console.log(doc);
        // console.log(body);
        const data = Object.assign({},{ //因为noodejs里面不是很支持es6的一些语法，这里我们就不能使用展开运算符号来进行赋值
              user:doc.user,
              type:doc.type
        },body)
        return res.json({ code:0,data })
      })
})
Router.get('/info',function(req, res){
    const {userid} = req.cookies
    // 看一下用户的请求有没有cookie，用户没有cookie表示没有登录状态
    if (!userid) {
        return res.json({code:1})
    }
    User.findOne({_id:userid} ,_filter , function(err,doc){ // 查询一波
        if (err) { // 出错
            return res.json({code:1, msg:'后端出错了'})
        }
        if (doc) { //没有出错找到了数据
            return res.json({code:0,data:doc})
        }
    })
})


 
//对密码进行多次加密
function md5Pwd(pwd){
    const salt = 'chy_is_best_wdlj_3957x8yza6!@#IUHJh~~';
    return utils.md5(utils.md5(pwd+salt))// 直接使用两次md5加密和一次加盐的方法
}
 
 
module.exports = Router

