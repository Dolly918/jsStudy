/*
 * @Author: zhangfanglan 
 * @Date: 2018-02-27 13:53:11 
 * @Last Modified by: zhangfanglan
 * @Last Modified time: 2018-02-28 18:26:48
 */
import './yiframesjsbridge';
export let layer=function(params, cb){
        yiframesjsbridge.call(`/tool/layer`, params, cb)
    }
