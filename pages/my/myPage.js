const db = wx.cloud.database(); // 初始化数据库
const app = getApp()
Page({
  data: {
    studentId: '',
    name: '',
    major: '',
    isEditing: false, // 控制是否处于编辑模式
    showModal: false, // 控制是否显示项目模态框
    showInputModal: false, // 控制是否显示参与者输入模态框
    participantName: '', // 存储输入的参与者名称
    projects: [], // 存储项目的数组
    filteredProjects: [], // 存储过滤后的项目
    editedUserInfo: {} // 存储编辑后的用户信息
  },

  // 页面加载时调用
  onLoad: function() {
    const db = wx.cloud.database()
    db.collection('personInfo').where({
      user: app.globalData.user
    }).get({
      success: res => {
        if (res.data.length > 0) {
          this.setData({
            studentId: res.data[0].studentId,
            major: res.data[0].major,
            name : res.data[0].name
          })
          console.log(this.data.studentId)
        } 
      },
      fail: err => {
        console.error(err);
        this.showToast('登录失败');
      }
    });
  },

  // 加载项目数据
  loadProjects: function() {
    db.collection('project') // 确保集合名称是 'project'
      .get()
      .then(res => {
        console.log('从数据库获取的项目:', res.data); // 输出获取的项目数据
        this.setData({
          projects: res.data // 设置项目数据
        });
      })
      .catch(err => {
        console.error('获取项目失败:', err); // 输出错误信息
        wx.showToast({
          title: '获取项目失败',
          icon: 'none'
        });
      });
  },

  // 显示参与者名称输入模态框
  showParticipantInputModal: function() {
    this.setData({
      showInputModal: true, // 显示参与者输入模态框
      participantName: '' // 清空输入框
    });
  },

  // 隐藏参与者输入模态框
  hideInputModal: function() {
    this.setData({ showInputModal: false });
  },

  // 处理输入字段
  onFieldInput: function(e) {
    const field = e.currentTarget.dataset.field; // 获取输入字段的名称
    const value = e.detail.value; // 获取输入的值
    this.setData({
      [`editedUserInfo.${field}`]: value // 更新对应字段的值
    });
  },

  // 隐藏项目模态框
  hideModal: function() {
    this.setData({ showModal: false });
  },

  // 跳转到设置页面
  goToSettings: function() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  },

  // 跳转到 myPage 页面
  goToPersonalInfo: function() {
    wx.navigateTo({
      url: '/pages/myPage/myPage'
    });
  },

  // 进入编辑模式
  enterEditMode: function() {
    this.setData({ 
      isEditing: true,
      editedUserInfo: { ...this.data.userInfo } // 复制当前用户信息到编辑信息中
    });
  },

  // 保存编辑内容并退出编辑模式
  saveEdits: function() {
    // 将 editedUserInfo 保存到 userInfo
    this.setData({ 
      userInfo: { ...this.data.editedUserInfo }, // 保存编辑后的信息
      isEditing: false 
    });

    // 同步更新到云数据库
    db.collection('userInfo').doc('USER_DOCUMENT_ID') // 替换为你的用户文档ID
      .update({
        data: {
          ...this.data.editedUserInfo
        }
      })
      .then(res => {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
      })
      .catch(err => {
        console.error('更新用户信息失败:', err);
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        });
      });
  },

  // 取消编辑并退出编辑模式
  cancelEdits: function() {
    this.setData({ isEditing: false });
  },

  // 跳转到我的动态页面
  goToDynamic: function() {
    wx.navigateTo({
      url: '/pages/myDynamic/myDynamic'
    });
  },

  // 跳转到我的收藏页面
  goToCollection: function() {
    wx.navigateTo({
      url: '/pages/collectionPage/collectionPage'
    });
  },

  // 处理添加项目
  addProject: function() {
    const newProject = { 
      id: this.data.projects.length + 1, 
      projectName: '', 
      participants: [], // 添加参与者数组
      publisher: '' // 添加发布者字段
    }; 
    const updatedProjects = [...this.data.projects, newProject]; // 添加新项目到项目列表

    this.setData({
      projects: updatedProjects // 更新项目列表
    });

    wx.setStorageSync('projects', updatedProjects); // 保存到本地存储
  },

  // 处理项目名称输入
  onProjectInput: function(e) {
    const index = e.currentTarget.dataset.index; // 获取当前项目的索引
    const value = e.detail.value; // 获取输入的值
    const updatedProjects = this.data.projects.slice(); // 创建项目的副本
    updatedProjects[index].projectName = value; // 更新对应项目的名称

    this.setData({
      projects: updatedProjects // 更新项目列表
    });

    wx.setStorageSync('projects', updatedProjects); // 保存到本地存储
  },

  // 退出登录功能
  logout: function() {
    // 清除用户信息和项目
    wx.clearStorageSync(); // 清空本地存储
    wx.redirectTo({
      url: '/pages/loginRegisterPage/loginRegisterPage' // 跳转到登录页面
    });
  }
});
