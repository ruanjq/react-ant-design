import React from "react";
import {connect} from "react-redux";
import { is } from 'immutable';
import { Select, Menu, Dropdown, Icon} from 'antd';
import {logout} from "../service/user";
const { Option } = Select;


const menuOnClick = ({ key }) =>{
    switch(key){
        case "logout":
            logout();
            break;
        default:
            break;
    }
}

const menu = (
    <Menu onClick={menuOnClick}>
        <Menu.Item key="home">
            <a rel="noopener noreferrer" href="/"><Icon type="home" />&nbsp;&nbsp;首 页
            </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item  key="logout">
            <span  onClick={e => e.preventDefault()}><Icon type="poweroff" />退出登录</span>
        </Menu.Item>
    </Menu>
  );
  

class NavBar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentSite: 'ZF',
        }
    }
    
    shouldComponentUpdate(nextProps, nextState){
        return !(this.props === nextProps || is(this.props, nextProps)) ||
             !(this.state === nextState || is(this.state, nextState));
    }
    

    handleChange = e => {
        this.setState({
            currentSite: e.key,
        });
    }

    render() {
        let userName = "";
        let siteinfo = this.props.app.appInfo.siteinfo || [];
        let {userinfo} = this.props.app.appInfo;
        if(userinfo){
            userName = userinfo.real_name;
        }
        if(siteinfo.length > 0){
            this.state.currentSite = siteinfo[0].site
        }
        return (
            <div className="nav-bar-wrapper clearfix">
                <span className="text">站点:</span>
                <div className="site-menu">
                    <Select defaultValue={this.state.currentSite} style={{ width: 150 }} onChange={this.handleChange}>
                        {
                            siteinfo.map((item,index) =>{
                                return <Option key={item.site} value={item.site}>{item.name}</Option>
                            })
                        }
                    </Select>
                </div>
                <div className="fr cursor-pointer">
                    <Dropdown overlay={menu} placement="bottomRight">
                        <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        欢迎:{userName}&nbsp;<Icon type="down" />
                        </span>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        app:state.app
    }
}

export default connect(mapStateToProps)(NavBar);