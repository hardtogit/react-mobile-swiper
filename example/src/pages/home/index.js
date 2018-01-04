/**
 * Created by xiangguo .
 * time:2018/1/4 0004.
 * email:413401168@qq.com.
 * use:auto...
 */
import React,{Component} from 'react'
import Swiper from "../../../../lib/index"
import img1 from "../../assets/img/201610310548064295.jpg"
import img2 from "../../assets/img/201711210941258146.jpg"
import img3 from "../../assets/img/201712250712192630.jpg"
require ("./index.less")
class Index extends Component{
    render(){
        return(
         <div className="swiper-contanier">
           <Swiper width={1} pagination={true} autoPlay={true} loop={true}>
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
        </div>)
    }
}
export default Index