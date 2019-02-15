import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore ,applyMiddleware,compose} from 'redux';
import { BrowserRouter, Route ,Redirect,Switch} from 'react-router-dom'
import reducers from './reducers';
import './config';
import './index.css';

import Login from './container/login';
import Register from './container/register';
import AuthRoute from './component/authroute';

const reduxDevtools  = window.devToolsExtension?window.devToolsExtension():f=>f;
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    reduxDevtools
));
// 登录页面　没有登录信息统一跳转到login

function Boss(){
   return <h2>Boss</h2>
}

ReactDom.render(
     (<Provider store={store}>
       <BrowserRouter>  
         <div>
            <AuthRoute> </AuthRoute>
            <Route path="/boss" component={Boss}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
         </div>     
      </BrowserRouter>
     </Provider>),
document.getElementById('root')
);
