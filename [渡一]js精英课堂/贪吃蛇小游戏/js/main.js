/*
 * @Author: @Guojufeng 
 * @Date: 2018-12-13 14:55:22 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2018-12-13 18:13:19
 */

/* 阻止浏览器双击默认事件-----双击选中 */
document.ondragstart = document.onselectstart = function(){return false;};