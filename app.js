App({
  onLaunch() {
    // 小程序启动时的逻辑
  },
  globalData: {
    // 全局数据
  },
  // app.js

  onLaunch: function () {
    // 初始化云开发环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'prod-2gra8d9e0b1686a-3b6f3c27eba',  // 替换为您的云开发环境 ID
        traceUser: true,
      });
    }
  }


});