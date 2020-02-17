import audioComponent from './Audio.vue'

const caudio = {
  install: function(Vue) {
    Vue.component('Caudio', audioComponent)
  }
}
export default caudio
