import React from "react";
import {Spin} from "antd";
import Loadable from "react-loadable";


let Loading = () => <Spin/>

let routes = [
    {
        path:"/app",
        name:"app",
        breadcrumbName:"",
        component:Loadable({
            loader:()=> import("../layouts/Main"),
            loading:Loading
        }),
        childRoutes:[
            {
                path:"/index",
                name:"index",
                breadcrumbName:"",
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
        breadcrumbName:"库存管理",
        component:Loadable({
            loader:()=> import("../layouts/Main"),
            loading:Loading
        }),
        childRoutes:[
            {
                path:"/index",
                name:"indexList",
                breadcrumbName:"实时库存查询",
                component:Loadable({
                    loader:()=> import("../views/stock/Index"),
                    loading:Loading
                })
            },{
                path:"/ruleList",
                name:"ruleList",
                breadcrumbName:"库存配置规则列表",
                component:Loadable({
                    loader:()=> import("../views/stock/RuleList"),
                    loading:Loading
                })
            },{
                path:"/stockList",
                name:"stockList",
                breadcrumbName:"商品库存列表",
                component:Loadable({
                    loader:()=> import("../views/stock/StockList"),
                    loading:Loading
                })
            },{
                path:"/validList",
                name:"validList",
                breadcrumbName:"库存配置生效列表",
                component:Loadable({
                    loader:()=> import("../views/stock/ValidList"),
                    loading:Loading
                })
            }
        ]
    },{
        path:"/stockwhite",
        name:"stockwhite",
        breadcrumbName:"虚库白名单",
        component:Loadable({
            loader:()=> import("../layouts/Main"),
            loading:Loading
        }),
        childRoutes:[
            {
                path:"/index",
                name:"index",
                breadcrumbName:"虚库白名单列表",
                component:Loadable({
                    loader:()=> import("../views/stock/WhiteList"),
                    loading:Loading
                })
            }
        ]
    }
]

export default routes;