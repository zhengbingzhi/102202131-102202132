<<<<<<< HEAD
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
=======
wx.cloud.init({
  env: "pzn-6gge7w8zf9cf192f", // 当前的云开发环境 ID
});
Page({
  data: {
    posts: [],
    content: ''
  },

  onLoad: function() {
    this.loadPosts();
  },

  loadPosts: function() {
    const that = this;
    wx.cloud.database().collection('forum').get({
      success: function(res) {
        // 将读取的数据存储在页面的data中
        that.setData({
          posts: res.data.reverse() // 假设我们想要按时间倒序显示帖子
        });
      },
      fail: function(err) {
        console.error(err);
      }
    });
  },

  onContentInput: function(e) {
    this.setData({
      content: e.detail.value
    });
  },

  sendPost: function() {
    const  {content } = this.data;
    if (!content) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      });
      return;
    }
    wx.cloud.database().collection('forum').add({
      data: {
        content: content
      },
      success: function(res) {
        wx.showToast({
          title: '帖子发送成功'
        });
        // 发送成功后清空输入框
        that.setData({
          content: ''
        });
        // 刷新帖子列表
        that.loadPosts();
      },
      fail: function(err) {
        console.error(err);
      }
    });
  },

  refreshPosts: function() {
    this.loadPosts();
  },
});
>>>>>>> dc40d99 (Initial Commit)
