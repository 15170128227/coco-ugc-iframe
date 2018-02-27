import common from './common' // 公共函数

/**
 * 抓取远端API的结构
 * https://developers.douban.com/wiki/?title=movie_v2
 * @param  {String} method    method 方法名['get', 'post']
 * @param  {String} api    api 根地址
 * @param  {Objece} params 参数
 */

const contentType = 'application/json;charset=utf-8' // 接口请求默认数据格式
// const contentType2 = 'application/x-www-form-urlencoded' // post|put表单请求数据格式

// reWrite
const base = ({url, method = 'GET', data = {}, header = {}}) => {
  return new Promise((resolve, reject) => {
    try {
      const appEncrypt = wx.getStorageSync('appEncrypt') // 后台应用标识
      header = Object.assign({'Content-type': contentType, appEncrypt}, header)
      wx.request({
        url,
        method,
        data,
        header,
        success: resolve, // Promise 的resolve方法
        fail: reject // Promise 的reject方法
      })
    } catch(e) {
      throw new error(e)
    }
  })
}

/**
 * get
 * @params url String 接口地址
 * @params param Object 参数对象
*/
const get = function (url, param) {
  url = param ? `${rul}?${common.serialize(param)}` : url
  return base({url})
}

/**
 * post
 * @params url String 接口地址
 * @params param Object 请求参数对象
 * @params header Object 请求头对象
*/
const post = function (url, param = {}, header = {}) {
  return base({
    url,
    method: 'POST',
    data: param,
    header
  })
}

/**
 * put
 * @params url String 接口地址
 * @params param Object 请求参数对象
 * @params header Object 请求头对象
*/
const put = function (url, param = {}, header = {}) {
  return base({
    url ,
    method: 'PUT',
    data: param,
    header
  })
}

/**
 * dellete
 * @params url String 接口地址
 * @params param Object 请求参数对象
 * @params header Object 请求头对象
*/
const del = function (url, param = {}, header = {}) {
  return base({
    url,
    method: 'Delete',
    data: param,
    header
  })
}
const fetch = { get, post, put, del }
module.exports = fetch