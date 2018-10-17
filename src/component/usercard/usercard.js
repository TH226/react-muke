import React from 'react'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'
import PropTypes from 'prop-types'

class UserCard extends React.Component{
    static propTypes = {
		userlist: PropTypes.array.isRequired
	}
    
    render(){
        const Header = Card.Header
        const Body = Card.Body
        const Footer = Card.Footer
        return (
            <WingBlank>
                <WhiteSpace/>
                {this.props.userlist.map(v=>(
                    v.avatar?(
                    <div>
                        <WhiteSpace/>
                        <Card key={v._id}>
                            <Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            >
                            </Header>
                            <Body>
                                {v.desc.split('\n').map(v=>(
                                    <div key={v}>{v}</div>
                                ))}
                            </Body>
                            {v.type==='boss'?<Footer content={v.company} extra={v.money}></Footer>:null}
                        </Card>
                    </div>
                    ):null
                ))}
            </WingBlank>
        )
    }
}
export default UserCard