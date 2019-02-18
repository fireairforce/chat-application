/**
 * 封装而成的列表信息栏，数据通过父组件传递过来的userlist
 */
import React from 'react';
import { Card,WingBlank } from 'antd-mobile';
import Proptypes from 'prop-types';
class UserCard extends React.Component{
    static propTypes = {
        userlist:Proptypes.array.isRequired,// 这个数组是一个必须传递的项目
    } 
    render(){
        const Header = Card.Header;
        const Body = Card.Body;
        console.log(this.props.userlist);
        return(
                 <WingBlank>
                  {this.props.userlist.map(v=>(
                      v.avatar? 
                      <Card key={v._id}>
                        <Header
                          title={v.user}
                          thumb={require(`./../img/${v.avatar}.png`)}
                          extra={<span>{v.title}</span>} 
                        >
                        </Header>
                        <Body>
                          {v.type=='boss'?<div>公司: { v.company }</div>:null}
                          {v.desc.split('\n').map(d=>(<div key={d}>{d}</div>))} 
                          {/* 用换行符对简介里面的数据进行一波分割 */}
                          {v.type=='boss'?<div>薪资: { v.money }</div>:null}
                        </Body>
                      </Card>:null
                  ))}
                </WingBlank>
        )
    }
}
export default UserCard;