// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: '',
    con_password: '',
    registe: '注册',
    submit: 'submit',
    isPass: 'false'
  },

  getPwdValue: function(e){
    this.setData({
      password: e.detail.value
    })
  },

  getConPwdValue: function (e) {
    this.setData({
      con_password: e.detail.value
    })
  },

  formSubmit: function(e){
    let _this = this;
    let pwd = this.data.password;
    let con_pwd = this.data.con_password;
    if(pwd == ''){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1300
      })
      return false;
    }else if(pwd.length < 6 || pwd.length > 20){
      wx.showToast({
        title: '请输入6-20位密码',
        icon: 'none',
        duration: 1300
      })
      return false;
    }else if(con_pwd !== pwd){
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 1300
      })
      return false;
    }else{
      console.log(e.detail.value);
      wx.request({
        url: 'http://localhost:3000/v1/users/register',
        method: 'post',
        data: e.detail.value,
        success(res) {
          console.log(res.data);
        }
      })
      wx.setStorage({
        key: 'pwd',
        data: pwd
      })
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})