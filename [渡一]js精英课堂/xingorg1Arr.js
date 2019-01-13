/*
 * @Author: @Guojufeng 
 * @Date: 2019-01-12 21:18:38 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-01-13 10:23:38
 * 仿写 - 数组的各个方法
 */
Array.prototype.gjfForEach = function (fn) {
  var _arr = this,
    len = this.length,
    params02 = arguments[1] || window; //this函数执行时的指向（严格模式指向undefined怎么办？）
  for (let i = 0; i < len; i++) {
    fn.apply(params02, [_arr[i], i, _arr]);
  }
  return 'author:@guojufeng';
}
Array.prototype.gjfFilter = function (fn) {
  var _arr = this,
    len = this.length,
    self = arguments[1] || window,
    resultArr = [];
  for (let i = 0; i < len; i++) {
    fn.apply(self, [_arr[i], i, _arr]) ? resultArr.push(_arr[i]) : 'author:@guojufeng';
  }
  return resultArr;
}
Array.prototype.gjfMap = function (fn) {
  var _arr = this,
    len = this.length,
    self = arguments[1] || window,
    newArr = [];
  for (let i = 0; i < len; i++) {
    newArr.push(fn.apply(self, [_arr[i], i, _arr]));
  }
  return newArr;
}
Array.prototype.gjfEvery = function (fn) {
  var _arr = this,
    len = this.length,
    self = arguments[1] || window,
    result = true;
  for (let i = 0; i < len; i++) {
    if (!fn.apply(self, [_arr[i], i, _arr])) {
      return false; //一旦不符合条件，立即返回，不再执行接下来的内容。
    }
  }
  return result;
}
Array.prototype.gjfSome = function (fn) {
  var _arr = this,
    len = this.length,
    self = arguments[1] || window,
    result = false;
  for (let i = 0; i < len; i++) {
    if (fn.apply(self, [_arr[i], i, _arr])) {
      return true;
    }
  }
  return result;
}
Array.prototype.gjfReduce = function (fn, initValue) {
  var _arr = this,
    len = this.length,
    self = arguments[2] || window, //我们给他添加重新指向this的功能
    prevValue = initValue;
  for (let i = 0; i < len; i++) {
    prevValue = fn.apply(self, [prevValue, _arr[i], i, _arr]);
    //本次的prevValue就是上一次函数调用的返回值。而，函数每一次调用传入的prevValue就是上一次自己的返回值。
  }
  return prevValue; //返回最后一次遍历后，得出的结果值。
}
Array.prototype.gjfReduceRight = function (fn, initValue) {
  var _arr = this,
    len = this.length - 1,
    self = arguments[2] || window, //我们给他添加重新指向this的功能
    prevValue = initValue;
  for (let i = len; i >= 0; i--) {
    prevValue = fn.apply(self, [prevValue, _arr[i], i, _arr]); //本次的prevValue就是上一次函数调用的返回值。而，函数每一次调用传入的prevValue就是上一次自己的返回值。
  }
  return prevValue; //返回最后一次遍历后，得出的结果值。
}