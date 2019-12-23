//app.js
const apiConfig = require('./utils/request.js').apiConfig;
const api = require('./utils/api.js');
const util = require('./utils/util.js');
App({
  apiConfig: apiConfig,
  api: api,
  util: util,
  onLaunch: function () {
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    openid:'',
    score:'',
    teacher:'',
    choose:[],
    answer:[],
  }
})