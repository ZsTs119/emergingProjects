// import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';
const req = require.context('@/assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => {
  requireContext.keys().map(requireContext)
}
requireAll(req)
import SvgIcon from '@/components/SvgIcon';
Vue.component('svg-icon', SvgIcon);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: (h) => h(App),
}).$mount('#app');
