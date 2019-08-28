const WIDTH_W = wx.getSystemInfoSync().windowWidth;
const HEIGHT_W = wx.getSystemInfoSync().windowHeight;
export default class UI{
  constructor(){
    this.score = 0;/*分数*/
    this.s_X = 10;/*分数的X坐标*/
    this.s_Y = 20;/*分数的Y坐标*/
    

    this.HP_width = 200;/*HP条的宽度*/
    this.HP_height = 20;/*HP条的高度*/
    this.HP_X = WIDTH_W / 2 - this.HP_width / 2;/*HP条的X坐标*/
    this.HP_Y = HEIGHT_W - this.HP_height * 2;/*HP条的Y坐标*/
  }
  
  /*绘制UI*/
  draw(ctx, player){
    this.HP = player.HP < 0 ? 0 : player.HP;/*玩家的HP*/
    this.HP_MAX = player.HP_MAX;
    // this.score++;
    // console.log("UI: 绘制");
    ctx.fillStyle = "white";
    ctx.font = "15px sans-serif";
    // console.log(ctx);
    ctx.fillText("分数: " + this.score, this.s_X, this.s_Y);
  // console.log("UI: " + ctx.measureText("cao").width);
    ctx.fillStyle = "white";
    ctx.fillRect(this.HP_X - 2, this.HP_Y - 2, this.HP_width + 4, this.HP_height + 4);
    /*30%HP红血机制*/
    if((this.HP / this.HP_MAX) < 0.3){
      ctx.fillStyle = "#ff0000";
    }
    else{
      ctx.fillStyle = "#00ff00";
    }
    
    ctx.fillRect(this.HP_X, this.HP_Y, this.HP_width * (this.HP / this.HP_MAX), this.HP_height);
  }

  /*工具方法*/
  getScore(){
    /*获取分数*/
    return this.score;
  }
  setScore(score){
    /*设置分数*/
    this.score = score;
    // console.log(this.score);
  }
}