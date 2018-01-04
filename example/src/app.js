/**
 * Created by Administrator on 2017/5/3.
 */
import React,{Component} from 'react'
import {Router, Route, BrowserRouter, Redirect, IndexRedirect ,history,Switch} from 'react-router-dom';
import Home from "./pages/home/index"
import One from "./pages/one/index"
import Two from "./pages/two/index"
import Three from "./pages/three/index"
import Four from "./pages/four/index"
import Five from "./pages/five/index"
class Index extends Component{
    render(){
        return(
            <BrowserRouter history={history}>
                <Switch>
                <Route path="/home" component={Home}> </Route>
                <Route  path="/example/one" component={One}/>
                    <Route  path="/example/two" component={Two}/>
                    <Route  path="/example/three" component={Three}/>
                    <Route  path="/example/four" component={Four}/>
                    <Route  path="/example/five" component={Five}/>
                    <Redirect from="*" to="/home"></Redirect>
                </Switch>
            </BrowserRouter>
        )
    }
}
export default Index