import Vue from 'vue';
import Toasted from 'vue-toasted';
import Vuelidate from 'vuelidate/src';
import router from '@/router';
import store from '@/store';
import App from '@/App';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(Toasted);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
