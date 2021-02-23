import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.config.productionTip = false

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
