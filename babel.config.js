module.exports = {
  presets: [
    //按需加载polyfill补足旧版本浏览器中缺失的 ECMAScript 新特性
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3
    }],
    '@vue/cli-plugin-babel/preset',
  ],
  "plugins": [
    '@babel/plugin-syntax-dynamic-import',// 异步加载语法编译插件
    //vant按需加载
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }],
    ["component", {//按需加载element组件
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    }]
  ],
  'env': {
    'development': {
      'plugins': [
        [
          // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
          'dynamic-import-node'
        ],
        [
          // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
          '@babel/plugin-proposal-optional-chaining'
        ]
      ]
    }
  },

};
