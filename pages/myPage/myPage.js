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