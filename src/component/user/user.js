/**
 * 展示用户信息使用的是antd-mobile里面的result组件,展示具体的信息使用List
 */
import React from 'react';
import { connect } from 'react-redux';
import { Result,List ,WhiteSpace,Modal} from 'antd-mobile';
import browserCookie from 'browser-cookies'; // 用来清除cookie
import { logoutSubmit } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
class User extends React.Component{
    //退出登录之前会有一个确认的弹窗
    logout = () =>{
        const alert = Modal.alert;
        alert('注销','确认退出登陆吗',[
            {text:'取消',onPress:()=> console.log('cancel')},
            {text:'确认',onPress:()=> {  
              browserCookie.erase('userid'); //删除我们之前保存的cookie
              // window.location.href = window.location.href;  刷新一下页面，一般使用这个并不是很高明,我们用redux手动清空数据
             this.props.logoutSubmit();
            // 把redux里面的数据清空并且跳转到正确的页面来取代刷新页面
            }},
        ])
      
    }
    render(){
        // console.log(this.props);
        const { user } = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        // console.log(user);
        return user.avatar?(
            <div>
                {<Result 
                 img={<img src={require(`../img/${user.avatar}.png`)} style={{width:50}}/>}
                 title={user.user} 
                 message={user.type=='boss'?user.company:null}
               />}
               <List renderHeader={()=>'简介'}>
                  <Item
                    multipleLine
                   >{user.title}
                  {user.desc.split('\n').map(v=>
                      <Brief key={v}>{v}</Brief>
                  )}
                  {user.money?<Brief>薪资:{user.money}</Brief>:null} 
                  {/* 这里把简介通过split根据换行符分割成一个数组然后再去遍历这个数组 */}
                  </Item>
               </List>
               <div >

               </div>
               <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ):(user.redirectTo?<Redirect to={user.redirectTo} />:null)
    }
}

function mapStateToProps(state){
    return {user:state.user}
}
const actionCreators = { logoutSubmit }
User = connect(mapStateToProps,actionCreators)(User);

export default User;