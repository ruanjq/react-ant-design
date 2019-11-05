import React from "react";
import {Spin} from "antd";
import Loadable from "react-loadable";


let Loading = () => <Spin/>

let routes = [
    {
        path:"/",
        exact:true,
        name:"home",
        component:Loadable({
            loader:()=> import("../layouts/Main"),
            loading:Loading
        }),
        childRoutes:[
            {
                path:"/index",
                name:"index",
                component:Loadable({
                    loader:()=> import("../views/home/Home"),
                    loading:Loading
                })
            } 
        ]
    },{
        path:"/404",
        name:"notFound",
        component:Loadable({
            loader:()=> import("../components/404"),
            loading:Loading
        })
    },{
        path:"/stock",
        component:Loadable({
            loader:()=> import("../layouts/Main"),
            loading:Loading
        }),
        childRoutes:[
            {
                path:"/index",
                name:"indexList",
                component:Loadable({
                    loader:()=> import("../views/stock/Index"),
                    loading:Loading
                })
            },{
                path:"/ruleList",
                name:"ruleList",
                component:Loadable({
                    loader:()=> import("../views/stock/RuleList"),
                    loading:Loading
                })
            },{
                path:"/stockList",
                name:"stockList",
                component:Loadable({
                    loader:()=> import("../views/stock/StockList"),
                    loading:Loading
                })
            },{
                path:"/ruleList",
                name:"ruleList",
                component:Loadable({
                    loader:()=> import("../views/stock/RuleList"),
                    loading:Loading
                })
            },{
                path:"/validList",
                name:"validList",
                component:Loadable({
                    loader:()=> import("../views/stock/ValidList"),
                    loading:Loading
                })
            }
        ]
    },{
        path:"/stockwhite",
        component:Loadable({
            loader:()=> import("../layouts/Main"),
            loading:Loading
        }),
        childRoutes:[
            {
                path:"/index",
                name:"index",
                component:Loadable({
                    loader:()=> import("../views/stock/WhiteList"),
                    loading:Loading
                })
            }
        ]
    }
]

export default routes;