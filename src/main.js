import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueClipboard from 'vue-clipboard2';
import Vant from 'vant';
import ElementUI from "element-ui";
import * as echarts from "echarts";
import moment from 'moment';
import 'vant/lib/index.css';
import "element-ui/lib/theme-chalk/index.css";
import 'normalize.css';
import './assets/icons'; // icon
Vue.use(VueClipboard);
Vue.use(Vant);
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.prototype.moment = moment;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: (h) => h(App),
}).$mount('#app');
