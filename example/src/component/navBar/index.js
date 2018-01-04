/**
 * author:XR
 * email:413401168@qq.com
 * Time: 2018/1/4 22:37
 */
import React,{Component} from 'react'
require('./index.less')
class Index extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    defaultProps={
       title:"标题"
    };
    back=()=>{
        this.props.history.goBack()
    }
    render(){
        return(
            <div className="nav">
                <div className="left" onClick={this.back}>
                    <span className="arrow"></span>
                </div>
                <div className="center">
                    {this.props.title}
                </div>
                <div className="right">
                </div>
            </div>
        )
    }
}
export default Index