// import Vue from 'vue';
// import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});
// 防止连续点击多次路由报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
export default router;
