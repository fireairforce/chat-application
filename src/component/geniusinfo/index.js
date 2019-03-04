import React from 'react';
import { NavBar, InputItem ,TextareaItem ,Button} from 'antd-mobile';
import AvatarSeletor from './../avatar-selector';
import { update } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class GeniusInfo extends React.Component{
    state={
        title:'',
        desc:''
    }
    onChange = (key,val) =>{
       this.setState({
           [key]:val
       })
    }
    selectAvatar = (imgname)=>{
        this.setState({
            avatar:imgname
        })
    }
    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.state.redirectTo;
        return(
            <div>
                 {redirect&&redirect!==path?<Redirect to={this.props.state.redirectTo} />:null}
                <NavBar mode="dard">牛人完善信息页面</NavBar>
               <AvatarSeletor selectAvatar={(imgname)=>{this.selectAvatar(imgname)}}></AvatarSeletor>          
                <InputItem onChange={(v)=>{this.onChange('title',v)}}>
                  求职岗位
                </InputItem>
                <TextareaItem 
                 onChange={(v)=>{this.onChange('desc',v)}}
                 rows={3}
                 autoHeight
                 title='个人简介'
                >
                </TextareaItem>
                <Button 
                type="primary"
                onClick={()=>{this.props.update(this.state)}}
                >保存</Button>
            </div>
        )
    }
}
function mapStateToProps(state){
    return { state: state.user}
  }
const actionCreators = { update }
GeniusInfo = connect(mapStateToProps,actionCreators)(GeniusInfo);
export default GeniusInfo;