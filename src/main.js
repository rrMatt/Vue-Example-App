// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import Vuex from 'vuex'
import store from './store/index'


import 'normalize.css'
import 'element-ui/lib/theme-default/index.css'
import './styles/index.scss'

Vue.config.productionTip = false


Vue.use(ElementUi, { locale });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
})
