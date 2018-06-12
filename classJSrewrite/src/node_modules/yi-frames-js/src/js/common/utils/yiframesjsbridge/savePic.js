/*
 * @Author: zhangfanglan 
 * @Date: 2018-02-27 13:53:11 
 * @Last Modified by: zhangfanglan
 * @Last Modified time: 2018-02-28 18:26:59
 */
import './yiframesjsbridge';
export let savePic=function(params, cb){
        yiframesjsbridge.call('/tool/savePic', params, cb)
    }