/*
 * @Author: guojufeng@ 
 * @Date: 2017-12-25 15:18:12
 * isIE8模块：判断浏览器是否是ie8
 * @param 参数配置
 * @param {function} 回调函数isIE8Call,返回两类数字，0为不是ie8,1为ie8。
*/
export let isIE8 = (isIE8Call)=>{
  let browser=navigator.appName 
  let b_version=navigator.appVersion 
  let version=b_version.split(";"); 
  let trim_Version = '';
  if(version.length > 1){
    //火狐
  	trim_Version = version[1].replace(/[ ]/g,""); 
  }
  if((browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0")){
    // 如果是ie则返回1
      isIE8Call(1);
  }else{
      isIE8Call(0);
  }
};