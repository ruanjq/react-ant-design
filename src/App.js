import React, { Component } from "react";
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import "./styles/App";

import routers from "./routes/index";

import NavBar from "./layouts/NavBar";
import SideBar from "./layouts/SideBar";
import Footer from "./layouts/Footer";
import Panel from "./layouts/Panel";
import Home from "./views/home/Home";

class App extends Component {
    
    render() {

        console.log(routers);

        // 参考 https://ant.design/components/config-provider-cn/ 配置
        let yourConfig = {
            "locale":{zhCN},
        }
        return (
            <ConfigProvider {...yourConfig}>
                <div className="left">
                    <SideBar></SideBar>
                </div>
                <div className="right">
                    <NavBar></NavBar>
                    <Panel>
                        <Switch>
                            
                            {/* 导入相关路由配置 */}
                            {routers.map((r, key) => <Route component={r.component} exact={!!r.exact} key={key} path={r.path} />)}
                        </Switch>
                    </Panel>
                    <Footer></Footer>
                </div>
            </ConfigProvider>
            
        );
    }
}

export default process.env.NODE_ENV === "development" ? hot(module)(App) : App
