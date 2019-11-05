import React from "react";
import {connect} from "react-redux";
import { Menu, Icon, Button } from 'antd';
import {withRouter} from "react-router-dom";
import tools from "../modules/tools";
import {appInfoAction} from "../redux/actions/app_action";
const { SubMenu } = Menu;

 
const MIN_BODY_WIDTH = 1366;


class SiderBar extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            collapsed: document.body.clientWidth <= MIN_BODY_WIDTH ? true : false,
        }
        
    }
    
    UNSAFE_componentWillMount(){
        this.toggleEventListener();
        this.props.dispatch(appInfoAction);

    }

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
        console.log(item);
        console.log(this.props);
        this.props.history.push(item.key);
    }

    render(){

        let {authInfo} = this.props.app.appInfo;
        let MenuNode = null;
        let defaultKey = "/goodsPrice/index";
        if(authInfo instanceof Array){
            MenuNode = authInfo.map((pitem,pindex) => {
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
                                                        if(defaultKey === ""){
                                                            defaultKey = sub_item.url;
                                                        }
                                                        return (
                                                            <Menu.Item key={ss_item.url}>{ss_item.name}</Menu.Item>
                                                        )
                                                    })
                                                }
                                            </SubMenu>
                                        )
                                        
                                    }else{
                                        if(defaultKey === ""){
                                            defaultKey = sub_item.url;
                                        }
                                        return (<Menu.Item key={sub_item.url}>{sub_item.name}</Menu.Item>)
                                    }
                                })
                            }
                        </SubMenu>
                    )
                }else{
                    if(defaultKey === ""){
                        defaultKey = pitem.url;
                    }
                    return (
                        <Menu.Item key={pitem.url}>
                            <Icon type="inbox" />
                            <span>{pitem.name}</span>
                        </Menu.Item>
                    )
                }
                
            });
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
                     
                     <Menu defaultSelectedKeys={defaultKey} defaultOpenKeys={this.state.collapsed ? '' : ['0','00']} onClick={this.linkTo}  mode="inline" theme="dark" inlineCollapsed={this.state.collapsed}>
                        {MenuNode}
                    </Menu> 
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