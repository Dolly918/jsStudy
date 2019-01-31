/*
 * @Author: @Guojufeng 
 * @Date: 2018-12-13 14:55:22 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-01-31 23:47:25
 */

function SnakeGame() {
  var cont = document.getElementById('cont'),
    pause = document.getElementById('pause'), //暂停|开始按钮
    food = document.getElementById('food'), // 食物
    foodBody = document.getElementById('foodBody'), //为了给食物改颜色获取的。
    snake = document.getElementById('snake'); //蛇
  this.canOw = cont.clientWidth; // 视口宽度
  this.canOh = cont.clientHeight; // 视口高度
  this.foodOw = 20; //食物尺寸 - 宽
  this.foodOh = 20; //食物尺寸 - 高
  this.foodL = parseInt(Math.random() * (this.canOw - this.foodOw)); //食物的left位置点
  this.foodT = parseInt(Math.random() * (this.canOh - this.foodOh)); //食物的top位置点
  this.snake = [
    [3, 1, 'head'],
    [2, 1, 'body'],
    [1, 1, 'body']
  ]; //蛇的数据模型


}
SnakeGame.prototype.init = function () {
  var start = document.getElementById('start');
  xingorg1Utils.addHander(start, 'click', (e) => {
    // 点击开始游戏 - 绑定事件
    start.className = 'start hide'; //隐藏开始按钮
    this.countDown()
      .then(() => {
        // 倒计时结束后真正开始
        console.log(this);
        this.startGame();
        this.showFood();
      });

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
  pause.className = 'pause-btn on'; //左上角按钮修改
  xingorg1Utils.addHander(pause, 'click', (e) => {
    // 点击左上角暂停|开始游戏 - 绑定事件
    if (pause.className.indexOf('off') !== -1) {
      pause.style.display = 'none';
      this.countDown()
        .then(() => {
          pause.style.display = 'block';
          pause.className = 'pause-btn on'; //暂停状态下-继续开始
        });
      console.log('游戏重启')
    } else {
      pause.className = 'pause-btn off'; //开始状态下-点击暂停
      console.log('游戏暂停');
      // 代做 - 停止蛇的运动
    }
  })
  console.log('游戏开始');
};
SnakeGame.prototype.showFood = function () {
  food.style.left = this.foodL + 'px';
  food.style.top = this.foodT + 'px';
  foodBody.style.background = xingorg1Utils.getRandomColor();
  food.className = 'food show';
};
window.onload = function () {
  /* 阻止浏览器双击默认事件-----双击选中 */
  document.ondragstart = document.onselectstart = function () {
    return false;
  };
  var myGame = new SnakeGame();
  myGame.init();
}


// setInterval(()=>{
// xingorg1Utils.getRandomColor()
// },1000)


/* var snakeGame = {
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