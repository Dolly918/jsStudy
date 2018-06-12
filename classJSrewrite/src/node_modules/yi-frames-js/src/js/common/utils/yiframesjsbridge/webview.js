import './yiframesjsbridge';
export let webview=function(params, cb){
        yiframesjsbridge.call(`/tool/webview`, params, cb)
    }