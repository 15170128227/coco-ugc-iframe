import {chooseImg, uploadImgs} from '../../utils/wechat'
const app = getApp()

Page({
  data: {
    scrollX: true,
    imgWidth: 150,
    imgListLen: 0,
    imgList: [], // 预览的图片集
    count: 9, // 允许上传的图片数量
    curImg: null,
    startX: 0,
    curX: 0
  },
  onReady() {

  },
  // 选择图片
  chooseImg() {
    chooseImg({count: this.data.count}).then(res => {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      if (!this.data.count) return // 限制上传
      tempFilePaths.forEach(o => {
        this.data.imgList.push({path: o, x: 0})
      })
      console.log('this.data.imgList', this.data.imgList)
      this.data.count -= tempFilePaths.length
      this.setData({
        imgList: this.data.imgList,
        imgListLen: this.data.imgList.length
      })
    })
  },
  // 发布
  publish() {
    uploadImgs({url: 'http:localhost:8080'}, {path: this.data.imgList}) // 图片上传（单张|多张）
  },
  containerStart(e) {
    console.log('e.containerStart')
  
  },
  containerMove(e) {
    
  },
  containerEnd(e) {
    // console.log('e11', e)
  },
  touchstart(e) {
    console.log('e.touchstart')
    
    const touches = e.touches[0]
    const curIndex = e.currentTarget.dataset.index
    this.data.curImg = this.data.imgList.find((o, index) => curIndex === index)
    this.data.curImg.index = curIndex
    this.data.startX = touches.clientX
  },
  touchmove(e) {
    setTimeout(() => {
      const touches = e.touches[0]
      const moveX = touches.clientX
      const reduceX = moveX - this.data.startX
      this.data.curImg.x = reduceX
      this.data.imgList[this.data.curImg.index] = this.data.curImg
      console.log('e.curImg111', this.data.imgList)
      
      this.setData({
        imgList: this.data.imgList
      })
    }, 16)
  },
  touchend(e) {
    // console.log('e11', e)
    const touches = e.touches[0]
  },
})