// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: '登录',
    submit: 'submit',
    isPass: 'false'
  },

  formSubmit: function(e){
    console.log(e.detail.value);

    wx.request({
      url: 'http://localhost:3000/v1/users/login',
      method: 'post',
      data: e.detail.value,
      success(res) {
        console.log(res.data);
      }
    })
    
    if (e.detail.value.savePass[0] === "记住密码") {
      wx.setStorageSync('login', e.detail.value);
    } else {
      wx.removeStorageSync('login');
    }
  },

  showPwdblur(e){
    console.log(this.data.isPass);
    let isPass = this.data.isPass ? false : true;
    this.setData({
      isPass: isPass
    })
  },

  bindTapView: function(){
    wx.navigateTo({
      url: '../check/check',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.getStorage({
      key: 'mobile',
      success(res) {
        console.log('mobile:' + res.data)
        _this.setData({
          mobile: res.data
        })
      }
    })
    wx.getStorage({
      key: 'pwd',
      success(res) {
        console.log('password:' + res.data)
        _this.setData({
          password: res.data
        })
      }
    })
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