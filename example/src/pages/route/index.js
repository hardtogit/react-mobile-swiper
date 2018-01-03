/**
 * Created by Administrator on 2017/5/3.
 */
import React,{Component} from 'react'
import homeIndex from '../home/index/index'
import product from 'bundle-loader?lazy!../product/index'
import login from '../login/index'
import {Route,Redirect} from 'react-router-dom'
import Bundle from '../bundle'
const Product=(props)=>(
    <Bundle load={product}>
        {(Product)=><Product {...props}/>}
    </Bundle>
)
const route=[{
    path:'/',
    exact:true,
    isLogin:false,
    component:homeIndex
},{
    path:'/home',
    exact:true,
    isLogin:false,
    component:homeIndex
},{
    path:'/product',
    exact:true,
    isLogin:false,
    component:homeIndex
},{
    path:'/find',
    exact:true,
    isLogin:false,
    component:homeIndex
},{
    path:'/mine',
    exact:true,
    isLogin:false,
    component:homeIndex
},{
    path:'/productList',
    exact:true,
    isLogin:true,
    component:Product
},{
    path:'/login',
    exact:true,
    isLogin:false,
    component:login
}];
class RouteComponent extends Component{
    render(){
        return(
            <div>
            {route.map((route,i)=>(
                <Route key={i} path={route.path} exact={route.exact} render={(props)=>{
                    const RouteComponet=route.component;
                    if (route.isLogin){
                        const login=sessionStorage.getItem('login');
                        if (login===null){
                            return <Redirect to="/login"/>
                        }
                        return  <RouteComponet {...props}/>;
                    }else {
                        return  <RouteComponet {...props}/>;
                    }
                }}/>
            ))}
            </div>
        )
    }
}
export default RouteComponent