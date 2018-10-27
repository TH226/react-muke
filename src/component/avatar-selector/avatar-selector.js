import React from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'
//用户信息完善的头像选择
class AvatarSelector extends React.Component{
    //属性检测，判断传递的属性类型是否正确
    static propTypes = {
        selectavatar: PropTypes.func
    }
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        const avatarList = 'bear,bird,deer,dog,dou_per,fork,glass,horse,love,owl,person'
                            .split(',')
                            .map(v=>({
                                icon:require(`../img/${v}.png`),
                                text:v
                            }))
            const grideHeader = this.state.text ? 
                                                (<div>
                                                    <span>已选择的头像</span>
                                                    <img style={{width:'20px',height:'20px'}} src={this.state.icon} alt=""/>
                                                </div>)
                                                :(<div>请选择头像</div>)
        return (
            <div>
                <List renderHeader={()=>grideHeader}>
                    <Grid data={avatarList}
                        onClick={elm=>{
                            this.setState(elm)
                            this.props.selectavatar(elm.text)
                        }}
                    />
                </List>
                
            </div>
        )
    }
}
export default AvatarSelector