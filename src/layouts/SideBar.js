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
    if(authInfo.length != 0){
        return (
            <Menu selectedKeys={props.selectedKeys} onOpenChange={props.onOpenChange} openKeys={props.openKeys} onClick={props.hanldClick}  mode="inline" theme="dark" inlineCollapsed={props.collapsed}>
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
    } else {
        return null;
    }
}


class SiderBar extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            collapsed: document.body.clientWidth <= MIN_BODY_WIDTH ? true : false,
            openKeys:[],
            selectedKeys: this.props.location.pathname,
            menuData:this.props.app.appInfo.authInfo || []
        }
    }
    
    UNSAFE_componentWillMount(){
        this.toggleEventListener();
        this.props.dispatch(appInfoAction);

    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.props.app.appInfo.authInfo !== nextProps.app.appInfo.authInfo){
            this.setState({
                menuData:nextProps.app.appInfo.authInfo
            })
            
            this.setState({openKeys :this.autoOpenKey(nextProps.app.appInfo.authInfo,this.state.selectedKeys)});
        }
        if(this.props.location.pathname !== nextProps.location.pathname){
            this.setState({
                selectedKeys:nextProps.location.pathname
            })
        }
    }

 
    onOpenChange = (openKeys) => {
        this.setState({openKeys :openKeys});
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

    autoOpenKey(menuData,currentUrl){
        let result = [];
        if(menuData instanceof Array){
            menuData.forEach((pitem,pindex) => {
                if(pitem.menus.length){
                    pitem.menus.forEach((sub_item,sub_index) => {
                        sub_item.children.forEach((ss_item,ss_index) => {
                            if(ss_item.url === currentUrl){
                                result =  ['' + pindex, pindex + '' + sub_index]
                            }
                        })
                    })
                }
            })
        }
        return result;
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
        this.props.history.push(item.key);
    }

    render(){
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
                    <MenuNode list={this.state.menuData} onOpenChange={this.onOpenChange} selectedKeys={this.state.selectedKeys} collapsed={this.state.collapsed}  openKeys={this.state.openKeys} hanldClick={this.linkTo}></MenuNode>
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