const ENV_CONFIG = {
  // 开发版
  develop: {
    baseUrl: "http://localhost:8080",
    envName: "开发环境"
  },
  // 体验版
  trial: {
    baseUrl: "http://localhost:8080",
    envName: "体验环境"
  },
  // 正式版
  release: {
    baseUrl: "https://your-domain.com",
    envName: "生产环境"
  },
  // 默认配置（防止未匹配到环境）
  default: {
    baseUrl: "http://localhost:8080",
    envName: "默认开发环境"
  }
};

// 获取当前小程序环境
const currentEnv = wx.getAccountInfoSync().miniProgram.envVersion || 'develop';

// 获取当前环境配置，如果没有匹配则使用默认配置
const currentConfig = ENV_CONFIG[currentEnv] || ENV_CONFIG.default;

// 导出配置
module.exports = {
  baseUrl: currentConfig.baseUrl,
};
