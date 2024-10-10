<<<<<<< HEAD
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
=======
const app = getApp()
>>>>>>> 90c2834 (none)
Page({
  data: {
    content: '',
    forumPosts: []
  },

  onLoad: function() {
    this.loadForumPosts();
  },

  loadForumPosts: function() {
    const db = wx.cloud.database();
    db.collection('forum').get().then(res => {
      this.setData({
        forumPosts: res.data.reverse() // 将帖子按时间倒序排列
      });
    }).catch(err => {
      console.error('加载帖子失败', err);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    });
  },

  handleInput: function(e) {
    this.setData({
      content: e.detail.value
    });
  },

  postMessage: function() {
    if (!this.data.content.trim()) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none'
      });
      return;
    }
    
    const db = wx.cloud.database();
    const content = this.data.content;
    const author = app.globalData.user; // 使用全局变量中的用户名

    db.collection('forum').add({
      data: {
        author,
        content,
        time: new Date().toLocaleString()
      }
    }).then(res => {
      console.log('帖子发布成功', res);
      this.loadForumPosts(); // 重新加载帖子列表
      this.setData({
        content: '' // 清空输入框
      });
      wx.showToast({
        title: '发帖成功',
        icon: 'success'
      });
    }).catch(err => {
      console.error('发帖失败', err);
      wx.showToast({
        title: '发帖失败',
        icon: 'none'
      });
    });
<<<<<<< HEAD
  },

  refreshPosts: function() {
    this.loadPosts();
  },
});
>>>>>>> dc40d99 (Initial Commit)
=======
  }
});
>>>>>>> 90c2834 (none)
