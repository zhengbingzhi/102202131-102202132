Page({
  data: {
    showAllCategories: false, // 控制是否显示所有分类
    categories: [
      "计算机科学与技术", "软件工程", "电子信息工程", "通信工程", "电气工程及其自动化",
      "机械设计制造及其自动化", "土木工程", "会计学", "财务管理", "金融学", "经济学",
      "法学", "英语", "汉语言文学", "临床医学", "口腔医学", "护理学", "人力资源管理",
      "市场营销", "国际经济与贸易"
    ],
    projectItems: [
      {
        id: 1,
        title: "项目A",
        type: "科研",
        majors: "计算机科学与技术",
        schedule: "2024-01至2024-12",
        contact: "123456789",
        requirements: "熟悉机器学习",
        introduction: "这是一个关于机器学习的项目"
      },
      // 确保其他项目也有完整数据
    ],
    visibleCategories: [] // 控制初始显示的分类
  },

  onLoad: function() {
    // 显示前几个分类
    this.setData({
      visibleCategories: this.data.categories.slice(0, 4)
    });
  },

  // 处理搜索框输入
  handleInput: function(e) {
    console.log("用户输入的搜索关键词: ", e.detail.value);
    // 这里可以添加搜索逻辑
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
  },

  // 处理项目点击
  handleProjectTap: function(e) {
    const index = e.currentTarget.dataset.index;
    const project = this.data.projectItems[index];
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