/**
 * Created by Administrator on 2017/5/16.
 */
import {fromJS} from 'immutable'
import {START} from '../action/info'
const data=fromJS({
    a:0,
    data:[]
})
export default (state=data,action)=>{
        switch (action.type){
            case START:
                if (state.has(action.type)){
                    console.log(action)
                   return state.withMutations((data)=>{
                        data
                            .setIn([action.type,'a'],action.data.a)
                            .updateIn([action.type,'data'],list=>list.concat(action.data.list))
                    })
                }else {
                    console.log('你好啊')
                   return state.set(action.type,state)
                }
            default:
                return state
        }
}