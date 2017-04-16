// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Modal from './components/Modal.vue'
import axios from  'axios';

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.component(Modal.name, Modal);//注册弹出组件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
