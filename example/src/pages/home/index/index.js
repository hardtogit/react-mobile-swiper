/**
 * Created by Administrator on 2017/5/3.
 */
import React,{Component} from 'react'
import {NavLink,Redirect,Route} from 'react-router-dom'
import cn from 'classnames'
import './index.less'
import Cav from '../../components/cav/index'
import NavBar from '../../components/navBar/index'
import homeIndex from '../home/index'
import selectedIndex from '../selected/index'
import mineIndex from '../mine/index'
import findIndex from '../find/index'
import icon from '../../../img/icon.png'
import icon1 from '../../../img/icon1.png'
import icon2 from '../../../img/icon2.png'
import icon3 from '../../../img/icon3.png'
class Index extends Component{
    state={
        leftFlag:true,
        type:0,
        navBar:[{backgroundColor:'#355d7d'},{backgroundColor:'#fa8898',}],
        bodyClass:['boy','girl']
    }
    componentWillMount(){
       const {state}=this.props.location;
       if (state){
           this.setState({
               type:state
           })
       }
    }
    cavDom=(item,key)=>{
        const {type}=this.state;
        return(<NavLink key={key} className="cav_box" to={{pathname:item.path,state:type}} activeClassName='cav_box_active'>
             <img src={item.icon}/>
        </NavLink>)
    }
    cavArry=()=>{
        const Arry=[{path:'/home',icon:icon},{path:'/product',icon:icon1},{path:'/find',icon:icon2},{path:'/mine',icon:icon3}],
              cavArrys=[];
        Arry.map((item,i)=>{
            cavArrys.push(this.cavDom(item,i))
        });
        return cavArrys
    }
    barLeft=()=>{
        const {leftFlag,type}=this.state;
        let style={height:'0px'};
        let cns='';
        if (!leftFlag){
            style.height='46px'
            cns='rotate'
        }
        return(<div className="bar_left">
              <span>{type==0?'男生':'女生'}</span>
              <span className={cn('jt',cns)}></span>
              <div className="nav_choose_box" style={style}>
                  <div onClick={(e)=>{this.change(e,type)}}>{type==0?'女生':'男生'}</div>
              </div>
        </div>)
    }
    change=(e,type)=>{
        e.nativeEvent.stopImmediatePropagation();
       if (type==0){
           type=1
       }else {
           type=0
       }
       this.setState({
           type
       })
    }
    barRight=()=>{
        return <div className="bar_right">
            <span></span>
        </div>
    }
    leftClick=(flag)=>{
           this.setState({
               leftFlag:flag
           })
    }
    render(){
       const cavArry=this.cavArry();
       const {leftFlag,navBar,type,bodyClass}=this.state;
       return( <div className={cn('body','home_index',bodyClass[type])}>
           <NavBar title='精选' leftDom={this.barLeft()} rightDom={this.barRight()}
                   leftClick={(flag)=>{this.leftClick(flag)}} leftFlag={leftFlag}
                   navStyle={navBar[type]}/>
           <div className="bottom_body">
               <Route path='/' exact render={()=><Redirect to='/home'/>}/>
               <Route path='/home' exact component={homeIndex}/>
               <Route path='/product' exact component={selectedIndex}/>
               <Route path='/find' exact component={findIndex}/>
               <Route path='/mine' exact component={mineIndex}/>
           </div>
            <Cav cavDom={cavArry} cavStyle={navBar[type]}/>
       </div>)
    }
}
export default Index