const app = getApp()
Page({
  data: {
    projects: [],
  },

  onLoad: function() {
    this.loadProjects();
  },

  loadProjects: function() {
    const db = wx.cloud.database();
    const user = app.globalData.user;
    console.log('1')
    console.log(user.length)
    if (user) {
      db.collection('project').where({
        user: user
      }).get().then(res => {
        console.log(res)
        if (res.data.length > 0) {
          this.setData({
            projects: res.data
          });
        } else {
          wx.showToast({
            title: '暂无参与的项目',
            icon: 'none'
          });
        }
      }).catch(err => {
        console.error('加载项目失败', err);
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        });
      });
    }
  },

  goToProjectDetail: function(e) {
    const projectId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `project-detail/project-detail?id=${projectId}`
    });
  }
});