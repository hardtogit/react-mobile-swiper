/**
 * Created by Administrator on 2017/5/3.
 */
import React,{Component} from 'react'
import {Router, Route, BrowserRouter, Redirect, IndexRedirect} from 'react-router-dom';
import Home from "./pages/home/index"
class Index extends Component{
    render(){
        return(
            <BrowserRouter>
                <Route path="/" component={Home}>
                </Route>
            </BrowserRouter>
        )
    }
}
export default Index