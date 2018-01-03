/**
 * Created by Administrator on 2017/5/9.
 */
import React,{Component} from 'react'
import Test from './test'
class Index extends Component{
    constructor(props){
        super(props)
        this.state={
               num:1
        }
    }
    componentDidMount(){
             console.log(this.props)
    }
    componentWillReceiveProps(nextProps){

    }
    componentWillUnmount(){

    }
    render(){
        return(<div>
            fafafafa
        </div>)
    }
}
export default Index