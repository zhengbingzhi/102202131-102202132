Page({
  data: {
    projectName: '',
    projectType: '',
    majorsRequired: '',
    timeSchedule: '',
    contactInfo: '',
    memberRequirements: '',
    projectIntroduction: ''
  },

  inputProjectName: function(e) {
    this.setData({ projectName: e.detail.value });
  },
  inputProjectType: function(e) {
    this.setData({ projectType: e.detail.value });
  },
  inputMajorsRequired: function(e) {
    this.setData({ majorsRequired: e.detail.value });
  },
  inputTimeSchedule: function(e) {
    this.setData({ timeSchedule: e.detail.value });
  },
  inputContactInfo: function(e) {
    this.setData({ contactInfo: e.detail.value });
  },
  inputMemberRequirements: function(e) {
    this.setData({ memberRequirements: e.detail.value });
  },
  inputProjectIntroduction: function(e) {
    this.setData({ projectIntroduction: e.detail.value });
  },

  submitProject: function() {
    // 提交项目申请的逻辑
    console.log('提交的项目信息：', this.data);
    // 这里可以添加将数据发送到服务器的代码
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    });
  }
});