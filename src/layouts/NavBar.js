import React from "react";
import {connect} from "react-redux";
import { is } from 'immutable';
import { Select, Menu, Dropdown, Icon} from 'antd';

import {getSiteAction,setSiteAction} from "../redux/actions/app_action";

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
        this.props.dispatch(getSiteAction());
        this.state = {
            currentSite: '',
            siteinfo:[],
            userinfo:{}
        }
    }
    
    UNSAFE_shouldComponentUpdate(nextProps, nextState){
        return !(this.props === nextProps || is(this.props, nextProps)) ||
             !(this.state === nextState || is(this.state, nextState));
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
        let currentInfo = nextProps.app.appInfo;
        if(this.props.app.appInfo !== currentInfo){
            this.setState({
                userinfo:currentInfo.userinfo,
                siteinfo:currentInfo.siteinfo
            })
        }
        if(this.props.app.site !== nextProps.app.site){
            this.setState({
                currentSite:nextProps.app.site,
            })
        }
    }

    handleChange = e => {
        if(e !== this.state.currentSite){
            this.setState({
                currentSite: e,
            });
            this.props.dispatch(setSiteAction(e));
            // 切换站点重新刷新页面
            window.location.reload();
        }
    }

    render() {
        return (
            <div className="nav-bar-wrapper clearfix">
                <span className="text">站点:</span>
                <div className="site-menu">
                    <Select value={this.state.currentSite} style={{ width: 150 }} onChange={this.handleChange}>
                        {
                            this.state.siteinfo.map((item,index) =>{
                                return <Option key={item.site} value={item.site}>{item.name}</Option>
                            })
                        }
                    </Select>
                </div>
                <div className="fr cursor-pointer">
                    <Dropdown overlay={menu} placement="bottomRight">
                        <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        欢迎:{this.state.userinfo.real_name}&nbsp;<Icon type="down" />
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