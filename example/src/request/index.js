/**
 * Created by Administrator on 2017/5/16.
 */
import axios from 'axios'
import * as Url from './url'
async function a(dispath,obj,key) {
    const {data,type}=obj;
    const res=await axios.post(Url[key],data)
     dispath({
         type,
         data:res.data
     })
}
export default a