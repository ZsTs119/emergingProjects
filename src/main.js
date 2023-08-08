import App from './App.vue';
import router from './router';
import store from './store';
import VueClipboard from 'vue-clipboard2';
import 'normalize.css';
import './assets/icons'; // icon
Vue.use(VueClipboard);
Vue.use(Vant);
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: (h) => h(App),
}).$mount('#app');
