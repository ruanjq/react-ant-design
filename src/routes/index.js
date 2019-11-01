import React from "react";
import {Spin} from "antd";
import Loadable from "react-loadable";

let Loading = () => <Spin/>

let routes = [
    {
        path:"/home",
        name:"home",
        exact:true,
        component:Loadable({
            loader:()=> import("../views/home/Home"),
            loading:Loading
        })
    }
]

export default routes;