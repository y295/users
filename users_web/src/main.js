import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './router'
import axios from "axios"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'


const http = axios.create({
    //baseURL: process.env.VUE_APP_API_URL || '/admin/api'
    baseURL: 'http://localhost:3000/web/api'
})

http.interceptors.response.use((response) => {
  // Do something with response data
  return response;
}, (error) => {
  if (error.response.status === 422) {
    Vue.prototype.$message({
      type: 'error',
      message: error.response.data.message
    })
  }
  if (error.response.status === 401) {
    router.push('/login')
  }

  // Do something with response error
  return Promise.reject(error);
});

Vue.config.productionTip = false
Vue.prototype.$http = http

Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter({
  mode: 'history',
  routes: routers
})

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
