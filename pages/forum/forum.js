Page({
  data: {
    posts: [], // 用于存储帖子
    idInput: '', // 存储输入的ID
    dateInput: '', // 存储输入的日期
    contentInput: '' // 存储输入的内容
  },

  onLoad: function() {
    this.loadPosts(); // 页面加载时获取帖子
  },

  // 从数据库加载论坛帖子
  loadPosts: function() {
    const db = wx.cloud.database();
    const that = this;

    db.collection('chat').orderBy('date', 'desc').get({
      success: function(res) {
        console.log('帖子加载成功:', res.data);
        that.setData({
          posts: res.data // 更新帖子数据
        });
      },
      fail: function(error) {
        console.error("帖子加载失败:", error);
        wx.showToast({
          title: '加载帖子失败',
          icon: 'none'
        });
      }
    });
  },

  // 处理发送按钮点击事件
  sendPost: function() {
    const { idInput, dateInput, contentInput } = this.data;

    if (!idInput || !dateInput || !contentInput) {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none'
      });
      return;
    }

    // 将数据发送到数据库
    const db = wx.cloud.database();
    db.collection('chat').add({
      data: {
        id: idInput,
        date: dateInput,
        content: contentInput
      },
      success: function() {
        wx.showToast({
          title: '发送成功',
          icon: 'success'
        });
        this.loadPosts(); // 重新加载帖子
      }.bind(this),
      fail: function(error) {
        console.error("发送失败:", error);
        wx.showToast({
          title: '发送失败',
          icon: 'none'
        });
      }
    });
  },

  // 刷新按钮处理
  refreshPosts: function() {
    this.loadPosts(); // 重新加载帖子
  },

  // 处理输入字段
  onIdInput: function(e) {
    this.setData({
      idInput: e.detail.value
    });
  },

  onDateInput: function(e) {
    this.setData({
      dateInput: e.detail.value
    });
  },

  onContentInput: function(e) {
    this.setData({
      contentInput: e.detail.value
    });
  }
});
