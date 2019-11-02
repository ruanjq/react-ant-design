import React from "react";
import { Breadcrumb } from 'antd';


class Main extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="main-wrapper">
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <a href="">Application Center</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    <a href="">Application List</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>
                <div className="main-body">
                    {this.props.children}
                </div>
                
            </div>
        )
    }
}

export default Main;