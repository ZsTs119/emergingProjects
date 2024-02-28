import App from './App.vue';
import router from './router';
import store from './store';
import SvgIcon from '@/components/SvgIcon';
import { http } from "@/utils/axios.js";
import 'normalize.css';
const req = require.context('@/assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => {
  requireContext.keys().map(requireContext)
}
requireAll(req)
Vue.component('svg-icon', SvgIcon);
Vue.prototype.$axios = http;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: (h) => h(App),
}).$mount('#app');
