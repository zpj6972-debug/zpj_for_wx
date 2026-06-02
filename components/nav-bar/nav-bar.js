const app = getApp();

Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    pageName: {
      type: String,
      value: ''
    },
    showNav: {
      type: Number,
      value: 0
    }
  },

  data: {
    navHeight: 0,
    navTop: 0,
  },

  methods: {
    handBack() {
      wx.navigateBack();
    },
    handList() {
      this.triggerEvent('list');
    },
  },

  lifetimes: {
    attached() {
      this.setData({
        navHeight: app.globalData.navHeight || 88,
        navTop: app.globalData.navTop || 26,
      });
    }
  }
});
