const cssDemo1 = [
  {
    path: 'conter',
    name: 'conter',
    component: () => import('@/views/css/Components/conter.vue'),
    meta: {
      title: '计数器',
      permission: 'css.conter',
    },
  },
]
const cssReview = [
  ...cssDemo1
]
export default cssReview