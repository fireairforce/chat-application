import React from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile'
class Msg extends React.Component{
    getLast = (arr) => {
        return arr[arr.length - 1];
    } 
    render(){
//         if(!this.props.redux.chat.chatmsg.length){ // 如果没有聊天信息
// 　　　　　　　　
//         }
        const Item = List.Item;
        const Brief = Item.Brief;
        const userid = this.props.redux.user._id;
        const users = this.props.redux.chat.users;
        // console.log(users);
        // console.log(this.props);
        //　按照用户分组，根据chatid(我们前面用来识别唯一聊天的标识)
        const msgGroup = {}
        this.props.redux.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v);
        })     
        // console.log(Object.values(msgGroup)); // 这个里面存储所有的chat_id带上他们的聊天信息(chatmsg)
        // console.log(Object.values({ name:'zoomdong',age:18 }));
       
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last - a_last //根据在后端创建的一个时间戳来进行对信息的一个排序
        }); 
        // 把msgGroup(对象)拼接成一个数组并且进行排序
        // console.log(chatList);

        return(
            <div>            
                   {
                  　　　chatList.map(v=>{
                        // console.log(v);
                        const lastItem = this.getLast(v);
                        // console.log(lastItem);
                        const targetid = lastItem.from ==userid?lastItem.to:lastItem.from; //这个地方永远存储的是和你聊天的那个人的名字
                        const unreadNum = v.filter(v=>!v.read&&v.to===userid).length;
                        if(!users[userid]){
                            return null;
                        }
                        const name = users[targetid].name;
                        const avatar = users[targetid].avatar;
                    return( 
                        <List 
                          key={lastItem._id} // _id这里是不会出现重复的
                        >
                        <Item 
                          extra = {<Badge text={unreadNum}></Badge>}
                          thumb={require(`../img/${avatar}.png`)}
                          arrow='horizontal'
                          onClick={()=>{
                             this.props.history.push(`/chat/${targetid}`)
                          }}
                        >
                            {lastItem.content}
                          <Brief>{name}</Brief>
                       </Item>
                       </List>
                       )
                  })
                  }
               
            </div>
        )
    }
}
export function mapStateToProps(state){
  return { redux:state }
}
Msg = connect(mapStateToProps,null)(Msg);
export default Msg;