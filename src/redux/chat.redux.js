import axios from 'axios'
import io from 'socket.io-client'
//连接数据库
const socket = io('ws://localhost:9093')

//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg:[],
    // users:{},
    unread:0
}

export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            //未读过滤条件，接收方为当前登录用户
            return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.userid).length}
        case MSG_RECV:
            //当接收信息的时候，判断当前信息发送到的对象是否是当前用户，是当前用户的话未读数+1，否则不加
            const n = action.payload.to === action.userid?1:0
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
        case MSG_READ:
            const {from,num} = action.payload
            return {...state,chatmsg:state.chatmsg.map(v=>({...v,read:from==v.from?true:v.read})),unread:state.unread-num}
        default:
            return state
    }
}

function msgList(msgs,users,userid){
    return {type:MSG_LIST,payload:{msgs,users,userid}}
}

//接收消息
function msgRecv(msg,userid){
	return {type:MSG_RECV, payload:msg,userid}
}

function msgRead({from,userid,num}){
    return {type:MSG_READ,payload:{from,userid,num}}
}

export function readMsg(from){
    return (dispatch,getState)=>{
        axios.post('/user/readmsg',{from})
            .then(res=>{
                console.log("chat.redux-->res",res);
                
                const userid = getState().user._id
                if(res.status===200 && res.data.code===0){
                    dispatch(msgRead({userid,from,num:res.data.num}))
                }
            })
    }
}

//获取聊天信息列表
export function getMsgList(){
    //getState参数可以获取当前redux中的所有信息
    return (dispatch,getState)=>{
        axios.get('/user/getmsgList')
                .then(res=>{
                    if(res.status===200 && res.data.code===0){
                        // console.log("caht.redux.js--->getMsgList-->state",getState())
                        // console.log("caht.redux.js--->getMsgList-->res",res)
                        //当前登录用户
                        const userid = getState().user._id
                        dispatch(msgList(res.data.msgs,res.data.users,userid))
                    }
                })
    }
}
//接收消息
export function recvMsg(){
    return (dispatch,getState)=>{
        socket.on('recvmsg',function(data){
            // console.log('recvmsg',data);
            const userid = getState().user._id
            dispatch(msgRecv(data,userid))
        })
    }
}
//发送消息
export function sendMsg({from ,to ,msg}){
	return dispatch=>{
		socket.emit('sendmsg',{from ,to ,msg})
	}
	
}