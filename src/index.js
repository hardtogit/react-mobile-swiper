/**
 * Created by XR on 2017/12/21 0021.
 * Use auto
 * email 413401168@qq.com
 */
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import createStyle from './createStyle'
import * as animateTypes from './animateTypes'
import * as styles from "./style"
class Index extends Component{
    static defaultProps={
        index:0,
        height:200,
        duration:0.5,
        distance:150,
        loop:false,
        width:1,
        autoPlay:false,
        interval:3000,
        type:animateTypes.DEFAULT,
        typePro:false,
        pagination:true,
    };
    constructor(props) {
        super(props);
        this.state={
            duration:this.props.duration,
            progress:0,
            index:this.props.loop&&this.props.index+this.props.children.length||this.props.index

        };
        this.startX=0;
        this.timerOut=0;
        this.timer=0;
        this.slides=0;
    }
    componentWillMount(){
        this.slides=this.props.children.length;
    }
    componentDidMount(){
        if(this.props.autoPlay){
            this.timer=setInterval(()=>{
                this.next();
            },this.props.interval)
        }

    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    handleTouchStart=(e)=>{
        this.startX=e.touches[0].pageX;
        if(this.props.autoPlay){
            clearInterval(this.timer);
        }
        if(this.props.loop) {
            if (this.state.index == this.slides-1) {
                clearInterval(this.timerOut);
                this.setState({
                    duration: 0,
                    index: this.state.index+this.slides
                });
            }else if( this.state.index==this.slides+this.slides){
                clearInterval(this.timerOut);
                this.setState({
                    duration:0,
                    index:this.state.index-this.slides
                });
            }else{
                this.setState({
                     duration:0
                });
            }
        }else{
            this.setState({
                duration:0
            });
        }
    };
    handleTouchMove=(e)=>{
        if(this.props.loop){
            this.setState({
                progress:this.startX-e.touches[0].pageX
            });
        }else{
            if(this.state.index===this.slides-1){
                if(this.startX-e.touches[0].pageX<0){
                    this.setState({
                        progress:this.startX-e.touches[0].pageX
                    })
                }
            }else if(this.state.index===0){
                if(this.startX-e.touches[0].pageX>0){
                    this.setState({
                        progress:this.startX-e.touches[0].pageX
                    })
                }
            }else{
                this.setState({
                    progress:this.startX-e.touches[0].pageX
                })
            }
        }

    };
    handleTouchEnd=()=>{
        if(this.props.autoPlay){
            this.timer=setInterval(()=>{
                this.next();
            },this.props.interval)
        }
        if(Math.abs(this.state.progress)<this.props.distance){
            this.back()
        }else{
            if(this.state.progress<0){
                if(this.props.loop){
                    this.pre()
                }else if(this.state.index===0){
                    this.back();
                }else{
                    this.pre()
                }
            }else{
                if(this.props.loop){
                    this.next()
                }else if(this.state.index===this.slides-1){
                    this.back()
                }else{
                    this.next()
                }

            }
        }
    };
    setCurrentSlide=(index)=>{
        this.setState({
            duration:this.props.duration,
            progress:0,
            index:index
        },()=>{
            if(this.props.onSlideChange&& typeof this.props.onSlideChange ==="function"){
                this.props.onSlideChange(index%this.slides)
            }
        })
    };
    pre=()=>{
        if(this.props.loop){
            if(this.state.index===this.slides&&this.props.autoPlay){
                this.setCurrentSlide(this.state.index-1);
                this.timerOut=setTimeout(()=>{
                    this.setState({
                        duration:0,
                        index:this.state.index+this.slides
                    })
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
                    this.setState({
                        duration:0,
                        index:this.state.index-this.slides
                    })
                },this.props.duration*1000)
            }else{
                this.setCurrentSlide(this.state.index+1);
            }
        }else{
            if(this.state.index>=this.slides-1){
                this.setState({
                    duration:0,
                    index:0
                })
            }else{
                this.setCurrentSlide(this.state.index+1)
            }
        }
    };
    back=()=>{
        this.setCurrentSlide(this.state.index)
    };
    render(){
        const {progress,duration,index}=this.state;
        const {children,type,typePro,height}=this.props;
        let createStyleFactory=createStyle;
        if(this.props.createStyle&&typeof createStyle==="function"){
            createStyleFactory=this.props.createStyle
        }
        const slide_style_pre={...styles.swiper_slide,...createStyleFactory(type,'pre',progress,duration)};
        const slide_style_active={...styles.swiper_slide,...createStyleFactory(type,'active',progress,duration)};
        const slide_style_next={...styles.swiper_slide,...createStyleFactory(type,'next',progress,duration)};
        let slide_style_prePro={};
        let slide_style_nextPro={};
        if(typePro){
             slide_style_prePro={...styles.swiper_slide,...createStyleFactory(type,'prePro',progress,duration)};
             slide_style_nextPro={...styles.swiper_slide,...createStyleFactory(type,'nextPro',progress,duration)};
        }

        let sliderDom=[];
        let j=1;
        if(this.props.loop){
            j=3
        }
        // console.log(index)
        if(children.map){
            for(var k=0;k<j;k++){
                children.map((item,i)=>{
                    sliderDom.push(<div key={10*k+i} className="swiper-slide"
                                        style={(()=>{
                                            if(index===((children.length*k)+i)){
                                                return slide_style_active
                                            }else if(index===((children.length*k)+i-1)){
                                                return slide_style_next
                                            }
                                            else if(index===((children.length*k)+i-2)){
                                                if(typePro){
                                                    return slide_style_nextPro
                                                }else{
                                                    return {display:'none'}
                                                }
                                            }
                                            else if(index===((children.length*k)+i+1)){
                                                return slide_style_pre
                                            }
                                            else if(index===((children.length*k)+i+2)){
                                                if(typePro){
                                                    return slide_style_prePro
                                                }else{
                                                    return {display:'none'}
                                                }
                                            }
                                            else{
                                                return {display:'none'}
                                            }
                                        })()}>
                        {item}
                    </div>)
                })
            }
        }else{
            sliderDom=<div className="swiper-slide" style={slide_style_active}>{children}</div>
        }


        return(
            <div className="swiper-container"
                 style={{...styles.swiper_container,height:`${height}px`}} ref='swiper'
                 onTouchStart={(e)=>{e.preventDefault();this.handleTouchStart(e)}}
                 onTouchMove={(e)=>{e.preventDefault();this.handleTouchMove(e)}}
                 onTouchEnd={(e)=>{e.preventDefault();this.handleTouchEnd(e)}}
            >
                <div className="swiper-wrapper" style={styles.wrapper_style} >
                    {sliderDom}
                </div>
                {this.props.pagination&&
                <div className="swiper-pagination" style={styles.swiper_pagination}>
                    {(()=>{
                        let list=[];
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
Index.PropTypes={
    index:PropTypes.number,  //初始值
    height:PropTypes.oneOfType([  //容器的高度
       PropTypes.number,
       PropTypes.string
    ]).isRequired,
    duration:PropTypes.number, //动画完成周期
    distance:PropTypes.number,  //触发的距离
    loop:PropTypes.bool,  //是否循环播放
    autoPlay:PropTypes.bool, //是否自动播放
    interval:PropTypes.number,  //轮播间隔秒数
    type:PropTypes.string, //轮播类型 默认支持animateType
    typePro:PropTypes.bool,
    pagination:PropTypes.bool,//是否显示分页
    onSlideChange:PropTypes.func, //回调
    createStyle:PropTypes.func //样式生成器，可自行传入
};
Index.animateTypes=animateTypes;
export default  Index
