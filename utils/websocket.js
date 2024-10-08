let socketTask = null;
 
// 连接 WebSocket
function connectSocket() {
  socketTask = wx.connectSocket({
    url: 'wss://yourwebsocketurl',  // 替换成自己的 WebSocket 地址
  });
 
  // 监听 WebSocket 连接打开事件
  socketTask.onOpen(() => {
    console.log('WebSocket 连接已打开');
  });
 
  // 监听 WebSocket 接收到服务端消息事件
  socketTask.onMessage((res) => {
    console.log('收到消息：', res.data);
    // TODO: 处理收到的消息
  });
 
  // 监听 WebSocket 连接关闭事件
  socketTask.onClose(() => {
    console.log('WebSocket 连接已关闭');
  });
 
  // 监听 WebSocket 错误事件
  socketTask.onError((err) => {
    console.error('WebSocket 错误：', err);
  });
}
 
// 发送消息
function sendSocketMessage(data) {
  if (socketTask && socketTask.readyState === 1) {
    socketTask.send({
      data: JSON.stringify(data),
    });
  }
}
 
// 关闭 WebSocket 连接
function closeSocket() {
  if (socketTask && socketTask.readyState === 1) {
    socketTask.close();
    socketTask = null;
  }
}
 
module.exports = {
  connectSocket,
  sendSocketMessage,
  closeSocket,
};