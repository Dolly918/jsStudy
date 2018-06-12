/*
 * @Author: MapkVolkov@ 
 * @Date: 2018-02-25 15:07:06
 * yiframesJSBridge-快捷方式－toast弹层大类
 * @param {type} 协议host/path类型。
 * @param {params} 协议入参参数包。
 * @param {cb} 回调。
*/
import './yiframesjsbridge';
export let toast =  (params, cb) => {	
	(typeof params === "object" && typeof cb === "function") ? yiframesjsbridge.call(`/common/toast`, params, cb) : console.log('查无此类型协议 or 参数类型配置错误');
}