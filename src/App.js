import React, { Component } from "react";
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch,Redirect,Lifecycle } from "react-router-dom";
import {Provider} from "react-redux";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import routers from "./routes/index";
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
                        <Switch>
                            {/* 导入相关路由配置 */}
                            {routers.map((r, key) => <Route name={r.name} breadcrumbName={r.breadcrumbName} component={r.component} exact={!!r.exact} key={key} path={r.path} />)}
                            <Redirect exact from='/' to='/app/index' />
                            <Redirect from='*' to='/404' />
                        </Switch>
                    </Router>
                </ConfigProvider>
            </Provider>
        );
    }
}

export default process.env.NODE_ENV === "development" ? hot(module)(App) : App
