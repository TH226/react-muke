import React from 'react'
import {NavBar, InputItem,TextareaItem ,Button,WhiteSpace} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {update}
)
class BossInfo extends React.Component{
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
        console.log(path);
        
        return (
            <div>
                {redirect?<Redirect to='/boss'/>:null}
                 <NavBar mode="dark">BOSS完善信息页面</NavBar>
                 <AvatarSelector selectavatar = {(imagname)=>{
                     this.setState({
                         avatar:imagname
                     })
                    }}
                 >
                 </AvatarSelector>
                 <InputItem onChange={(v)=>this.onChange('title',v)}>
                    招聘职位
                 </InputItem>
                 <InputItem onChange={(v)=>this.onChange('company',v)}>
                    公司名称
                 </InputItem>
                 <InputItem onChange={(v)=>this.onChange('money',v)}>
                    职位薪资
                 </InputItem>
                 <TextareaItem  
                 onChange={(v)=>this.onChange('desc',v)}
                 rows={3}
                 title="职位要求"
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

export default BossInfo