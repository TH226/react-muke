import {combineReducers} from 'redux'
import { user } from './redux/user.redux'
import { chatuser } from './redux/chatuser.redux'
import {chat} from './redux/chat.redux'

//此方法用来合并多个reducer，可以同时传递多个store

export default combineReducers({user,chatuser,chat})