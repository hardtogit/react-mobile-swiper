/**
 * Created by Administrator on 2017/5/9.
 */
import React,{Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
class Index extends Component{
    state={
        transitionName:'',
        beforUrl:''
    }
    componentDidMount(){
       const {location:{pathname}}=this.props;
      this.setState({
          beforUrl:pathname
      })
    }
    getUrl=(url)=>{
        let flag;
        switch(url){
            case (''):
                flag=false;
                break;
            case ('/find'):
                flag=false;
                break;
            case ('/product'):
                flag=false;
                break;
            case ('/home'):
                flag=false;
                break;
            case ('/mine'):
                flag=false;
                break;
            default:
                flag=true;
        }
        return flag
    }
    componentWillReceiveProps(next){
        const {location:{pathname},history:{action}}=next;
        const {beforUrl}=this.state;
        let flag=this.getUrl(beforUrl);
        let flag1=this.getUrl(pathname);
        if (!flag&&!flag1){
            this.setState({
                transitionName:''
            })
        }else {
            if (action==='POP'){
                this.setState({
                    transitionName:'swap-right'
                })
            }else {
                this.setState({
                    transitionName:'swap-left'
                })
            }
        }
       this.setState({
           beforUrl:pathname
       })
    }
    render(){
        const {children:{props:{location:{pathname}}}}=this.props;
        const {transitionName}=this.state;
        let a=1;
        if (transitionName){
            a=300
        }
        const {children}=this.props;
        return(
            <ReactCSSTransitionGroup
                transitionName={transitionName}
                transitionEnterTimeout={a}
                transitionLeaveTimeout={a}>
                {React.cloneElement(<div className="swiper">{children}</div>,{key:pathname})}
            </ReactCSSTransitionGroup>
        )
    }
}
export default Index