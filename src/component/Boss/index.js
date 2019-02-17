import React from 'react';
import axios from 'axios';
import { Card,WhiteSpace,WingBlank} from 'antd-mobile';
class Boss extends React.Component{
    state={
        data:[]
    }
    componentDidMount(){
       axios.get('/user/list?type=boss').then(res=>{
        //    console.log(res);
           if(res.status===200){
               this.setState({
                   data:res.data
               })
           }
       })
    }
    render(){
        // console.log(this.state.data);
        const Header = Card.Header;
        const Body = Card.Body;
        return(
            <div>
                <WingBlank>
                  {this.state.data.map(v=>(
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
export default Boss;