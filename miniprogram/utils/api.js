const request = require('./request.js').sendRequest;

var API = {
  loginwx: (obj) => {
    return request('/user/wx/loginwx', "POST", obj)
  },
  // 【POST】
  sendSms:(obj) => {
    return request('/system/sms/SendSmsForBindWeixin',"GET",obj)
  },
  commitQuestion: (obj) => {
    return request('/question/CommitQuestion', 'POST', obj, {
      header: {
        'Content-Type': 'application/json'
      }
    })
  }
}
module.exports = API;
