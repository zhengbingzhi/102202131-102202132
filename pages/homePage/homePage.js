const app = getApp();

Page({
  data: {
    isCategory: false,
    allCategory: [],
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
    visibleCategories: [], // 控制初始显示的分类
    suggestedTags: [], // 猜你想搜的标签
    showRecentSearches: false, // 控制是否显示最近搜索记录
    showSuggestedTags: false // 控制是否显示猜你想搜标签
  },

  onLoad: function () {
    // 页面加载时获取项目
    this.loadProjectsFromDB();

    // 初始分类展示
    this.setData({
      visibleCategories: this.data.categories.slice(0, 4)
    });
  },

  // 从数据库加载项目
  loadProjectsFromDB: function (callback) {
    const db = wx.cloud.database();
    const that = this;
    db.collection('project').get({
      success: function (res) {
        that.setData({
          allCategory: res.data // 更新项目数据
        });
        if (callback) callback(); // 调用回调函数（用于停止刷新动画）
      },
      fail: function (error) {
        wx.showToast({
          title: '加载项目失败',
          icon: 'none'
        });
        if (callback) callback();
      }
    });
  },

  // 处理搜索框输入
  handleInput: function (e) {
    const value = e.detail.value;
    this.setData({
      searchKeyword: value,
      showSuggestedTags: value.length > 0 // 当输入框有内容时显示“猜你想搜”标签
    });

    // 如果搜索框为空，重新加载所有项目
    if (value.trim() === '') {
      this.loadProjectsFromDB(); // 重新加载所有项目
      this.setData({
        showRecentSearches: false, // 隐藏最近搜索
        showSuggestedTags: false // 隐藏猜你想搜
      });
    } else {
      this.setData({
        showRecentSearches: true // 显示最近搜索
      });
    }
  },

  // 处理搜索框聚焦时显示最近搜索记录
  handleFocus: function () {
    this.setData({
      showRecentSearches: true, // 显示最近搜索
      showSuggestedTags: this.data.searchKeyword.length > 0 // 根据输入内容决定是否显示“猜你想搜”
    });
  },

  // 处理搜索框失焦时隐藏最近搜索记录
  handleBlur: function () {
    setTimeout(() => {
      this.setData({
        showRecentSearches: false, // 隐藏最近搜索
        showSuggestedTags: false // 隐藏“猜你想搜”标签
      });
    }, 200); // 延迟隐藏，以免遮挡操作
  },

  // 处理搜索图标点击
  handleSearch: function () {
    const keyword = this.data.searchKeyword.trim().toLowerCase();
    if (keyword === '') {
      // 如果关键词为空，恢复显示所有项目
      this.loadProjectsFromDB(); // 重新加载所有项目
      return;
    }

    // 防止重复添加搜索关键词
    let recentSearches = this.data.recentSearches;
    if (!recentSearches.includes(keyword)) {
      recentSearches.unshift(keyword);
      if (recentSearches.length > 10) {
        recentSearches.pop(); // 保持最近搜索记录最多为10个
      }
    }

    this.setData({
      isCategory: true,
      recentSearches: recentSearches,
      showRecentSearches: false // 隐藏最近搜索
    });

    // 更新猜你想搜标签
    this.updateSuggestedTags();

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

  // 更新猜你想搜标签
  updateSuggestedTags: function () {
    const { recentSearches, categories } = this.data;
    let suggestedTags = [];

    if (recentSearches.length > 0) {
      // 遍历最近搜索记录，查找相关标签
      suggestedTags = recentSearches.slice(0, 6); // 直接使用最近搜索记录作为标签
    } else {
      // 如果没有最近搜索，则从分类中随机挑选一些标签
      const shuffledCategories = categories.sort(() => 0.5 - Math.random());
      suggestedTags = shuffledCategories.slice(0, 6); // 随机选取6个标签
    }

    this.setData({
      suggestedTags: suggestedTags
    });
  },

  // 处理猜你想搜标签点击
  handleTagTap: function (e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({
      searchKeyword: tag
    });

    this.handleSearch(); // 直接进行搜索
  },

  // 删除单个搜索记录
  handleDeleteSearch: function (e) {
    const keywordToDelete = e.currentTarget.dataset.keyword;
    let recentSearches = this.data.recentSearches.filter(item => item !== keywordToDelete);
    this.setData({
      recentSearches: recentSearches
    });

    // 更新猜你想搜标签
    this.updateSuggestedTags();
  },

  // 切换显示所有分类
  toggleAllCategories: function () {
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
  handleCategoryTap: function (e) {
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
  handleProjectTap: function (e) {
    const index = e.currentTarget.dataset.index;
    app.globalData.currentProjectName = this.data.allCategory[index].projectName;
    wx.navigateTo({
      url: `/pages/projectDetail/projectDetail`
    });
  },

  // 跳转到项目发起界面
  goToAddProjectPage: function () {
    wx.navigateTo({
      url: '/pages/addProject/addProject' // 确保路径正确
    });
  },

  // 点击刷新图片时触发，从数据库重新加载项目
  handleRefreshTap: function () {
    this.setData({
      isCategory: false
    });
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
