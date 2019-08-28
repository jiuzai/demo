import Player from './player/player.js';
// import Bullet from './bullet/bullet.js';
import Background from './background.js';
import EnemyController from './enemy/enemyController.js';
import Enemy from './enemy/enemy.js';
import UI from './UI/UI.js';
import GameOver from './page/gameOver.js';
import GameStart from './page/gameStart.js';

const canvas = wx.createCanvas()
let ctx = canvas.getContext('2d')

const WIDTH_W = wx.getSystemInfoSync().windowWidth;
const HEIGHT_W = wx.getSystemInfoSync().windowHeight;
const window = GameGlobal;
const gameAudio = wx.createInnerAudioContext();
gameAudio.src = 'audio/bgm.mp3';
export default class Main{
  constructor(){
    gameAudio.play();
    /*背景音乐循环*/
    gameAudio.onEnded(function () {
      console.log(gameAudio);
      gameAudio.play();
    });
    this.time = 0;/*触点清除标识符*/
    this.gameStart = new GameStart();
    this.restart();
    wx.onTouchMove(function (res) {
      this.time = 10;/*触点清除 帧数*/
      var x = res.changedTouches[0].clientX;
      var p_x = this.player.x + (this.player.width / 2);
      var y = res.changedTouches[0].clientY;
      var p_y = this.player.y + (this.player.height / 2);
      var rotate = Math.atan2((y - p_y), (x - p_x));
      // console.log("Main.class:" + rotate);
      this.player.rotate = rotate;
      /*移动触 的点*/
      this.touchMoveX = x;
      this.touchMoveY = y;
    }.bind(this))
    wx.onTouchStart(function (res) {
      this.time = 10;/*触点清除 帧数*/
      var x = res.changedTouches[0].clientX;
      var p_x = this.player.x + (this.player.width / 2);
      var y = res.changedTouches[0].clientY;
      var p_y = this.player.y + (this.player.height / 2);
      var rotate = Math.atan2((y - p_y), (x - p_x));
      // console.log("Main.class:" + rotate);
      this.player.rotate = rotate;
      /*开始触 的点*/
      this.touchStartX = x;
      this.touchStartY = y;
      // console.log("Main: x = " + x, " y = " + y);
    }.bind(this))
    
  }
  restart(){
    
    this.player = new Player(WIDTH_W / 2, HEIGHT_W / 2);/*玩家 默认初始化到屏幕中间*/
    this.bindLoop = this.loop.bind(this);/*帧循环系统*/
    this.background = new Background();/*创建背景类*/
    this.E_C = new EnemyController();/*敌人生成器*/
    this.ui = new UI();/*UI对象*/
    this.gameStart = new GameStart();/*游戏开始对象*/
    this.gameOver = new GameOver();/*游戏结束对象*/
    this.bindLoop();
    
  }
  /*帧循环*/
  loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // console.log("Main: ", canvas.width, canvas.height);
    if(this.time < 0){
      this.touchStartX = 0;
      this.touchStartY = 0;
      this.touchMoveX = 0;
      this.touchMoveY = 0;
    }
    else{
      this.time--;
    }
    // canvas.height = canvas.height;/*简易清屏*/
    if (this.gameOver.gameOver(ctx, this.ui, this.touchStartX, this.touchStartY, this.player)) {
      /*返回true 游戏结束*/
      
    }
    else{
      if (!this.gameStart.gameStart(ctx, this.ui, this.touchStartX, this.touchStartY)) {
        // console.log("Main: Start");
      }
      else {
        
        /*若游戏没结束则开始游戏*/
        // ctx.clearRect(0, 0, WIDTH_W, HEIGHT_W);
        // console.log("完成");
        this.background.draw(ctx);/*绘制背景*/
        this.player.action(ctx, this.E_C.enemys);
        this.E_C.action(ctx, this.player, this.ui);/*敌人控制器*/
        this.ui.draw(ctx, this.player);/*绘制UI*/
      }
    }
    
    window.requestAnimationFrame(this.bindLoop);
    
  }

  gameOver(){
    if(this.player.HP > 0){
      return false;
    }
    else{
      return true;
    }
  }
}