var db = wx.cloud.database();
var app = getApp();
Page({
  options: {
    addGlobalClass: true,
  },
  data: {
    avatarUrl: '',
    nickName: '',
    score: '',
    modalName: null,
    order: '',
    github100: 'https://github.com/crxashsid/crx'
  },
  onLoad: function(options) { //通过openid获取到数据库中的用户信息
    db.collection('userInfo').get({
      success: res => {
        console.log(res.data)
        this.setData({
          avatarUrl: res.data[0].avatarUrl,
          nickName: res.data[0].userInfo.nickName,
          score: Math.round(res.data[0].score),
          order: res.data[0].order.tea
        })

      }
    })


  },
  clickGit: function() {
    wx.setClipboardData({
      data: this.data. github100,
      success: res => {
        wx.showModal({
          title: '已复制地址',
          content: '如有兴趣可以访问我的GitHub！',
        })
      },
    })
  },
  goAbout: function() {
    wx.navigateTo({
      url: '../about/about',
    })

  },

  feedback: function() {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})