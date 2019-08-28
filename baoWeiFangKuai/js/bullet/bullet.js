const WIDTH_W = wx.getSystemInfoSync().windowWidth;
const HEIGHT_W = wx.getSystemInfoSync().windowHeight;
export default class Bullet{
  constructor(atk, speed, rotate){
    
    this.radius = 5;
    this.style = "#0af2c4";
    this.fire = false;
    // console.log("子弹创建");
    this.life_r = 5;/*判定半径*/
  }
  /*发射*/
  launch(atk, speed, rotate, x, y, ctx){
    this.atk = atk;
    this.speed = speed;
    this.rotate = rotate;
    /*原点偏移量*/
    this.x = 0;
    this.y = 0;
    /*原点*/
    this.X = x;
    this.Y = y;
    this.fire = true;
    // console.log("bullet.class:发射");
  }
  /*飞行*/
  fly(ctx, enemys){
    this.draw(ctx);
    this.recovery(enemys);
  }
  draw(ctx){
    // ctx.globalAlpha = 0.5;
    
    ctx.save();
    ctx.translate(this.X, this.Y);
    // console.log("bullet.class: X = " + this.X + " Y = " + this.Y);
    // console.log("bullet.class: x = " + this.x + " y = " + this.y);
    // ctx.moveTo(this.x, 0);/*移动点位*/
    ctx.rotate(this.rotate);
    // ctx.fillStyle = this.style;
    // var grad = ctx.createRadialGradient(this.x, 0, this.radius, this.x, 0, this.radius / 2);
    // grad.addColorStop(0, 'green');
    // grad.addColorStop(0.5, 'yellow');
    // grad.addColorStop(1, 'white');

    ctx.fillStyle = this.style;

    ctx.beginPath()
    ctx.moveTo(this.x + this.radius, 0);/*移动点位*/
    ctx.arc(this.x, 0, this.radius, 0, 2 * Math.PI, true);
    ctx.closePath();
    
    // ctx.fillRect(this.x, 0, this.radius, this.radius);

    // ctx.strokeStyle = "white";
    // ctx.stroke()/*白色边框*/

    ctx.fill();
    ctx.restore();
    this.x += this.speed;
  }
  /*回收*/
  recovery(enemys){
    if (this.x > HEIGHT_W + 100 || this.x < 0 - 100 || this.y > HEIGHT_W + 100 || this.y < 0 - 100){
      this.fire = false;
    }
    if (this.crash(enemys)){
      this.fire = false;
    }
  }
  /*工具方法*/
  getX(){
    // var yy = this.Y + this.x * Math.sin(this.rotate);
    // var xx = this.X + this.x * Math.cos(this.rotate);
    // console.log(xx);
    // console.log(yy);
  // ctx.arc(xx, yy, 20, 0, 2 * Math.PI);
  // ctx.fillStyle = "red";
  // ctx.fill();
    return this.X + this.x * Math.cos(this.rotate);
  }
  getY(){
    return this.Y + this.x * Math.sin(this.rotate);
  }
  getLife_r() {
    return this.life_r;
  }
  /*碰撞敌人消灭敌人*/
  crash(enemys){
    for(var i = 0; i < enemys.length; i++){
      if(enemys[i].fire && Math.sqrt(Math.pow(this.getY() - enemys[i].getY(), 2) + Math.pow(this.getX() - enemys[i].getX(), 2)) < this.getLife_r() + enemys[i].getLife_r()){
        enemys[i].HP -= this.atk;
        return true;
      }
    }
    return false;
  }
}