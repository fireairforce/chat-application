// 合并所有的reducer,并且返回

import { combineReducers } from 'redux';
import { user } from './redux/user.redux';
import { chatuser } from './redux/chatuser.redux';
import { chat } from './redux/chat.redux';
//合并多个reducers
export default combineReducers({ user ,chatuser,chat});

