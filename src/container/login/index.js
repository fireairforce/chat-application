import React from 'react';
import Logo from '../../component/logo';
import { List,InputItem,WingBlank,WhiteSpace,Button } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
// 从redux里面引入login
import { connect } from 'react-redux';
import { login } from './../../redux/user.redux';

class Login extends React.Component{
    state={
        user:'',
        pwd:''
    }
    handleChange = (type,val)=>{
        this.setState({
            [type]:val
        })
    }
    register = () =>{
        console.log(this.props);
        this.props.history.push('/register');
    }
    handleLogin = () =>{
        this.props.login(this.state);
        //把得到后的数据传递到reducer进行处理
        // this.props.login(this.state)
    //    console.log(this.props);
        console.log(this.state);
    }
    render(){
        // console.log(this.props);
        // console.log(this.props.state);
        return(
          <div>
               {this.props.state.redirectTo?<Redirect to={this.props.state.redirectTo} />:null}
              <Logo />
              {this.props.state.msg?<p className="error-msg">{this.props.state.msg}</p>:null}
              <WingBlank>
                  <List>
                      <InputItem
                        onChange={v=>this.handleChange('user',v)}
                      >用户名</InputItem>
                      <WhiteSpace />
                      <InputItem
                         type='password'
                         onChange={v=>this.handleChange('pwd',v)}
                      >密码</InputItem>
                  </List>
                <Button type="primary" onClick={this.handleLogin}>登录</Button>
                <WhiteSpace />
                <Button onClick={this.register} type="primary">注册</Button>  
              </WingBlank>
          </div>  
         
        )
    }
}
function mapStateToProps(state){
    return {state:state.user}
}
const actionCreators = { login }
Login = connect(mapStateToProps,actionCreators)(Login);
export default Login; 