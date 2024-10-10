<<<<<<< HEAD
Page({
  data: {
    collections: [] // 用于存储从数据库获取的收藏项目
  },

  onLoad: function() {
    this.loadCollections(); // 页面加载时获取收藏项目
  },

  // 从数据库加载收藏项目
  loadCollections: function() {
    const db = wx.cloud.database();
    const that = this;

    db.collection('collect').get({
      success: function(res) {
        console.log('收藏项目读取成功:', res.data);
        that.setData({
          collections: res.data // 更新收藏项目数据
        });
      },
      fail: function(error) {
        console.error("收藏项目读取失败:", error);
        wx.showToast({
          title: '加载收藏失败',
          icon: 'none'
        });
      }
    });
  },

  // 点击刷新按钮时触发
  handleRefreshTap: function() {
    wx.showNavigationBarLoading(); // 显示加载动画
    this.loadCollections(); // 重新加载收藏项目
    wx.hideNavigationBarLoading(); // 隐藏加载动画
    wx.showToast({
      title: '刷新成功',
      icon: 'success'
    });
  },

  // 处理项目点击
  handleProjectTap: function(e) {
    const index = e.currentTarget.dataset.index;
    const project = this.data.collections[index]; // 从收藏中获取项目
    wx.navigateTo({
      url: `/pages/projectDetail/projectDetail?id=${project.id}&title=${encodeURIComponent(project.title)}&type=${encodeURIComponent(project.type)}&majors=${encodeURIComponent(project.majors)}&schedule=${encodeURIComponent(project.schedule)}&contact=${encodeURIComponent(project.contact)}&requirements=${encodeURIComponent(project.requirements)}&introduction=${encodeURIComponent(project.introduction)}`,
    });
  }
});
=======
// pages/collectionPage/collectionPage.js
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
