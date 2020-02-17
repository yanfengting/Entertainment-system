import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store' // 引入store
// import jquery from 'jquery'
import audio from './components/audio'
import vueSwiper from 'vue-awesome-swiper' // 引入vue-awesome-swiper
import registryDialog from './components/common/dialog/index'
import 'swiper/dist/css/swiper.css' // 引入样式
import axios from 'axios'
// import audio from './audiocontrols/Audio'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import './common/css/iconfont.css'

Vue.use(vueSwiper) // 使用插件

// const url = 'http://192.168.188.1/wifi-cms/'
// const url = 'http://118.178.84.155:8080/wifi-cms'
Vue.config.productionTip = false
// window.$ = jquery
// window.jQuery = jquery
// Vue.jquery = Vue.$ = jquery
// axios.header
axios.interceptors.request.use(function (config) {
  let userInfo = localStorage.getItem('userInfo')
  let token = ''
  if (userInfo != undefined && userInfo.length > 10) {
    userInfo = JSON.parse(userInfo)
    if (userInfo.token) {
      token = userInfo.token
    }
  }
  //
  // if (config.url.indexOf(url) === -1) {
  //   config.url = url + config.url /* 拼接完整请求路径 */
  // }
  // config.url = config.url.replace(/\/\//, '/')

  config.withCredentials = true
  config.headers = {
    'token': token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.defaults.timeout = 30000 // 超时时间
axios.interceptors.response.use(function (response) {
  // token 已过期，重定向到登录页面
  if (response.data.status === 401) {
    localStorage.clear()
    router.replace('/')
  }
  return response
}, function (error) {
  if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
    return { data: { 'status': 601 } }
  }
  // Do something with response error
  return Promise.reject(error)
})
// headers: { 'token': this.userInfo.token }

Vue.prototype.axios = axios
Vue.prototype.$video = Video
Vue.prototype.$dialog = (text, icon = 'success', show = true) => {
  return registryDialog.showDialog(text, icon, show)
}
Vue.use(audio)
let vue = new Vue({
  router,
  watch: {
    '$route.path': function (newVal, oldVal) {
      /* let videos = document.getElementsByTagName('video')
      for (let item in videos) {
        item.pause()
      } */
    }
  },
  store,
  // audio,
  render: h => h(App)
}).$mount('#app')
