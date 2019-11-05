import React,{Component} from "react";
// import { BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";


import NavBar from "../../layouts/NavBar";
import SideBar from "../../layouts/SideBar";
import Footer from "../../layouts/Footer";
import Main from "../../layouts/Main";
import "../../styles/App";
class Home extends Component{

    constructor(props){
        super(props);
        console.log()
    }
    
    render(){
        return (
            <div className="main-content">
                <div className="left">
                    <SideBar></SideBar>
                </div>
                <div className="right">
                    <NavBar></NavBar>
                    <Main>
                        <h1>首页内容</h1>
                    </Main>
                    <Footer></Footer>
                </div>
            </div>
        )
    }
}

export default Home;