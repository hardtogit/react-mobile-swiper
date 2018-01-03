/**
 * Created by Administrator on 2017/5/8.
 */
import React,{Component} from 'react'
import propTypes from 'prop-types'
import './index.less'
class Index extends Component{
      static propTypes={
           leftDom:propTypes.element,
          leftDomStyle:propTypes.object,
           leftClick:propTypes.func,
          title:propTypes.string,
          rightDom:propTypes.element,
          rightClick:propTypes.func,
          rightDomStyle:propTypes.object,
          leftFlag:propTypes.bool,
          rightFlag:propTypes.bool,
          navStyle:propTypes.object
      };
      static defaultProps={
          leftDom:<div></div>,
          leftDomStyle:{},
          leftClick:()=>{},
          title:'头部',
          rightDom:<div></div>,
          rightClick:()=>{},
          rightDomStyle:{},
          leftFlag:true,
          rightFlag:true,
          navStyle:{}
      }
    Click=(type)=>{
        const {leftFlag,rightFlag,leftClick,rightClick}=this.props;
        if (type=='left'){
            leftClick(!leftFlag)
        }else {
            rightClick(!rightFlag)
        }
    }
      render(){
          const {title,leftDom,rightDom,navStyle}=this.props;
            return(<div className="nav_bar" style={navStyle}>
                  <div className="nav_bar_left" onClick={()=>{this.Click('left')}}>{leftDom}</div>
                <div className="nav_bar_center">{title}</div>
                <div className="nav_bar_right" onClick={()=>{this.Click('right')}}>{rightDom}</div>
            </div>)
      }
}
export default Index