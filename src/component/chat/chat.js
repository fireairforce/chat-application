import React from 'react';
import { List,InputItem } from 'antd-mobile';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093') // 由于现在是跨域的,所以这里手动连接一下，否则就直接io()

class Chat extends React.Component{
    state={
        text:'',
        msg:[]
    }
    componentDidMount(){
        socket.on('recvmsg',(data)=>{ 
            //这里原本是function(data){} 但在里面我们找不到msg里面的数据，因此我们使用箭头函数
            // console.log(data);
            this.setState({
                msg:[...this.state.msg,data.text] 
                //msg的数据为之前的msg的数据加上现在的聊天输入的数据
            })
        })
    }    
    handleSubmit = () =>{
        socket.emit('sendmsg',{text:this.state.text}); // 利用socket给后端发送数据
        this.setState({ text:'' })
    //   console.log(this.state);
    }
    render(){
    //  console.log(this.props);
        return(
            <div>
                {this.state.msg.map(v=>{
                    return <p key={v}>{v}</p>
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

export default Chat;