const app = getApp();
const db = wx.cloud.database();
const _dbc = 'users';
Page({
    data: {
      userInfo: null,
      listData: null,
      listLength:0
    },
    getUserList() {
        db.collection(_dbc).orderBy('createTime', 'desc').get().then(res => {
            res.data.map(item => {
                if (item.createTime) {
                    item.newTime = app.util.formatDate(new Date(item.createTime), 'yy-MM-dd hh:mm');
                }
            })
            this.setData({
                listData: res.data
            })
        })
        // 获取总长度
      db.collection(_dbc).count().then(res => {
       console.log(res)
        this.setData({
          listLength: res.total
        })
      })
    },
    onLoad: function(options) {
    },
    onReady: function() {
    },
    onShow: function() {
      this.setData({
          userInfo: wx.getStorageSync('userInfo')
      })
        this.getUserList();
    },
    onPullDownRefresh: function() {
    },
    onReachBottom: function() {
    }
})