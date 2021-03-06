


import React,{Component} from "react";
import {Route, Switch,Redirect,Link} from "react-router-dom";
import { Breadcrumb } from 'antd';
import { is } from 'immutable';
import routers from "../routes/index";

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import "../styles/App";



const RenderBreadcrumb = (props) =>{
    console.log(props);
    return (
        <Breadcrumb>
        {
            routers.map((r,key) => {
                if(r.path === props.matchPath && r.childRoutes){
                    return (
                        <Breadcrumb.Item key={key}><Link to={r.path + "/index"}>{r.breadcrumbName}</Link></Breadcrumb.Item>
                    )
                } else if(r.path === props.matchPath){
                    return (
                        <Breadcrumb.Item key={key}>{r.breadcrumbName}</Breadcrumb.Item>
                    )
                }
            })
        }
        {
            routers.map((r,key) => {
                if(r.path === props.matchPath && r.childRoutes){
                    return r.childRoutes.map((child_r,child_key) =>{
                        if(r.path + "" + child_r.path === props.pathName){
                            return <Breadcrumb.Item key={child_key}>{child_r.breadcrumbName}</Breadcrumb.Item>
                        }
                    })
                }
            })
        }
        </Breadcrumb>
    )
}

class Main extends Component{

    constructor(props){
        super(props);
       
    }

    shouldComponentUpdate(nextProps, nextState){
        return !(this.props === nextProps || is(this.props, nextProps)) ||
             !(this.state === nextState || is(this.state, nextState));
    }
    
    render(){
        let matchPath = this.props.match.path;
        let pathName = this.props.location.pathname;
        console.log("matchPath",this.props)
        return (
            <div className="main-content">
                <div className="left">
                    <SideBar></SideBar>
                </div>
                <div className="right">
                    <NavBar></NavBar>
                    <div className="main-wrapper">
                        <RenderBreadcrumb pathName={pathName} matchPath={matchPath} />
                        
                        <div className="main-body">
                            {
                                routers.map((r, key) => {
                                    if(r.path === matchPath && r.childRoutes){
                                        return <div key={key}>
                                            {
                                                r.childRoutes.map((child_r,child_key) =>{
                                                    return <Route name={r.name +""+child_r.name} breadcrumbName={child_r.breadcrumbName} component={child_r.component} exact={!!child_r.exact} key={child_key} path={matchPath + ""+child_r.path} />;
                                                })
                                            }
                                            {/* // 如果匹配不到默认重定向到index 这个路由 */}
                                            <Redirect exact from={r.path} to={r.path + "/index"}/>
                                        </div>
                                    } 
                                })
                            }
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        )
    }
}

export default Main;