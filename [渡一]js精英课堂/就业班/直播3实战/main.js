/*
 * @Author: @Guojufeng 
 * @Date: 2019-01-18 07:17:58 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-01-18 21:29:04
 */
console.log('学生管理系统')
/* tab选项卡新写法 */
var nav = document.getElementById('nav'),
  dd = nav.getElementsByTagName('dd'),
  container = document.getElementById('container'),
  displayCont = container.getElementsByClassName('cont-items'),
  curIndex = 0;
Array.prototype.forEach.call(dd, function (el, i) {
  dd[i].onclick = function (e) {
    console.log(e.target, e.target.classList.add())
    //当前点击的是已经选中的，不做任何处理。
    if (i == curIndex) {
      return false;
    }
    //当前点击的nav-list添加选中cur类名
    this.className = 'cur';
    // 当前点击的nav-list对应的cont内容展示出来
    displayCont[i].className = 'cont-items';
    //上一次添加了cur类名的nav-list清除类名
    dd[curIndex].className = '';
    // 上一次展示的内容隐藏
    displayCont[curIndex].className = 'cont-items hide';
    //本次点击的索引成了上一次，进行备份
    curIndex = i;
  }
});
/* 数据获取 */
var path = 'http://api.duyiedu.com';
Ajax.request({
  url: path + "/api/student/findAll",
  data: {
    appkey: 'xingorg1_1547735306291',
  },
  success: function (xhr) {
    console.log(xhr)
  },
  error: function (xhr) {

  }
});
/* ajax({
  url: path + "/api/student/findAll",
  data: {
    appkey: 'xingorg1_1547735306291',
  },
  method: 'get',
  success: function (xhr) {
    console.log(xhr)
  },
  error: function (xhr) {
  }
}); */