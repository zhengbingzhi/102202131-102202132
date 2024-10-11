Page({
  data: {
    messages: [
      { avatar: 'image/picture1.jpg', name: "张三", lastMessage: "你好，什么时候有空？" },
      { avatar: "image/picture2.jpg", name: "李四", lastMessage: "项目进展如何？" },
      { avatar: "image/picture3.jpg", name: "王五", lastMessage: "有个新任务。" },
      { avatar: "image/picture4.jpg", name: "赵六", lastMessage: "会议时间定了吗？" },
      { avatar: "image/picture5.jpg", name: "孙七", lastMessage: "资料准备好了。" },
      { avatar: "image/picture6.jpg", name: "周八", lastMessage: "一起吃个饭？" },
    ],
  },

  onLoad: function (options) {
    // 页面加载时的逻辑
  },

  // 跳转到聊天页面
  goToChatPage: function (e) {
    const index = e.currentTarget.dataset.index;
    const message = this.data.messages[index];
    wx.navigateTo({
      url: `/pages/chatPage/chatPage?name=${message.name}&avatar=${message.avatar}&userId=${index}`,
    });
  },
});