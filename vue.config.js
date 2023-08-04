const { defineConfig } = require('@vue/cli-service');
const CompressionPlugin = require('compression-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

function getConfigPlugins() {
  const plugins = [];
  if (process.env.NODE_ENV === 'production') {
    plugins.push(
      new CompressionPlugin({
        test: /\.(js|css|html)?$/i, // 压缩文件格式
        filename: '[path].gz[query]', // 压缩后的文件名
        algorithm: 'gzip', // 使用gzip压缩
        minRatio: 0.8, // 压缩率小于1才会压缩
      })
    );
  }
  plugins.push(new NodePolyfillPlugin());
  return plugins;
}
const name = process.env.VUE_APP_TITLE || 'emerging' // 网页标题
const port = process.env.port || 8080; // 端口

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  devServer: {
    port: port,
    proxy: {
      '/api': {
        target: `http://api.dev.tyyd.com:8000`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
        bypass: function (req) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        },
      },
    },
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@c': resolve('src/components'),
        '@u': resolve('src/utils'),
      }
    },
    plugins: getConfigPlugins(),
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
});
