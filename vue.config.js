const { defineConfig } = require('@vue/cli-service');
const CompressionPlugin = require('compression-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
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
        threshold: 10240,//只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0
        minRatio: 0.8, // 压缩率小于1才会压缩
      })
    );
  }
  plugins.push(new NodePolyfillPlugin());
  return plugins;
}
const name = process.env.VUE_APP_TITLE || 'EMERGING' // 网页标题
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
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.NODE_ENV === 'development' ?
          process.env.TEST_URL :
          process.env.PRO_URL,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]:
            [process.env.VUE_APP_BASE_API + '/']
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
    optimization: {
      //移除项目中未使用的代码。
      usedExports: true,
      //分割chunk-vendors包
      splitChunks: {
        chunks: 'all'
      },
      //替代 webpack 默认的 uglifyjs-webpack-plugin
      minimizer: [
        new TerserPlugin({
          parallel: true
        })
      ],
      //根据模块引用频率、体积等设置更合理的 split chunk,防止重复代码。
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      //可以减少模块间代码引用,提升作用域树结构。
      concatenateModules: true
    },
    externals: {
      // CDN 的 Element 依赖全局变量 Vue， 所以 Vue 也需要使用 CDN 引入
      'vue': 'Vue',
      // 属性名称 element-ui, 表示遇到 import xxx from 'element-ui' 这类引入 'element-ui'的，
      // 不去 node_modules 中找，而是去找 全局变量 ELEMENT
      'vue-router': 'VueRouter',
      'echarts': 'echarts'
    }

  },
  chainWebpack(config) {
    //可视化打包webpack-bundle-analyzer工具
    if (process.env.NODE_ENV === 'production') {
      config.plugin('bundle-analyzer')
        .use(BundleAnalyzerPlugin)
    }
    // svg图标加载
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, 'src/assets/icons/svg'))
      .end()

    config.module
      .rule('icons')// 定义一个名叫 icons 的规则
      .test(/\.svg$/)// 设置 icons 的匹配正则
      .include.add(path.join(__dirname, 'src/assets/icons/svg'))// 设置当前规则的作用目录，只在当前目录下才执行当前规则
      .end()
      .use('svg-sprite')// 指定一个名叫 svg-sprite 的 loader 配置
      .loader('svg-sprite-loader')// 该配置使用 svg-sprite-loader 作为处理 loader
      .options({// 该 svg-sprite-loader 的配置
        symbolId: 'icon-[name]'
      })
      .end()
  },
});
