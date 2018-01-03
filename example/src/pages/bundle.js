/**
 * Created by Administrator on 2017/5/16.
 */
import React,{Component} from 'react'
class Index extends Component{
    state={
        mod:null
    }
    componentWillMount() {
        this.load(this.props)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }
    load=(props)=>{
        this.setState({
            mod: null
        })
        props.load((mod)=>{
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            })
        })
    }
    render(){
        // console.log('fafafa')
        // const {mod}=this.state;
        // if (mod){
        //     return this.props.children(this.state.mod)
        // }
        return <div>fasfaf</div>
    }
}
export default Index