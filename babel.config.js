module.exports = {
  presets: [
    //按需加载polyfill
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3
    }],
    '@vue/cli-plugin-babel/preset',
  ],
  "plugins": [
    '@babel/plugin-syntax-dynamic-import',// 异步加载语法编译插件
  ],
  'env': {
    'development': {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      'plugins': [
        [
          'dynamic-import-node'
        ],
        [
          '@babel/plugin-proposal-optional-chaining'
        ]
      ]
    }
  }
};
