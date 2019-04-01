import * as animateTypess from './animateTypes'
import {clientWidth} from './utils'
export default (animateTypes,stage,progress,duration)=>{
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
                    break;
                case 'active':
                    return(
                        {
                            transform: `translateX(${-progress}px)`,
                            transitionDuration: duration+"s"
                        }
                    )

                    break;
                case 'next':
                    return(
                        {
                            transform: `translateX(${(clientWidth-progress)}px)`,
                            transitionDuration: duration+"s"
                        }
                    )
            }
            break;
        case animateTypess.ROLL:
            switch (stage){
                case 'pre':
                    return(
                        {
                            transform: `rotateY(${(progress/clientWidth)*90+90}deg)`,
                            transformOrigin:`center center ${clientWidth/2}px`,
                            transitionDuration: `${duration}s`,
                            zIndex:progress>0?1:3
                        }
                    );
                    break;
                case 'active':
                    return(
                        {
                            transform: `rotateY(${(progress/clientWidth)*90}deg)`,
                            transformOrigin:`center center ${clientWidth/2}px`,
                            transitionDuration: `${duration}s`,
                            zIndex:2
                        }
                    )

                    break;
                case 'next':
                    return(
                        {
                            transform: `rotateY(${(progress/clientWidth)*90-90}deg)`,
                            transformOrigin:`center center ${clientWidth/2}px`,
                            transitionDuration: `${duration}s`,
                            zIndex:progress>0?3:1
                        }
                    )
            }
            break;
        case animateTypess.CARD:
            switch (stage){
                case 'pre':
                    return(
                        {
                            width:'80%',
                            left:'10%',
                            transform: `translateX(${-(clientWidth*0.85+progress)}px) scaleY(${(0.8+Math.abs((progress/(clientWidth*0.85))*0.2))})`,
                            transitionDuration: `${duration}s`,
                            zIndex:2
                        }
                    );
                    break;
                case 'active':
                    return(
                        {
                            width:'80%',
                            left:'10%',
                            transform: `translateX(${-progress}px) scaleY(${(1-Math.abs((progress/(clientWidth*0.85))*0.2))})`,
                            transitionDuration: `${duration}s`,
                            zIndex:3
                        }
                    )

                    break;
                case 'next':
                    return(
                        {
                            width:'80%',
                            left:'10%',
                            transform: `translateX(${(clientWidth*0.85-progress)}px) scaleY(${(0.8+Math.abs((progress/(clientWidth*0.85))*0.2))})`,
                            transitionDuration: duration+"s",
                            zIndex:1
                        }
                    )
                break;
                case 'prePro':
                    return({
                        width:'80%',
                        left:'10%',
                        transform: `translateX(${-(clientWidth*1.7)-progress}px) scaleY(${(1-Math.abs((progress/(clientWidth*0.85))*0.2))})`,
                        transitionDuration: duration+"s",
                        zIndex:1
                    })
                    break
                case 'nextPro':
                    return({
                        width:'80%',
                        left:'10%',
                        transform: `translateX(${(clientWidth*1.7-progress)}px) scaleY(${(1-Math.abs((progress/(clientWidth*0.85))*0.2))})`,
                        transitionDuration: duration+"s",
                        zIndex:1
                    })
                break
            }
            break;
        default:
        break

    }

}