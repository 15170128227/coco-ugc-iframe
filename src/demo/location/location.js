import {chooseLocation} from '../../utils/wechat'
const app = getApp()

Page({
  data: {
    address: ''
  },
  onLoad() {

  },
  // 打开地图选择位置
  chooseLocation() {
    chooseLocation().then(res => {
      const {address} = res
      this.setData({address})
    })
  }
})