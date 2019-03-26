/**
 * Created by XR on 2017/12/21 0021.
 * Use auto
 * email 413401168@qq.com
 */
/**
 * Created by xiangguo .
 * time:2017/12/18 0020.
 * email:413401168@qq.com.
 * use:auto...
 */
import React,{Component} from 'react'
import * as styles from "./style"
import PropTypes from 'prop-types'
import cn from 'classnames'
class Index extends Component{
    static propTypes= {
        index:PropTypes.number,  //初始值
        duration:PropTypes.number, //动画完成周期
        distance:PropTypes.number,  //触发的距离
        loop:PropTypes.bool,  //是否循环播放
        width:PropTypes.number, //0~1,1表示100%
        autoPlay:PropTypes.bool, //是否自动播放
        interval:PropTypes.number,  //轮播间隔秒数
        type:PropTypes.string, //轮播类型 default 默认   card 卡片轮播
        pagination:PropTypes.bool//是否显示分页
    };
    static defaultProps={
        index:0,
        duration:0.5,
        distance:1000,
        loop:false,
        width:1,
        autoPlay:false,
        interval:3000,
        type:'card',
        pagination:true,
    };
    constructor(props) {
        super(props);
        // this.state = {
        //     styles:{
        //         translateX:this.props.loop&&-(this.props.index+this.props.children.length)*this.clientWidth*(this.props.width+(1-this.props.width)/4)+this.clientWidth*(1-this.props.width)/4||-this.props.index*this.clientWidth*(this.props.width+(1-this.props.width)/4)+this.clientWidth*(1-this.props.width)/4,
        //         duration:this.props.duration,
        //
        //     },
        //     index:this.props.loop&&this.props.index+this.props.children.length||this.props.index
        // }
        this.state={
            styles:{
                duration:this.props.duration,
            },
            progress:0,
            index:this.props.loop&&this.props.index+this.props.children.length||this.props.index

        }
    }
    clientWidth=document.body.clientWidth;
    startX=0;
    timerOut=0;
    distances=0;
    timer=0;
    scale=0;
    slides=0;
    handleTouchStart=(e)=>{
        let $this=this;
        if(this.props.autoPlay){
            clearInterval(this.timer);
        }
        if(this.props.loop) {
            if (this.state.index == this.slides-1) {
                clearInterval(this.timerOut);
                this.setState({
                    styles: {
                        // translateX: -($this.state.index+$this.slides) * this.clientWidth * (this.props.width+(1-this.props.width)/4) + this.clientWidth * (1-this.props.width)/4,
                        duration: 0
                    },
                    index: $this.state.index+$this.slides
                });
                // this.distances=-($this.state.index+$this.slides) * this.clientWidth * (this.props.width+(1-this.props.width)/4) + this.clientWidth * (1-this.props.width)/4;
            }else if( this.state.index==this.slides+$this.slides){
                clearInterval(this.timerOut);
                this.setState({
                    styles:{
                        // translateX:-($this.state.index-$this.slides)*this.clientWidth*(this.props.width+(1-this.props.width)/4)+this.clientWidth*(1-this.props.width)/4,
                        duration:0
                    },
                    index:$this.state.index-$this.slides
                });
                // this.distances=-($this.state.index-$this.slides)*this.clientWidth*(this.props.width+(1-this.props.width)/4)+this.clientWidth*(1-this.props.width)/4;
            }else{
                this.setState({
                    styles:{
                        duration:0
                    }
                });
                this.distances=this.state.styles.translateX;
            }
        }else{
            this.setState({
                styles:{
                    duration:0
                }
            });
            this.distances=this.state.styles.translateX;
        }
        this.startX=e.touches[0].pageX;


        e.preventDefault()

    };
    handleTouchMove=(e)=>{
        this.setState({
            progress:this.startX-e.touches[0].pageX
        });
    };
    handleTouchEnd=(e)=>{
        this.scale=0;
        if(this.props.autoPlay){
            this.timer=setInterval(()=>{
                this.next();
            },this.props.interval)
        }
        let distance=e.changedTouches[0].pageX-this.startX;
        if(Math.abs(distance)<this.clientWidth/3){
            this.back()
        }else{
            if(distance>0){
                this.pre()
            }else{
                this.next()
            }
        }
    };
    setCurrentSlide=(index)=>{
        this.setState({
            styles:{
                duration:.5,
            },
            progress:0,
            index:index
        })
    };
    componentWillMount(){
        let length=this.props.children.length;
        this.slides=length;
    }
    pre=()=>{
        if(this.props.loop){
            if(this.state.index==this.slides&&this.props.autoPlay){
                this.setCurrentSlide(this.state.index-1);
                this.timerOut=setTimeout(()=>{
                    this.setCurrentSlide(index+this.slides)
                },this.props.duration*1000)
            }else{
                this.setCurrentSlide(this.state.index-1)
            }
        }else{
            if(this.state.index<=0){
                this.setCurrentSlide(this.slides-1)
            }else{
                this.setCurrentSlide(this.state.index-1)
            }
        }
    };
    next=()=>{
        if(this.props.loop){
            if(this.state.index==this.slides*2&&this.props.autoPlay){
                this.setCurrentSlide(this.state.index+1);
                this.timerOut=setTimeout(()=>{
                    this.setCurrentSlide(index-this.slides)
                },this.props.duration*1000)
            }else{
                this.setCurrentSlide(this.state.index+1);
            }
        }else{
            if(this.state.index>=this.slides-1){
                this.setCurrentSlide(0)
            }else{
                this.setCurrentSlide(this.state.index+1)
            }
        }
    };
    back=()=>{
        this.setCurrentSlide(this.state.index)

    };
    componentDidMount(){
        if(this.props.autoPlay){
            this.timer=setInterval(()=>{
                this.next();
            },this.props.interval)
        }
    }
    render(){
        const {progress}=this.state;
        console.log(progress)
        const {children}=this.props;
        const slide_style={
            width:this.clientWidth*this.props.width+"px",
            display:'none',
            marginLeft:this.clientWidth*(1-this.props.width)/4+"px",
            // transform:this.props.type=="card"?"scale(1,"+(this.props.width+this.scale)+")":'',
            transform: `rotateY(90deg)`,
            transformOrigin:'center center 187.5px',
            transitionDuration:this.state.styles.duration+"s"
        };
        const slide_style_pre={
            width:this.clientWidth*this.props.width+"px",
            marginLeft:this.clientWidth*(1-this.props.width)/4+"px",
            // transform:this.props.type=="card"?"scale(1,"+(this.props.width+this.scale)+")":'',
            transform: `rotateY(${(progress/this.clientWidth)*90-90}deg)`,
            transformOrigin:'center center 187.5px',
            transitionDuration:this.state.styles.duration+"s",
            zIndex:progress>0?2:1
        }
        const slide_style_active={
            width:this.clientWidth*this.props.width+"px",
            marginLeft:this.clientWidth*(1-this.props.width)/4+"px",
            // transform:this.props.type=="card"?"scale(1,"+(1-this.scale)+")":"",
            transform: `rotateY(${(progress/this.clientWidth)*90}deg)`,
            transformOrigin:'center center 187.5px',
            transitionDuration:this.state.styles.duration+"s",
            zIndex:3
        };
        console.log(this.scale)
        const slide_style_next={
            width:this.clientWidth*this.props.width+"px",
            marginLeft:this.clientWidth*(1-this.props.width)/4+"px",
            // transform:this.props.type=="card"?"scale(1,"+(this.props.width+this.scale)+")":'',
            transform: `rotateY(${(progress/this.clientWidth * 90) + 90}deg)`,
            transformOrigin:'center center 187.5px',
            transitionDuration:this.state.styles.duration+"s",
            zIndex:progress>0?1:2
        }
        const wrapper_style={
            transitionDuration:this.state.styles.duration+"s",
            transform:"translate3d("+this.state.styles.translateX+"px, 0px, 0px)"
        };
        Object.assign(wrapper_style,styles.swiper_wrapper);
        Object.assign(slide_style_next,styles.swiper_slide);
        Object.assign(slide_style,styles.swiper_slide);
        Object.assign(slide_style_pre,styles.swiper_slide);
        Object.assign(slide_style_active,styles.swiper_slide);
        let sliderDom=[];
        let j=1;
        if(this.props.loop){
            j=3
        }
        for(var k=0;k<j;k++){
            children.map((item,i)=>{
                sliderDom.push(<div key={10*i+k} className="swiper-slide"
                                    style={this.state.index==((children.length*k)+i)?slide_style_active:this.state.index==((children.length*k)+i-1)?slide_style_pre:this.state.index==((children.length*k)+i+1)?slide_style_next:slide_style}>
                    {item}
                </div>)
            })
        }

        return(
            <div className="swiper-container" style={styles.swiper_container} ref='swiper' onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
                <div className="swiper-wrapper" style={wrapper_style} >
                    {sliderDom}
                </div>
                {this.props.pagination&&
                <div className="swiper-pagination" style={styles.swiper_pagination}>
                    {(()=>{
                        let list=[]
                        for(let i=0;i<this.slides;i++){
                            list.push(<span key={i} className={cn(i==this.state.index%this.slides&&"active","pagination-item" )} style={i==this.state.index%this.slides&&styles.pagination_item_active||styles.pagination_item}></span>)
                        }
                        return list
                    })()}
                </div>||""
                }

            </div>
        )
    }
}
export default  Index
