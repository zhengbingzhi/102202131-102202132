<<<<<<< HEAD

Page({
  data: {
    userInfo: {
      avatar: "/images/default-avatar.png",
      studentId: "123456",
      name: "张三",
      major: "计算机科学与技术"
    },
    contactInfo: {
      phone: "123-4567-8901",
      email: "zhangsan@example.com",
      bio: "这里可以写个人简介"
    },
    projectsParticipated: "项目A, 项目B"
  },
 // 跳转到设置页面
 goToSettings: function() {
  wx.navigateTo({
    url: '/pages/settings/settings'
  });
},
  onLoad: function(options) {
    // 页面加载时的逻辑
  },
  
  // 其他逻辑函数...
});
=======
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
>>>>>>> dc40d99 (Initial Commit)
