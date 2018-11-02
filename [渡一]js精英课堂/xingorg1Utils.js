var xingorg1Utils = {
  getType: function(target){
    /*
      * @Author: guojufeng@ 
      * @Date: 2017-12-20 15:07:06
      * @purpose 获取一个值的类型
      * @param {variateName} target: 要获取类型的变量名或对象
      * @output {string} result || "null": 返回的参数 - result或者null,为字符串形式的
    */
    if(target === null){
      console.log("getType类型判断为: " + target)
      return "null";
    }
    let result = typeof (target);
    if (result == "object") { 
      if (target instanceof Array) {
        result = "array";
      } else if (target instanceof Object) {
        result = "object";
      }
    }
    console.log("getType类型判断为: " + result)
    return result;//返回类型值的字符串形式
  },
  deepClone: function(origin){
    /*
      * @Author: guojufeng@ 
      * @Date: 2018-10-30 20:48:44 
      * @purpose 深度克隆
      * @param {variateName} origin: 要克隆的对象变量名
      * @output {对应值} 根据origin的类型返回的具体值
    */
    let type = this.getType(origin),
          target;
      if(type == "array"){
        target = [];
        /* 数组 */
        origin.forEach(el => {
          // console.log("ele",el)
          target.push(this.deepClone(el));
        });
      }else if(type == "object"){
        /* 对象 */
        target = {};
        for (const key in origin) {
          if (origin.hasOwnProperty(key)) {
            /* 注意，只拷贝元素身上的，而不拷贝其原型上的值 */
            const el = origin[key];
            target[key] = this.deepClone(el);
          }
        }
      }else if(type == "function"){
        /* 函数 */
        target = function(){};
        target = origin;
      }else{
        /* 原始值 */
        target = origin;
      }
      return target;
  },
  sortNumber: function(array,type){
    /* 
      * @Author: guojufeng@ 
      * @Date: 2018-10-30 20:48:44
      * @params {array}: 要排序的数组
      * @params {type}: 数字，表示期望排序的顺序：1升序，2降序，3乱序
    */
    if(this.getType(array) == "object"){
      /* 伪数组转换为数组 */
      array = Array.prototype.slice.call(array);
    }
    array.sort((a,b)=>{
      /* 
        原理：返回值比较
        当返回值为负数时，两个参数中前面的数放在前边
        当返回值为正数时，两个参数中后面的数放在前边
        当返回值为0时，参数位置不动
        a,b代表当时比较的两位数，前边大于后边的，相减自然得正数。前边小于后边得，
      */
      if(type == 1){
        return a - b;
        // return 1;这样直接返回一个正数是不行额。
      }else if(type == 2){
        return - a + b;
        // return -1;这样直接返回一个负数是不行额。
      }else if(type == 3){
        /* 原理就是，math randow返回得时0-1得开区间，拿返回得数减去0.5的话，则会随机返回正数或者负数。正数就前边得放前边，负数就后边的放前边。总之就是乱来。 */
        let nowNum = Math.random();
        // console.log(nowNum,nowNum-0.5)
        return nowNum - 0.5;
      }
    })
    return array;
  },
  arrPush: function(){

  }
}