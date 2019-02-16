import axios from 'axios';
import {getRedirectPath} from '../util'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
// const LOGIN_SUCCESS= 'LOGIN_SUCCESS'
const ERROR_MESSAGE = 'ERROR_MESSAGE' 
const LOAD_DATA='LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS' // 统一为验证成功
const initState = {
    redirectTo:'',
    // isAuth:'false',
    msg:'',
    user:'',
    // pwd:'',
    type:''
}
// reducer
export function user(state=initState,action){
   switch(action.type){
       case AUTH_SUCCESS:
         return {...state,redirectTo:getRedirectPath(action.payload),...action.payload}
       case ERROR_MESSAGE:
         return {...state,msg:action.msg}
    //    case REGISTER_SUCCESS:
        //  return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}  //登录成功之后把isAuth变为true,其他的值变为传进来的值,展开运算符的解构赋值
    //    case LOGIN_SUCCESS:
    //      return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
       case LOAD_DATA:
         return {...state,...action.payload} 
        default:
         return state  
   }
}

// function registerSuccess(data){
//     return {type:REGISTER_SUCCESS,payload:data}
// }
// function loginSuccess(data){
//     return {type:LOGIN_SUCCESS,payload:data}
// }
function authSuccess(data){
    return {type:AUTH_SUCCESS,payload:data}
}
function errorMsg(msg){　// 用来报错
    return {type:ERROR_MESSAGE,msg:msg} // 如果用另外一种简单的办法,msg要放在前面，约定俗成的写法
}
export function loadData(userinfo){
    return { type:LOAD_DATA,payload:userinfo }
}
// 用户的一些操作函数
export function register({user,pwd,repeatpwd,type}){
   
    if(!user||!pwd){ //　如果用户没有填写账户和密码
        return errorMsg('用户名密码必须输入')
    }
    if(pwd!==repeatpwd){
        return errorMsg('密码和确认密码不同')
    }
    return dispatch =>{
        //  console.log('qaq');
        axios.post('/user/register',{user,pwd,type}).then(res=>{　//用户的一些值传递过去
            if(res.status==200&&res.data.code===0){ // 请求成功
                dispatch(authSuccess({user,pwd,type})) //使用一个异步的写法
            }else{
                // console.log('req fail');
                dispatch(errorMsg(res.data.msg)) //message由后端来定
            }
        })
    }
}
// 注册函数,这里只有两个字段
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('用户名和密码必须输入');
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd}).then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess(res.data.data)) //返回出来的字段里面，我们只需要的user和type(进行路由跳转)
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function userinfo(){
    // 获取用户信息
    return dispatch=>{
        axios.get('/user/info').then(res=>{
            if(res.status==200){
                // console.log(res.data);
                if(res.data.code==0){
                    // 有登录信息的
                }else{
                    this.props.loadData(res.data.data)
                    // console.log(this.props.history);
                    this.props.history.push('/login');
                }
            }
        })
    }
}
// 保存信息
export function update(data){
   return dispatch=>{
       axios.post('/user/update',{data}).then(res=>{
            if(res.status===200&&res.data.code===0){
              
            }else{
                dispatch(errorMsg(res.data.msg))
            }
       })
   }
}