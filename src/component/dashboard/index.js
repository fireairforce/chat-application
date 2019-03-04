import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import NavLinkBar from './../navlink';
import { Route ,Redirect } from 'react-router-dom';
import Boss from '../../component/boss';
import Genius from '../../component/genius';
import User from '../../component/user/user';
import Msg from '../../component/msg/msg'
import { getMsgList,recvMsg } from '../../redux/chat.redux';
import QueueAnim from 'rc-queue-anim';

class DashBoard extends React.Component{  
    componentDidMount(){
        if(!this.props.state.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }   
    }
  
    render(){    
        // console.log(this.props);
        const pathname  = this.props.location.pathname;
        // console.log(pathname);
        const user = this.props.state.user;
        // console.log(user);
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user.type=='genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Genius,
                hide:user.type=='boss'

            },{
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg,
            },{
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User,
            }
        ]
        // 让动画生效，只渲染一个route
        const page = navList.find(v=>v.path==pathname) // 找到路由对应我们当前路由的名字
        // console.log(page);
        return page?(
            <div>
              <NavBar className='fixed-header' mode="dard">
                {/* {navList.find(v=>v.path==pathname).title} */}
                {page.title}
              </NavBar>
                  <div style={{marginTop:'15px'}}>
                  <QueueAnim type="scaleX" delay={500}>
                    {/* <Switch> */}
                    
                      {/* { 
                         navList.map(v=>( */}
                             <Route key={page.path} path={page.path} component={page.component}></Route>
                         {/* ))
                      } */}
                     
                    {/* </Switch>  */}
                    </QueueAnim>               
                  </div>
                <NavLinkBar 
                   data={navList}
                   
                ></NavLinkBar>
            </div>
        ):<Redirect to="/msg" />
    }
}
function mapStateToProps(state){
    return { state }
}
const actionCreators = { getMsgList,recvMsg }
DashBoard = connect(mapStateToProps,actionCreators)(DashBoard);
export default DashBoard;