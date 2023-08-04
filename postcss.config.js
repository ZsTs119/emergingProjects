if (process.VUE_APP_MODE == 'devh5' || process.VUE_APP_MODE == 'preh5') {
  module.exports = {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度.
        unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
        viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位.
        mediaQuery: false,
      },
    },
  };
}

