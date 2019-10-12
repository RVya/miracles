import Vue from 'vue'
import ElementUI from 'element-ui'

import i18n from './locales/index'
import App from './App.vue'
import router from './router'
import VueBus from 'vue-bus';

import '@/plugins/index'
import '@/styles/index.scss'
import '@/permission/index'
import '@/components/index'
import '@/icons/index'


Vue.use(ElementUI)
Vue.use(VueBus);

new Vue({
  el: '#app',
  i18n,
  // store,
  router,
  render: h => h(App)
})
