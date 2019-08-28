import Enemy from './enemy.js';
export default class EnemyController{
  constructor(){
    console.log("EnemyController: 新建敌人控制类");
    /*敌人对象池大小*/
    this.E_L = 20;
    this.time = 0;
    this.create_t = 40;
    this.createEnemys();/*创建敌人对象池*/
  }

  /*创建敌人对象池*/
  createEnemys(){
    console.log("EnemyController: 创建敌人对象池");
    this.enemys = new Array();
    for(var i = 0; i < this.E_L; i++){
      this.enemys[i] = new Enemy();
    }
  }

action(ctx, player, ui){
  
  // console.log("EnemyController: 行动");
  this.createEnemy(player, ui);
  this.fly(ctx, player, ui);
}
  /*创建敌人*/
  createEnemy(player, ui){
    if (this.time > 0) {
      this.time--;
      // console.log("EnemController: time" + this.create_t);
    }
    else {
      // console.log("EnemController: timeOut ", parseInt(ui.getScore() / 100) < 0 ? 0 : parseInt(ui.getScore() / 100) );
      this.time = this.create_t - parseInt(ui.getScore() / 100);
      if(this.time < 0){
        this.time = 0;
      }
      for (var i = 0; i < this.E_L; i++) {
        if (!this.enemys[i].fire) {
          this.enemys[i].createEnemy(parseInt(ui.getScore() / 1000) + 1, parseInt(ui.getScore() / 1000) + 1, parseInt(ui.getScore() / 100) + 1, player);/*HP 攻击力 速度*/
          break;
        }
      }
    }
    
  }
  fly(ctx, player, ui){
    for (var i = 0; i < this.E_L; i++) {
      if (this.enemys[i].fire) {
        this.enemys[i].fly(ctx, player, ui);
      }
    }
  }
} 