var xingorg1Utils = {
  getSearch: function (str) {
    /*
     * @Author: guojufeng@ 
     * @Date: 2018-11-05 09:35:14 
     * @purpose 获取查询字符串的值
     * @param {string} : location.search.substring(1)
     * @output {object} : 返回的参数 - 空对象或整理过的键值对
     */
    str = str || undefined;
    let obj = {};
    if (str) {
      let arr = str.split('&');
      arr.forEach((el) => {
        let item = el.split('=')
        obj[item[0]] = item[1];
      })
      console.log(obj)
    }
    return obj;
  },
  getType: function (target) {
    /*
     * @Author: guojufeng@ 
     * @Date: 2017-12-20 15:07:06
     * @purpose 获取一个值的类型
     * @param {variateName} target: 要获取类型的变量名或对象
     * @output {string} result || "null": 返回的参数 - result或者null,为字符串形式的
     */
    if (target === null) {
      console.log("getType类型判断为: " + target)
      return "null";
    }
    let result = typeof (target);
    if (result == "object") {
      if (target instanceof Array) {
        result = "array";
      } else if (target instanceof Object) {
        let target = Object.prototype.toString.call(target);
        if (target == "[object Object]") {
          result = "object";
        } else {
          result = target; //构造类
        }
      }
    }
    console.log("getType类型判断为: " + result)
    return result; //返回类型值的字符串形式
  },
  getType2: function (target) {
    /*
     * @Author: guojufeng@ 
     * @Date: 2018-12-28 21:09:23
     * @purpose 获取一个值的类型
     * @param {variateName} target: 要获取类型的变量名或对象
     * @output {string} result || "null": 返回的参数 - result或者null,为字符串形式的
     */
    /* 思路：利用Object的toString处理不同的值得到不同结果的情况，直接返回template[str]就是对应的类型 */
    var type = typeof (target),
      template = {
        "[object Object]": 'object',
        "[object Array]": 'array',
        "[object Number]": '[object Number]',
        "[object Boolean]": '[object Boolean]',
        "[object String]": '[object String]',
        "[object Null]": 'null'
      };
    if (type == 'object') {
      return template[Object.prototype.toString.call(target)]
    } else {
      return type;
    }
  },
  deepClone: function (origin) {
    /*
     * @Author: guojufeng@ 
     * @Date: 2018-10-30 20:48:44 
     * @purpose 深度克隆
     * @param {variateName} origin: 要克隆的对象变量名
     * @output {对应值} 根据origin的类型返回的具体值
     */
    let type = this.getType(origin),
      target;
    if (type == "array") {
      target = [];
      /* 数组 */
      origin.forEach(el => {
        // console.log("ele",el)
        target.push(this.deepClone(el));
      });
    } else if (type == "object") {
      /* 对象 */
      target = {};
      for (const key in origin) {
        if (Object.prototype.hasOwnProperty.call(origin,key)) {
          /* 注意，只拷贝元素身上的，而不拷贝其原型上的值 */
          const el = origin[key];
          target[key] = this.deepClone(el);
        }
      }
    } else if (type == "function") {
      /* 函数 */
      target = function () {};
      target = origin;
    } else {
      /* 原始值 */
      target = origin;
    }
    return target;
  },
  sortNumber: function (array, type) {
    /* 
     * @Author: guojufeng@ 
     * @Date: 2018-10-30 20:48:44
     * 纯数字数组排序
     * @params {array}: 要排序的数组
     * @params {type}: 数字，表示期望排序的顺序：1升序，2降序，3乱序
     */
    if (this.getType(array) == "object") {
      /* 伪数组转换为数组 */
      array = Array.prototype.slice.call(array);
    }
    array.sort((a, b) => {
      /* 
        原理：返回值比较
        当返回值为负数时，两个参数中前面的数放在前边
        当返回值为正数时，两个参数中后面的数放在前边
        当返回值为0时，参数位置不动
        a,b代表当时比较的两位数，前边大于后边的，相减自然得正数。前边小于后边得，
      */
      if (type == 1) {
        return a - b;
        // return 1;这样直接返回一个正数是不行额。
      } else if (type == 2) {
        return -a + b;
        // return -1;这样直接返回一个负数是不行额。
      } else if (type == 3) {
        /* 原理就是，math randow返回得时0-1得开区间，拿返回得数减去0.5的话，则会随机返回正数或者负数。正数就前边得放前边，负数就后边的放前边。总之就是乱来。 */
        let nowNum = Math.random();
        // console.log(nowNum,nowNum-0.5)
        return nowNum - 0.5;
      }
    })
    return array;
  },
  uniqArr: function (arr) {
    /* 
     * @Author: guojufeng@ 
     * @Date: 2018-11-05 09:35:14 
     * 数组去重
     * @params {arr}: 要去重的原数组
     * @return {newArr}: 返回去重后的数组
     */
    /* 思路 */
    // 准备一个对象和一个新数组，
    // 循环原数组时，将数组的值当做对象的键，且对应值为true（/1皆可），
    // 然后每次拿原数组的下一个值都去判断一下对象中是否有这个值，
    // 没有再push到新数组中去，最后返回新数组。
    /* 容错： */
    // 不是arr
    // 伪数组
    if (Object.prototype.toString.call(arr) == '[object Array]') {
      var arr = Array.prototype.slice.call(arr),
        obj = {},
        resultArr = [];
      arr.forEach(el => {
        if (!obj[el]) {
          obj[el] = true;
          resultArr.push(el)
        }
      });
      return resultArr;
    } else {
      console.log(new Error('请输入一个数组进行去重'))
      return arr;
    }
  },
  uniqArr2: function (arr) {
    /* 
     * @Author: guojufeng@ 
     * @Date: 2018-12-29 10:28:05
     * 数组去重
     * @params {arr}: 要去重的原数组
     * @return {newArr}: 返回去重后的数组
     */
    /* 思路 */
    // 先排序，然后比较前一个和后一个相等的话就不放进新数组
    if (Object.prototype.toString.call(arr) == '[object Array]') {
      arr.sort((a, b) => {
        return a - b;
      });
      var resultArr = [],
        lastItem = arr[0];
      resultArr.push(arr[0]);
      arr.forEach((el) => {
        if (el !== lastItem) {
          resultArr.push(el);
          lastItem = el;
        }
      });
      return resultArr;
    } else {
      console.log(new Error('请输入一个数组进行去重'))
      return arr;
    }
  },
  xingorgIsNaN: function (n) {
    /* 封装数组中的isNaN方法，原理是先调用Number，看返回值是不是NaN，然后字符串化后和'NaN'对比 */
    return 'NaN' == Number(n) + '' ? true : false;
  },
  loadScript: function (url, call) {
    /* 
     * @Author: guojufeng@ 
     * @Date: 2018-12-07 11:10:50
     * js异步加载
     * @params {url}: string,要加载的js地址
     * @params {newArr}: string,加载js完毕后要调用的函数名
     * 示例：loadScript('demo.js','callbackFun');
     */
    var script = document.createElement('script');
    script.type = "text/javascript";
    if (script.readyState) {
      // 兼容ie
      script.onreadystatechange = function () {
        if (script.readyState == 'complete' || script.readyState == 'loaded') {
          this[call]();
        }
      }
    } else {
      script.onload = function () {
        this[call]();
      }
    }
    script.src = url;
    document.head.appendChild(script);
  },
  exponentiation: function (target, n) {
    /* 
     * @Author: guojufeng@ 
     * @Date: 2018-12-12 17:10:00 
     * 计算target的n次幂，
     * @params {target}: number,要计算的数值
     * @params {n}: number,要计算的次幂数
     * 比如：2的3次幂，就传入(2,3)即可
     * 规律：2 * 2 * 2 for循环乘（n-1）次的target
     */
    var result = target,
      len = n - 1;
    for (; n >= len; n--) {
      result *= target;
    }
    return result;
  },
  factorial: function (n) {
    /* 
     * @Author: guojufeng@ 
     * @Date: 2018-12-12 17:19:46 
     * 计算n的阶乘
     * @params {n}: number,要计算阶乘的数
     * 比如：计算7的阶乘，传入7即可。
     * 规律：5的阶乘 5*4*3*2*1；n * (n-1) * ((n-1)-1) * (((n-1)-1)-1) * ((((n-1)-1)-1)-1)
     */
    return n > 1 ? n * this.factorial(n - 1) : 1;
    /* if(n > 1){
      return n * this.factorial(n-1);
    }else{
      return 1;
    } */
  },
  fibonacci: function (n) {
    /* 
     * @Author: guojufeng@ 
     * @Date: 2018-12-12 17:40:07 
     * 斐波那契数列 || 黄金分割数列
     * @params {n}: number,递推出第n项的斐波那契额数列的结果
     * 比如：计算7的结果，传入7即可。
     * 规律：这个数列从第3项开始，每一项都等于前两项之和。 (1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144,)
     * 公式：f(1)=1;f(2)=1;f(3)=f(1)+f(2);f(n)=f(n-1)+f(n-2);(n>=4)
     */
    return n <= 2 ? 1 : this.fibonacci(n - 1) + this.fibonacci(n - 2);
    /* if(n <= 2){
      return 1;
    }else{
      return this.fibonacci(n - 1) + this.fibonacci(n - 2)
    } */
  },
  primeNumber: function (n) {
    /* 
     * @Author: guojufeng@ 
     * @Date: 2018-12-12 18:12:39
     * 找出 质数 || 素数
     * @params {n}: number,得到n以内的质数
     * 规律：一个大于1的自然数，除了1和它自身外，不能整除其他自然数的数叫做质数；2,3,5,7,11,13,17,19,23...
     */
    var arr = [];
    for (var i = 1; i <= n; i++) {
      var count = 0;
      for (var j = 1; j <= i; j++) {
        i % j == 0 ? count++ : ''
      }
      count == 2 ? arr.push(i) : ''
    }
    return arr;
  },
  maxNumber: function () {
    /* 
     * @Author: guojufeng@ 
     * @Date: 2018-12-12 18:25:37 
     * 几个数中求最大值
     * @params {...}: number,多个参数，求最大的那个
     */

    /* 解法一、类数组转数组，排序然后拿第一个 */
    return Array.prototype.slice.call(arguments).sort((a, b) => {
      return b - a
    })[0];
    // 以下两种都能将类数组转成数组
    console.log(Array.prototype.slice.call(arguments));
    console.log([].slice.call(arguments));

    /* 解法二、for循环，比较值 */
    var max = 0,
      len = arguments.length;
    for (var i = 0; i <= len; i++) {
      if (arguments[i] > max) {
        max = arguments[i]
      }
    }
    return max;

  },
  loadScript: function (url, callback) {
    /* 
     * 非阻塞的js动态脚本 插入
     */
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) { //IE
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else { //Others
      script.onload = function () {
        callback();
      };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  },
  getRandomColor: function () {
    /* 获取随机的16进制颜色值 */
    return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
    // 或者可slice取-3，取三位也可以，但是没有这样的颜色值多
  },
  getBytesLen: function (str) {
    /* 返回字节长度
    思路：
      第一种方法，直接定义一个计数器，循环判断当前字符串对应个数上的字符的字节长度，
      利用：str.charCodeAt(s)//返回当前字符的相应字节编码
      若值大于255，就是中文，计数器累加2字节
      若值小于255，则是英文，计数器累加1字节
      最后抛出计数器就是字符的字节总长度
    */
    str = str.toString();
    var strLen = 0;
    for (let s = 0; s < str.length; s++) {
      if (str.charCodeAt(s) >= 255) {
        // 中文，字节为2.
        strLen += 2;
      } else {
        // 非中文,字节为1.
        strLen += 1;
      }
    }
    return strLen;
  },
  getBytesLen02: function (str) {
    /* 返回字节长度 方法二
      思路：
      因为不管中英文，即使全部是英文，有几个字母就是几个字节长度，所以计数器的数目累加基础就是字符串的长度；
      因此，让累加器strLen先等于str.length。并建立一个累加器基础count，记录比1大的字符（也就是汉字字符）
      因为已经加过一了，所以直接在累加器基础再加一即可。
    */
    if (str) {
      str = str.toString();
      var strLen,
        count;
      strLen = count = str.length; //在str的长度基础上
      for (let s = 0; s < strLen; s++) {
        console.log(str.charAt(i), "长度为：" + str.charCodeAt(i));
        if (str.charCodeAt(s) >= 255)
          count++; //字节大于1的再给计数器加1.等于1的就不用管了。
      }
      return count;
    } else {
      throw new Error('error: 请输入一个字符串参数')
    }
  },
  getStrNum: function (str) {
    /* 获取字符个数 - 适用于文本框下的计数器
      获取的字节长度的基础上，除以2再向上取整即可。（或者四舍五入，反正奇数字节长度都是0.5）
    */
    return Math.ceil(getBytesLen(str) / 2);
  },
  getUniqChat: function (str) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2018-12-26 14:31:02 
     * @Last Modified by: @Guojufeng
     * @Last Modified time: 2018-12-29 17:50:34
     * 一个字符串[a-z]组成，请找出该字符串第一个只出现1次的字母5）
     * 思路，有点类似排序，拿着字符串去跟后边的比较。如果有重复的，停止比较，并拿下一个开始比较。如果比较过得，就放弃比较转换下一位比较。如果比较到结束还是没有想同的就是符合条件的
     */
    var arr = str.split(''), //或者不切割成数组，直接str.length + str.charAt(index)，也能实现数组遍历的效果。
      len = arr.length,
      obj = {},
      result;
    console.log(len);
    for (let i = 0; i < len; i++) {
      console.log('当前循环：', arr[i]);
      if (!obj[arr[i]]) { //如果对象中已有，说明对比过且不符合条件，直接不做二次比较
        for (let j = i + 1; j < len; j++) {
          console.log('当前比较：', j, arr[j]);
          if (arr[i] === arr[j]) {
            /* 判断重复，添加到对象中做个记号 */
            console.log(arr[i], '重复');
            obj[arr[i]] = true;
            result = undefined; //重复了，就把结果清空，给下一位腾位置
            break;
          } else {
            result = arr[i];
          }
          if (j == len - 1 && result) {
            /* 遍历到最后，结果还有值，就是这个值。 */
            console.log('结果就是', result);
            return;
          }
        }
      }
    }
    console.log(obj);
    /* 
      无注释版本:
      var arr = str.split(''),
        len = arr.length,
        obj = {},
        result;
      for (let i = 0; i < len; i++) {
        if (!obj[arr[i]]) {
          for (let j = i + 1; j < len; j++) {
            if (arr[i] === arr[j]) {
              obj[arr[i]] = true;
              result = undefined;
              break;
            } else {
              result = arr[i];
            }
            if (j == len - 1 && result) {
              return result;
            }
          }
        }
      }
     */
  },
  uniqContiStr: function (str) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-03 09:57:14 
     * @Last Modified by:   @Guojufeng 
     * @Last Modified time: 2019-01-03 09:57:14 
     * 连续的字符串去重
     * 形如aaaaaaaabbbbbbbbbbbbbbbccccccccccccdde，变成abcde
     */
    if (typeof (str) === 'string') {
      var reg = /(\w)\1+/g;
      return str.replace(reg, '$1');
    } else {
      throw new Error('error: 请输入一个字符串参数')
    }
  },
  uniqStr: function (str) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-03 10:02:12 
     * @Last Modified by:   @Guojufeng 
     * @Last Modified time: 2019-01-03 10:02:12 
     *  字符串去重
     *  形如annnnbksndadsnasd，变成anbksd
     */
    if (typeof (str) === 'string') {
      var reg = /(\w)\1*/g,
        arr = str.replace(reg, '$1').match(reg),
        obj = {},
        resuStr = '';
      arr.forEach(el => {
        if (!obj[el]) {
          obj[el] = true;
        }
      });
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj,key)) {
          resuStr += key;
        }
      }
      return resuStr;
    } else {
      throw new Error('error: 请输入一个字符串参数')
    }

  },
  appointStrNum1: function (str, target) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-03 10:28:52 
     * @Last Modified by:   @Guojufeng 
     * @Last Modified time: 2019-01-03 10:28:52 
     * 检查字符串中某个特定字符出现的次数（或该字符的个数）
     * 原理：for循环
     */
    if (typeof (str) === 'string') {
      var len = str.length,
        count = 0;
      for (let i = 0; i < len; i++) {
        if (str[i] === target) {
          count++
        }
      }
      return count;
    } else {
      throw new Error('error: 请输入一个字符串参数');
    }

    /* 写在原型上
      String.prototype.getInCludes = function(x){
        var len = this.length,
        count = 0;
        for (let i = 0; i < len; i++) {
          console.log(this[i]);
          console.log('------',this.indexOf(x))
          if(this[i] === x){
            count++
          }
        }
        return count;
      }
    */
  },
  appointStrNum2: function (str, target) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-03 10:28:52 
     * @Last Modified by:   @Guojufeng 
     * @Last Modified time: 2019-01-03 10:28:52 
     * 检查字符串中某个特定字符出现的次数（或该字符的个数）
     * 原理：split
     */
    if (typeof (str) === 'string') {
      return str.split(target).length - 1;
    } else {
      throw new Error('error: 请输入一个字符串参数');
    }
    /* 写在原型上：
      // 判断一个字符串中，指定字符的个数
      String.prototype.getInCludes = function(x){
        console.log(this.split(x))
        return (this.split(x).length - 1)
      }
     */
  },
  appointStrNum3: function (str, target) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-03 10:28:52 
     * @Last Modified by:   @Guojufeng 
     * @Last Modified time: 2019-01-03 10:28:52 
     * 检查字符串中某个特定字符出现的次数（或该字符的个数）
     * 原理：正则 + match
     */
    if (typeof (str) === 'string') {
      var reg = new RegExp(target, 'g');
      return str.match(reg).length
    } else {
      throw new Error('error: 请输入一个字符串参数')
    }
  },
  scienceNote: function (str) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-03 14:27:08 
     * @Last Modified by:   @Guojufeng 
     * @Last Modified time: 2019-01-03 14:27:08 
     * 科学记数法
     * 思路：因为要返着遍历，所以利用split将字符串切割成数组，再用数组的reverse方法翻转。遍历使用数组的forEach进行，通过回调函数的el和i参数，判断当i%3==0并且i不为0的时候，就是除了第一位0，其他在3的倍数的位都替换成“,”+el的情况。拼接而成的字符串还是返着的，还需要返回来。再次利用split+reverse。不过这次翻转后结果成了数组。最后利用数组的join传空串，将数组每一项连成字
     */
    str = str + '';
    var arr = str.split('').reverse(), // reverse修改原数组
      resultStr = '';
    arr.forEach((el, i) => {
      if (i % 3 == 0 && i != 0) {
        resultStr += ',' + el;
      } else {
        resultStr += el
      }
    })
    /* 翻转字符串？
      字符串切割成数组，数组翻转，再粘合成字符串：str.split('').reverse().join('')
     */
    return resultStr.split('').reverse().join('');
    console.log(arr, resultStr, resultStr.split('').reverse().join(''))
  },
  scienceNote2: function (str,symb) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-03 14:27:08 
     * @Last Modified by:   @Guojufeng 
     * @Last Modified time: 2019-01-03 14:27:08 
     * 科学记数法
     * 思路：归根结底还是要变成数组翻转后，再拼成字符串，通过正则切割成以1-3位分割的样子。因为正则的贪婪匹配，会自动给我们优先分割成三位，最后不够三位的自动组成一起。然后巧妙利用数组join()不传参就是逗号","分割的特点将字符串加上逗号。然后再把字符串切割并翻转过来，然后把带有逗号的数组拼接成我们想要的字符串。
     * @params {str}: string,要转换的字符串
     * @params {symb}: string,用什么符号分割， 不传就是“,”分割
     */
    str += '';
    str = str.split('').reverse().join('');
    var reg = /\d{1,3}/g,
        arr = str.match(reg);
    var result = arr.join().split('').reverse().join('');
    if(symb){
      symb += '';
      result = arr.join(symb).split('').reverse().join('');
    }else{
      result = arr.join().split('').reverse().join('');
    }
    return result;
  },
  scienceNote3: function (str,symb) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-03 14:27:08 
     * @Last Modified by:   @Guojufeng 
     * @Last Modified time: 2019-01-03 14:27:08 
     * 科学记数法 - 正则
     * @params {str}: string,要转换的字符串
     * @params {symb}: string,用什么符号分割， 不传就是“,”分割
     * 此题先找规律：从后往前查，每三位打一个点。所以我们肯定要匹配一个东西然后换成另一个东西。至于匹配啥替 换啥呢？就是倒着匹配每第三位的空，然后换成'，'号。什么样的“空”？如果匹配后边有三个数的空，就只能匹配一个，但是无论后边有几个数，但是一定有一个规律就是，后边所有的数一定是三的倍数：
      要达到这个规律，需要下边几个条件
      1、从后往前查就要以"$"：表示以这个条件结尾。
      2、三位数字“\d{3}”
      3、三的倍数位数字“(\d{3})+"
      4、找空，但是后边是3的倍数位的数字的空，正向预查："?="
      5、空的前边得是非单词边界，要不然出现下边这样的情况：,100,000
      最后，根据上边的条件，查到我们的目标“空”,并替换成指定symbol格式：
     */
    str += '';
    symb += '';
    var reg = /(?=(\B)(\d{3})+$)/g;
    return str.replace(reg,symb);
  }
}