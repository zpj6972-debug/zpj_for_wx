const app = getApp();

Page({
  data: {
    navHeight: 0,
    pageName: 'Framework Home',
    showNav: 1,
  },

  onLoad() {
    this.setData({ navHeight: app.globalData.navHeight });
  },

  handleList() {
    wx.navigateTo({ url: '/pages/demo/index' });
  },
});
