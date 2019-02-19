import io from 'socket.io-client';
import axios from 'axios';
const socket = io('ws://localhost:9093');
// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
//　标识已读
const MSG_READ = 'MSG_READ';

const initState = {
    chatmsg:[],//具体的每条聊天信息
    unread:0, //聊天框的下面显示未读信息列表
}

// 过滤掉unread:action.payload.filter(v=>!v.read).length
// 实时维护unread
export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
          return { ...state,chatmsg:action.payload,unread:action.payload.filter(v=>!v.read).length }
        case MSG_RECV:
          return { ...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread + 1}   
        // case MSG_READ:
        default:
          return state
    }
}

function msgList(msg){
    return { type:MSG_LIST,payload:msg }
}

function msgRecv(msg){
    return { type:MSG_RECV,payload:msg }
}

export function getMsgList(){
    return dispatch =>{
        axios.get('/user/getmsglist').then(res=>{
            // console.log(res);
            if(res.status ===200 && res.data.code ===0){
              dispatch(msgList(res.data.msg))
            }

        })
    }
}

export function recvMsg(){
    return dispatch=>{
        socket.on('recvmsg',function(data){
            // console.log(data);
            dispatch(msgRecv(data))
        })
    }
}

// actionCreators默认返回的是一个对象(Object)或者函数,所以这里要写成dispatch的形式

export function sendMsg({from,to,msg}){
    return dispatch=>{
        socket.emit('sendmsg',{from,to,msg}) //把数据直接通过socket发送给后端
    }
}
