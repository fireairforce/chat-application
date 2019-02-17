import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore ,applyMiddleware,compose} from 'redux';
import { BrowserRouter, Route ,Switch} from 'react-router-dom'
import reducers from './reducers';
import './config';
import './index.css';

import Login from './container/login';
import Register from './container/register';
import AuthRoute from './component/authroute';
import BossInfo from './component/bossinfo';
import GeniusInfo from './component/geniusinfo';
import Dashboard from './component/dashboard';
const reduxDevtools  = window.devToolsExtension?window.devToolsExtension():f=>f;
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    reduxDevtools
));

// 登录页面　没有登录信息统一跳转到login

// 有４个新开发的页面,boss genius me msg ４个页面，具有一些相同的骨架
ReactDom.render(
     (<Provider store={store}>
       <BrowserRouter>  
         <div>
            <AuthRoute></AuthRoute>
            <Switch> 
            {/*使用Switch包起来的路由下面它就只会显示一种路由不会显示其他的，否则就会显示一些其他的路由
            　　，例如下面的那个没有path的组件,有Switch的话，最后一个页面没有找到就会404 */}
            <Route path="/geniusinfo" component={GeniusInfo}/>
            <Route path="/bossinfo" component={BossInfo}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route component={Dashboard} />
          </Switch>
         </div>     
      </BrowserRouter>
     </Provider>),
document.getElementById('root')
);
