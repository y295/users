import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './router'
import axios from "axios"
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './App.vue'

Vue.config.productionTip = false

const http = axios.create({
    //baseURL: process.env.VUE_APP_API_URL || '/admin/api'
    baseURL: 'http://192.168.0.178:3000/web/api'
})

http.interceptors.response.use((response) => {
    // Do something with response data
    return response;
}, (error) => {
    if (error.response.status === 422) {
        Vue.prototype.$notify({
            type: 'danger',
            message: error.response.data.message
        })
    }
    if (error.response.status === 401) {
        router.push('/login')
    }

    // Do something with response error
    return Promise.reject(error);
});

Vue.prototype.$http = http

Vue.use(Vant)
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: routers
})


new Vue({
    render: h => h(App),
    router
}).$mount('#app')
