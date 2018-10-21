import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import '../../index.css'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
    state => state.user,
    {register}
)
@imoocForm
class Register extends React.Component{
    constructor(props){
        super(props);
        this.handleRegister = this.handleRegister.bind(this)
        this.login = this.login.bind(this);
    }
    login(){
        this.props.history.push('/login')
    }
    componentDidMount(){
		this.props.handleChange('type','genius')
	}
    handleRegister(){
        this.props.register(this.props.state)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                        <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
                        <InputItem onChange={v=>this.props.handleChange('pwd',v)} type="password">密码</InputItem>
                        <InputItem onChange={v=>this.props.handleChange('repeatpwd',v)} type="password">确认密码</InputItem>
                        <RadioItem onChange={()=>this.props.handleChange('type','genius')} checked={this.props.state.type==='genius'}>
                            牛人
                        </RadioItem>
                        <RadioItem onChange={()=>this.props.handleChange('type','boss')} checked={this.props.state.type==='boss'}>
                            boss
                        </RadioItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.login}>登录</Button>
                    <WhiteSpace/>
                </WingBlank>
            </div>
        )
    }
}

export default Register