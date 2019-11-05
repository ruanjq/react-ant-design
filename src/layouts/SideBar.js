import React from "react";
import {connect} from "react-redux";
import { Menu, Icon, Button } from 'antd';
import {withRouter} from "react-router-dom";
import tools from "../modules/tools";
import {appInfoAction} from "../redux/actions/app_action";
const { SubMenu } = Menu;

 
const MIN_BODY_WIDTH = 100;



const MenuNode = (props) =>{
    let authInfo = props.list || [];
    return (
        <Menu defaultSelectedKeys={props.defaultKey} openKeys={props.openKeys} onClick={props.hanldClick}  mode="inline" theme="dark" inlineCollapsed={props.collapsed}>
            {
            authInfo.map((pitem,pindex) => {
                if(pitem.menus.length){
                    return (
                        <SubMenu key={pindex}
                            title={
                                <span>
                                    <Icon type="appstore" />
                                    <span>{pitem.name}</span>
                                </span>
                            }
                        >
                            {
                            pitem.menus.map((sub_item,sub_index) => {
                                
                                if(sub_item.children.length){
                                    
                                    return (
                                        <SubMenu key={pindex + "" + sub_index} title={ <span>{sub_item.name} </span> } >
                                            {
                                                sub_item.children.map((ss_item,ss_index) => {
                                                    return (
                                                        <Menu.Item key={ss_item.url}>{ss_item.name}</Menu.Item>
                                                    )
                                                })
                                            }
                                        </SubMenu>
                                    )
                                    
                                }else{
                                    
                                    return (<Menu.Item key={sub_item.url}>{sub_item.name}</Menu.Item>)
                                }
                            })
                            }
                        </SubMenu>
                    )
                }else{
                    return (
                        <Menu.Item key={pitem.url}>
                            <Icon type="inbox" />
                            <span>{pitem.name}</span>
                        </Menu.Item>
                    )
                }
                
            })
            }
        </Menu>
    )
}


class SiderBar extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            collapsed: document.body.clientWidth <= MIN_BODY_WIDTH ? true : false
        }
        
    }
    
    UNSAFE_componentWillMount(){
        this.toggleEventListener();
        this.props.dispatch(appInfoAction);

    }


    

    // componentDidUpdate(){
    //      
    // }

    toggleEventListener(){
        let _self = this;
        window.addEventListener("resize",tools.throllte(function(e){
            if(document.body.clientWidth <= MIN_BODY_WIDTH){
                _self.closeCollapsed();
            } else {
                _self.openCollapsed();
            }
        },300));
    }

    openCollapsed() {
        this.setState({
            collapsed: false,
        });
        
    }

    closeCollapsed = () => {
        this.setState({
            collapsed: true,
        });
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    
    linkTo = (item) =>{
        this.props.history.push(item.key);
    }

    render(){
        let {authInfo} = this.props.app.appInfo;
        let defaultKey = this.props.location.pathname;
        let openKeys = [];
        
        if(authInfo instanceof Array){
            authInfo.forEach((pitem,pindex) => {
                if(pitem.menus.length){
                    pitem.menus.forEach((sub_item,sub_index) => {
                        sub_item.children.forEach((ss_item,ss_index) => {
                            if(ss_item.url === defaultKey){
                                openKeys = ['' + pindex, pindex + '' + sub_index]
                            }
                        })
                    })
                }
            })
        }

        return (
            <div className={`sider-bar-wrapper ${!this.state.collapsed ? "sider-bar-open":"sider-bar-close"}`} >
                <Button type="primary" className="collapsed-sidebar" onClick={this.toggleCollapsed}>
                <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                <div className="logo">
                    <a href="/">
                        <Icon type="shop" />
                        <span className={this.state.collapsed ? 'hidden':''}>Admin Stock</span>
                    </a>
                </div>
                <div className="menu-box">
                    <MenuNode list={authInfo} defaultKey={defaultKey} openKeys={openKeys} hanldClick={this.linkTo}></MenuNode>
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


// 通过connect连接组件和redux数据和dispatch方法
export default withRouter(connect(mapStateToProps)(SiderBar));