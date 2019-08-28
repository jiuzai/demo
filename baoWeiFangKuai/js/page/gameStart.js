/*游戏开始界面*/
const WIDTH_W = wx.getSystemInfoSync().windowWidth;
const HEIGHT_W = wx.getSystemInfoSync().windowHeight;
export default class GameStart {
  constructor() {
    this.start = false;
    /*标题*/
    this.t1_X = WIDTH_W / 2 - 70;
    this.t1_Y = 150;
    /*开始按钮数据*/
    this.t2_X = WIDTH_W / 8;
    this.t2_Y = 400;
    this.t2_width = 100;
    this.t2_height = 10;
  }
  gameStart(ctx, ui, x, y) {
    if(this.start){
      return true;
    }
    else{
      // console.log("gameStart: buOK");
      this.draw(ctx, ui);
      this.play(x, y);
      return false;
    }
    
  }
  draw(ctx, ui) {
    // console.log("Play");
    // console.log("背景绘制");
    ctx.fillStyle = "#000";
    // console.log("x = " + WIDTH_W + " Y = " + HEIGHT_W);
    ctx.fillRect(0, 0, WIDTH_W, HEIGHT_W);
    // console.log(ui);
    ctx.fillStyle = "white";
    ctx.font = "40px sans-serif";
    ctx.fillText("保卫方块", this.t1_X, this.t1_Y);

    ctx.font = "15px sans-serif";

    /*判定框*/
    /*点１　this.t2_X this.t2_Y - 4 - 10 点2 this.t2_width this.t2_height * 2.5*/
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.t2_X, this.t2_Y - 4 - 10, this.t2_width, this.t2_height * 2.5);

    ctx.fillStyle = "white";
    ctx.fillRect(this.t2_X, this.t2_Y + 4, this.t2_width, this.t2_height);
    ctx.fillText("PLAY", this.t2_X, this.t2_Y);
    // ctx.fillText(ui.getScore(), this.t3_X, this.t3_Y);
  }
  play(x, y){
    
    // console.log("gameStart: x = " + x, " y = " + y);
    // console.log("gameStart: x1 = " + this.t2_X, " y1 = " + (this.t2_Y - 4 - 10), " x2 = " + this.t2_width, " y2 = " + (this.t2_height * 2.5));
    if(x > this.t2_X && x < (this.t2_X + this.t2_width) && y > this.t2_Y - 4 - 10 && y < ( this.t2_Y + this.t2_height * 2.5)){
      console.log("GameStart: 开始游戏");
      this.start = true;
    }
  }
}