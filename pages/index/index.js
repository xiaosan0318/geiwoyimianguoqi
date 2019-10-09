//index.js
//获取应用实例
const app = getApp()
var cwidth = 0
var rpx=0

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    cwidth:0,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  addpic: function(){
    var cwidth = wx.getSystemInfoSync().screenWidth
    const ctx = wx.createCanvasContext('firstCanvas')
    var imageSourceUrl = app.globalData.userInfo.avatarUrl
    wx.getImageInfo({
      src: imageSourceUrl,
      success(res) {
        let localPath=res.path
        ctx.drawImage(localPath, (rpx) * 20, (rpx) * 20, (rpx) * 440, (rpx) * 440)
        ctx.draw(true)
      }
    })
  },
  save: function(){
    wx.showToast({
      title: '正在保存到相册...',
      icon: 'loading'
      
    });
    var cwidth = wx.getSystemInfoSync().screenWidth
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 480,
      height: 480,
      destWidth: 480/rpx,
      destHeight: 480/rpx,
      canvasId: 'firstCanvas',
      success(res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,//canvasToTempFilePath返回的tempFilePath
          success: (res) => {
            wx.hideToast()
            wx.showToast({
              title: '已保存',
              icon: 'success',
              duration: 3000
            });
            console.log(res)
          },
          fail: (err) => { }
        })

      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //圆角矩形兼容版
  roundRect2: function(ctx, x, y, w, h, r, stroke, color) {
    ctx.save();
    ctx.beginPath();
    if (stroke) {
      ctx.setStrokeStyle(color);
    } else {
      ctx.setFillStyle(color);
    }
    x += 0.5;
    y += 0.5;
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
    ctx.lineTo(x + w, y + h - r);
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
    ctx.lineTo(x + r, y + h);
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
    ctx.lineTo(x, y + r);
    if (stroke) {
      ctx.stroke();
    } else {
      ctx.fill();
    }
    ctx.closePath();
    ctx.clip();
    ctx.draw(true);
  },

  onLoad: function () {
    const ctx = wx.createCanvasContext('firstCanvas')
    cwidth = wx.getSystemInfoSync().screenWidth
    rpx = cwidth / 750
    console.log(cwidth);
    
    if (app.globalData.userInfo) {
      app.globalData.userInfo.avatarUrl = app.globalData.userInfo.avatarUrl.replace('/132', '/0')
      
      var imageSourceUrl = app.globalData.userInfo.avatarUrl
      wx.getImageInfo({
        src: imageSourceUrl,
        success(res) {
          let localPath=res.path
          ctx.drawImage(localPath, (rpx) * 20, (rpx) * 20, (rpx) * 440, (rpx) * 440)
          ctx.drawImage("images/guoqi.png", 0, 0, (rpx) * 480, (rpx) * 480)
          ctx.draw(true) 



        }
      })
      ctx.drawImage("images/guoqi.png", 0, 0, (rpx) * 480, (rpx) * 480)
      ctx.draw(true)
//

      // this.roundRect2(ctx, rpx * 2, rpx * 2, rpx * 476, rpx * 476, 20, true, 'red');
      // this.roundRect2(ctx, rpx * 20, rpx * 20, rpx * 440, rpx * 440, 20,true,'white');
      

      

      
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况

      const ctx = wx.createCanvasContext('firstCanvas')
      app.userInfoReadyCallback = res => {
        
        res.userInfo.avatarUrl = res.userInfo.avatarUrl.replace('/132', '/0')
        
        var imageSourceUrl = app.globalData.userInfo.avatarUrl
        wx.getImageInfo({
          src: imageSourceUrl,
          success(res) {
            let localPath=res.path
            ctx.drawImage(localPath, (rpx) * 20, (rpx) * 20, (rpx) * 440, (rpx) * 440)
            ctx.drawImage("images/guoqi.png", 0, 0, (rpx) * 480, (rpx) * 480)
            ctx.draw(true)
          }
        })
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理

      const ctx = wx.createCanvasContext('firstCanvas')
      wx.getUserInfo({
        success: res => {
          this.setData({ cwidth: wx.getSystemInfoSync().screenWidth })
          app.globalData.userInfo = res.userInfo
          console.log(app.globalData.userInfo.avatarUrl )
          var imageSourceUrl = app.globalData.userInfo.avatarUrl
          wx.getImageInfo({
            src: imageSourceUrl,
            success(res) {
              let localPath=res.path
              ctx.drawImage(localPath, (rpx) * 20, (rpx) * 20, (rpx) * 440, (rpx) * 440)
              ctx.drawImage("images/guoqi.png", 0, 0, (rpx) * 480, (rpx) * 480)
              ctx.draw(true)
            }
          })
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
      
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    this.setData({ cwidth: wx.getSystemInfoSync().screenWidth })
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.userInfo.avatarUrl = app.globalData.userInfo.avatarUrl.replace('/132','/0')
    console.log(app.globalData.userInfo.avatarUrl);
    const ctx = wx.createCanvasContext('firstCanvas')
    
    var imageSourceUrl = app.globalData.userInfo.avatarUrl
    wx.getImageInfo({
      src: imageSourceUrl,
      success(res) {
        let localPath=res.path
        ctx.drawImage(localPath, (rpx) * 20, (rpx) * 20, (rpx) * 440, (rpx) * 440)
        ctx.drawImage("images/guoqi.png", 0, 0, (rpx) * 480, (rpx) * 480)
        ctx.draw(true)
      }
    })
    
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
