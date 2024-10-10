<<<<<<< HEAD
<<<<<<< HEAD
Page({
  data: {
    project: {
      participants: [] // 初始化参与者字段为数组
    },
    scheduleOptions: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'],
    applicantInfo: {}
  },

  onLoad: function(options) {
    console.log("Received options:", options);
    const projectId = options.id; // 获取项目ID

    // 从数据库中获取项目详细信息，包括参与者
    wx.cloud.database().collection('project').doc(projectId).get({
      success: res => {
        const project = {
          id: res.data._id,
          title: res.data.title,
          type: res.data.type,
          majors: res.data.majors,
          schedule: res.data.schedule,
          contact: res.data.contact,
          requirements: res.data.requirements,
          introduction: res.data.introduction,
          participants: res.data.participants || [] // 确保参与者是一个数组
        };
        this.setData({
          project: project
        });
      },
      fail: err => {
        console.error("获取项目失败：", err);
        wx.showToast({
          title: '获取项目失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  goToDiscussion: function() {
    wx.navigateTo({
      url: '/pages/discussionArea/discussionArea?id=' + this.data.project.id
    });
  },

  // 申请加入
  applyToJoin: function() {
    wx.showModal({
      title: '申请加入',
      content: '请输入您的信息（学号-姓名-专业-联系方式）',
      editable: true,
      success: res => {
        if (res.confirm && res.content) {
          const applicantInfo = res.content.trim(); // 获取并处理输入的人员信息
          this.addParticipant(applicantInfo);
        }
      }
    });
  },

  addParticipant: function(applicantInfo) {
    let participants = this.data.project.participants || []; // 获取现有参与者信息

    if (applicantInfo) {
      applicantInfo = applicantInfo.trim();

      // 将申请者信息添加到参与者数组中
      participants.push(applicantInfo); // 使用 push 方法添加新申请者

      const projectId = this.data.project.id; // 获取项目ID

      // 更新数据库中的参与者字段为新数组
      wx.cloud.database().collection('project').doc(projectId).update({
        data: {
          participants: participants // 将参与者更新为数组
        },
        success: res => {
          wx.showToast({
            title: '申请加入成功',
            icon: 'success',
            duration: 2000
          });

          // 更新页面上的本地状态，确保数据同步
          this.setData({
            project: {
              ...this.data.project,
              participants: participants // 更新本地参与者列表
            }
          });
        },
        fail: err => {
          wx.showToast({
            title: '更新失败',
            icon: 'none',
            duration: 2000
          });
          console.error("更新失败：", err);
        }
      });
    } else {
      wx.showToast({
        title: '输入无效，请重新输入',
        icon: 'none',
        duration: 2000
      });
    }
  },

  collectProject: function() {
    const projectData = {
      id: this.data.project.id, // 项目ID
      title: this.data.project.title,
      type: this.data.project.type,
      majors: this.data.project.majors,
      schedule: this.data.project.schedule,
      contact: this.data.project.contact,
      requirements: this.data.project.requirements,
      introduction: this.data.project.introduction
    };

    if (!projectData.id) {
      wx.showToast({
        title: '项目数据无效',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    // 使用项目ID查询是否已经收藏
    wx.cloud.database().collection('collect').where({
      id: projectData.id // 改为根据项目ID查询
    }).get({
      success: res => {
        if (res.data.length > 0) {
          wx.showToast({
            title: '项目已收藏',
            icon: 'none',
            duration: 2000
          });
        } else {
          // 项目未被收藏，执行收藏逻辑
          wx.cloud.database().collection('collect').add({
            data: projectData,
            success: res => {
              wx.showToast({
                title: '收藏成功',
                icon: 'success',
                duration: 2000
              });
            },
            fail: err => {
              wx.showToast({
                title: '收藏失败',
                icon: 'none',
                duration: 2000
              });
              console.error("收藏失败：", err);
            }
          });
        }
      },
      fail: err => {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
          duration: 2000
        });
        console.error("查询失败：", err);
      }
    });
}
,

  // 处理收藏图标点击事件
  handleCollectClick: function() {
    this.collectProject();
  }
});
=======
=======
// 假设这是你的页面的 JavaScript 部分
const app =getApp()
>>>>>>> 90c2834 (none)
Page({
  data: {
    project: {
      projectName: '',
      type: '',
      majors: '',
      schedule: '',
      contact: '',
      requirements: '',
      introduction: ''
    }
  },

  onLoad: function(options) {
    // 页面加载时获取云数据库中的项目数据
    this.getProjectData();
  },

  getProjectData: function() {
    // 调用云数据库API获取数据
    const db = wx.cloud.database();

    db.collection('project').where({
      projectName: app.globalData.currentProjectName
    }).get({
      success: res => {
        console.log(res.data[0].projectName)
        this.setData({
          project: {
            projectName: res.data[0].projectName,
            type: res.data[0].projectType,
            majors: res.data[0].majorsRequired,
            schedule: res.data[0].timeSchedule,
            contact: res.data[0].contactInfo,
            requirements: res.data[0].memberRequirements,
            introduction: res.data[0].projectIntroduction
          }
        });
      },
      fail: err => {
        // 数据获取失败的处理
        console.error("获取项目数据失败：", err);
      }
    });
  },

  applyToJoin: function() {
    // 申请加入的逻辑
    console.log('申请加入按钮被点击');
  },

  goToDiscussion: function() {
    // 进入讨论区的逻辑
    console.log('进入讨论区按钮被点击');
  }
});
>>>>>>> dc40d99 (Initial Commit)
