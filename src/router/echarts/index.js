const echartsDemo1 = [
  {
    path: 'carousel',
    name: 'carousel',
    component: () => import('@/views/echarts/carousel.vue'),
    meta: {
      title: '可控制横向柱状图滚动',
      permission: 'echarts.carousel',
    },
  },
  {
    path: 'columncarousel',
    name: 'columnCarousel',
    component: () => import('@/views/echarts/columnCarousel.vue'),
    meta: {
      title: '竖向柱状图滚动',
      permission: 'echarts.columnCarousel',
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