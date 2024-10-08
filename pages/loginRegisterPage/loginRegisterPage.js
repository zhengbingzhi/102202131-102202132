Page({
  data: {
    username: '',
    password: '',
    registerUsername: '',
    confirmPassword: '',
    showRegister: false,
  },
  handleInput(e) {
    const { name, value } = e.currentTarget.dataset;
    this.setData({
      [name]: value,
    });
  },
  submit() {
    if (this.data.showRegister) {
      // 注册逻辑
      console.log('注册用户名：', this.data.registerUsername);
      console.log('注册邮箱/手机号：', this.data.username);
      console.log('注册密码：', this.data.password);
      console.log('确认密码：', this.data.confirmPassword);
    } else {
      // 登录逻辑
      // 假设登录成功，跳转到主页面
      wx.switchTab({
        url: '/pages/homePage/homePage', // 注意这里的路径需要是完整的
      });
    }
  },
  toggleRegister() {
    this.setData({
      showRegister: !this.data.showRegister,
    });
  },
});