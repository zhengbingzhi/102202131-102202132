// 引入websocket.js文件
const { connectSocket, sendSocketMessage, closeSocket } = require('../../utils/websocket.js');

Page({
  data: {
    chatMessages: [],
    messageInput: '',
    userName: '',
    userAvatar: ''
  },

  onLoad: function(options) {
    // 页面加载时的逻辑
    this.setData({
      userName: options.name,
      userAvatar: options.avatar
    });
    this.loadChatMessages();
    // 连接 WebSocket
    connectSocket();
  },

  loadChatMessages: function() {
    // 加载聊天消息的逻辑
    // 模拟数据
    this.setData({
      chatMessages: ['你好', '请问你现在有空吗？', '我们需要讨论一下项目的事']
    });
  },

  // 处理输入
  handleInput: function(e) {
    this.setData({
      messageInput: e.detail.value
    });
  },

  // 发送消息
  sendMessage: function() {
    const message = this.data.messageInput;
    if (message) {
      this.setData({
        chatMessages: [...this.data.chatMessages, message],
        messageInput: '' // 清空输入框
      });
      // 通过WebSocket发送消息
      sendSocketMessage({
        type: 'text',
        content: message,
      });
    }
  },

  onUnload: function() {
    // 页面卸载时关闭 WebSocket 连接
    closeSocket();
  }
});