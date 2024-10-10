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
Page({
  data: {
    showAllCategories: false, // 控制是否显示所有分类
    searchKeyword: '', // 搜索关键词
    searchResults: [], // 搜索结果
    categories: [
      "软件工程", "电子信息工程", "通信工程", "电气工程及其自动化",
      "机械设计制造及其自动化", "土木工程", "会计学", "财务管理", "金融学", "经济学",
      "法学", "英语", "汉语言文学", "临床医学", "口腔医学", "护理学", "人力资源管理",
      "市场营销", "国际经济与贸易","计算机科学与技术"
    ],
    projectItems: [
      { id: 1, title: "项目 A", type: "科研", majors: "计算机科学与技术", schedule: "2024-01 至 2024-12", contact: "123456789", requirements: "熟悉机器学习", introduction: "这是一个关于机器学习的项目" },
      { id: 2, title: "项目 B", type: "实践", majors: "软件工程", schedule: "2024-02 至 2024-05", contact: "987654321", requirements: "熟悉软件开发", introduction: "这是一个软件工程实践项目" },
      { id: 3, title: "项目 C", type: "竞赛", majors: "通信工程", schedule: "2024-03 至 2024-07", contact: "555555555", requirements: "熟悉通信技术", introduction: "这是一个通信工程竞赛项目" },
      { id: 4, title: "项目 D", type: "创新", majors: "电气工程及其自动化", schedule: "2024-04 至 2024-09", contact: "666666666", requirements: "熟悉电气控制", introduction: "这是一个电气工程创新项目" },
      { id: 5, title: "项目 E", type: "创业", majors: "机械设计制造及其自动化", schedule: "2024-05 至 2024-11", contact: "777777777", requirements: "熟悉机械设计", introduction: "这是一个机械设计创业项目" },
      { id: 6, title: "项目 F", type: "科研", majors: "会计学", schedule: "2024-06 至 2024-12", contact: "888888888", requirements: "熟悉财务分析", introduction: "这是一个会计学科研项目" },
      { id: 7, title: "项目 G", type: "实践", majors: "金融学", schedule: "2024-07 至 2024-10", contact: "444444444", requirements: "熟悉金融市场", introduction: "这是一个金融学实践项目" },
      { id: 8, title: "项目 H", type: "竞赛", majors: "经济学", schedule: "2024-08 至 2024-11", contact: "333333333", requirements: "熟悉经济理论", introduction: "这是一个经济学竞赛项目" },
      { id: 9, title: "项目 I", type: "创新", majors: "法学", schedule: "2024-09 至 2024-12", contact: "222222222", requirements: "熟悉法律条文", introduction: "这是一个法学创新项目" },
      { id: 10, title: "项目 J", type: "创业", majors: "英语", schedule: "2024-10 至 2025-01", contact: "111111111", requirements: "熟悉英语翻译", introduction: "这是一个英语创业项目" }
    ],
    visibleCategories: [] // 控制初始显示的分类
  },

  onLoad: function() {
    // 显示前几个分类，并初始化项目显示为所有项目
    this.setData({
      visibleCategories: this.data.categories.slice(0, 4),
      searchResults: this.data.projectItems // 初始显示所有项目
    });
  },

  // 处理搜索框输入
  handleInput: function(e) {
    const value = e.detail.value;
    this.setData({
      searchKeyword: value
    });
    if (value.trim() === '') {
      // 如果搜索框清空，恢复显示所有项目
      this.setData({
        searchResults: this.data.projectItems
      });
    }
  },

  // 处理搜索图标点击
  handleSearch: function() {
    const keyword = this.data.searchKeyword.trim().toLowerCase();
    if (keyword === '') {
      // 如果关键词为空，恢复显示所有项目
      this.setData({
        searchResults: this.data.projectItems
      });
      return;
    }
    let results = this.data.projectItems.filter(project => {
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
    // 这里可以添加分类筛选逻辑
    // 例如，根据选择的分类过滤项目并更新 searchResults
    let results = this.data.projectItems.filter(project => project.majors === category);
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
      url: `/pages/projectDetail/projectDetail?id=${project.id}&title=${encodeURIComponent(project.title)}&type=${encodeURIComponent(project.type)}&majors=${encodeURIComponent(project.majors)}&schedule=${encodeURIComponent(project.schedule)}&contact=${encodeURIComponent(project.contact)}&requirements=${encodeURIComponent(project.requirements)}&introduction=${encodeURIComponent(project.introduction)}`,
    });
  },

  // 跳转到项目发起界面
  goToAddProjectPage: function() {
    wx.navigateTo({
      url: '/pages/addProject/addProject' // 确保路径正确
    });
  }
});
>>>>>>> dc40d99 (Initial Commit)
