/**
 * Created by Administrator on 2017/5/25.
 */
import React,{Component} from 'react'
import propTypes from 'prop-types'
import Img from './img/test.png'
import './index.less'
class Index extends Component{
    static propTypes={
        imgUrl:propTypes.string,
        centerX:propTypes.number,
        centerY:propTypes.number,
        radius:propTypes.number
    }
    static defaultProps={
        imgUrl:Img,
        centerX:150,
        centerY:110,
        radius:10
    }
    componentWillMount(){
        this.refDoms={};
    }
     componentDidMount(){
        if (this.can){
            const {imgUrl}=this.props;
            const cxt=this.can.getContext('2d'),
                   img=new Image();
                   img.src=imgUrl;
                   this.cxt=cxt;
                   img.onload=()=>{
                         const height=200/(img.width/img.height);
                          this.drawImage(img,200,height);
                          this.square();
                          this.circular();
                          this.puzzle();
                          this.eventListener();
                   }
        }
     }
    eventListener=()=>{
       const top=this.refDoms.slideVerification.offsetTop;
         const btnTop=this.refDoms.btnDrag.offsetTop;
         const allTop=top+btnTop;
         const {btnDrag,tuBox}=this.refDoms;
         let StartY,cjY,wyY;
         btnDrag.addEventListener('touchstart',(e)=>{
           if (e.targetTouches.length == 1){
               const touch=e.targetTouches[0];
               StartY=touch.clientY;
               cjY=50-(StartY-allTop);
           }
         })
        btnDrag.addEventListener('touchmove',(e)=>{
            if (e.targetTouches.length == 1){
                    const touch=e.targetTouches[0],
                       moveY=touch.clientY;
                       if(moveY>StartY&&moveY<allTop+302-cjY-3){
                     wyY=parseInt(moveY)-parseInt(StartY);
                    btnDrag.style.transform='translate3D(0px,'+wyY+'px,0px)'
                    tuBox.style.transform='translate3D(0px,'+wyY+'px,0px)'
                    }
            }
        })
        btnDrag.addEventListener('touchend',(e)=>{
            const {centerY}=this.props;
            if (parseInt(centerY)-20-5<wyY&&parseInt(centerY)-20+5>wyY){
                const yw=centerY-20;
                tuBox.style.transform='translate3D(0px,'+yw+'px,0px)'
                alert('验证成功')
            }else {
                tuBox.style.transform='translate3D(0px,0px,0px)';
                btnDrag.style.transform='translate3D(0px,0px,0px)';
                alert('失败')
            }
        })
    }
    canEnd=(e)=>{
        this.can=e;
    }
    drawImage=(img,width,height)=>{
         const {can,cxt}=this;
              can.width=width;
              can.height=height;
              cxt.drawImage(img,0,0,width,height)
    }
    square=()=>{
         const {centerX,centerY}=this.props
        const pageX=centerX-20;
        const pageY=centerY-20;
        this.cxt.clearRect(pageX,pageY,40,40)
    }
    circular=()=>{
        const {centerX,centerY,radius}=this.props
        const pageX=centerX-20;
        const pageY=centerY;
        this.cxt.save();
        this.cxt.beginPath();
        this.cxt.arc(pageX, pageY, radius, 0, 2 * Math.PI, false);
        this.cxt.strokeStyle ='transparent'
        this.cxt.clip();
        this.cxt.clearRect(pageX - radius - 1, pageY - radius - 1,
            radius * 2 + 2, radius * 2 + 2);
        this.cxt.stroke();
        this.cxt.closePath();
        this.cxt.restore();
    };
    puzzle=()=>{
        const {centerX,centerY,radius}=this.props;
        const {square,circular,tuBox}=this.refDoms;
        const posX=-(parseInt(centerX)-20),
            posY=-(parseInt(centerY)-20),
            cirW=radius*2+2,
            cirL=parseInt(posX)+11,
            cirY=parseInt(posY)-11;
         this.setStyle(square,{width:'40px',height:'40px',background:'url('+Img+')',backgroundPosition:''+posX+'px '+posY+'px',backgroundSize:'200px 300px'})
        this.setStyle(circular,{width:''+cirW+'px',height:''+cirW+'px',background:'url('+Img+')',
            backgroundPosition:''+cirL+'px '+cirY+'px',backgroundSize:'200px 300px'
        ,top:'10px',left:'-11px'})
        this.setStyle(tuBox,{left:-posX+'px'})

    }
    setStyle=(dom,obj)=>{
        for (var i in obj){
            dom.style[i]=obj[i]
        }
    }
    refDom=(obj)=> {
        this.refDoms=Object.assign(this.refDoms,obj)
    }
    render(){
           return(<div className="slide_verification"  ref={(e)=>{this.refDom({'slideVerification':e})}}>
               <div className="can_box">
              <canvas ref={this.canEnd}></canvas>
                   <div className="tu_box" ref={(e)=>{this.refDom({'tuBox':e})}}>
                       <div className="square" ref={(e)=>{this.refDom({'square':e})}}></div>
                       <div className="circular" ref={(e)=>{this.refDom({'circular':e})}}></div>
                   </div>
                   <div className="scroll">
                       <div className="btn_drag" ref={(e)=>{this.refDom({'btnDrag':e})}}></div>
                   </div>
               </div>
           </div>)
    }
}

export default Index