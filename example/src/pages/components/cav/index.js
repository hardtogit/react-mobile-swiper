/**
 * Created by Administrator on 2017/5/8.
 */
import React,{Component} from 'react'
import './index.less'
import propTypes from 'prop-types'
class Index extends Component{
    static propTypes={
           cavStyle:propTypes.object,
           cavOneStyle:propTypes.object,
           cavDom:propTypes.arrayOf(propTypes.element),
           click:propTypes.func
    }
    static defaultProps={
        cavStyle:{},
        cavOneStyle:{},
        cavDom:[<div>主页</div>],
        click:()=>{}
    }
    render(){
        const {cavDom,cavStyle,cavOneStyle}=this.props;
        return(<div className="bottom_cav" style={cavStyle}>
            {cavDom&&cavDom.map((item,i)=>(
                <div className="cav_one" key={i} style={cavOneStyle}>
                    {item}
                </div>
            ))}
        </div>)
    }
}
export default Index