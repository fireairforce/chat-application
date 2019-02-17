import React from 'react';
import { NavBar, InputItem ,TextareaItem ,Button} from 'antd-mobile';
import AvatarSeletor from './../avatar-selector';
import { update } from '../../redux/user.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class BossInfo extends React.Component{
   
    state={
        title:'',
        desc:'',
        company:'',
        money:''
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
                <NavBar mode="dard">Boss完善信息页面</NavBar>
               <AvatarSeletor selectAvatar={(imgname)=>{this.selectAvatar(imgname)}}></AvatarSeletor>          
                <InputItem onChange={(v)=>{this.onChange('title',v)}}>
                  招聘职位
                </InputItem>
                <InputItem onChange={(v)=>{this.onChange('company',v)}}>
                  公司名称
                </InputItem>
                <InputItem onChange={(v)=>{this.onChange('money',v)}}>
                  职位薪资
                </InputItem>
                <TextareaItem 
                 onChange={(v)=>{this.onChange('desc',v)}}
                 rows={3}
                 autoHeight
                 title='职位要求'
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
BossInfo = connect(mapStateToProps,actionCreators)(BossInfo);
export default BossInfo;