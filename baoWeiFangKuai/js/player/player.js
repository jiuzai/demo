import Bullet from '../bullet/bullet.js';
export default class Player {
  /*构造函数*/
  constructor(x, y){
    // this.shootAudio = new Audio();
    // this.shootAudio.src = 'audio/bullet.mp3';
    this.bulletAudio = wx.createInnerAudioContext();
    this.bulletAudio.src = 'audio/bullet_3.mp3';

    this.time = 0;/*发射时间*/
    this.shoot_t = 5;/*射击间隔*/
    this.B_L = 50;/*子弹对象池大小*/

    this.life_r = 10;/*判定半径*/
    console.log("Player: 创建player");
    this.HP = 10;
    this.HP_MAX = 10;
    this.atk = 1;
    
    this.width = 40;
    this.height = 40;
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;
    this.rotate = Math.PI / 2;
    this.bullet_s = 5;/*子弹速度*/
    this.createBullets();/*创建子弹对象池*/
  }
  /*死亡*/
  dead(){

  }
  /*行动*/
  action(ctx, enemys){
    this.shoot(ctx);/*发射子弹并绘制*/
    this.draw(ctx);/*绘制人物*/
    this.fly(ctx, enemys);
  }
  /*发射子弹*/
  shoot(ctx){
    if(this.time > 0){
      this.time--;
    }
    else{
      // console.log(this.bulletAudio);
      // this.bulletAudio.onPlay(function(){
      //   console.log("开始");
      // });
      this.bulletAudio.play();
      this.time = this.shoot_t;
      for(var i = 0; i < this.B_L; i++){
        if(!this.bullets[i].fire){
          this.bullets[i].launch(this.atk, this.bullet_s, this.rotate, this.x + (this.width / 2), this.y + (this.height / 2), ctx);
          // console.log(i);
          // console.log("player: 发射X1");
          break;
        }
      }
    }
  }
  /*子弹飞行绘制*/
  fly(ctx, enemys){
    for (var i = 0; i < this.B_L; i++) {
      if (this.bullets[i].fire) {
        // console.log("player: 飞行");
        this.bullets[i].fly(ctx, enemys);
      }
    }
  }

  draw(ctx){
    ctx.save();
    var X = this.x + (this.width / 2);
    var Y = this.y + (this.height / 2);
    // console.log(X + " " + Y)
    ctx.translate(X, Y);
    ctx.rotate(this.rotate);
    ctx.fillStyle = "#35c4ff";
    ctx.fillRect(-(this.width / 2), -(this.height / 2), this.width, this.height);
    // ctx.fillStyle = "red";
    // ctx.fillRect(-(this.width / 2), -(this.height / 2), this.width / 16, this.height / 16);
    ctx.restore();
    // console.log("Player.class: X = " + X + " Y = " + Y);
  }

  /*子弹对象池*/
  createBullets() {
    console.log('Player: 创建子弹对象池');
    this.bullets = new Array();
    for (var i = 0; i < this.B_L; i++) {
      this.bullets[i] = new Bullet();
    }
  }

/*工具方法*/
  getX(){
    return this.x + this.width / 2;
  }
  getY(){
    return this.y + this.height / 2;
  }
  getLife_r() {
    return this.life_r;
  }
}