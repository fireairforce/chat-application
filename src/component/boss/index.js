import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';
import UserCard from '../userinfo/usercard';
class Boss extends React.Component{
    state={
        data:[]
    }
    componentDidMount(){
      this.props.getUserList('genius');
    }
    render(){
        return <UserCard userlist={this.props.chatuser.userList}></UserCard>
    }
}

function mapStateToProps(state){
    return {chatuser:state.chatuser}
}
const actionCreators = { getUserList }
Boss = connect(mapStateToProps,actionCreators)(Boss);
export default Boss;