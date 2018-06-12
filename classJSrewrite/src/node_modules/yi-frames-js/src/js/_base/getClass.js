/*
 * @Author: guojufeng@ 
 * @Date: 2017-12-22 20:18:45
  * 获取指定类名元素
 * @param {string} oParent: 需要找class的父元素的id
 * @param {string} clsName: 要找的类名
*/
export let getClass = (oParent,clsName) =>{
	if(oParent){
			return new Promise((resolve,reject)=>{
			let oParents = document.getElementById(oParent);
			if(!oParents){
				reject(new Error(`提醒：_base组件中，getClass方法找不到传入的Id:${oParent}，请检查传参是否匹配正确！`));
			}else{
			  let boxArr = new Array();
			  let oElements  = oParents.getElementsByTagName('*');
			  for(let i=0;i<oElements.length;i++){
			  	let classNameArr = oElements[i].className.split(/\s+/);
			  	for (let j = 0; j < classNameArr.length; j++) {
			  		if(classNameArr[j] === clsName){
			        boxArr.push(oElements[i]);
			      }
			  	}
		  	}
		  	if(boxArr.length === 0){
		  		reject(new Error(`提醒：_base组件中，getClass方法筛选不到指定的类名:${clsName}，请查看是否类名传参错误，或者指定元素范围中根本没有这个类名。`));
		  	}
	  		resolve(boxArr);
			}
		})
	}
}