import React from "react";
import {Spin} from "antd";
import Loadable from "react-loadable";


let Loading = () => <Spin/>

let routes = [
    {
        path:"/",
        name:"home",
        exact:true,
        component:Loadable({
            loader:()=> import("../views/home/home"),
            loading:Loading
        })
    },{
        path:"/home",
        name:"home",
        component:Loadable({
            loader:()=> import("../views/home/home"),
            loading:Loading
        })
    },{
        path:"/404",
        name:"notFound",
        component:Loadable({
            loader:()=> import("../components/404"),
            loading:Loading
        })
    }
]

export default routes;