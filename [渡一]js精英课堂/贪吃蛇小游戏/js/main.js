/*
 * @Author: @Guojufeng 
 * @Date: 2018-12-13 14:55:22 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2018-12-14 16:57:17
 */

function SnakeGame(){
  var cont = document.getElementById('cont');
  var pause = document.getElementById('pause');//暂停|开始按钮
  var food = document.getElementById('food');
  var snake = document.getElementById('snake');//蛇
  this.canOw = cont.clientWidth;
  this.canOh = cont.clientHeight;
  this.foodOw = 20;
  this.foodOh = 20;
  this.foodL = parseInt(Math.random() * (this.canOw - this.foodOw));
  this.foodT = parseInt(Math.random() * (this.canOh - this.foodOh));
  this.snake = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
}
SnakeGame.prototype.init = function(){
  console.log(this.canOw,this.canOh);
  this.startGame();
  this.showFood();
};
SnakeGame.prototype.startGame = function(){
  console.log('ssssssss')
};
SnakeGame.prototype.showFood = function(){
  console.log(this)
  food.style.left = this.foodL + 'px';
  food.style.top = this.foodT + 'px';
  food.className = 'food show';
};
window.onload = function(){
  /* 阻止浏览器双击默认事件-----双击选中 */
  document.ondragstart = document.onselectstart = function(){return false;};
  console.log(window)
  var myGame = new SnakeGame();
  myGame.init()
}
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