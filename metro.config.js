const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  resolver: {
    alias: {
      "@assets": "./assets",
      "@components": "./src/components",
      "@views": "./src/views",
      "@services": "./src/services",
      "@types": "./src/types"
    }
  },
  ...defaultConfig,
};