/*
 * @Author: guojufeng@ 
 * @Date: 2017-12-21 11:55:34
 * 下拉选择框
 * @param {object=} parameter 参数配置
 * @param {var} parameter.dropBtn 触发下拉框的元素idName
 * @param {string} parameter.aChild 下拉菜单列表元素名称
 * @param {var} parameter.dropLayer 下拉框元素idName
*/
import { eventUtil } from '../../_base/eventUtil.js';
export let dropLayer = (parameter) => {
	if(parameter){
		const promise = new Promise((resolve, reject)=>{
			let dropBtns = document.getElementById(parameter.dropBtnId);
			let dropLayers = document.getElementById(parameter.dropLayerId);
			if(!dropBtns){
				reject(new Error('dropBtnId参数值错误：元素id名找不到或拼写不正确'));
			}else if(!dropLayers){
				reject(new Error('dropLayerId参数值错误：元素id名找不到或拼写不正确'));
			}else{
				let aChilds = dropLayers.getElementsByTagName(parameter.aChild);
				var count = 0;
				dropLayers.style.display = 'block';
				for (let i = 0; i < aChilds.length; i++) {
					aChilds[i].className = '';
				};
				for (let i = 0; i < aChilds.length; i++) {
					eventUtil.addHander(aChilds[i],'click',function(ev){
						const evt = event?event:window.event;
						eventUtil.stopPropagation(evt);
						dropBtns.children[0].innerText = this.innerText;
						const dataId = this.getAttribute(parameter.dataIdName);
						dropLayers.style.display = 'none';
						if(dataId){
							resolve({ 
								id: dataId,
								txts: this.innerText
							});
						}else{
							reject(new Error('dataIdName参数值错误：没有传入元素的id属性名或没有正确书写id属性名！'));
						}
					});
				}
			}
		});
		return promise;
	}
};