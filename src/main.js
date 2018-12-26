import Vue from 'vue';
import './plugins/vuetify-confirm';
import './plugins/vuetify';
import './plugins/vee-validate';
import './plugins/vue-notify';
import shared from '@/shared/components';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(shared);

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
