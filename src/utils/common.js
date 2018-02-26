// 公共类
class Common {
  constructor() {
    this.serialize = this.serialize.bind(this)
  }
   // 序列化对象
   serialize(obj) {
    if (Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === 'object') {
      let str = ''
      if (!obj) return
      Object.keys(obj).forEach(v => {
        str += v + '=' + obj[v] + '&'
      })
      return str.replace(/&$/g, '')
    }
  }

  // 帧动画模拟
  requestAnimationFrame(callback) {
    let lastTime = 0
    let currTime = new Date().getTime();
    let timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
    let id = setTimeout(function() {
        callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  }
}

module.exports = new Common()