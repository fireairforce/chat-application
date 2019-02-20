import React from 'react';
import { List,InputItem, NavBar,Icon,Grid } from 'antd-mobile';
// import io from 'socket.io-client';
import { connect } from 'react-redux';
import { getMsgList,sendMsg ,recvMsg} from '../../redux/chat.redux';
import { getChatId } from '../../util';
// const socket = io('ws://localhost:9093') // 由于现在是跨域的,所以这里手动连接一下，否则就直接io()

class Chat extends React.Component{
    state={
        text:'',
        msg:[]
    }
    componentDidMount(){
        if(!this.props.state.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
        
    }    
    fixCarousel=()=>{
        // console.log('1');
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSubmit = () =>{
        // socket.emit('sendmsg',{text:this.state.text}); // 利用socket给后端发送数据
        // this.setState({ text:'' })
        const from = this.props.state.user._id; //当前的登录人的id
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg});
        //发送完成之后，我们直接把state设置为空
        this.setState({ text:'',showEmoji:false })
    }
    render(){
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 🐎'
                                        .split(' ') //把他们通过空格分割成一个数组
                                        .filter(v=>v) // 过滤空格
                                        .map(v=>({text:v})) 
        const userid = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.state.chat.users;
        const { showEmoji } = this.state;
        // console.log(users);
        // console.log(this.props);
        if(!users[userid]){
            return null
        }
        const chatid = getChatId(userid,this.props.state.user._id);
        const chatmsgs = this.props.state.chat.chatmsg.filter(v=>v.chatid===chatid); //进行一些数据的过滤
  
        return(
            <div id="chat-page">
                <NavBar
                  mode="dark"
                  icon = {<Icon type='left' />}
                  onLeftClick={()=>{
                      this.props.history.goBack();
                  }}
                >
                    { users[userid].name }
                </NavBar>

                {chatmsgs.map(v=>{
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from == userid?(
                        <List key={v._id}>
                          <Item
                           thumb={avatar}
                          >
                            {v.content}
                          </Item>
                        </List>
                    ):(
                        <List key={v._id}>
                        <Item 
                          className='chat-me'
                          extra={<img src={avatar}/>}
                        >
                           {v.content}
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
                      extra={
                      <div>
                          <span
                            style={{marginRight:15}}
                            onClick={()=>{
                                this.setState({showEmoji:!this.state.showEmoji})
                                this.fixCarousel();// 这个函数是官方用来修复Grid的框框不能显示的问题的，点击的时候执行一下这个函数
                            }}       
                          >😀</span>
                         <span onClick={this.handleSubmit}>发送</span>
                      </div>                    
                    }
                     >
                     信息        
                    </InputItem>
                </List>
                 {showEmoji?
                     (<Grid data={emoji}
                     columnNum = {9}
                     carouselMaxRow={4}
                     isCarousel={true}
                     onClick={el=>{
                        //  console.log(el);//el 是我们选择的那个表情，把它加到输入信息框就可以了
                        this.setState({
                            text:this.state.text + el.text
                        })
                        
                     }}
                     />):null
                }
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

