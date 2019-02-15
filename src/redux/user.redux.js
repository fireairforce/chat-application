import axios from 'axios';
import {getRedirectPath} from '../util'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS= 'LOGIN_SUCCESS'
const ERROR_MESSAGE = 'ERROR_MESSAGE' 
const initState = {
    redirectTo:'',
    isAuth:'false',
    msg:'',
    user:'',
    pwd:'',
    type:''
}
// reducer
export function user(state=initState,action){
   switch(action.type){
       case ERROR_MESSAGE:
         return {...state,isAuth:false,msg:action.msg}
       case REGISTER_SUCCESS:
         return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}  //登录成功之后把isAuth变为true,其他的值变为传进来的值,展开运算符的解构赋值
       case LOGIN_SUCCESS:
         return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
        default:
         return state  
   }
}

function registerSuccess(data){
    return {type:REGISTER_SUCCESS,payload:data}
}
function loginSuccess(data){
    return {type:LOGIN_SUCCESS,payload:data}
}
function errorMsg(msg){　// 用来报错
    return {type:ERROR_MESSAGE,msg:msg} // 如果用另外一种简单的办法,msg要放在前面，约定俗成的写法
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
                dispatch(registerSuccess({user,pwd,type})) //使用一个异步的写法
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
                dispatch(loginSuccess({user,pwd})) //把这两个字段搞过去
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
