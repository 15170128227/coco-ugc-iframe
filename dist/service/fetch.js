const common = require('./common'); // 公共函数

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
      url: url,
      method: method,
      data: data,
      header: Object.assign({
        'appEncrypt': appEncrypt // 小程序新增请求头
      }, header),
      success: resolve, // Promose 的resolve方法
      fail: reject // Promose 的reject方法
    })
  })
}

const get = function (url, param) {
  'use strict'
  param = common.serialize(param) ? '?' + common.serialize(param) : ''
  url = url + param
  return base({
    url: url ,
    method: 'GET',
    data: {}
  })
}

const post = function (url, param, contentType) {
  let header = null
  if (contentType) {
    header = contentType2
  } else {
    header = contentType1
  }
  'use strict'
  return base({
    url: url ,
    method: 'POST',
    data: param,
    header: header
  })
}

const put = function (url, param, contentType) {
  let header = null
  if (contentType) {
    header = contentType2
  } else {
    header = contentType1
  }
  'use strict'
  return base({
    url: url ,
    method: 'PUT',
    data: param,
    header: header
  })
}
const del = function (url, param, contentType) {
  let header = null
  if (contentType) {
    header = contentType2
  } else {
    header = contentType1
  }
  'use strict'
  return base({
    url: url ,
    method: 'Delete',
    data: param,
    header: header
  })
}
module.exports = { request, get, post, put, del}