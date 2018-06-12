/*
 * @Author: zhangfanglan 
 * @Date: 2018-02-27 13:53:11 
 * @Last Modified by: zhangfanglan
 * @Last Modified time: 2018-03-14 11:24:28
 */
import './yiframesjsbridge';
export let file=function(params, cb){
        yiframesjsbridge.call('/tool/file', params, cb)
    }