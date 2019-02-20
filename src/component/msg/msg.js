import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd-mobile'
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
        // console.log(msgGroup); // 这个里面存储所有的chat_id带上他们的聊天信息(chatmsg)
        // console.log(Object.values({ name:'zoomdong',age:18 }));
        const chatList = Object.values(msgGroup); // 把msgGroup拼接成一个数组
        // console.log(chatList);
        return(
            <div>
             
                   {
                    //    chatList.filter().map()
                    // v[0].from
                  　　　chatList.map(v=>{
                        // console.log(v);
                        const lastItem = this.getLast(v);
                        // console.log(lastItem);
                        const targetid = lastItem.from ==userid?lastItem.to:lastItem.from; //这个地方永远存储的是和你聊天的那个人的名字
                        if(!users[userid]){
                            return null;
                        }
                        const name = users[targetid]?users[targetid].name:null;
                        const avatar = users[targetid]?users[targetid].avatar:null;
                    return( 
                        <List 
                          key={lastItem._id} // _id这里是不会出现重复的
                        >
                        <Item 
                          
                          thumb={require(`../img/${avatar}.png`)}
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