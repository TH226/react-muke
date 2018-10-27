import React from 'react'
// import io from 'socket.io-client'
import {List,InputItem, NavBar,Icon,Grid} from 'antd-mobile'
import {getMsgList,recvMsg,sendMsg,readMsg} from '../../redux/chat.redux'
import {connect} from 'react-redux'
import {getChatId} from '../../util'


//发起连接,链接服务器
// const socket = io('ws://localhost:9093')
@connect(
    state => state,
    {getMsgList,recvMsg,sendMsg,readMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={text:'',msg:[]}

    }
    componentDidMount(){  
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    //退出路由时调用
    componentWillUnmount(){
        //对面聊天对象的id
		const to = this.props.match.params.user
		this.props.readMsg(to)
	}
    //修正Grid组件bug
    fixCarousel(){
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
	}
    handleSubmit(){
        const from = this.props.user._id
		const to = this.props.match.params.user
		const msg = this.state.text
        this.props.sendMsg({from,to,msg})
		this.setState({
            text:'',
            showEmoji:false   //判断是否展示emoji表情
		})
    }
    render(){
        //添加emoji表情
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))
        console.log("chat-->props",this.props);
        //聊天时对面的id
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if(!users||!users[userid]){
            return null
        }
        const chatid = getChatId(userid,this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
        return(
            <div id='chat-page'>
                <NavBar 
                    mode='dark'
                    className='chat-top-bar'
                    icon={<Icon type="left" />}
					onLeftClick={()=>{
						this.props.history.goBack()
					}}
                 >
                    {/* 对方的id */}
                    {users[userid].name}
                </NavBar>
                <div className='chat-content'>
                    {chatmsgs.map(v=>{
                        //用户头像
                        const avatar = require(`../img/${users[v.from].avatar}.png`)
                        // console.log("chat-->msg",v);
                        return v.from===userid?(
                            <List key={v._id}>
                                <Item
                                    thumb={avatar}
                                >{v.content}</Item>
                            </List>
                        ):(
                            <List key={v._id}>
                                <Item 
                                   extra={<img alt='头像' src={avatar} />}
                                    className='chat-me'>{v.content}</Item>
                            </List>
                        )
                        
                    })}
                </div>
                {/* 脚部输入框 */}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight:15}}
										onClick={()=>{
											this.setState({
												showEmoji:!this.state.showEmoji
											})
											this.fixCarousel()
										}}
                                    >😃</span>
                                    <span onClick={()=>this.handleSubmit()}>发送</span>
                                </div>}
                        ></InputItem>
                    </List>
                    {this.state.showEmoji?<Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el=>{
                            this.setState({
                                text:this.state.text+el.text
                            })
                        }}
                    />
                    :null}
                </div>
            </div>
        )
    }
}
export default Chat