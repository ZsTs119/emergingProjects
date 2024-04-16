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
    path: 'mapBifoldLine',
    name: 'mapBifoldLine',
    component: () => import('@/views/echarts/Components/mapBifoldLine.vue'),
    meta: {
      title: '双折线',
      permission: 'echarts.mapBifoldLine',
    },
  },
  {
    path: 'columnLineChart',
    name: 'columnLineChart',
    component: () => import('@/views/echarts/Components/columnLineChart.vue'),
    meta: {
      title: '柱形折线',
      permission: 'echarts.columnLineChart',
    },
  },
  {
    path: '3Dcylinder',
    name: '3Dcylinder',
    component: () => import('@/views/echarts/Components/3Dcylinder.vue'),
    meta: {
      title: '3D圆柱',
      permission: 'echarts.3Dcylinder',
    },
  },
  {
    path: 'wordCloud',
    name: 'wordCloud',
    component: () => import('@/views/echarts/Components/wordCloud.vue'),
    meta: {
      title: '词云',
      permission: 'echarts.wordCloud',
    },
  },
  {
    path: 'radarMap',
    name: 'radarMap',
    component: () => import('@/views/echarts/Components/radarMap.vue'),
    meta: {
      title: '雷达图',
      permission: 'echarts.radarMap',
    },
  },
  {
    path: 'board',
    name: 'board',
    component: () => import('@/views/echarts/Components/board.vue'),
    meta: {
      title: '仪表盘',
      permission: 'echarts.board',
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

]
const echartsReview = [
  ...echartsDemo1
]
export default echartsReview