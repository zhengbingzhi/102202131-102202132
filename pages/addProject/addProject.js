<<<<<<< HEAD
Page({
  data: {
    projectName: '',
    projectType: '',
    majorsRequired: '',
    timeSchedule: '',
    contactInfo: '',
    memberRequirements: '',
    projectIntroduction: '',
    publisher: '',       // 新增发布者
    participants: [],    // 将参与者设置为数组
    participantsInput: '' // 新增参与者输入
  },

  // 输入处理函数
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
  inputPublisher: function(e) {
    this.setData({ publisher: e.detail.value });  // 处理发布者输入
  },
  inputParticipants: function(e) {
    this.setData({ participantsInput: e.detail.value });  // 处理参与者输入
  },

  // 添加参与者
  addParticipant: function() {
    const applicantInfo = this.data.participantsInput.trim(); // 获取输入的参与者信息

    if (applicantInfo) {
      // 更新参与者数组
      const updatedParticipants = [...this.data.participants, applicantInfo];
      this.setData({
        participants: updatedParticipants,
        participantsInput: '' // 清空输入框
      });

      // 弹出提示
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000 // 持续时间，单位为毫秒
      });

      console.log("更新后的参与者：", updatedParticipants);
    } else {
      wx.showToast({
        title: '请输入有效的参与者信息',
        icon: 'none',
        duration: 2000
      });
    }
  },

  // 提交项目
  submitProject: function() {
    console.log("开始提交项目...");
    if (this.validateInput()) {
      const db = wx.cloud.database(); // 获取数据库引用
      let projectData = {
        projectName: this.data.projectName,
        projectType: this.data.projectType,
        majorsRequired: this.data.majorsRequired,
        timeSchedule: this.data.timeSchedule,
        contactInfo: this.data.contactInfo,
        memberRequirements: this.data.memberRequirements,
        projectIntroduction: this.data.projectIntroduction,
        publisher: this.data.publisher,           // 保存发布者信息
        participants: this.data.participants,     // 保存参与者信息
        createdAt: new Date() // 添加创建时间
      };

      console.log("准备存储数据：", projectData);

      // 存储到数据库
      db.collection('project').add({
        data: projectData,
        success: function(res) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          });
          console.log("提交成功：", res);
          wx.navigateBack(); // 返回上一页
        },
        fail: function(error) {
          console.error("提交失败: ", error);
          wx.showToast({
            title: '提交失败，请重试',
            icon: 'none',
            duration: 2000
          });
        }
      });
    }
  },

  // 输入验证
  validateInput: function() {
    let { projectName, projectType, majorsRequired, timeSchedule, contactInfo, memberRequirements, projectIntroduction, publisher } = this.data;
    let isValid = true;

    if (!projectName.trim()) {
      wx.showToast({
        title: '请输入项目名称',
        icon: 'none',
      });
      isValid = false;
    }
    if (!projectType.trim()) {
      wx.showToast({
        title: '请输入项目类型',
        icon: 'none',
      });
      isValid = false;
    }
    if (!majorsRequired.trim()) {
      wx.showToast({
        title: '请输入所需专业',
        icon: 'none',
      });
      isValid = false;
    }
    if (!timeSchedule.trim()) {
      wx.showToast({
        title: '请输入时间安排',
        icon: 'none',
      });
      isValid = false;
    }
    if (!contactInfo.trim()) {
      wx.showToast({
        title: '请输入联系方式',
        icon: 'none',
      });
      isValid = false;
    }
    if (!memberRequirements.trim()) {
      wx.showToast({
        title: '请输入成员要求',
        icon: 'none',
      });
      isValid = false;
    }
    if (!projectIntroduction.trim()) {
      wx.showToast({
        title: '请输入项目简介',
        icon: 'none',
      });
      isValid = false;
    }
    if (!publisher.trim()) {
      wx.showToast({
        title: '请输入学号-姓名-专业-联系方式',
        icon: 'none',
      });
      isValid = false;
    }

    return isValid;
  },
});
=======
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
>>>>>>> dc40d99 (Initial Commit)
