import React from 'react';
import Logo from '../../component/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';

class Login extends React.Component{
    register = () =>{
        console.log(this.props);
        this.props.history.push('/register');
    }
    render(){
        return(
          <div>
              <Logo />
              <h2>这里是登录界面</h2>
              <WingBlank>
                  <List>
                      <InputItem>用户名</InputItem>
                      <WhiteSpace />
                      <InputItem>密码</InputItem>
                  </List>
                <Button type="primary">登录</Button>
                <WhiteSpace />
                <Button onClick={this.register} type="primary">注册</Button>  
              </WingBlank>
          </div>  
         
        )
    }
}
export default Login; 