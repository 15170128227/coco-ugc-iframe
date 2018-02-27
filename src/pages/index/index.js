//index.js
//获取应用实例
import { pay } from '../../utils/wechat'

const app = getApp()

// 注：Object对象单行的最后一个key-value不用'，'，多行的最后一个key-value要添加上'，'

Page({
  data: {
    userInfo: {}, // 用户信息
    hasUserInfo: false, // 是否获取到用户信息
    canIUse: wx.canIUse('button.open-type.getUserInfo'), // 用户信息获取兼容方法回调
    // 列表数据
    isSend: false, // 接口请求--页面触发生命周期onHide时，是否发起接口请求
    sendList: null,
    cacheList: null, // 缓存数据
    list: null, // 当前数据列表
  },
  // 页面加载完成
  onLoad() {
    this.renderUserInfo()
    // mock data
    this.cacheList = [{
      id: 1,
      title: '1'
    },
    {
      id: 2,
      title: '2'
    },
    {
      id: 3,
      title: '2'
    }]

    this.list = [{
      id: 1,
      title: '3'
    },
    {
      id: 2,
      title: '2'
    },
    {
      id: 3,
      title: '5'
    }]

    this.sendList = {
      list: [1, 3]
    }

    // test
    if (this.sendList.list) {
      const promises = this.sendList.list.map(e => {
        const obj = this.cacheList.find(item => e === item.id)
        return app.fetch.put('http://localhost:10086', obj)
      })
      Promise.all(promises).then(res => {
        console.log('promises222', res)
      }).catch(reason => {
        console.log('promises333', reason)
      })
    }
  },
  // 页面隐藏
  onHide() {
    // 开关状态false返回
    if (isSend) return
    if (this.sendList.list) {
      const promises = this.sendList.list.map(e => {
        const obj = this.cacheList.find(item => e === item.id)
        return app.fetch.put('http://localhost:10086', obj)
      })
      Promise.all(promises).then(res => {
      }).catch(err => {
      })
    }
  },
  // 获取用户信息
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 静默渲染用户信息
  renderUserInfo() {
    // 获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
})
