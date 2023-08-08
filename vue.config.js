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
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'axios'
    }

  },
  chainWebpack(config) {
    //可视化打包webpack-bundle-analyzer工具
    if (process.env.NODE_ENV === 'production') {
      config.plugin('bundle-analyzer')
        .use(BundleAnalyzerPlugin)
    }
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
    config.plugins.delete('prefetch')

  },
});
