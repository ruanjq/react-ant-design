


import React,{Component} from "react";
import {Route, Switch,Redirect} from "react-router-dom";
import { Breadcrumb } from 'antd';
import { is } from 'immutable';
import routers from "../routes/index";

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Footer from "./Footer";
import "../styles/App";
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
        console.log("matchPath",matchPath)
        return (
            <div className="main-content">
                <div className="left">
                    <SideBar></SideBar>
                </div>
                <div className="right">
                    <NavBar></NavBar>
                    <div className="main-wrapper">
                        <Breadcrumb>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>
                            <a href="/">Application Center</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                            <a href="/">Application List</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>An Application</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="main-body">
                            {
                                routers.map((r, key) => {
                                    if(r.path === matchPath && r.childRoutes){
                                        return <div key={key}>
                                            {
                                                r.childRoutes.map((child_r,child_key) =>{
                                                    return <Route component={child_r.component} exact={!!child_r.exact} key={child_key} path={matchPath + ""+child_r.path} />;
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