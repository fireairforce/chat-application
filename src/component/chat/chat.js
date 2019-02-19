import React from 'react';
import { List,InputItem, NavBar} from 'antd-mobile';
// import io from 'socket.io-client';
import { connect } from 'react-redux';
import { getMsgList,sendMsg ,recvMsg} from '../../redux/chat.redux';
// const socket = io('ws://localhost:9093') // 由于现在是跨域的,所以这里手动连接一下，否则就直接io()

class Chat extends React.Component{
    state={
        text:'',
        msg:[]
    }
    componentDidMount(){
        this.props.getMsgList();
        this.props.recvMsg();
    }    
    handleSubmit = () =>{
        // socket.emit('sendmsg',{text:this.state.text}); // 利用socket给后端发送数据
        // this.setState({ text:'' })
        const from = this.props.state.user._id; //当前的登录人的id
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg});
        //发送完成之后，我们直接把state设置为空
        this.setState({ text:'' })
    }
    render(){
        const user = this.props.match.params.user;
        const Item = List.Item;
        return(
            <div id="chat-page">
                <NavBar>
                    {user}
                </NavBar>


                {this.props.state.chat.chatmsg.map(v=>{
                    return v.from == user?(
                        <List key={v._id}>
                          <Item
                        //    thumb={}
                          >
                            对面说:{v.content}
                          </Item>
                        </List>
                    ):(
                        <List key={v._id}>
                        <Item 
                          className='chat-me'
                          extra={'avatar'}
                        >
                         
                          我说:{v.content}
                        </Item>
                      </List>
                    )
                    
                })}
                <div className="stick-footer">
                <List>
                    <InputItem
                      placeholder='请输入'
                      value={this.state.text}
                      onChange={v=>{
                          this.setState({ text:v })
                      }}
                      extra={<span onClick={this.handleSubmit}>发送</span>}
                     >
                     信息        
                    </InputItem>
                </List>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return { state } 
}
const actionCreators = { getMsgList ,sendMsg,recvMsg }

Chat = connect(mapStateToProps,actionCreators)(Chat)
export default Chat;