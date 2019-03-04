import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore ,applyMiddleware,compose} from 'redux';
import { BrowserRouter } from 'react-router-dom'
import reducers from './reducers';
import './config';
import './index.css';
import App from './app';

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
        <App />
      </BrowserRouter>
     </Provider>),
    document.getElementById('root')
);
