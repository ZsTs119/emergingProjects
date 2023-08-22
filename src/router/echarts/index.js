const echartsDemo1 = [
  {
    path: 'carousel',
    name: 'carousel',
    component: () => import('@/views/echarts/carousel.vue'),
    meta: {
      title: '轮播滚动',
      permission: 'echarts.carousel',
    },
  },
  {
    path: 'map',
    name: 'map',
    component: () => import('@/views/echarts/map.vue'),
    meta: {
      title: '地图',
      permission: 'echarts.map',
    },
  },
]
const echartsReview = [
  ...echartsDemo1
]
export default echartsReview