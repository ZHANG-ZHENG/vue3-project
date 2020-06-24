import Vue from 'vue'
import App from './App.vue'


import Axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, Axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

//请求拦截器
// Axios.interceptors.request.use(
//   function (config) {
//       // 在发送请求之前做些什么
//       console.log("在发送请求之前做些什么");
//       return config;
//   },
//   function (error) {
//       // 对请求错误做些什么
//       return Promise.reject(error);
//   }
// );