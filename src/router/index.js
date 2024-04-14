// import Vue from 'vue';
// import VueRouter from 'vue-router';
import jsRouter from './js/index';
import cssRouter from './css/index';
import echartsRouter from './echarts/index';
Vue.use(VueRouter);

const routes = [
  {
    path: '/js',
    name: 'JavaScript',
    component: () => import('@/views/js/index.vue'),
    children: [
      ...jsRouter
    ],
    meta: {
      title: 'JavaScript',
    },
  },
  {
    path: '/css',
    name: 'CSS',
    component: () => import('@/views/css/index.vue'),
    children: [
      ...cssRouter
    ],
    meta: {
      title: 'CSS',
    },
  },
  {
    path: '/echarts',
    name: 'Echarts',
    component: () => import('@/views/echarts/index.vue'),
    children: [
      ...echartsRouter
    ],
    meta: {
      title: 'Echarts',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 默认重定向js页面
  if (to.path == '/') {
    next({ name: 'Echarts' })
  } else {
    next();
  }
});
// 防止连续点击多次路由报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
export default router;
