Page({
  data: {
    messages: [
      { avatar: "/images/avatar1.png", name: "张三", lastMessage: "你好，什么时候有空？" },
      { avatar: "/images/avatar2.png", name: "李四", lastMessage: "项目进展如何？" },
      // ...更多消息...
    ]
  },

  onLoad: function(options) {
    // 页面加载时的逻辑
  },

  // 跳转到聊天页面
  goToChatPage: function(e) {
    const index = e.currentTarget.dataset.index;
    const message = this.data.messages[index];
    wx.navigateTo({
      url: `/pages/chatPage/chatPage?name=${message.name}&avatar=${message.avatar}&userId=${index}`
    });
  },
});