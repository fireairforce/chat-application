import React from 'react';
import axios from 'axios';
import { Card,WhiteSpace,WingBlank} from 'antd-mobile';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';
class Boss extends React.Component{
    state={
        data:[]
    }
    componentDidMount(){
      this.props.getUserList('genius');
    //   this.setState({})
    }
    render(){
        // console.log(this.props);   
        const Header = Card.Header;
        const Body = Card.Body;
        return(
            <div>
                <WingBlank>
                  {this.props.chatuser.userList.map(v=>(
                      v.avatar? 
                      <Card key={v._id}>
                        <Header
                          title={v.user}
                          thumb={require(`./../img/${v.avatar}.png`)}
                          extra={<span>{v.title}</span>} 
                        >
                        </Header>
                        <Body>
                          {v.desc.split('\n').map(v=>(<div key={v}>{v}</div>))} 
                          {/* 用换行符对简介里面的数据进行一波分割 */}
                        </Body>
                      </Card>:null
                  ))}
                </WingBlank>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {chatuser:state.chatuser}
}
const actionCreators = { getUserList }
Boss = connect(mapStateToProps,actionCreators)(Boss);
export default Boss;