/**
 * Created by Administrator on 2017/5/8.
 */
import React,{Component} from 'react'
import cns from 'classnames'
import {connect} from 'react-redux'
import {START} from '../../../action/info'
import  get from '../../../request/index'
import './index.less'
const data=(state,owen)=>({
       info:state.info.getIn([START])
})
const dispathFn=(dispath,own)=>({
       test(){
           get(dispath,{type:START,data:{a:'尼玛'}},'test');
       }
})
@connect(data,dispathFn)
class Index extends Component{
    state={
        listArry:['1'],
    }
    componentDidMount(){
        this.timeAdd();
    }
    timeAdd=()=>{
        let a=1;
        this.time=setTimeout(()=>{
            a++;
            const {listArry}=this.state;
            listArry.push(a);
            this.setState({
                listArry
            })
        },5000)
    }
    componentWillUnmount(){
        clearTimeout(this.time)
    }
    isLogon=()=>{
        sessionStorage.setItem('login',true)
    }
    unLogon=()=>{
        sessionStorage.removeItem('login')
    }
    render(){
        const {listArry}=this.state;
        const {history:{goBack},test,info}=this.props;
        return(<div>
            {info&&info.getIn(['a'])||'没有数据'}
            <div onClick={test}>点我</div>
            <div onClick={this.isLogon}>点我登录</div>
            <div onClick={this.unLogon}>点我退出</div>
            {/*<div onClick={()=>{goBack()}}>点我返回</div>*/}
            {listArry.map((item,i)=>(
                <div key={i} className={cns('list')}>{item}</div>
            ))}
        </div>)
    }
}
export default Index