// wx fn 封装

const Wechat = class Me {
  constructor() {
    this.login = this.login.bind(this)
    this.pay = this.pay.bind(this)
  }

  // 微信登录
  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: resolve,
        fail: reject
      })
    })
  }

  // 获取用户数据 getUserInfo
  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        success: resolve,
        fail: reject
      })
    })
  }

  // 获取用户授权信息
  getSetting() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: resolve,
        fail: reject
      })
    })
  }
  /**
   * 存储数据 setStorage
   * @params {string}  key 键
   * @params {string}  value 值
  */
  setStorage(key, value) {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key: key, 
        data: value, 
        success: resolve, 
        fail: reject 
      })
    })
  }

  /**
   * 从存储中获取数据 getStorage
   * @params {string}  key 键
  */
  getStorage(key) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: key,
        success: resolve,
        fail: reject
      })
    })
  }

  /**
   * 存储数据 setStorageSync 同步
   * @params {string}  key 键
   * @params {string}  value 值
  */
  setStorageSync(key, value) {
    wx.setStorageSync(key, value)
  }

  /**
   * 存储数据 getStorageSync 同步
   * @params {string}  key 键
  */
  getStorageSync(key) {
    return wx.getStorageSync(key)
  }

  /**
   * 支付
   * @params {timeStamp, nonceStr, packages, signType, sign} 
   *    timeStamp String  时间戳
   *    nonceStr String  随机字符串
   *    package String  订单唯一标识
   *    signType String 
   *    paySign String  
  */
  pay(params) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        ...params,
        success: resolve,
        fail: reject
      })
    })
  }

  /**
   * 获取位置 getLocation
   * @params {string}  type 键
  */
  getLocation(type) {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: type,
        success: resolve,
        fail: reject
      })
    })
  }
}

module.exports = new Wechat()