react-mobile-swiper
================

>a simple react-swiper component <a href="https://hardtogit.github.io/react-mobile-swiper/example/build/index.html">https://hardtogit.github.io/react-mobile-swiper/example/build/index.html</a>
## Demo

<img src="https://raw.githubusercontent.com/hardtogit/react-mobile-swiper/master/example/src/assets/img/demo.gif" alt="YaMOrzoWHp.jpg">
## get start
```bash
clone or down this project

cd example

npm install

npm start
## how to use

### Example with defaults
#### install
```bash
npm intsall --save react-mobile-swiper
```
#### Creating an example component:
```javascript
import React,{Component} from 'react';
import Swiper from 'react-mobile-swiper';
const animateTypes=Swiper.animateTypes;
class Example extents Component{
  render: function() {
    return (
      <Swiper type={animateTypes.DEFAULT} loop>
       <div><img src=''/></div>
       <div><img src=''/><div>
      </Swiper>
    );
  },
};
export default Example;
```
### Config Props:
```javascript
Index.PropTypes={
    index:PropTypes.number,  //初始值
    height:PropTypes.oneOfType([  //容器的高度
       PropTypes.number,
       PropTypes.string
    ]).isRequired,
    duration:PropTypes.number, //动画完成周期
    distance:PropTypes.number,  //触发切换的距离
    loop:PropTypes.bool,  //是否循环播放
    autoPlay:PropTypes.bool, //是否自动播放
    interval:PropTypes.number,  //轮播间隔秒数
    type:PropTypes.string, //轮播类型 默认支持animateType
    typePro:PropTypes.bool, //需要同屏显示3个slide的时候设置为true.  例如type设置成 animatetype.CARD时
    pagination:PropTypes.bool,//是否显示分页
    onSlideChange:PropTypes.func, //slide切换回调
    createStyle:PropTypes.func //样式生成器，可自行传入
};
//样式生成器是一个纯函数。用于返回上一，当前，下一slide的样式。默认animateTypes.DEFAULT的配置如下：（注：当typePro设置为true时，为了更好的体验，<br/>
需返回，上上张，下下张的样式，即stage==='prePro',stage==='nextPro'）
export default (animateTypes,stage,progress,duration)=>{//接收参数依次为动画类型，slide状态，滑动距离，动画执行时间
    switch (animateTypes){
        case animateTypess.DEFAULT:
            switch (stage){
                case 'pre':
                    return(
                        {
                            transform: `translateX(${-(clientWidth+progress)}px)`,
                            transitionDuration: `${duration}s`
                        }
                    );
                case 'active':
                    return(
                        {
                            transform: `translateX(${-progress}px)`,
                            transitionDuration: duration+"s"
                        }
                    )
                case 'next':
                    return(
                        {
                            transform: `translateX(${(clientWidth-progress)}px)`,
                            transitionDuration: duration+"s"
                        }
                    )
                default:
                break;
            }
            break;
      default:break;  
      }
