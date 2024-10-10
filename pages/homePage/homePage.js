<<<<<<< HEAD
<<<<<<< HEAD
Page({
  data: {
    showAllCategories: false, // 控制是否显示所有分类
    searchKeyword: '', // 搜索关键词
    searchResults: [], // 搜索结果
    recentSearches: [], // 最近搜索关键词
    categories: [
      "软件工程", "电子信息工程", "通信工程", "电气工程及其自动化",
      "机械设计制造及其自动化", "土木工程", "会计学", "财务管理", "金融学", "经济学",
      "法学", "英语", "汉语言文学", "临床医学", "口腔医学", "护理学", "人力资源管理",
      "市场营销", "国际经济与贸易", "计算机科学与技术"
    ],
    visibleCategories: [] // 控制初始显示的分类
  },

  onLoad: function() {
    // 页面加载时获取项目
    this.loadProjectsFromDB();

    // 初始分类展示
    this.setData({
      visibleCategories: this.data.categories.slice(0, 4)
    });
  },

  // 从数据库加载项目
  loadProjectsFromDB: function(callback) {
    const db = wx.cloud.database();
    const that = this;

    db.collection('project').get({
      success: function(res) {
        console.log('数据库读取成功:', res.data);
        that.setData({
          searchResults: res.data // 更新项目数据
        });
        if (callback) callback(); // 调用回调函数（用于停止刷新动画）
      },
      fail: function(error) {
        console.error("数据库读取失败:", error);
        wx.showToast({
          title: '加载项目失败',
          icon: 'none'
        });
        if (callback) callback();
      }
    });
  },

  // 处理搜索框输入
handleInput: function(e) {
  const value = e.detail.value;
  this.setData({
    searchKeyword: value
  });

  // 如果搜索框为空，重新加载所有项目
  if (value.trim() === '') {
    this.loadProjectsFromDB(); // 重新加载所有项目
  }
},


  // 处理搜索图标点击
  handleSearch: function() {
    const keyword = this.data.searchKeyword.trim().toLowerCase();
    if (keyword === '') {
      // 如果关键词为空，恢复显示所有项目
      this.loadProjectsFromDB(); // 重新加载所有项目
      return;
    }
    let results = this.data.searchResults.filter(project => {
      return Object.values(project).some(prop => 
        prop.toString().toLowerCase().includes(keyword)
      );
    });

    if (results.length === 0) {
      wx.showToast({
        title: '未找到匹配内容',
        icon: 'none'
      });
    }

    this.setData({
      searchResults: results
    });
  },

  // 切换显示所有分类
  toggleAllCategories: function() {
    this.setData({ showAllCategories: !this.data.showAllCategories });
    if (this.data.showAllCategories) {
      // 如果展开，显示所有分类
      this.setData({ visibleCategories: this.data.categories });
    } else {
      // 如果收起，显示前几个分类
      this.setData({
        visibleCategories: this.data.categories.slice(0, 4)
      });
    }
  },

  // 处理分类点击
  handleCategoryTap: function(e) {
    const category = e.currentTarget.dataset.category;
    console.log("选中的分类: ", category);
    // 根据选择的分类过滤项目并更新 searchResults
    let results = this.data.searchResults.filter(project => project.majors === category);
    this.setData({
      searchResults: results
    });
    if (results.length === 0) {
      wx.showToast({
        title: '未找到匹配内容',
        icon: 'none'
      });
    }
  },

  // 处理项目点击
  handleProjectTap: function(e) {
    const index = e.currentTarget.dataset.index;
    const project = this.data.searchResults[index]; // 从搜索结果中获取项目
    wx.navigateTo({
      url: `/pages/projectDetail/projectDetail?id=${project._id}&title=${encodeURIComponent(project.projectName)}&type=${encodeURIComponent(project.projectType)}&majors=${encodeURIComponent(project.majorsRequired)}&schedule=${encodeURIComponent(project.timeSchedule)}&contact=${encodeURIComponent(project.contactInfo)}&requirements=${encodeURIComponent(project.memberRequirements)}&introduction=${encodeURIComponent(project.projectIntroduction)}`,
    });
  },

  // 跳转到项目发起界面
  goToAddProjectPage: function() {
    wx.navigateTo({
      url: '/pages/addProject/addProject' // 确保路径正确
    });
  },

  // 点击刷新图片时触发，从数据库重新加载项目
  handleRefreshTap: function() {
    wx.showNavigationBarLoading(); // 显示顶部加载动画

    this.loadProjectsFromDB(() => {
      wx.hideNavigationBarLoading(); // 停止顶部加载动画
      wx.showToast({
        title: '刷新成功',
        icon: 'success'
      });
    });
  }
});
=======
=======
const app = getApp()
>>>>>>> 90c2834 (none)
Page({
  data: {
    isCategory : false,
    allCategory : [],
    showAllCategories: false, // 控制是否显示所有分类
    searchKeyword: '', // 搜索关键词
    searchResults: [], // 搜索结果
    recentSearches: [], // 最近搜索关键词
    categories: [
      "软件工程", "电子信息工程", "通信工程", "电气工程及其自动化",
      "机械设计制造及其自动化", "土木工程", "会计学", "财务管理", "金融学", "经济学",
      "法学", "英语", "汉语言文学", "临床医学", "口腔医学", "护理学", "人力资源管理",
      "市场营销", "国际经济与贸易", "计算机科学与技术"
    ],
    visibleCategories: [] // 控制初始显示的分类
  },

  onLoad: function() {
    // 页面加载时获取项目
    this.loadProjectsFromDB();

    // 初始分类展示
    this.setData({
      visibleCategories: this.data.categories.slice(0, 4)
    });
  },

  // 从数据库加载项目
  loadProjectsFromDB: function(callback) {
    const db = wx.cloud.database();
    const that = this;
    db.collection('project').get({
      success: function(res) {
        that.setData({
          allCategory: res.data // 更新项目数据
        });
        if (callback) callback(); // 调用回调函数（用于停止刷新动画）
      },
      fail: function(error) {
        wx.showToast({
          title: '加载项目失败',
          icon: 'none'
        });
        if (callback) callback();
      }
    });
  },

  // 处理搜索框输入
handleInput: function(e) {
  const value = e.detail.value;
  this.setData({
    searchKeyword: value
  });

  // 如果搜索框为空，重新加载所有项目
  if (value.trim() === '') {
    this.loadProjectsFromDB(); // 重新加载所有项目
  }
},


  // 处理搜索图标点击
  handleSearch: function() {
    this.setData({
      isCategory: true
    });
    const keyword = this.data.searchKeyword.trim().toLowerCase();
    if (keyword === '') {
      // 如果关键词为空，恢复显示所有项目
      this.loadProjectsFromDB(); // 重新加载所有项目
      return;
    }
    let results = this.data.allCategory.filter(project => {
      return Object.values(project).some(prop => 
        prop.toString().toLowerCase().includes(keyword)
      );
    });

    if (results.length === 0) {
      wx.showToast({
        title: '未找到匹配内容',
        icon: 'none'
      });
    }

    this.setData({
      searchResults: results
    });
  },

  // 切换显示所有分类
  toggleAllCategories: function() {
    this.setData({ showAllCategories: !this.data.showAllCategories });
    if (this.data.showAllCategories) {
      // 如果展开，显示所有分类
      this.setData({ visibleCategories: this.data.categories });
    } else {
      // 如果收起，显示前几个分类
      this.setData({
        visibleCategories: this.data.categories.slice(0, 4)
      });
    }
  },

  // 处理分类点击
  handleCategoryTap: function(e) {
    this.setData({
      isCategory: true
    });
    const category = e.currentTarget.dataset.category;
    
    
    // 根据选择的分类过滤项目并更新 searchResults
    let results = this.data.allCategory.filter(project => project.projectType == category);
    this.setData({
      searchResults: results
    });
    if (results.length === 0) {
      wx.showToast({
        title: '未找到匹配内容',
        icon: 'none'
      });
    }
  },

  // 处理项目点击
  handleProjectTap: function(e) {
    const index = e.currentTarget.dataset.index;
    app.globalData.currentProjectName  =this.data.allCategory[index].projectName
    wx.navigateTo({
      url: `/pages/projectDetail/projectDetail`
    });
  },

  // 跳转到项目发起界面
  goToAddProjectPage: function() {
    wx.navigateTo({
      url: '/pages/addProject/addProject' // 确保路径正确
    });
  },

  // 点击刷新图片时触发，从数据库重新加载项目
  handleRefreshTap: function() {
    this.setData({
      isCategory: false
    });
    console.log(this.data.isCategory)
    wx.showNavigationBarLoading(); // 显示顶部加载动画
    this.loadProjectsFromDB(() => {
      wx.hideNavigationBarLoading(); // 停止顶部加载动画
      wx.showToast({
        title: '刷新成功',
        icon: 'success'
      });
    });
  }
});
>>>>>>> dc40d99 (Initial Commit)
