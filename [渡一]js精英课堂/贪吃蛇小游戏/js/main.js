/*
 * @Author: @Guojufeng 
 * @Date: 2018-12-13 14:55:22 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-02-01 14:01:11
 */

var debug = true;
var pauseDom = document.getElementById('pause'), //暂停|开始按钮
  foodDom = document.getElementById('food'), // 食物
  foodBodyDom = document.getElementById('foodBody'), //为了给食物改颜色获取的。
  snakeDom = document.getElementById('snake'); //蛇
function SnakeGame() {
  var contDom = document.getElementById('cont');
  this.canOw = contDom.clientWidth; // 视口宽度
  this.canOh = contDom.clientHeight; // 视口高度
  this.timer = null;
  this.foodSize = 20; //食物尺寸 - 宽、高
  // this.foodOh = 20; //食物尺寸 - 高
  this.foodL = parseInt(Math.random() * (this.canOw - this.foodSize)); //随机的食物left位置点
  this.foodT = parseInt(Math.random() * (this.canOh - this.foodSize)); //随机的食物top位置点
  /* 蛇 */
  this.snakeSize = 20; //蛇身
  this.range = 200; //蛇位置初始时，与墙壁的安全距离
  var snakeL = Math.floor(Math.random() * this.canOw + this.range); //[300 - clientW-300]
  var snakeT = Math.floor(Math.random() * this.canOh + this.range); //[300 - clientH-300]
  var leftRange = this.canOw - this.range,
    topRange = this.canOh - this.range;
  /* 蛇身随机出现的位置 */
  this.snakeL = snakeL > leftRange ? leftRange : snakeL;
  this.snakeT = snakeT > topRange ? topRange : snakeT;
  this.snakeBody = [
    [4, 1, 'head'],
    [3, 1, 'body'],
    [2, 1, 'body'],
    [1, 1, 'body']
  ]; //蛇的数据模型：[x,y,身体某一节]
  /* 游戏属性 */
  this.dir = 'right'; //蛇头朝向
}
SnakeGame.prototype.init = function () {
  /* 初始化效果 */
  var start = document.getElementById('start');
  xingorg1Utils.addHander(start, 'click', (e) => {
    // 点击开始游戏 - 绑定事件
    start.className = 'start hide'; //隐藏开始按钮
    if (debug) {
      this.startGame();
      this.showFood();
    } else {
      this.countDown()
        .then(() => {
          // 倒计时结束后真正开始
          console.log(this);
          this.startGame();
          this.showFood();
        });
    }
  });
};
SnakeGame.prototype.countDown = function () {
  /* 预备 - 倒计时功能 */
  var countDown = document.getElementById('countDownBox');
  countDown.style.display = 'block';
  countDown.innerText = '预备';
  return new Promise((resolve) => {
    var count = 3;
    var timer = setInterval(() => {
      if (count < 1) {
        clearInterval(timer);
        timer = null;
        countDown.style.display = 'none';
        countDown.className = 'count-down';
        resolve();
      } else {
        countDown.className = 'count-down ani';
        countDown.innerText = count;
        countDown.style.color = xingorg1Utils.getRandomColor(); //文字随机换色
        count--;
      }
    }, 1000);
  });
};
SnakeGame.prototype.startGame = function () {
  /* 开始游戏 */
  console.log('游戏开始');
  pauseDom.className = 'pause-btn on'; //左上角按钮修改
  // 初始化蛇
  this.snakeInit();
  xingorg1Utils.addHander(pauseDom, 'click', (e) => {
    // 点击左上角暂停|开始游戏 - 绑定事件
    if (pauseDom.className.indexOf('off') !== -1) {
      pauseDom.style.display = 'none';
      if (debug) {
        pauseDom.style.display = 'block';
        pauseDom.className = 'pause-btn on'; //暂停状态下-继续开始
        // 代做 - start蛇的运动
      } else {
        this.countDown()
          .then(() => {
            pauseDom.style.display = 'block';
            pauseDom.className = 'pause-btn on'; //暂停状态下-继续开始
            // 代做 - start蛇的运动
          });
        console.log('游戏重启');
      }
    } else {
      pauseDom.className = 'pause-btn off'; //开始状态下-点击暂停
      console.log('游戏暂停');
      // 代做 - 停止蛇的运动
    }
  })
};
SnakeGame.prototype.snakeInit = function () {
  /* 蛇的初始化 */
  snakeDom.className = 'snake-box'; //展示蛇
};
SnakeGame.prototype.snakeCreat = function (oL, oT) {
  /* 生成蛇 */
  
};

SnakeGame.prototype.showFood = function () {
  /* 出现食物、并随机更改食物的颜色值和位置 */
  foodDom.style.left = this.foodL + 'px';
  foodDom.style.top = this.foodT + 'px';
  foodBodyDom.style.background = xingorg1Utils.getRandomColor();
  foodDom.className = 'food show';
};
SnakeGame.prototype.hideFood = function () {
  /* 吃掉食物 */
  foodDom.className = 'food hide';
};
window.onload = function () {
  /* 阻止浏览器双击默认事件-----双击选中 */
  document.ondragstart = document.onselectstart = function () {
    return false;
  };
  /* 初始化程序 */

  var myGame = new SnakeGame();
  myGame.init();
}


/* */
// setInterval(()=>{
//   // xingorg1Utils.getRandomColor()
//   console.log(Math.floor(Math.random() * 6) + 3)
// },100) 



/* 实例结构 
var snakeGame = {
  canOw: cont.clientWidth,
  canOh: cont.clientHeight,
  foodOw: 20,
  foodOh: 20,
  snake: [[3,1,'head'],[2,1,'body'],[1,1,'body']],
  init: function(){
    console.log(this.canOw,this.canOh);
    this.startGame();
  },
  startGame: function(){
  }
} */