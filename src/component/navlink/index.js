import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
class NavLinkBar extends React.Component{
    static propTypes = {
        data:PropTypes.array.isRequired
    }
    render(){
        const navlist = this.props.data.filter(v=>!v.hide) //把hide是true的直接去掉
        // console.log(navlist);
        // console.log(this.props);
        const { pathname } = this.props.location;
        return(
            <TabBar>
            {
                navlist.map(v=>(
                    <TabBar.Item
                        key={v.path}
                        title={v.text}
                        icon={{uri:require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                        selected={pathname===v.path} 
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}
                        >
                    </TabBar.Item>
                ))
            }
            </TabBar>
        )
    }
}
export default withRouter(NavLinkBar);