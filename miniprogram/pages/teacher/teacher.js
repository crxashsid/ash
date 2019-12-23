const app = getApp();
const db = wx.cloud.database();
var id = '';
var teachers = [];
var time = '';
var place = '';
var openid = '';
Page({
  data: {
    c:'https://www.jianshu.com/p/35b8a6d2e544',
    b:'https://blog.csdn.net/qq_37954086/article/details/85058796',
    a:'https://blog.csdn.net/ChibiMarukoChan/article/details/89636610',
    github: 'https://www.jianshu.com/p/bc588e97d497',
    favorfill: 'cuIcon-favorfill',
    favor: 'cuIcon-favor',
    modalName: null,
    starArr: [1, 2, 3, 4, 5],
    place: [],
    status: true,
    comment: [],
    teachers: [],
    teaInf: {},
    swiperList: [{
      id: 0,
      url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2437336740,3087703269&fm=26&gp=0.jpg'
    }, {
      id: 1,
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576672705740&di=f37d58b1f32d1f85873ec7a1186c32a2&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F45ab598148bbf5f1e1225bec0a6701b1.jpeg',
    }, {
      id: 2,
      url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=50600087,2939316881&fm=26&gp=0.jpg'
    },{
      id:3,
      url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576673384493&di=6db207e08d95617fa857906df0b9f31d&imgtype=0&src=http%3A%2F%2Fwww.njxms.com.cn%2FUploadFiles%2F2018-07-13%2F15314742819341887.jpg'
    },{
      id:4,
      url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576673732288&di=e4889aaaf51931d2506986f2e0d7c8d7&imgtype=0&src=http%3A%2F%2Fp.ananas.chaoxing.com%2Fstar3%2Forigin%2F5492d5575370d4613682c372.jpg'
    },
    {
      id:5,
      url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576674053743&di=e221403f094f6ad01a365c4aa87ae670&imgtype=0&src=http%3A%2F%2Ffile.elecfans.com%2Fweb1%2FM00%2F81%2F4A%2Fo4YBAFwvJFCAH8LMAAbOmD1wbMM184.png'
    }
  ],
  },
  clickGit2: function() {
    wx.setClipboardData({
      data: this.data.a,
      success: res => {
        wx.showModal({
          title: '已复制地址',
          content: '如有兴趣可以学习小程序ColorUI！',
        })
      },
    })
  },
  clickGit4: function() {
    wx.setClipboardData({
      data: this.data.c,
      success: res => {
        wx.showModal({
          title: '已复制地址',
          content: '如有兴趣可以学习小程序授权登录！',
        })
      },
    })
  },
  clickGit3: function() {
    wx.setClipboardData({
      data: this.data.b,
      success: res => {
        wx.showModal({
          title: '已复制地址',
          content: '如有兴趣可以学习云开发之初体验！',
        })
      },
    })
  },
  clickGit1: function() {
    wx.setClipboardData({
      data: this.data.github,
      success: res => {
        wx.showModal({
          title: '已复制地址',
          content: '如有兴趣可以学习小程序倒计时！',
        })
      },
    })
  },
  addComment: function(res) {
    wx.navigateTo({
      url: '../comment/comment',
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  order: function(res) {
    wx.makePhoneCall({
      phoneNumber: '13705970196'
    }),
    this.setData({
      modalName: 'bottomModal',
    })
  },
  change: function(e) {
    console.log(e)
    time = e.detail.value;
  },
  change2: function(e) {
    console.log(e)
    place = e.detail.value;
  },
  submit: function(e) {
    if ((time && place) == '') {
      console.log('错误')
      wx.showModal({
        title: '错误',
        content: '请将所有选项选完',
      })
    } else {
      wx.showLoading({
        title: '提交中',
      })
      wx.cloud.callFunction({
        name: 'template',
        data: {
          openid: openid,
          formid: e.detail.formId,
          name: this.data.teaInf.name,
          place: place,
          time: time,
        },
        success: res => {
          wx.hideLoading();
          console.log(res);
          wx.showToast({
            title: '预约成功',
            icon: 'success',
            duration: 2000,
            mask: true,
            success: function(res) {
              wx.switchTab({
                url: '../me/me',
              })
            },
            fail: function(res) {
              console.error
            },
            complete: function(res) {
              wx.switchTab({
                url: '../me/me',
              })
            },
          })
        },
        fail: console.error
      })
      db.collection('userInfo').doc(id).update({
        data: {
          order: {
            tea: this.data.teaInf.name,
            place: place,
            time: time,
          }
        }
      })
    }
  },
  scolltolowe:function(){
    wx.showToast({
      title: '已到最后',
    })
  },
  onLoad: function(options) {
    db.collection('userInfo').get({
      success: e => {
        id = e.data[0]._id;
        openid = e.data[0]._openid;
        if (e.data[0].order.tea == app.globalData.teacher) {
          this.setData({
            status: false
          })
        }
      }
    })
    db.collection('teachers').get({
      success: res => {
        teachers = res.data; //拿到关于教师数据
        for (let i = 0; i <= teachers.length; i++) {
          if (teachers[i]._id == app.globalData.teacher) {
            this.setData({
              teaInf: teachers[i].allinfo, //筛选出选中的教师数据
            })
            this.setData({
              swiperList: [{
                id: 0,
                url: this.data.teaInf.pic
              }, {
                id: 1,
                url: this.data.teaInf.pic2
              }, {
                id: 2,
                url: this.data.teaInf.pic3
              }],
            })
          }
        }
      }
    })
    db.collection('teachers').doc(app.globalData.teacher).get({
      success: e => {
        console.log(e.data.comment)
        this.setData({
          comment: e.data.comment
        })
      }
    })
  },
})