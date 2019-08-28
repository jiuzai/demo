const WIDTH_W = wx.getSystemInfoSync().windowWidth;
const HEIGHT_W = wx.getSystemInfoSync().windowHeight;
export default class Enemy{
  constructor(){
    this.enemyAudio = wx.createInnerAudioContext();
    this.enemyAudio.src = 'audio/boom.mp3';
    
    this.width = 20;
    this.height = 20;
    this.fire = false;/*敌人是否活动*/
    this.border = 100;
    this.life_r = 20;/*判定半径*/
    
  }

  createEnemy(hp, atk, speed, player){
    this.HP = hp;/*敌人血量*/
    this.score = hp;/*血量即是分值*/
    this.atk = atk;/*敌人攻击力*/
    this.speed = speed;/*敌人速度*/
    this.life = 10000;/*生命周期*/
    this.fire = true;
    /*基于原点的偏移量*/
    this.x = 0;
    this.y = 0;
    /*出发点*/
    var l = Math.random();
    // console.log("Enemy: " + l);
    if(l < 0.25){/*上方*/
      this.X = Math.random() * (WIDTH_W + (this.border * 2)) - this.border;/*X轴全*/
      this.Y = -Math.random() * this.border;/*负 上Y*、
    }
    else if(l < 0.50){/*右*/
      this.X = Math.random() * this.border + WIDTH_W;/*X轴右方*/
      this.Y = Math.random() * (HEIGHT_W + (this.border * 2)) - this.border;/*Y轴全*/
    }
    else if (l < 0.75) {/*下*/
      this.X = Math.random() * (WIDTH_W + (this.border * 2)) - this.border;/*X轴全*/
      this.Y = Math.random() * this.border + HEIGHT_W;/*Y轴下方*/
    }
    else{/*左*/
      this.X = -Math.random() * this.border;/*X轴左*/
      this.Y = Math.random() * (HEIGHT_W + (this.border * 2)) - this.border;/*Y轴全*/
    }
  // this.X = 100 + this.width / 2;
  // this.Y = 100 + this.height / 2;
    // this.X = 100;
    // this.Y = 100;
    // console.log("Enemy: x = " + this.X + " y = " + this.Y);
    // this.X = Math.random() > 0.5 ? (Math.random() * 100 + WIDTH_W) : (-Math.random() * 100);
    // this.Y = Math.random() > 0.5 ? (Math.random() * 100 + HEIGHT_W) : (-Math.random() * 100);
    // this.x = 0;
    // this.y = 0;
    this.rotate = Math.atan2((player.getY() - this.Y), (player.getX() - this.X));
    // console.log("EnemyController: rotate = " + this.rotate);
    // console.log("Enemy: x = " + this.X + " y = " + this.Y + " rotate = " + this.rotate);/*输出基本信息*/
  }
  draw(ctx) {
    ctx.save();
    // var X = this.x + (this.width / 2);
    // var Y = this.y + (this.height / 2);
    // console.log(X + " " + Y)
    ctx.translate(this.X, this.Y);
    ctx.rotate(this.rotate);
    ctx.fillStyle = "#ff4800";
    /*this.x -this.width / 2 才是真正的中心*/
    ctx.fillRect(this.x - this.width / 2, -this.height / 2, this.width, this.height);/*Y轴偏移一般的边长*/
    // ctx.fillStyle = "red";
    // ctx.fillRect(-(this.width / 2), -(this.height / 2), this.width / 16, this.height / 16);
    ctx.restore();
    this.x += this.speed;
    // console.log("Player.class: X = " + X + " Y = " + Y);
  }

  fly(ctx, player, ui) {
    this.draw(ctx);
    this.recovery(ui);
    this.crash(player);
  }
  /*回收机制*/
  recovery(ui){
    if(this.life > 0){
      this.life--;
    }
    else{
      this.fire = false;
    }
    if(this.HP <= 0){
      this.enemyAudio.play();
      ui.setScore(ui.getScore() + this.score);
      this.fire = false;
    }
  }
  /*工具方法*/
  getX(ctx) {
    // var yy = this.Y + this.x * Math.sin(this.rotate);
    // var xx = this.X + this.x * Math.cos(this.rotate);
    // console.log(xx);
    // console.log(yy);
    // ctx.arc(xx, yy, 20, 0, 2 * Math.PI);
    // ctx.fillStyle = "red";
    // ctx.fill();
    return this.X + this.x * Math.cos(this.rotate);
  }
  getY() {
    return this.Y + this.x * Math.sin(this.rotate);
  }
  getLife_r(){
    return this.life_r;
  }
  /*碰撞玩家削减HP 并销毁自身*/
  crash(player) {
    // console.log(player.getLife_r());
    if(Math.sqrt(Math.pow(this.getY() - player.getY(), 2) + Math.pow(this.getX() - player.getX(), 2)) < player.getLife_r() + this.getLife_r()) {
      player.HP -= this.atk;
      // console.log("Enemy: player_HP:" + player.HP);
      this.fire = false;
      return true;
    }
  }

}