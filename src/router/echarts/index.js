const echartsDemo1 = [
  {
    path: 'carousel',
    name: 'carousel',
    component: () => import('@/views/echarts/Components/carousel.vue'),
    meta: {
      title: '可控制横向柱状图滚动',
      permission: 'echarts.carousel',
    },
  },
  {
    path: 'columncarousel',
    name: 'columnCarousel',
    component: () => import('@/views/echarts/Components/columnCarousel.vue'),
    meta: {
      title: '竖向柱状图滚动',
      permission: 'echarts.columnCarousel',
    },
  },
  {
    path: 'map',
    name: 'map',
    component: () => import('@/views/echarts/Components/map.vue'),
    meta: {
      title: '全国地图',
      permission: 'echarts.map',
    },
  },
  {
    path: 'mapPart',
    name: 'mapPart',
    component: () => import('@/views/echarts/Components/mapPart.vue'),
    meta: {
      title: '某省地图',
      permission: 'echarts.mapPart',
    },
  },
  {
    path: 'mapBifoldLine',
    name: 'mapBifoldLine',
    component: () => import('@/views/echarts/Components/mapBifoldLine.vue'),
    meta: {
      title: '双折线',
      permission: 'echarts.mapBifoldLine',
    },
  },
]
const echartsReview = [
  ...echartsDemo1
]
export default echartsReview