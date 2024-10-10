const { init } = require("@cloudbase/wx-cloud-client-sdk");
// 指定云开发环境 ID
wx.cloud.init({
  env: "prod-2gra8d9e0b1686a-3b6f3c27eba", // 当前的云开发环境 ID
});
const client = init(wx.cloud);
const models = client.models; 
Page({
  data: {
    username: '',
    password: '',
    showRegister: false,
    agree: false,
    errorTip: ''
  },
  onCheckboxChange(e) {
    this.setData({
      agree : e.detail.value.length > 0
    })
  },
  handleInputOnU(e) {
    this.setData({
      username : e.detail.value
    })
  },
  handleInputOnP(e) {
    this.setData({
      password : e.detail.value
    })
  },
  submit() {
    if (this.data.showRegister) {
      let re = false;
      let em = true;
      if(this.data.password.length == 0 || this.data.username.length == 0) {
        this.showToast('账号密码不能为空');
        return
      }
      models.userInfo.list({
        select: {
          user: true,
          password: true
        },
        filter: {
          where: {}
        }
      })
      .then((ret) => {
        for (let i = 0; i < ret.data.records.length; i++) {
          if (this.data.username == ret.data.records[i].user) {
            re = true;
            this.showToast('账号已存在');
            return; // 退出函数
          }
        }
        if (!re) {
          models.userInfo.create({
            data: {
              user: this.data.username,
              password: this.data.password
            }
          });
          this.showToast('注册成功');
        }
      })
      .catch((error) => {
        console.log(error); // 这里处理可能发生的错误
      });
    } else {
      const ret = models.userInfo.list({
        select: {
          user: true,
          password : true
        },
        filter: {
          where: {}
        }
      })
      .then((ret) => {
        for (let i = 0; i < ret.data.records.length; i++) {
          if(this.data.username == ret.data.records[i].user && this.data.password == ret.data.records[i].password) {
            wx.switchTab({
              url: '/pages/homePage/homePage', // 注意这里的路径需要是完整的
            })
            break;     
          }
          else {
            this.showToast('账号密码不存在');
          }
        }
      })
      .catch((error) => {
        console.log(error); // 这里处理可能发生的错误
      });
    }
  },
  showToast: function(message) {
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000,
      mask: true
    });
  },
  toggleRegister() {
    this.setData({
      showRegister: !this.data.showRegister,
    });
  },
  forgotPassword() {
    wx.navigateTo({
      url:'/pages/forgotPassword/forgotPassword'
    })
  }
});