// 公共类
class Common {
  constructor() {
    this.serialize = this.serialize.bind(this)
    this.formatNumber = this.formatNumber.bind(this)
  }
   // 序列化对象
   serialize(obj) {
    if (!obj) return
    let str = ''
    for (let [k, v] of Object.entries(obj)) {
      str += `${k}=${v}&`
    }
    return str.replace(/&$/g, '')
  }

  /**
   * 时间格式化
   * @params date Date 必填，时间对象
   * @params options Object 参数 sign：格式类型 format：时间类型（D--默认到天；T：默认到秒）
   * return 时间字符串
  */
  formatTime(date, options = {sign: '-', format: 'D'}) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const times = [hour, minute, second].map(this.formatNumber).join(':')
    let ymd = null
    switch (options.sign) {
      case '/' :
        ymd = [day, month, year].map(this.formatNumber).join(format)
        break
      default :
        ymd = [year, month, day].map(this.formatNumber).join(format)
        break  
    }
    return options.format === 'T' ? (ymd + ' ' + times) : ymd
  }

  // 个位数数值前添加0
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  // 帧动画模拟
  requestAnimationFrame(callback) {
    let lastTime = 0
    const currTime = new Date().getTime()
    const timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
    const id = setTimeout(function() {
        callback(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id
  }
}

module.exports = new Common()