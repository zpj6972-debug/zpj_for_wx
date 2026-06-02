// app.js
App({
  onLaunch() {
    const app = this;

    // System info detection (framework-level)
    const menuButtonObject = wx.getMenuButtonBoundingClientRect();
    if (!menuButtonObject) {
      console.warn('[Framework] Menu button not available on this platform');
      return;
    }

    wx.getSystemInfo({
      success: res => {
        const statusBarHeight = res.statusBarHeight;
        const navTop = menuButtonObject.top;
        const navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        app.globalData.navHeight = navHeight;
        app.globalData.navTop = navTop;
        app.globalData.windowHeight = res.windowHeight;
        app.globalData.windowWidth = res.windowWidth;
        app.globalData.menuButtonObject = menuButtonObject;
      },
      fail(err) {
        console.error('[Framework] getSystemInfo failed:', err);
        // Set safe defaults
        app.globalData.navHeight = 88;
        app.globalData.navTop = 26;
        app.globalData.windowHeight = 667;
        app.globalData.windowWidth = 375;
      }
    });
  },

  globalData: {
    navHeight: null,
    navTop: null,
    windowHeight: null,
    windowWidth: null,
    menuButtonObject: null,
  }
});
