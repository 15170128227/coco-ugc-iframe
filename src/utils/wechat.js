// wx fn 封装

const Wechat = class Me {
  constructor() {
    this.login = this.login.bind(this)
    this.pay = this.pay.bind(this)
    this.uploadImgs = this.uploadImgs.bind(this)
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

  /**
   * 微信内置地图查看位置 openLocation
   * @params {string}  latitude:Float 纬度，范围为-90~90，负数表示南纬  longitude:Float 经度，范围为-180~180，负数表示西经  scale:INT 缩放比例，范围5~18，默认为18
  */
  openLocation({latitude = 0, longitude = 0, scale = 18}) {
    return new Promise((resolve, reject) => {
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: scale,
        success: resolve,
        fail: reject
      })
    })
  }

  /**
   * 打开地图选择位置 chooseLocation
   * @params complete Function 选择位置结束后的回调函数（无论成功还是失败均会调用）
   * success return： 
   *   latitude float 纬度，浮点数，范围为-90~90，负数表示南纬
   *   longitude float 经度，浮点数，范围为-180~180，负数表示西经
   *   address String 详细地址
   *   name String 位置名称
  */
  chooseLocation(complete) {
    return new Promise((resolve, reject) => {
      wx.chooseLocation({
        success: resolve,
        fail: reject,
        complete
      })
    })
  }
  
  // 选择图片
  chooseImg({count = 1, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera']}, complete) {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count, // 默认9
        sizeType, // 可以指定是原图还是压缩图，默认二者都有
        sourceType, // 可以指定来源是相册还是相机，默认二者都有
        success: resolve,
        fail: reject,
        complete
      })
    })
  }
  /**
   * 图片上传（单张|多张）
   * data: {path: imgPaths} imgPaths:上传的图片路径集合
  */
  uploadImgs({url, name = 'file', formData = {}}, data) {
    console.log('data', data)
    if (!data.length) {
      wx.showToast({
        title: '请上传图片',
        icon: 'none'
      })
      return
    }
    let index = data.index ? data.index : 0
    let success = data.success ? data.success : 0
    let fail = data.fail ? data.fail : 0
    wx.uploadFile({
      url, // 接口地址
      filePath: data[index].path,
      name,
      formData,
      success: res => {
        success++ // 图片上传成功，图片上传成功的变量+1
      },
      fail: res => {
        fail++ // 图片上传失败，图片上传失败的变量+1
      },
      complete: res => {
        index++
        if(index === data.path.length) {
          console.log('执行完毕');
          console.log('成功：'+success+" 失败："+fail);
        } else {
          data.index = index
          data.success = success
          data.fail = fail
          this.uploadImgs({url, name, formData}, data)
        }
      }
    })
  }
}

module.exports = new Wechat()