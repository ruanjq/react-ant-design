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
    },{
        path:"/404",
        name:"notFound",
        component:Loadable({
            loader:()=> import("../components/404"),
            loading:Loading
        })
    }, { 
        path: '*', 
        name:'404',
        redirect: '/404',
        hidden: true
    }
]

export default routes;