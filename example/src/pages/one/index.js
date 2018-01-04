/**
 * author:XR
 * email:413401168@qq.com
 * Time: 2018/1/4 22:15
 */
import React,{Component} from "react"
import Swiper from "react-mobile-swiper"
import NavBar from "../../component/navBar"
import img1 from "../../assets/img/201610310548064295.jpg"
import img2 from "../../assets/img/201711210941258146.jpg"
import img3 from "../../assets/img/201712250712192630.jpg"
class Index extends Component{
    render(){
        return(
            <div className="eg-conteiner">
                <NavBar title="不带pagination" {...this.props}></NavBar>
                <Swiper pagination={false}>
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
            </div>
        )
    }
}
export default Index