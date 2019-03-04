import React from 'react'
import Login from './container/login'
import Register from './container/register'
import AuthRoute from './component/authroute'
import BossInfo from './component/bossinfo'
import GeniusInfo from './component/geniusinfo'
import Dashboard from './component/dashboard'
import Chat from './component/chat/chat'
import { Route ,Switch } from 'react-router-dom';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            hasError:false
        }
    }
    componentDidCatch(err,info){
        console.log(err,info);
        this.setState({
            hasError:true
        })
    }
    
    render(){
        console.log(this.state);
        return this.state.hasError
        ? <h2>页面出错啦~</h2>
        :(
          <div>
            <AuthRoute></AuthRoute>
            <Switch> 
            {/*使用Switch包起来的路由下面它就只会显示一种路由不会显示其他的，否则就会显示一些其他的路由
            　　，例如下面的那个没有path的组件,有Switch的话，最后一个页面没有找到就会404 */}
            <Route path="/geniusinfo" component={GeniusInfo}/>
            <Route path="/bossinfo" component={BossInfo} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/chat/:user" component={Chat}/>
            <Route component={Dashboard} />
          </Switch>
         </div>     
        )
    }
}

export default App;