const jsDemo1 = [
  {
    path: 'selectSevenDays',
    name: 'selectSevenDays',
    component: () => import('@/views/js/Components/selectSevenDays.vue'),
    meta: {
      title: '选择七天',
      permission: 'js.selectSevenDays',
    },
  },

]
const jsReview = [
  ...jsDemo1
]
export default jsReview