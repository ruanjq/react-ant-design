import React, { Component } from "react";
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from "react-redux";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import "./styles/App";

import routers from "./routes/index";
import NavBar from "./layouts/NavBar";
import SideBar from "./layouts/SideBar";
import Footer from "./layouts/Footer";
import Main from "./layouts/Main";

import store from "./redux/store";


class App extends Component {
    
    render() {
        // 参考 https://ant.design/components/config-provider-cn/ 配置
        let yourConfig = {
            "locale":{zhCN},
        }
        return (
            // 通过provide把redux和react连接, store 传递到react 项目中
            <Provider store={store}>
                <ConfigProvider {...yourConfig}>
                    <Router> 
                        <div className="left">
                            <SideBar></SideBar>
                        </div>
                        <div className="right">
                            <NavBar></NavBar>
                            <Main>
                                <Switch>
                                    {/* 导入相关路由配置 */}
                                    {routers.map((r, key) => <Route component={r.component} exact={!!r.exact} key={key} path={r.path} />)}
                                </Switch>
                            </Main>
                            <Footer></Footer>
                        </div>
                    </Router>
                </ConfigProvider>
            </Provider>
        );
    }
}

export default process.env.NODE_ENV === "development" ? hot(module)(App) : App
