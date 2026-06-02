# 小程序框架提取 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有微信小程序中的业务代码剥离，仅保留可复用的框架层代码，改造成一个干净的前端框架模板。

**Architecture:** 保留小程序基础设施（构建工具、TailwindCSS、环境配置、导航栏组件），将业务页面替换为最小示例页面，清理业务相关的静态资源和 vant 外部依赖引用。

**Tech Stack:** 微信小程序原生框架、TailwindCSS、Vant Weapp（可选依赖）

---

## File Structure (最终)

| 文件/目录 | 责任 |
|---------|------|
| `app.js` | 小程序入口，保留全局导航栏高度计算等框架逻辑，移除登录相关代码 |
| `app.json` | 全局页面路由和组件注册，精简为框架必需的页面 |
| `app.wxss` | 全局样式，保留 TailwindCSS 引入和通用工具类 |
| `components/nav-bar/` | 自定义导航栏组件（框架级通用组件） |
| `utils/util.js` | 工具函数（格式化等），框架基础能力 |
| `config.js` | 多环境配置管理（开发/体验/生产） |
| `pages/index/` | 框架首页示例（最小化，展示 TailwindCSS + nav-bar 用法） |
| `pages/demo/` | 新增：框架能力演示页（展示常用组件和样式） |
| `styles/tailwind.wxss` | TailwindCSS 入口文件 |
| `tailwind.config.js` | TailwindCSS 配置 |
| `package.json` / `postcss.config.js` | 构建脚本和依赖管理 |
| `assets/iconfont.wxss` | 图标字体（框架级资源） |
| `assets/images/` | 清空业务图片，仅保留框架级占位图 |
| `miniprogram_npm/` | 保留 TailwindCSS 输出，清理 vant 构建产物 |

---

## Task 1: 清理 app.js 业务逻辑

**Files:**
- Modify: `app.js`

- [ ] **Step 1: 移除登录和版本检测业务代码，保留框架级系统信息计算**

```javascript
// app.js
App({
  onLaunch() {
    // 检测系统信息（导航栏高度计算 - 框架级能力）
    const menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        const statusBarHeight = res.statusBarHeight;
        const navTop = menuButtonObject.top;
        const navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.menuButtonObject = menuButtonObject;
      },
      fail(err) {
        console.error('[Framework] getSystemInfo failed:', err);
      }
    });
  },

  globalData: {
    navHeight: null,
    navTop: null,
    windowHeight: null,
    menuButtonObject: null,
  }
});
```

- [ ] **Step 2: Commit**

```bash
git add app.js
git commit -m "refactor: strip business logic from app.js, keep framework system info"
```

---

## Task 2: 精简 app.json 页面配置

**Files:**
- Modify: `app.json`

- [ ] **Step 1: 移除业务页面，仅保留框架基础页面和通用组件**

```json
{
  "pages": [
    "pages/index/index",
    "pages/demo/index"
  ],
  "window": {
    "navigationStyle": "custom"
  },
  "componentFramework": "glass-easel",
  "sitemapLocation": "sitemap.json",
  "usingComponents": {
    "nav-bar": "/components/nav-bar/nav-bar"
  },
  "lazyCodeLoading": "requiredComponents"
}
```

- [ ] **Step 2: Commit**

```bash
git add app.json
git commit -m "refactor: simplify app.json to framework-only pages and components"
```

---

## Task 3: 清理 app.wxss 业务样式

**Files:**
- Modify: `app.wxss`

- [ ] **Step 1: 移除 vant 样式引入和业务定制样式，保留框架通用工具类**

```css
/**app.wxss - Framework Global Styles**/
@import "miniprogram_npm/tailwind/tailwind.wxss";
@import "./assets/iconfont.wxss";

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #F1F6FF;
}

/* ===== Framework Utility Classes ===== */

.border-radius8 { border-radius: 8rpx; }
.w-full { width: 100%; }
.h-full { height: 100%; }
.relative { position: relative; }

.p-20 { padding: 20rpx; }
.p-lr-20 { padding: 0 20rpx; }
.p-tb-20 { padding: 20rpx 0; }
.p-l-20 { padding-left: 20rpx; }
.p-r-20 { padding-right: 20rpx; }
.p-t-20 { padding-top: 20rpx; }
.p-b-20 { padding-bottom: 20rpx; }

.flex { display: flex; }
.flex-1 { flex: 1; }
.flex-row { flex-direction: row; }
.flex-column { flex-direction: column; }
.flex-x-center { justify-content: center; }
.flex-y-center { align-items: center; }
```

