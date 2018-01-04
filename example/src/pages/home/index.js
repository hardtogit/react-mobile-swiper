/**
 * Created by xiangguo .
 * time:2018/1/4 0004.
 * email:413401168@qq.com.
 * use:auto...
 */
import React,{Component} from 'react'
import Swiper from "react-mobile-swiper"
import img1 from "../../assets/img/201610310548064295.jpg"
import img2 from "../../assets/img/201711210941258146.jpg"
import img3 from "../../assets/img/201712250712192630.jpg"
require ("./index.less")
class Index extends Component{
    go=(page)=>{
        switch (page){
            case 1:
                this.props.history.push("example/one")
                break;
            case 2:
                this.props.history.push("example/two")
                break;
            case 3:
                this.props.history.push("example/three")
                break;
            case 4:
                this.props.history.push("example/four")
                break;
            case 5:
                this.props.history.push("example/five")
                break;
            default:
                this.props.history.push("example/one")
                break
        }

    }
    render(){
        return(
         <div className="swiper-contanier">
             <Swiper>
                 <div>
                     <img className="item" src={img1} alt=""/>
                 </div>
                 <div>
                     <img className="item" src={img2} alt=""/>
                 </div>
                 <div>
                     <img className="item" src={img3} alt=""/>
                 </div>
             </Swiper>
            <div className="title">默认</div>
            <div className="title" onClick={()=>{this.go(1)}}>不带pagination <span className="arrow"></span> </div>
            <div className="title" onClick={()=>{this.go(2)}}>循环<span className="arrow"></span> </div>
            <div className="title" onClick={()=>{this.go(3)}}>自动播放<span className="arrow"></span> </div>
            <div className="title" onClick={()=>{this.go(4)}}>自定义slider宽度<span className="arrow"></span> </div>
            <div className="title" onClick={()=>{this.go(5)}}>卡片式轮播<span className="arrow"></span> </div>
        </div>

        )
    }
}
export default Index