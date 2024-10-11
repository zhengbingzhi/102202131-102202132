wx.cloud.init({
  env: "pzn-6gge7w8zf9cf192f", // 当前的云开发环境 ID
});
const app = getApp();
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
    const db = wx.cloud.database();
    db.collection('project').where({
      projectName: app.globalData.currentProjectName
    }).get({
      success: res => {
        console.log(res.data[0].projectName);
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
        console.error("获取项目数据失败：", err);
      }
    });
  },

  applyToJoin: function() {
    const db = wx.cloud.database();
    const _ = db.command;
    const newParticipator = app.globalData.user;
    const query = {
      projectName: app.globalData.currentProjectName
    };
    db.collection("project").where(query).get({
      success: function(res) {
        if (res.data.length > 0) {
          const docId = res.data[0]._id;
          db.collection("project").doc(docId).update({
            data: {
              participator: _.push(newParticipator)
            },
            success: function(updateRes) {
              wx.showToast({
                title: '加入成功',
              });
            },
            fail: function(error) {
              console.error("更新失败", error);
            }
          });
        } else {
          console.log("没有找到匹配的文档");
        }
      },
      fail: function(error) {
        console.error("查询失败", error);
      }
    });
  },

  goToDiscussion: function() {
    console.log('进入讨论区按钮被点击');
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
  
 
  
    wx.cloud.database().collection('collect').where({
      id: projectData.id
    }).get({
      success: res => {
        if (res.data.length > 0) {
          wx.showToast({
            title: '项目已收藏',
            icon: 'none',
            duration: 2000
          });
        } else {
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
        console.error("查询失败", err);
      }
    });
  },

  handleCollectClick: function() {
    this.collectProject();
  }
});
