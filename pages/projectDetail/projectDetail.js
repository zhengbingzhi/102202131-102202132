Page({
  data: {
    project: {},
    scheduleOptions: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12']
  },

  onLoad: function(options) {
    console.log("Received options:", options);
    const project = {
      id: options.id,
      title: decodeURIComponent(options.title || ''),
      type: decodeURIComponent(options.type || ''),
      majors: decodeURIComponent(options.majors || ''),
      schedule: decodeURIComponent(options.schedule || ''),
      contact: decodeURIComponent(options.contact || ''),
      requirements: decodeURIComponent(options.requirements || ''),
      introduction: decodeURIComponent(options.introduction || '')
    };
    this.setData({
      project: project
    });
  },
  goToDiscussion: function() {
    wx.navigateTo({
      url: '/pages/discussionArea/discussionArea?id=' + this.data.project.id
    });
  },

  applyToJoin: function() {
    wx.showToast({
      title: '申请已发送',
      icon: 'success',
      duration: 2000
    });
  }
});