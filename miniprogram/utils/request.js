let apiConfig = {
  baseUrl: "https://xxxapi.com:33008",
  }
var sendRequest = function (url, method, data, _config) {
  return new Promise(function (resolve, reject) {
    var contentType;
    data = data || {};
    _config = _config || false;
    if (method == 'POST') {
      if (_config) {
        if (_config.header) {
          contentType = _config.header['Content-Type']
        } else {
          console.log("header.Content-Type is not defined");
        }
      } else {
        contentType = 'application/x-www-form-urlencoded'
      }
    } else {
      contentType = 'application/json'
    }
    let loginData = wx.getStorageSync("loginData");
    wx.request({
      url: apiConfig.baseUrl + url,
      data: data,
      method: method,
      header: {
        'Content-Type': contentType,
        'Token': loginData.Token || "1"
      },
      success: function (res) {
        // 处理一些全局的返回结果
        if (res.data.errorCode === 'InvalidAuthorization') {
        }
        return resolve(res.data);
      },
      fail: function (err) {
        return reject(err);
      },
      complete: function (res) {
        if (res.data.success && res.data.errorCode) {
          console.log(res);
          console.log(res.data.message);
        }
        if (!res.data.success) {
          console.log(res.data.message);
        }
      }
    })
  });
};
module.exports = {
  apiConfig,
  sendRequest
}