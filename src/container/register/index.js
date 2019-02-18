/**
 * created by zoomdong on 2019.01.22
 */
import React from 'react';
import Logo from '../../component/logo';
import { InputItem ,List,Radio,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
import Form from '../../component/form' // 高阶组件对原有组件进行了一次的功能加强
class Register extends React.Component{
    // state={
    //     user:'',
    //     pwd:'',
    //     repeatpwd:'',
    //     type:'genius'      
    // }
   componentDidMount(){
     this.props.handleChange('type','genius'); // 因为里面有个默认的type值，所以可以把它设置一波
   }
    handleRegister = () =>{
        // console.log(this.state);
        this.props.register(this.props.state);
    }
    render(){
        // console.log(this.props.register);
        const RadioItem = Radio.RadioItem;
        return(
        <div>
            {this.props.user.redirectTo?<Redirect to={this.props.user.redirectTo} />:null}
            <Logo />
            <List>
                {this.props.user.msg?<p className="error-msg">{this.props.user.msg}</p>:null}
              <InputItem
                onChange={v=>{this.props.handleChange('user',v)}}
              >用户名</InputItem>
                <WhiteSpace />
              <InputItem
              type='password'
                 onChange={v=>{this.props.handleChange('pwd',v)}}
              >密码</InputItem>
                <WhiteSpace />
              <InputItem
                 type="password"
                 onChange={v=>{this.props.handleChange('repeatpwd',v)}}
              >确认密码</InputItem>
              <WhiteSpace />
                <RadioItem 
                  onChange={()=>{this.props.handleChange('type','genius')}}
                  checked={this.props.state.type=='genius'}>牛人</RadioItem>
                <RadioItem 
                  onChange={()=>{this.props.handleChange('type','boss')}}
                  checked={this.props.state.type=='boss'}>BOSS</RadioItem>
                <Button type="primary" onClick={this.handleRegister}>注册</Button>
            </List>
        </div>
        )
    }
}
function mapStateToProps(state){
    return {user:state.user}
}

const actionCreators = { register }

Register = Form(Register);//高阶组件的绑定

Register = connect(mapStateToProps,actionCreators)(Register);

export default Register; 