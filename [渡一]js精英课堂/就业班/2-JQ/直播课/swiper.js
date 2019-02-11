/*
 * @Author: @Guojufeng 
 * @Date: 2019-02-11 20:45:23 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-02-11 22:07:50
 */
/* $('div').swiper({
  imgList: ['1','2','3'],
  showBtn: false,
  imgWidth: 300,
  pragration: true
}) */
// 面向对象的好处
// 节省空间、省栈内存
// 防止变量名冲突

(function () {
  // 面向对象编程(把所有变量以对象属性的方式存在，所有的函数以对象方法的形式存在)的方式 - 只要最后返回的是一个对象就行
  function Swiper(options) {
    // 构造函数最终要返回this，所以把所有方法和属性都挂载到this对象上即可
    this.father = options.hisFather;//轮播图父级
    this.imgList = options.imgList;//轮播图片列表
    this.len = this.imgList.length;
    this.showBtn = options.showBtn;//是否显示左右按钮
    this.imgWidth = options.imgWidth || $(this.father).width();//图片的宽度，初始化或自定义
    this.imgHeight = options.imgHeight || '100%';//图片的宽度，初始化或自定义
    this.nowIndex = 0; //当前展示页面的索引值

    this.flag = false;//当前图片是否完全展示出来（锁）
    
    this.createDom();
    this.initStyle();
    this.bindEvent();

  }
  Swiper.prototype.createDom = function () {
    /* 创建轮播图结构 */
    // 轮播图区域
    console.log(this)
    var oCont = $('<div class="swiper"></div>'),
      oImgList = $('<div class="swiper-list"></div>'),
      //  len = this.imgList.length,
      oDotBtn = $('<div class="dot"></div>')
    for (let i = 0; i < this.len; i++) {
      $('<li><img src="' + this.imgList[i] + '"/></li>').appendTo(oImgList)
      $('<span></span>').appendTo(oDotBtn);
    }
    oCont.append(oImgList)
      .append('<div class="left-btn"> &lt; </div><div class="right-btn"> &gt; </div>')
      .append(oDotBtn)
      .appendTo(this.father);

  }
  Swiper.prototype.initStyle = function () {
    /* 默认样式 */

  }

  Swiper.prototype.bindEvent = function () {
    /* 绑定事件 */
    $('left-btn').on('click', () => {
      // 点击左侧按钮
      this.move('prev');
    })
    $('right-btn').on('click', () => {
      // 点击右侧按钮
      this.move('next');
    })
    $('.dot').on('click', 'span', () => {
      // 点击小圆点
      var index = $(this).index() //获取当前点击span的索引值
      this.move(index);
    })
  }
  Swiper.prototype.slideAuto = function (dir) {
    /* 自动轮播 */
    var self = this;
    clearTimeout(this.timer);
    self.timer = setTimeout(function () {
      self.move('next');
    }, 1000);
  }
  Swiper.prototype.move = function (dir) {
    /* 运动函数 - 切换图片 */
    if (this.flag) {
      // 判断当前展示图片是否运动完毕，否的话就不进行移动，直接退出
      return false;
    }
    // 当前图片展示完毕，可以进行换图操作了，加锁
    this.flag = true;

    // 判断切换方向，* 这里switch的处理比我当初js版的轮播好多了
    switch (dir) {
      case 'prev'://用中文标记的方法可以借鉴
        //上一张
        if (this.nowIndex == 0) {
          this.nowIndex = this.len - 1;
        } else {
          this.nowIndex--;
        }
        break;
      case 'next':
        //下一张
        if (this.nowIndex == this.len - 1) {
          this.nowIndex = 0;
        } else {
          this.nowIndex++;
        }
        break;
      default:
        //任意一张
        this.nowIndex = dir;
        break;
    }
    // 淡入淡出效果
    $('swiper-list li').fadeOut().eq(this.nowIndex).fadeIn(() => {
      // 当图片完全展示出来后，自动轮播，并加锁
      this.slideAuto();
      this.flag = false;
    });
    // 改变小点的样式
    $('.dot span').eq(this.nowIndex).addClass('active').siblings('span').removeClass('active');
  }




  // 将swiper方法扩展到jq上，就好像在jq的prototype上添加一个方法一样。只能通过这种方式来做。
  $.fn.extend({
    swiper: function (options) {
      options.hisFather = $(this) || $('body'); //保存轮播图的父级 兼容父级不是一个元素调用的情况
      new Swiper(options); //调用，执行构造函数。
      // return this;//为了jq的链式调用，返回jq对象
    }
  })
})();