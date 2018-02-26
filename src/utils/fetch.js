import common from './common' // 公共函数

/**
 * 抓取远端API的结构
 * https://developers.douban.com/wiki/?title=movie_v2
 * @param  {String} method    method 方法名['get', 'post']
 * @param  {String} api    api 根地址
 * @param  {Objece} params 参数
 */

const contentType1 = 'application/json;charset=utf-8'
const contentType2 = 'application/x-www-form-urlencoded'

// reWrite
const base = ({url, method, data, header}) => {
  return new Promise((resolve, reject) => {
    let appEncrypt = wx.getStorageSync('appEncrypt')
    wx.request({
      url,
      method,
      data,
      header: Object.assign({
        'appEncrypt': appEncrypt // 小程序新增请求头
      }, header),
      success: resolve, // Promose 的resolve方法
      fail: reject // Promose 的reject方法
    })
  })
}

// 获取
const get = function (url, param) {
  param = common.serialize(param) ? '?' + common.serialize(param) : ''
  url = url + param
  return base({
    url,
    method: 'GET',
    data: {}
  })
}

// 创建
const post = function (url, param, contentType) {
  let header = contentType ? contentType2 : contentType1
  return base({
    url ,
    method: 'POST',
    data: param,
    header
  })
}

// 更新
const put = function (url, param, contentType) {
  let header = contentType ? contentType2 : contentType1
  return base({
    url ,
    method: 'PUT',
    data: param,
    header
  })
}

// 删除
const del = function (url, param, contentType) {
  let header = contentType ? contentType2 : contentType1
  return base({
    url,
    method: 'Delete',
    data: param,
    header
  })
}

module.exports = { get, post, put, del}