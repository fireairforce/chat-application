import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';
import UserCard from '../userinfo/usercard';
class Genius extends React.Component{
    state={
        data:[]
    }
    componentDidMount(){
      this.props.getUserList('boss');
    }
    render(){ 
        return <UserCard userlist={this.props.chatuser.userList}></UserCard>
    }
}

function mapStateToProps(state){
    return {chatuser:state.chatuser}
}
const actionCreators = { getUserList }
Genius = connect(mapStateToProps,actionCreators)(Genius);
export default Genius;