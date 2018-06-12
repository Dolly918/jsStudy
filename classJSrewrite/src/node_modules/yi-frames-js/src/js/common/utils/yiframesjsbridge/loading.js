/*
 * @Author: zhangfanglan 
 * @Date: 2018-04-02 16:13:27 
 * @Last Modified by: zhangfanglan
 * @Last Modified time: 2018-04-02 16:57:27
 */
import './yiframesjsbridge';
export var loading=function(params, cb){
        yiframesjsbridge.call('/tool/loading', params, cb)
    }
