/**
 * Created by Administrator on 2017/5/9.
 */
import React,{Component} from 'react'
import {Link} from 'react-router-dom'
class Index extends Component{
    render(){
        return(<div>
            <Link to='/productList'>
            我是精选
            </Link>
        </div>)
    }
}
export default Index