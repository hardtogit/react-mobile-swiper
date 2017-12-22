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
class Index extends Component{
    static propTypes= {
        index:PropTypes.number,  //初始值
        duration:PropTypes.number, //动画完成周期
        distance:PropTypes.number,  //触发的距离
        loop:PropTypes.bool,  //是否循环播放
        width:PropTypes.number, //0~1,1表示100%
        autoPlay:PropTypes.bool, //是否自动播放
        interval:PropTypes.number  //轮播间隔秒数
    };
    static defaultProps={
        index:0,
        duration:0.5,
        distance:100,
        loop:false,
        width:0.8,
        autoPlay:true,
        interval:3000
    };
    constructor(props) {
        super(props);
        this.state = {
            styles:{
                translateX:this.props.loop&&-(this.props.index+this.props.children.length)*this.clientWidth*0.85+this.clientWidth*0.05||-this.props.index*this.clientWidth*0.85+this.clientWidth*0.05,
                duration:this.props.duration,

            },
            index:this.props.loop&&this.props.index+this.props.children.length||this.props.index
        }
    }
    clientWidth=document.body.clientWidth;
    clientHeight=document.body.clientHeight;
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
                        translateX: -($this.state.index+$this.slides) * this.clientWidth * 0.85 + this.clientWidth * 0.05,
                        duration: 0
                    },
                    index: $this.state.index+$this.slides
                });
                this.distances=-($this.state.index+4) * this.clientWidth * 0.85 + this.clientWidth * 0.05;
            }else if( this.state.index==this.slides+$this.slides){
                clearInterval(this.timerOut);
                this.setState({
                    styles:{
                        translateX:-($this.state.index-$this.slides)*this.clientWidth*0.85+this.clientWidth*0.05,
                        duration:0
                    },
                    index:$this.state.index-$this.slides
                });
                this.distances=-($this.state.index-$this.slides)*this.clientWidth*0.85+this.clientWidth*0.05;
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
        let distance=  e.touches[0].pageX-this.startX;
        this.scale=Math.abs(0.2*distance/this.clientWidth*0.85);
        if(!this.props.loop){
            if(this.distances+distance>0){
                if(distance>0){
                    distance=Math.sqrt(distance)
                }else{
                    distance=-Math.sqrt(-distance)
                }
            }else if(this.distances+distance<-this.clientWidth*0.85*(this.slides-1-0.05)){
                if(distance>0){
                    distance=Math.sqrt(distance)
                }else{
                    distance=-Math.sqrt(-distance)
                }
            }
        }
        this.setState({
            styles:{
                translateX:this.distances+distance
            }
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
        this.distances=this.distances+ distance;
        if(distance>this.props.distance){
            if(this.state.index<=0&&!this.props.loop){
                this.back()
            }else{
                this.pre()
            }

        }else if(distance<-this.props.distance){
            if(this.state.index>=this.slides-1&&!this.props.loop){
                this.back()
            }else{
                this.next()
            }
        }else{
            this.back()
        }
    };
    setMyState=(index)=>{
        this.setState({
            styles:{
                translateX:-index*this.clientWidth*0.85+this.clientWidth*0.05,
                duration:.5
            },
            index:index
        })
    };
    componentWillMount(){
        let length=this.props.children.length;
        this.slides=length;
    }
    pre=()=>{
        let $this=this;
        if(this.props.loop){
            if(this.state.index==this.slides&&this.props.autoPlay){
                this.setMyState(this.state.index-1);
                this.timerOut=setTimeout(()=>{
                    $this.setState(({index})=>({
                        styles:{
                            duration:0,
                            translateX:-(index+this.slides)*this.clientWidth*0.85+this.clientWidth*0.05,
                        },
                        index:index+this.slides,
                    }))
                },this.props.duration*1000)
            }else{
                this.setMyState(this.state.index-1)
            }
        }else{
            if(this.state.index<=0){
                this.setMyState(this.slides-1)
            }else{
                this.setMyState(this.state.index-1)
            }
        }
    };
    next=()=>{
        let $this=this;
        if(this.props.loop){
            if(this.state.index==this.slides*2&&this.props.autoPlay){
                this.setMyState(this.state.index+1);
                this.timerOut=setTimeout(()=>{
                    $this.setState(({index})=>({
                        styles:{
                            duration:0,
                            translateX:-(index-this.slides)*this.clientWidth*0.85+this.clientWidth*0.05,
                        },
                        index:index-this.slides
                    }))
                },this.props.duration*1000)
            }else{
                this.setMyState(this.state.index+1);
            }

        }else{
            if(this.state.index>=this.slides-1){
                this.setMyState(0)
            }else{
                this.setMyState(this.state.index+1)
            }
        }
    };
    back=()=>{
        this.setMyState(this.state.index)

    };
    componentDidMount(){
        if(this.props.autoPlay){
            this.timer=setInterval(()=>{
                this.next();
            },this.props.interval)
        }
    }
    render(){
        const {children}=this.props;
        const slide_style={
            width:this.clientWidth*0.8+"px",
            marginLeft:this.clientWidth*0.05+"px",
            transform:"scale(1,"+(0.8+this.scale)+")",
            transitionDuration:this.state.styles.duration+"s"
        };
        const slide_style_active={
            width:this.clientWidth*0.8+"px",
            marginLeft:this.clientWidth*0.05+"px",
            transform:"scale(1,"+(1-this.scale)+")",
            transitionDuration:this.state.styles.duration+"s"
        };
        const wrapper_style={
            transitionDuration:this.state.styles.duration+"s",
            transform:"translate3d("+this.state.styles.translateX+"px, 0px, 0px)"
        };
        Object.assign(wrapper_style,styles.swiper_wrapper);
        Object.assign(slide_style,styles.swiper_slide);
        Object.assign(slide_style_active,styles.swiper_slide);
        let sliderDom=[];
        let j=1;
        if(this.props.loop){
            j=3
        }
        for(var k=0;k<j;k++){
            children.map((item,i)=>{
                sliderDom.push(<div key={10*i+k} className="swiper_slide" style={this.state.index%children.length==i&&slide_style_active||slide_style}>
                    {item}
                </div>)
            })
        }

        return(
            <div className="swiper_container" style={styles.swiper_container} ref='swiper' onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
                <div className="swiper_wrapper" style={wrapper_style} >
                    {sliderDom}
                </div>
            </div>
        )

    }
}
export default  Index
