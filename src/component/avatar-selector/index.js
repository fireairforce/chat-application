/**
 * 头像选择组件
 */
import React from 'react';
import { Grid,List } from 'antd-mobile'
export default class AvatarSeletor extends React.Component{
    state={

    }
    render(){
        // 使用逗号将其全部切割开，这里的写法参考antd-mobile Grid组件
        const avatarList='boy,man,girl,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,woman,zebra'.split(',').map(v=>({
            icon:require(`../img/${v}.png`),
            text:v
        }));
        const girdHeader = this.state.icon?(
        <div>
            <span>已选择头像</span>
           <img src={this.state.icon} style={{width:20}} alt="icon" />
        </div>):'请选择头像';
        // console.log(this.state);
        return(
            <div>
                {/* 使用List组件来渲染选择的头像 */}
                <List renderHeader={()=>girdHeader}> 
                    <Grid 
                    data={avatarList}
                    columnNum={5}
                    onClick={ele=>{
                        this.setState(ele)
                        this.props.selectAvatar(ele.text) // 组件之间传值的基本方法
                    }}
                    >
                    </Grid>
                </List>
            </div>
        )
    }
}