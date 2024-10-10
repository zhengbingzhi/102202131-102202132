const db = wx.cloud.database(); // 初始化数据库

Page({
  data: {
    userInfo: {
      avatar: "/images/default-avatar.png",
      studentId: "123456",
      name: "张三",
      major: "计算机科学与技术",
      email: "zhangsan@example.com",
      phone: "123-4567-8901",
      bio: "这里可以写个人简介"
    },
    isEditing: false, // 控制是否处于编辑模式
    showModal: false, // 控制是否显示项目模态框
    showInputModal: false, // 控制是否显示参与者输入模态框
    participantName: '', // 存储输入的参与者名称
    projects: [], // 存储项目的数组
    filteredProjects: [] // 存储过滤后的项目
  },

  // 页面加载时调用
  onLoad: function() {
    this.loadProjects(); // 加载项目数据
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
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [field]: value // 直接更新对应的字段，确保参与者名称被正确存储
    });
  },

  // 确认参与者名称并过滤项目
  // 确认参与者名称并过滤项目
confirmParticipant: function() {
  const participantName = this.data.participantName.trim(); // 获取并去掉空格

  console.log("输入的参与者名称:", participantName); // 调试信息，检查是否正确获取到参与者名称

  if (participantName === '') {
    wx.showToast({
      title: '请输入参与者名称',
      icon: 'none'
    });
    return;
  }

  // 清空之前的匹配结果
  this.setData({
    filteredProjects: []
  });

  console.log("遍历所有项目:"); // 在控制台输出遍历内容
  this.data.projects.forEach(project => {
    console.log("项目:", project); // 输出每个项目

    const { projectName, publisher, participants } = project;

    // 检查发布者是否匹配
    const isPublisherMatch = publisher && publisher.includes(participantName);
    
    // 检查参与者数组是否包含输入的名称
    const isParticipantMatch = participants && participants.includes(participantName);

    if (isPublisherMatch || isParticipantMatch) {
      console.log(`匹配的项目: ${projectName}`); // 输出匹配的项目名称

      // 将匹配的项目添加到 filteredProjects 中
      this.setData({
        filteredProjects: [...this.data.filteredProjects, project]
      });
    }
  });

  // 判断是否有匹配的项目
  if (this.data.filteredProjects.length > 0) {
    const projects = encodeURIComponent(JSON.stringify(this.data.filteredProjects)); // 将匹配的项目数据编码
    wx.navigateTo({
      url: `/pages/projectResults/projectResults?projects=${projects}`, // 跳转到展示匹配项目的页面
    });
  } else {
    wx.showToast({
      title: '未找到相关项目',
      icon: 'none'
    });
  }
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

  // 跳转到 my 页面
  goToPersonalInfo: function() {
    wx.navigateTo({
      url: '/pages/my/my'
    });
  },

  // 进入编辑模式
  enterEditMode: function() {
    this.setData({ isEditing: true });
  },

  // 保存编辑内容并退出编辑模式
  saveEdits: function() {
    this.setData({ isEditing: false });
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });
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
      url: '/pages/login/login' // 跳转到登录页面
    });
  }
});
