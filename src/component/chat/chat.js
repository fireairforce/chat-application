import React from 'react';
import io from 'socket.io-client';

class Chat extends React.Component{
    componentDidMount(){
       const socket = io('ws://localhost:9093') // 由于现在是跨域的,所以这里手动连接一下，否则就直接io()
    }    
    render(){
    //  console.log(this.props);
        return(
            <div>
                <h2>chat with user:{this.props.match.params.user}</h2>
            </div>
        )
    }
}

export default Chat;