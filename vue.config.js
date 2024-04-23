const { defineConfig } = require('@vue/cli-service');
const CompressionPlugin = require('compression-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
//添加生产环境和开发环境需要的Plugins
function getConfigPlugins() {
  const plugins = [];
  if (process.env.NODE_ENV === 'production') {
    //文件压缩
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
  //按需加载polyfill补足旧版本浏览器中缺失的 ECMAScript 新特性
  plugins.push(new NodePolyfillPlugin());
  return plugins;
}
//添加生成环境和开发环境需要的optimization.minimizer
function getConfigOptimizationMinimizer() {
  const minimizer = []
  if (process.env.NODE_ENV === 'production') {
    minimizer.push(
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,  // 移除 console.log
            drop_debugger: true, // 移除 debugger 语句
          },
          output: {
            comments: true, // 移除注释
          },
        },
        extractComments: false, // 移除单独的 .LICENSE 文件
      })
    )
  } else {
    minimizer.push(
      new TerserPlugin({
        //开启多线程
        parallel: true
      }),
    )
    minimizer.push(
      new CssMinimizerPlugin({
        parallel: true
      })
    )
  }
  return minimizer
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
      //别名
      alias: {
        '@': resolve('src'),
        '@c': resolve('src/components'),
        '@u': resolve('src/utils'),
      },
      //解析到文件时自动添加拓展名
      extensions: [".warm", ".mjs", ".js", ".json"],
      //指明存放第三方模块的绝对路径
      modules: [path.resolve(__dirname, 'node_modules')]
    },
    cache: {
      type: 'filesystem', // 使用文件系统级别的缓存
      buildDependencies: {
        // 当配置文件改变时，缓存失效
        config: [__filename]
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
      minimize: true,
      minimizer: getConfigOptimizationMinimizer(),
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
    },
  },
  chainWebpack(config) {
    //可视化打包webpack-bundle-analyzer工具
    if (process.env.NODE_ENV === 'production') {
      config.plugin('bundle-analyzer')
        .use(BundleAnalyzerPlugin)
    }
    //优化loader缓存只对项目根目录下的 src 目录中的文件采用 babel-loader
    const jsRule = config.module.rule('js')
    jsRule.test(/\.js$/)
      .include
      .add(path.resolve(__dirname, 'src'))
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        cacheDirectory: true
      });
    // svg规则
    const svgRule = config.module.rule('svg')
    svgRule.exclude.add(path.join(__dirname, 'src/assets/icons/svg'))
      .end()
    //icons规则
    const iconsRule = config.module.rule('icons')
    iconsRule.test(/\.svg$/)// 设置 icons 的匹配正则
      .include.add(path.join(__dirname, 'src/assets/icons/svg'))// 设置当前规则的作用目录，只在当前目录下才执行当前规则
      .end()
      .use('svg-sprite')// 指定一个名叫 svg-sprite 的 loader 配置
      .loader('svg-sprite-loader')// 该配置使用 svg-sprite-loader 作为处理 loader
      .options({// 该 svg-sprite-loader 的配置
        symbolId: 'icon-[name]'
      })
      .end()
    //images规则
    // const imagesRule = config.module.rule('images');
    // imagesRule.uses.clear();
    // // 添加 file-loader
    // imagesRule
    //   .test(/\.(png|jpg|gif)$/)
    //   .use('file-loader')
    //   .loader('file-loader')
    //   .options({
    //     name: '[name]_[hash].[ext]',
    //     outputPath: 'images/',
    //   })
    //   .end();

    // // 添加 image-webpack-loader
    // imagesRule
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     mozjpeg: {
    //       progressive: true,
    //       quality: 65
    //     },
    //     // optipng.enabled: false will disable optipng
    //     optipng: {
    //       enabled: false,
    //     },
    //     pngquant: {
    //       quality: [0.65, 0.90],
    //       speed: 4
    //     },
    //     gifsicle: {
    //       interlaced: false
    //     },
    //     // the webp option will enable WEBP
    //     webp: {
    //       quality: 75
    //     }
    //   })
    //   .end();
  },
});
