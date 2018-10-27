import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(
    state => state
)
class NavLinkBar extends React.Component{
    static propTypes = {
        data:PropTypes.array.isRequired
    }
    render(){
        // console.log("navlink--->props-->",this.props);
        const navList = this.props.data.filter(v=>!v.hide)
        // console.log("navlink--->props.data--->navList",navList);
        const {pathname} = this.props.location
        return(
            <TabBar>
                {navList.map(v=>(
                    // console.log("navlink--->props-->v",v)
                    <TabBar.Item
                        badge={v.path==='/msg'?this.props.chat.unread:0}
                        key={v.path}
                        title={v.text}
                        icon={{uri:require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                        selected={pathname===v.path}
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}
                    >
                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
}
export default NavLinkBar