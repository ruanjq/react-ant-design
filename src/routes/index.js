import React from "react";
import {Spin} from "antd";
import Loadable from "react-loadable";



let Loading = () => <Spin/>

let routes = [
    {
        path:"/",
        name:"首页",
        exact:true,
        component:Loadable({
            loader:()=> import("../views/home/Home"),
            loading:Loading
        })
    },{
        path:"/home",
        name:"首页",
        component:Loadable({
            loader:()=> import("../views/home/Home"),
            loading:Loading
        })
    }
]

export default routes;