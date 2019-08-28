/*游戏背景*/
const WIDTH_W = wx.getSystemInfoSync().windowWidth;
const HEIGHT_W = wx.getSystemInfoSync().windowHeight;
export default class Background{
  constructor(){
    console.log("BackGround: 背景创建");
  }
  draw(ctx){
    // console.log("背景绘制");
    ctx.fillStyle = "#03015d";
    // console.log("x = " + WIDTH_W + " Y = " + HEIGHT_W);
    ctx.fillRect(0, 0, WIDTH_W, HEIGHT_W);
  }
}