const app = getApp();

Page({
  data: {
    navHeight: 0,
    pageName: '组件演示',
    showNav: -1,
  },

  onLoad() {
    this.setData({ navHeight: app.globalData.navHeight });
  },

  handleBack() {
    wx.navigateBack();
  },
});
