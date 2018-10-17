import React from 'react'
import {NavBar, InputItem,TextareaItem ,Button,WhiteSpace} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
	state=>state.user,
	{update}
)
class GeniusInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const path = this.props.location.pathname
		const redirect = this.props.redirectTo
        return (
            <div>
                {redirect&&redirect!==path?<Redirect to='/genius'/>:null}
                <NavBar mode="dark">牛人完善信息页</NavBar>
                <AvatarSelector selectavatar = {(imagname)=>{
                    this.setState({
                        avatar:imagname
                    })
                    }}
                >
                </AvatarSelector>
                <InputItem onChange={(v)=>this.onChange('title',v)}>
                    求职岗位
                </InputItem>
                <TextareaItem  
                onChange={(v)=>this.onChange('desc',v)}
                rows={3}
                autoHeight
                title="个人简介"
                >
                </TextareaItem >
                <WhiteSpace/>
                <Button 
                    onClick={()=>{
                        this.props.update(this.state)
                    }}
                    type='primary'>保存</Button>
            </div>
        )
    }
}

export default GeniusInfo