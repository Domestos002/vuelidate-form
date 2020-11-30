import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import CustomMask from './components/customMask'
import CustomToasts from './components/customToast'

Vue.use(Vuelidate);
Vue.use(CustomToasts);

Vue.directive('custom-mask', CustomMask);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
