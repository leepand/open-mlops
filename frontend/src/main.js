import Vue from 'vue'
import App from './App'
import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import 'babel-polyfill'

import vueHljs from 'vue-hljs'
// if you want to use default color, import this css file
//import 'vue-hljs/dist/vue-hljs.min.css'
import 'vue-hljs/dist/style.css'
import hljs from "highlight.js";


import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'zh-CN', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    ja: require('date-fns/locale/ja')
  }
})

Vue.config.productionTip = false

Vue.use(ELEMENT)
Vue.use(VueRouter)
Vue.use(Vuex)

// use
Vue.use(vueHljs, { hljs })

// NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

// http request 拦截器
axios.interceptors.request.use(
  config => {
    var token = sessionStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      token = sessionStorage.getItem('token') + ':'
      config.headers.Authorization = `Basic ${new Buffer(token).toString('base64')}`
    }
    return config
  }
  /* error => {
    Message({
      message: '登录状态信息过期,请重新登录',
      type: 'error'
    })
    router.push({
      path: '/login'
    })
    // return Promise.reject(error);
  } */
)

// http response 拦截器

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          localStorage.removeItem('token')
          router.push({
            path: '/login'
          })
          // eslint-disable-next-line no-undef
          Message({
            message: error, // '请检查登录',
            type: 'error'
          })
      }
    }
    // return Promise.reject(error);
  })

/* router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('token');
  }
  let token = sessionStorage.getItem('token');
  if (!token && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
}) */

router.beforeEach((to, from, next) => {
  // NProgress.start();
  if (to.path === '/login') {
    sessionStorage.removeItem('token')
  }
  let token = sessionStorage.getItem('token')
  if (token === 'undefined') {
    token = ''
  }

  if (!token && to.path === '/register') {
    next()
  } else if (!token && to.path === '/forgetPassword') {
    next()
  } else if (!token && to.path !== '/login') {
    console.log(to.path)
    next({ path: '/login', query: { url: to.path } })
  } else {
    next()
  }
  if (to.path === '/') {
    next({ path: '/dashboard' })
  }
})

let Highlight = {}
Highlight.install = function (Vue, options) {
  // 先有数据再绑定，调用highlightA
  Vue.directive('highlightA', {
    inserted: function (el) {
      let blocks = el.querySelectorAll('pre code')
      for (let i = 0; i < blocks.length; i++) {
        console.log(blocks)
        console.log(blocks[i])
        const item = blocks[i]
        console.log(item)
        hljs.highlightBlock(item)
      };
    }
  })
  // 先绑定，后面会有数据更新，调用highlightB
  Vue.directive('highlightB', {
    componentUpdated: function (el) {
      let blocks = el.querySelectorAll('pre code')
      for (let i = 0; i < blocks.length; i++) {
        const item = blocks[i]
        hljs.highlightBlock(item)
      };
    }
  })
}

Vue.use(Highlight)

/* router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
}) */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
