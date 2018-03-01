const app = getApp()

Page({
  data: {
    socketOpen: false, // socket开关
    chatList: [
      // {
      //   name: 'Alinc',
      //   cont: '1111',
      //   role: 1,
      //   code: 'a00001'
      // },
      // {
      //   name: 'test',
      //   cont: '222',
      //   role: 2,
      //   code: 'a00002'
      // }
    ]
  },
  onReady() {
    
  },
  onShow() {
    this.initSocket()
  },
  // 
  onHide() {
    console.log('onHide')
    this.closeSocket()
  },
  // 初始化socket
  initSocket() {
    let socketMsgQueue = []
    wx.connectSocket({url: 'ws://localhost:10086'})

    // 监听WebSocket连接打开事件。
    wx.onSocketOpen(res => {
      console.log('WebSocket连接已打开！')
      this.socketOpen = true
      for (var i = 0; i < socketMsgQueue.length; i++){
         this.sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []
    })

    // 监听WebSocket错误。
    wx.onSocketError(res => {
      console.log('WebSocket连接打开失败，请检查！')
    })

    // 监听WebSocket接受到服务器的消息事件
    wx.onSocketMessage(res => {
      if (res.data.indexOf('success') > -1) {
        console.log('收到服务器内容：' + res.data)
      } else {
        // 格式化数据
        const data = JSON.parse(res.data)
        this.data.chatList.push(data)
        this.setData({
          chatList: this.data.chatList
        })
      }
    })
  },
  closeSocket() {
   // 关闭 WebSocket 连接
   wx.closeSocket()
   // 监听WebSocket关闭
   wx.onSocketClose(res => {
     console.log('WebSocket 已关闭！')
   })
  },
  // 通过 WebSocket 连接发送数据
  sendSocketMessage() {
    if (this.socketOpen) {
      this.data.chatList.push({
        name: 'Alinc',
        cont: this.data.inputValue,
        role: 1
      })
      this.setData({
        chatList: this.data.chatList,
        inputValue: ''
      })
      wx.sendSocketMessage({
        data: this.data.inputValue
      })
    } else {
       socketMsgQueue.push(this.data.inputValue)
    }
  },
  //输入信息
  bindKeyInput(e) {
    this.data.inputValue = e.detail.value
    // this.setData({
    //   inputValue: msg
    // })
  },
})