// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import Vuex from 'vuex'
import store from './store/index'
import axios from 'axios'

import 'normalize.css'
import 'element-ui/lib/theme-default/index.css'
import './styles/index.scss'

Vue.config.productionTip = false


Vue.use(ElementUi, { locale });

// force ie11 not to cache requests
axios.defaults.headers.common['Cache-Control'] = "no-cache";
axios.defaults.headers.get['Pragma'] = 'no-cache';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
})
