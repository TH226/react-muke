import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
    state => state
)
class Msg extends React.PureComponent{
    getLast(arr){
        //获取最后一条聊天信息
        return arr[arr.length-1]
    }
    render(){
        // console.log("msg--->props",this.props);
        if(!this.props.chat.chatmsg.length){
            return <div>暂无数据</div>
        }
        const Item = List.Item
        const Brief = Item.Brief
        //当前登录用户的id
        const userid = this.props.user._id
        //所有用户的列表
        const userinfo = this.props.chat.users
        const msgGroup = []
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        });
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last-a_last
        }) 
        console.log("msg-->chatList",chatList);
        
        
        return(
            <div>
                {chatList.map(v=>{
                    const lastItem = this.getLast(v)
                    console.log("msg-->v",v);
                    
                    //获取聊天的对象
                    const targetId = lastItem.from===userid?lastItem.to:lastItem.from
                    const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
                    console.log("msg-->targetId",targetId);
                
                    return(
                        <List>
                            <Item
                                arrow="horizontal"
                                extra={<Badge text={unreadNum}></Badge>}
                                onClick={()=>{
                                    //跳转到聊天的页面
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >
                                {lastItem.content}
                                <Brief>{userinfo[targetId].name}</Brief>
                            </Item>
                        </List>
                    )
                })}
            </div>
        )
    }
}
export default Msg