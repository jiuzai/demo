// pages/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    get_code: '获取验证码',
    next_step: '下一步',
    submit: 'submit',
    btn: 'next_btn'
  },

  getPhoneValue: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  getCode: function(e){
    let mobilePhone = this.data.phone;
    let _this = this;
    let myReg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1300
      })
      return false;
    }else if(!myReg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1300
      })
      return false;
    }else{
      wx.request({
        url: 'http://localhost:3000/v1/users/check',
        method: 'get',
        success(res) {
          console.log(res.data)
          console.log('mobile:' + mobilePhone)
          _this.setData({
            code: res.data.code,
            btn: 'btn',
            bindTapView: 'bindTapView'
          })
        }
      })
      wx.setStorage({
        key: 'mobile',
        data: mobilePhone
      })
    }
  },

  bindTapView: function(e){
    wx.navigateTo({
      url: '../register/register'
    })
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