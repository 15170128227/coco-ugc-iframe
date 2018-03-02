
const app = getApp()

Page({
  data: {
    // 性别选择器
    sex: ['请选择', '男', '女'],
    // 日期选择器--当前选中日期
    date: '2016-09-01',
    // 省市区选择器
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },
  onLoad() {

  },
  // 性别选择器
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 日期选择器
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 省市区选择
  bindRegionChange (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
})