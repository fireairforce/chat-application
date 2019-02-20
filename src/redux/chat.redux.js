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
    users:{},
}

// 过滤掉unread:action.payload.filter(v=>!v.read).length
// 实时维护unread
export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
        //   console.log(action.payload);
          return { ...state,users:action.payload.users,chatmsg:action.payload.msg,unread:action.payload.msg.filter(v=>!v.read&&v.to==action.payload.userid).length } 
          //把read是false和发送人发送过来的信息过滤出来
        case MSG_RECV:
          const n = action.payload.to===action.payload.userid?1:0;
        //   console.log(action.payload);
          return { ...state,chatmsg:[...state.chatmsg,action.payload.msg],unread:state.unread + n}   
        // case MSG_READ:
        default:
          return state
    }
}

function msgList(msg,users,userid){
    return { type:MSG_LIST,payload:{ msg,users,userid } }
}

function msgRecv(msg,userid){
    return { type:MSG_RECV,payload:{ msg,userid } }
}

export function getMsgList(){
    return (dispatch,getState) =>{ // 这个地方其实有第二个参数叫做getState,返回我们应用里面的所有状态(reducers里面的)
        axios.get('/user/getmsglist').then(res=>{
            // console.log(res);
            if(res.status ===200 && res.data.code ===0){
                // console.log(getState());
                const userid = getState().user._id;
                dispatch(msgList(res.data.msg,res.data.users,userid))
            }

        })
    }
}

export function recvMsg(){
    return (dispatch,getState)=>{
        socket.on('recvmsg',function(data){
            // console.log(data);
            const userid = getState().user._id;
            dispatch(msgRecv(data,userid))
        })
    }
}

// actionCreators默认返回的是一个对象(Object)或者函数,所以这里要写成dispatch的形式

export function sendMsg({from,to,msg}){
    return dispatch=>{
        socket.emit('sendmsg',{from,to,msg}) //把数据直接通过socket发送给后端
    }
}
