import '../style/style.css'; //通用样式

import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import VueCookie from 'vue-cookie';
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'


import App from './App.vue';
import Login from './Login.vue';

Vue.use(Vuex);
Vue.use(VueCookie);
Vue.use(ElementUI);
Vue.use(VueRouter);
//http
Axios.defaults.withCredentials = true;
Vue.prototype.$http = Axios;

//事件总线
var bus = new Vue();
Vue.prototype.$bus = bus;

const routes = [
    { path: '/Login', component: Login },
    { path: '/Main', component: App },
    { path: '/', component: App }
  ];
  
const router = new VueRouter({
    routes
});

const store = new Vuex.Store({
    router,
    state: {
        host: 'http://localhost:7001/',
        loading:false,
        userInfo:{}
    },
    mutations: {


        //修改加载状态
        changeLoadingState(state, value){
            state.loading = value;
        },


        //保存用户信息
        saveUserInfo(state, value){
            state.userInfo = value;
        }
    }
});


new Vue({
    // el: '#app',
    store: store,
    router,
    // render: h => h(App)
}).$mount('#app');