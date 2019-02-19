import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import NavLinkBar from './../navlink';
import { Switch,Route } from 'react-router-dom';
import Boss from '../../component/boss';
import Genius from '../../component/genius';
import User from '../../component/user/user';
import { getMsgList,recvMsg } from '../../redux/chat.redux';
function Msg(){
    return <h2>消息列表</h2>
}
class DashBoard extends React.Component{
    render(){
        // console.log(this.props);
        const pathname  = this.props.location.pathname;
        // console.log(pathname);
        const user = this.props.user;
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
        return(
            <div>
              <NavBar className='fixed-header' mode="dard">{navList.find(v=>v.path==pathname).title}</NavBar>
                  <div style={{marginTop:'15px'}}>
                    <Switch>
                      { 
                         navList.map(v=>(
                             <Route key={v.path} path={v.path} component={v.component}></Route>
                         ))
                      }    
                    </Switch>            
                  </div>
                <NavLinkBar 
                   data={navList}
                   
                ></NavLinkBar>
            </div>
        )
    }
}
function mapStateToProps(state){
    return { user: state.user }
}
const actionCreators = { getMsgList,recvMsg }
DashBoard = connect(mapStateToProps,actionCreators)(DashBoard);
export default DashBoard;