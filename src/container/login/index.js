import React from 'react';
import Logo from '../../component/logo';
import { List,InputItem,WingBlank,WhiteSpace,Button } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
// 从redux里面引入login
import { connect } from 'react-redux';
import { login } from './../../redux/user.redux';
import Form from '../../component/form';

class Login extends React.Component{
    // state={
    //     user:'',
    //     pwd:''
    // }
    // handleChange = (type,val)=>{
    //     this.setState({
    //         [type]:val
    //     })
    // }
    register = () =>{
        this.props.history.push('/register');
    }
    handleLogin = () =>{
        this.props.login(this.props.state); // 把高阶组件里面的state传递进去
        //把得到后的数据传递到reducer进行处理
    }
    render(){
        // console.log(this.props);
        // console.log(this.props.state);
        return(
          <div>
               {this.props.user.redirectTo&&this.props.user.redirectTo!='/login'?<Redirect to={this.props.user.redirectTo} />:null}
              <Logo />
              {this.props.user.msg?<p className="error-msg">{this.props.user.msg}</p>:null}
              <WingBlank>
                  <List>
                      <InputItem
                        onChange={v=>this.props.handleChange('user',v)}
                      >用户名</InputItem>
                      <WhiteSpace />
                      <InputItem
                         type='password'
                         onChange={v=>this.props.handleChange('pwd',v)}
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
    return {user:state.user}
}
const actionCreators = { login }

Login = Form(Login);

Login = connect(mapStateToProps,actionCreators)(Login);
export default Login; 