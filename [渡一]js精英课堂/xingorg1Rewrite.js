/*
 * @Author: @Guojufeng 
 * @Date: 2019-01-12 21:18:38 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-01-24 22:21:10
 * 仿写 - 各种方法
 */

/* Function各种方法仿写 */
// call
Function.prototype.gjfCall = function () {
  var rst = null,
      obj = arguments[0] || window,
      len = arguments.length,
      argArr = [];
  for (let i = 1; i < len; i++) {
    argArr.push('arguments['+i+']');
    //这里也可以用reduce的思想，但是用reduce会用到Array原型上的call方法，故而放弃。
  }
  obj.newName = this;
  console.log(argArr,argArr.join());
  rst = eval('obj.newName('+argArr.join() + ')');
  delete obj.newName;
  return rst;
}
// apply
Function.prototype.gjfApply = function (obj, array) {
  var newObj = arguments[0] || window,
      len = arguments[1] && arguments[1].length,
      newName = this.name,
      argArr = [],
      rst = null;
  obj.newName = this;
  if(arguments[1]){
    for(var i = 0; i < len; i++){
      argArr.push('arguments[1]['+i+']');
    }
    rst = eval('obj.newName('+ argArr.join()+')');
  }else{
    rst = obj.newName();
  }
  delete obj.newName;
  return rst;
}
// bind
Function.prototype.gjfBind = function (target) {
  var self = this,
    _args = Array.prototype.slice.call(arguments, 1);
  var temp = function () {};
  var f = function () {
    var _arg = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof temp.prototype ? this : (target || window), _args.concat(_arg));
  }
  temp.prototype = self.prototype;
  f.prototype = new temp();
  return f;
}
/* Array的各种方法仿写 */
/* 新增方法 */
Array.prototype.flatten = function(){
  return this.reduce((pre,cur)=>{
    return Object.prototype.toString.call(cur) === '[object Array]' ? pre.concat(cur.flatten()) : pre.concat(cur);
  },[]);
}
/* 重写方法 */
// push
Array.prototype.gjfPush = function () {
  console.log("直接在Array原型上操作")
  for (var key in arguments) {
    this[this.length] = arguments[key];
  }
  return this.length;
}
// pop
Array.prototype.gjfPop = function () {
  var arr = [],
    len = this.length - 1,
    popResult = this[len];
  for (let i = 0; i < len; i++) {
    //深度拷贝原数组
    arr.push(this[i]);
  }
  this.length = 0; //利用length = 0, 把原数组清空
  for (let i = 0; i < len; i++) {
    this.push(arr[i]);
  }
  return popResult; //功能：返回踢掉的值
}
Array.prototype.gjfPop2 = function () {
  var result;
  if (this.length) {
    result = this.length - 1;
    this.length--;
  }
  return result;
}
// shift
Array.prototype.gjfShift = function () {
  var arr = [],
    len = this.length,
    result = this[0];
  for (let i = 1; i < len; i++) {
    arr.push(this[i]);
  }
  this.length = 0;
  for (let i = 0; i < len - 1; i++) {
    this.push(arr[i]);
  }
  return result;
}
// unshift
Array.prototype.gjfUnshift = function () {
  var arr = [],
    tLen = this.length;
  aLen = arguments.length;
  for (let i = 0; i < tLen; i++) {
    arr.push(this[i]); //储备原数组
  }
  this.length = 0; //清空原数组
  for (let i = 0; i < aLen; i++) {
    this.push(arguments[i]); //空原数组先加参数值
  }
  for (let i = 0; i < tLen; i++) {
    this.push(arr[i]); //原数组再合成原始值
  }
  return this.length; //返回数组长度
}
// unshift利用concant
Array.prototype.gjfUnshift2 = function () {
  /* 
    思路，用户传进来的是一个arguments类数组，转成真数组：Array.prototype.slice.call(arguments)
    然后和现有数组concant连接即可。因为是unshift，所以让新数组使用concant来连接旧数组this
  */
  var arr = Array.prototype.slice.call(arguments).concat(this),
    arrLen = arr.length;
  this.length = 0;
  for (let i = 0; i < arrLen; i++) {
    this.push(arr[i]); //重新整理原数组
  }
  return this.length; //返回数组长度
}
// join
Array.prototype.gjfJoin = function () {
  var targetStr = arguments[0],
    str = ',',
    result = this[0],
    len = this.length;
  if (targetStr !== undefined) {
    if (targetStr === null) {
      str = 'null'
    } else {
      str = targetStr.toString();
    }
  }
  for (let i = 1; i < len; i++) {
    if (this[i] !== undefined && this[i] !== null) {
      result += (str + this[i]);
    } else {
      result += str;
    }
  }
  return result;
}
// concat
Array.prototype.gjfConcat = function () {
  let arr = [], //因为不能重写原数组，所以新建
    len = this.length,
    aLen = arguments.length;
  for (let i = 0; i < len; i++) {
    arr.push(this[i]);
  }
  for (let i = 0; i < aLen; i++) {
    if (Object.prototype.toString.call(arguments[i]) == '[object Array]') {
      // 数组，要展开推入进去：多维数组只展开第一层
      let arrLen = arguments[i].length;
      for (let j = 0; j < arrLen; j++) {
        arr.push(arguments[i][j]);
      }
    } else {
      // 非数组，直接push进去连接
      arr.push(arguments[i]);
    }
  }
  return arr;
}
// reverse
Array.prototype.gjfReverse = function () {
  var arr = [],
    len = this.length;
  for (let i = 0; i < len; i++) {
    arr.push(this[len - 1 - i]); //实现倒着push1
  }
  this.length = 0;
  for (let i = 0; i < len; i++) {
    this.push(arr[i]);
  }
  return arr;
}
Array.prototype.gjfReverse2 = function () {
  var arr = [],
    len = this.length;
  for (let i = len - 1; i >= 0; i--) {
    arr.push(this[i]); //实现倒着push2
  }
  this.length = 0;
  for (let i = 0; i < len; i++) {
    this.push(arr[i]);
  }
  return arr;
}
// forEach
Array.prototype.gjfForEach = function (fn) {
  var _arr = this,
    len = this.length,
    params02 = arguments[1] || window; //this函数执行时的指向（严格模式指向undefined怎么办？）
  for (let i = 0; i < len; i++) {
    fn.apply(params02, [_arr[i], i, _arr]);
  }
  return 'author:@guojufeng';
}
// filter
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
// map
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
// every
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
// some
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
// reduce
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
// reduceRight
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