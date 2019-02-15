/**
 * created by zoomdong on 2019.01.22
 */
import React from 'react';
import Logo from '../../component/logo';
import { InputItem ,List,Radio,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
class Register extends React.Component{
    state={
        user:'',
        pwd:'',
        repeatpwd:'',
        type:'genius'      
    }
    handleChange = (key,val)=>{
        this.setState({
            [key]:val
        })
    }
    handleRegister = () =>{
        // console.log(this.state);
        this.props.register(this.state);
    }
    render(){
        // console.log(this.props.register);
        const RadioItem = Radio.RadioItem;
        return(
        <div>
            {this.props.state.redirectTo?<Redirect to={this.props.state.redirectTo} />:null}
            <Logo />
            <List>
                {this.props.state.msg?<p className="error-msg">{this.props.state.msg}</p>:null}
              <InputItem
                onChange={v=>{this.handleChange('user',v)}}
              >用户名</InputItem>
                <WhiteSpace />
              <InputItem
              type='password'
                 onChange={v=>{this.handleChange('pwd',v)}}
              >密码</InputItem>
                <WhiteSpace />
              <InputItem
                 type="password"
                 onChange={v=>{this.handleChange('repeatpwd',v)}}
              >确认密码</InputItem>
              <WhiteSpace />
                <RadioItem 
                  onChange={()=>{this.handleChange('type','genius')}}
                  checked={this.state.type=='genius'}>牛人</RadioItem>
                <RadioItem 
                  onChange={()=>{this.handleChange('type','boss')}}
                  checked={this.state.type=='boss'}>BOSS</RadioItem>
                <Button type="primary" onClick={this.handleRegister}>注册</Button>
            </List>
        </div>
        )
    }
}
function mapStateToProps(state){
    return {state:state.user}
}

const actionCreators = { register }

Register = connect(mapStateToProps,actionCreators)(Register);

export default Register; 