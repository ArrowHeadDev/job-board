import Vue from 'vue'
import App from './App.vue'
//import vue router and vuex store (manages all data)
import router from './router'

//Import bootstrap and icons
import {BootstrapVue,BootstrapVueIcons} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'
import VueCookies from 'vue-cookies';

import 'sweetalert2/dist/sweetalert2.min.css';
import 'sweetalert2/src/sweetalert2.scss'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueSweetalert2)
Vue.use(VueCookies);


Vue.$cookies.config('7d');

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