- [ ] **Step 2: Commit**

```bash
git add app.wxss
git commit -m "refactor: clean app.wxss, remove vant and business styles, keep framework utilities"
```

---

## Task 4: 替换 pages/index 为框架示例页

**Files:**
- Modify: `pages/index/index.js`
- Modify: `pages/index/index.json`
- Modify: `pages/index/index.wxml`
- Modify: `pages/index/index.wxss`

- [ ] **Step 1: 重写 index.js 为框架示例**

```javascript
const app = getApp();

Page({
  data: {
    navHeight: app.globalData.navHeight,
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
```

- [ ] **Step 2: 重写 index.json**

```json
{
  "usingComponents": {
    "nav-bar": "/components/nav-bar/nav-bar"
  }
}
```

- [ ] **Step 3: 重写 index.wxml 为最小示例**

```xml
<view class="container" style="padding-top: {{ navHeight }}px">
  <nav-bar pageName="{{ pageName }}" showNav="{{ showNav }}" bind:list="handleList"></nav-bar>

  <view class="content flex flex-column flex-y-center">
    <view class="title">Mini Program Framework</view>
    <view class="subtitle">基于 TailwindCSS 的小程序框架模板</view>

    <view class="card">
      <view class="card-title">框架特性</view>
      <view class="card-item">✓ TailwindCSS 原子化样式</view>
      <view class="card-item">✓ 自定义导航栏组件</view>
      <view class="card-item">✓ 多环境配置管理</view>
      <view class="card-item">✓ 图标字体支持</view>
    </view>

    <view class="btn-primary" bind:tap="handleList">查看演示页</view>
  </view>
</view>
```

- [ ] **Step 4: 重写 index.wxss**

```css
page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 60rpx 40rpx;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  color: #4670e7;
  margin-bottom: 20rpx;
}

.subtitle {
  font-size: 28rpx;
  color: #888;
  margin-bottom: 80rpx;
}

.card {
  width: 100%;
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  margin-bottom: 60rpx;
  box-shadow: 0 4rpx 20rpx rgba(70, 112, 231, 0.1);
}

.card-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
  border-bottom: 2rpx solid #eee;
  padding-bottom: 20rpx;
}

.card-item {
  font-size: 28rpx;
  color: #555;
  line-height: 2;
}

.btn-primary {
  width: 100%;
  height: 88rpx;
  background: #4670e7;
  color: #fff;
  font-size: 32rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

- [ ] **Step 5: Commit**

```bash
git add pages/index/
git commit -m "refactor: replace index page with framework demo homepage"
```

---

## Task 5: 删除 my 页面，新增 demo 演示页

**Files:**
- Delete: `pages/my/` (整目录)
- Create: `pages/demo/index.js`
- Create: `pages/demo/index.json`
- Create: `pages/demo/index.wxml`
- Create: `pages/demo/index.wxss`

- [ ] **Step 1: 删除 my 页面目录**

```bash
rm -rf pages/my
```

- [ ] **Step 2: 创建 demo 页面 JS**

```javascript
const app = getApp();

