/*游戏结束画面*/
const WIDTH_W = wx.getSystemInfoSync().windowWidth;
const HEIGHT_W = wx.getSystemInfoSync().windowHeight;
export default class GameOver{
  constructor(){
    this.over = true;/*游戏结束标识符*/
    this.t1_X = WIDTH_W / 2 - 110;
    this.t1_Y = 200;
    this.t2_X = WIDTH_W / 2 - 10;
    this.t2_Y = 240;
    this.t3_X = WIDTH_W / 2;
    this.t3_Y = 260;

    this.t4_X = WIDTH_W / 2 - 20;
    this.t4_Y = 400;

    this.t6_width = 100;
    this.t6_height = 40;
    this.t6_X1 = WIDTH_W / 2 - this.t6_width / 2;
    this.t6_Y1 = 380;
    this.t6_X2 = this.t6_X1 + this.t6_width;
    this.t6_Y2 = this.t6_Y1 + this.t6_height;

    this.t5_width = 100;
    this.t5_height = 5;
    this.t5_X = WIDTH_W / 2 - this.t5_width / 2;
    this.t5_Y = 410;
    
  }
  gameOver(ctx, ui, x, y, player) {
    if(player.HP <= 0){
      /*游戏结束渲染*/
      this.draw(ctx, ui);
      this.again(ui, x, y, player);
      return true;
    }
    else{
      return false;
    }
    
  }
  draw(ctx, ui) {
    // console.log("Game Over!");
    // console.log("背景绘制");
    ctx.fillStyle = "#000";
    // console.log("x = " + WIDTH_W + " Y = " + HEIGHT_W);
    ctx.fillRect(0, 0, WIDTH_W, HEIGHT_W);
    // console.log(ui);
    ctx.fillStyle = "white";
    ctx.font = "40px sans-serif";
    ctx.fillText("Game Over!", this.t1_X, this.t1_Y);
    ctx.font = "15px sans-serif";
    ctx.fillText("分数", this.t2_X, this.t2_Y);

    this.count(ui.getScore() == null ? 0 : ui.getScore());
    ctx.fillText(ui.getScore(), this.t3_X - this.ct * 5, this.t3_Y);
    this.ct = 0;
    ctx.fillText("Again", this.t4_X, this.t4_Y);
    ctx.fillRect(this.t5_X, this.t5_Y, this.t5_width, this.t5_height);
  }
  again(ui, x, y, player){
    // console.log("gameOver: x1 = " + this.t6_X1, " y1 = " + this.t6_Y1, " X2 = " + this.t6_X2, " y2 = " + this.t6_Y2);
    if(x > this.t6_X1 && x < this.t6_X2 && y > this.t6_Y1 && y < this.t6_Y2){
      console.log("GameOver: 再次游戏");
      /*重置属性*/
      player.HP = player.HP_MAX;
      ui.setScore(0);
      player.time = 0;
    }
  }
  count(i){
    var i = i / 10
    this.ct++;
    if(i > 10){
      this.count(i);
    }  
  }

}