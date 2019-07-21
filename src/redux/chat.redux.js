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
          const n = action.payload.msg.from!==action.payload.userid?1:0;
        //   console.log(n);
          return { ...state,chatmsg:[...state.chatmsg,action.payload.msg],unread:state.unread + n }   
        case MSG_READ:
        const { from,number } = action.payload;
          return { ...state,
            chatmsg:state.chatmsg.map(v=>({
              ...v,read:from==v.from?true:v.read
          })),
          unread:state.unread-number} // unread用未读数量减去后端修改的数量
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
function msgRead({from,userid,number}){ // 这里传递一下发信人和收信人的id以及未读消息的数量
    return { type:MSG_READ,payload:{ from,userid,number } } 
}

export function getMsgList(){
    return async (dispatch,getState) =>{ // 这个地方其实有第二个参数叫做getState,返回我们应用里面的所有状态(reducers里面的)
        const res = await axios.get('/user/getmsglist')
            if(res.status ===200 && res.data.code ===0){
                const userid = getState().user._id;
                dispatch(msgList(res.data.msg,res.data.users,userid))
            }
    }
}

export function recvMsg(){
    return (dispatch,getState)=>{
        socket.on('recvmsg',function(data){
            // console.log(data);
            const userid = getState().user._id; //拿到当前用户的_id
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

export function readMsg(from){ // 
    return (dispatch,getState)=>{
        axios.post('/user/readmsg',{from}).then(res=>{
            const userid = getState().user._id;
            const num  = res.data.number;//这个number 由后端来返回
    
            if(res.status==200&&res.data.code ==0){
                dispatch(msgRead({ from,userid, num}))
                // num可以写为num:res.data.num来进行传递
            }
        })
    }
}