Page({
  data: {
    navHeight: app.globalData.navHeight,
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
```

- [ ] **Step 3: 创建 demo 页面 JSON**

```json
{
  "usingComponents": {
    "nav-bar": "/components/nav-bar/nav-bar"
  }
}
```

- [ ] **Step 4: 创建 demo 页面 WXML**

```xml
<view class="container" style="padding-top: {{ navHeight }}px">
  <nav-bar pageName="{{ pageName }}" showNav="{{ showNav }}"></nav-bar>

  <view class="content">
    <view class="section">
      <view class="section-title">TailwindCSS 示例</view>
      <view class="flex flex-row items-center justify-center p-4">
        <text class="text-lg font-bold text-blue-500">flex + padding + text</text>
      </view>
      <view class="flex flex-row justify-between p-4">
        <view class="w-16 h-16 bg-red-400 rounded"></view>
        <view class="w-16 h-16 bg-green-400 rounded"></view>
        <view class="w-16 h-16 bg-blue-400 rounded"></view>
      </view>
    </view>

    <view class="section">
      <view class="section-title">图标字体示例</view>
      <view class="icon-row">
        <view class="icon-item">
          <view class="iconfont icon-yule"></view>
          <text>娱乐</text>
        </view>
        <view class="icon-item">
          <view class="iconfont icon-zhaoxiangji"></view>
          <text>相机</text>
        </view>
      </view>
    </view>
  </view>
</view>
```

- [ ] **Step 5: 创建 demo 页面 WXSS**

```css
page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 40rpx;
}

.section {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.icon-row {
  display: flex;
  flex-direction: row;
  gap: 40rpx;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.icon-item .iconfont {
  font-size: 48rpx;
  color: #4670e7;
}

.icon-item text {
  font-size: 24rpx;
  color: #666;
}
```

- [ ] **Step 6: Commit**

```bash
git add pages/
git commit -m "feat: replace my page with demo showcase page"
```

---

## Task 6: 清理业务静态资源

**Files:**
- Delete: `assets/images/banner_*.png`
- Delete: `assets/images/nav/` (整目录)

- [ ] **Step 1: 删除业务图片**

```bash
rm -f assets/images/banner_01.png assets/images/banner_02.png assets/images/banner_03.png assets/images/banner_04.png
rm -rf assets/images/nav
```

- [ ] **Step 2: Commit**

```bash
git add assets/
git commit -m "refactor: remove business images, keep only framework assets"
```

---

## Task 7: 更新 package.json 清理业务依赖

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 清理 package.json**

```json
{
  "name": "miniprogram-framework",
  "version": "1.0.0",
  "description": "微信小程序框架模板 - 基于 TailwindCSS",
  "scripts": {
    "build:tailwind": "npx tailwindcss -i ./styles/tailwind.wxss -o ./miniprogram_npm/tailwind/tailwind.wxss --minify",
    "dev:tailwind": "npx tailwindcss -i ./styles/tailwind.wxss -o ./miniprogram_npm/tailwind/tailwind.wxss --watch"
  },
  "keywords": ["miniprogram", "tailwindcss", "framework"],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    "postcss": "^8.5.8",
    "tailwindcss": "^3.4.19",
    "tailwindcss-miniprogram-preset": "^2.1.2"
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add package.json
git commit -m "refactor: update package.json for framework template"
```

---

## Task 8: 清理 vant 构建产物和 tailwind 配置

**Files:**
- Delete: `miniprogram_npm/@vant/` (整目录)
- Modify: `tailwind.config.js` 中的 purge 路径

- [ ] **Step 1: 删除 vant 构建产物**

```bash
rm -rf miniprogram_npm/@vant
```

- [ ] **Step 2: 精简 tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
const { defaultPreset } = require('tailwindcss-miniprogram-preset');

module.exports = {
  purge: [
    './pages/**/*.{js,wxml}',
    './components/**/*.{js,wxml}',
  ],
  presets: [defaultPreset],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- [ ] **Step 3: 重新构建 TailwindCSS**

```bash
npm run build:tailwind
```

- [ ] **Step 4: Commit**

```bash
git add miniprogram_npm/ tailwind.config.js
git commit -m "refactor: remove vant, rebuild tailwind for framework"
```

---

## Task 9: 验证框架可用性

- [ ] **Step 1: 检查文件结构**

Expected structure:
```
.
├── app.js              # 框架入口（无业务逻辑）
├── app.json            # 仅 index + demo 页面
├── app.wxss            # 全局样式 + Tailwind
├── components/
│   └── nav-bar/        # 导航栏组件
├── pages/
│   ├── index/          # 框架首页示例
│   └── demo/           # 组件演示页
├── utils/
│   └── util.js         # 工具函数
├── config.js           # 环境配置
├── styles/
│   └── tailwind.wxss   # Tailwind 入口
├── assets/
│   └── iconfont.wxss   # 图标字体
├── miniprogram_npm/
│   └── tailwind/       # Tailwind 构建输出
├── tailwind.config.js
├── package.json
└── postcss.config.js
```

- [ ] **Step 2: 用微信开发者工具打开项目，确认编译通过**

Open WeChat DevTools → Import Project → Select `D:\zpj\pai_ji_ji` → Confirm pages load without errors.

- [ ] **Step 3: Commit**

```bash
git commit --allow-empty -m "chore: framework extraction complete"
```

---

## Self-Review Checklist

| Spec | Task |
|------|------|
| 删除业务代码 | Task 1 (app.js), Task 4 (index), Task 5 (my→demo), Task 6 (images) |
| 保留框架代码 | Task 1-3 (app.*), Task 4 (index 示例), nav-bar 组件, utils, config |
| 清理外部依赖 | Task 7-8 (vant 移除, package.json 更新) |
| 可运行验证 | Task 9 |

**无 Placeholder：** 所有步骤均包含完整代码和命令。
