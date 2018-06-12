/*
 * @Author: guojufeng@ 
 * @Date: 2017-12-18 11:33
 * @modify: 2018-01-23 19:38
 * 正则验证
 * @param {string} type: 验证的类型
 * 		type = phone 验证手机号，正确返回true，其他情况返回false;
 * 		type = email 验证邮箱...
 * 		type = name  验证汉字(姓名+英文等)，只含有汉字、字母、数字
 * 		type = name01 验证汉字(姓名+英文等)，只含有汉字、字母、下划线，且下划线不能作为开头和结尾
 * 		type = name02 验证汉字(姓名+英文等)，只含有汉字、字母、数字、下划线，且下划线不能作为开头和结尾
 * @param {variable} value: 要验证的值，某个dom元素的value值或innerText值
*/
function trimSpace(str){ 
	// 去掉前后空格
	return str.replace(/(^\s*)|(\s*$)/g, ""); 
}
export let exp = (type,value)=>{
	return new Promise((resolve,reject)=>{
		var trimValue = trimSpace(value);
		var filter;
		switch(type)
		{
			case 'phone': filter = /^(1[3456789])\d{9}$/;
														// /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
				break;
			case 'email': filter = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				break;
			case 'name': filter = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
														 // ^[a-zA-Z0-9_\u4e00-\u9fa5]+$ 非字符
														 // ^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$ 带汉字、字母、下划线、数字
														 // ^(?!_)(?!.*?_$)[a-zA-Z_\u4e00-\u9fa5]+$ 不带数字，带汉字、字母、下划线
				break;
			default: reject(new Error(`你传入的type类型：${type},应该是字符串类型，且与现有的几种type不匹配。`));
		}
		const data = {
			result: filter.test(trimValue),
			value: 	trimValue
		}
		resolve(data);
	});
};