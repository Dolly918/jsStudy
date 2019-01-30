/*
 * @Author: @Guojufeng 
 * @Date: 2019-01-30 13:17:26 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-01-30 13:32:38
 * DOM相关的方法封装
 */
var xingoeg1Dom = {
  printSon: function (father,grand) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-30 13:29:15 
     * 打印father下的所有子元素， 相当于node.children属性，但是兼容性更好
     * params : {father} 目标元素，获取该元素下的所有子元素
     * {返回值}: 子元素组成的数组
     */
    var childrens = ele.childNodes,
        len = childrens.length,
        arr = [];
    for (var i = 0; i < len; i++) {
      if (childrens[i].nodeType === 1) {
        if(grand){
          arr.push(this.printSon(childrens[i]));
        }else{
          arr.push(childrens[i]);
        }
      }
    }
    return arr;
  },
  printGrandSon: function (forefathers) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-30 13:29:15 
     * 打印father下的所有子孙元素
     */
  },
  getFather: function (target, num) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-30 13:21:38 
     * 获取target的元素的第num层祖先元素节点
     * params : {target} 目标元素
     * params : {num} number 第几层
     * {返回值}: 返回null，表示exceed（越界）
     */
    for (var i = 0; i < num; i++) {
      console.log(target)
      target = target === null ? null : target.parentElement;
    }
    return target;
  },
  getBrother: function (ele, n) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-30 13:18:05 
     * 返回元素e的第n个兄弟元素节点，n为正，返回后面的兄弟元素节点，n为负，返回前面的，n为0，返回自己
     * @params : {ele} variable 表示要获取的目标元素
     * @params : {n} number 表示要获取元素的第几个兄弟节点
     *           n > 0: 返回目标元素ele后边的兄弟节点
     *           n < 0: 返回目标元素ele前边的兄弟节点
     *           n = 0: 返回自身
     *           n值超范围: 返回null
     */
    if (n > 0) {
      for (let i = 0; i < n; i++) {
        ele = ele == null ? null : ele.nextElementSibling;
      }
    } else if (n < 0) {
      for (let i = n; i < 0; i++) {
        ele = ele == null ? null : ele.previousElementSibling;
      }
    }
    return ele;
  }
}