// app.js
import {login, getUserInfo, getSetting} from './utils/wechat'
import common from './utils/common'
import { msg } from './utils/constants'
import fetch from './utils/fetch'
App({
  globalData: {
    userInfo: null
  },
  common, // 公共方法
  fetch, // 接口请求方法
  msg, // 接口提示语
  imgBaseUrl: 'https://static.cocosurprise.com/images/mini-programs', // 图片服务器静态路径
  onLaunch() {
    // 登录
    login().then(res => {
      console.log('login-code', res.code)
    })
    // 获取用户信息
    getSetting().then(res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        getUserInfo().then(res => {
          // 可以将 res 发送给后台解码出 unionId
          this.globalData.userInfo = res.userInfo
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        })
      }
    })
  }
})