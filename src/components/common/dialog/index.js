import vue from 'vue'

// 静态组件
import dialogComponent from './dialog.vue'

// 返回一个扩展实力构造器
const DialogConstructor = vue.extend(dialogComponent)
let toastDom

// 定义弹出组件的函数 两个参数 显示文本和显示时间
function showDialog(text, icon = 'success', show = true) {
  if (toastDom) {
    if (toastDom.showWrap) {
      return toastDom
    }
  }
  toastDom = new DialogConstructor({
    el: document.createElement('div'),
    data() {
      return {
        text: text,
        icon: icon,
        showWrap: show, // 是否显示组件
        showContent: show // 作用:在隐藏组件之前,显示隐藏动画
      }
    },
    methods: {
      show() {
        this.showWrap = true
        this.showContent = true
        toastDom = this
      },
      hide() {
        toastDom = this
        this.showWrap = false
        this.showContent = false
        debugger
        let node = document.querySelector('#dialog')
        if (node && node.parentNode) {
          node.parentNode.removeChild(node)
        }
      }
    }
  })
  // 把实例化的toast.vue 添加到body中
  document.body.appendChild(toastDom.$el)
  return toastDom
}

// 注册为全局组件的函数
// 将组件注册到 vue 的 原型链里去,
// 这样就可以在所有 vue 的实例里面使用 this.$toast()

// function registryToast() {
//     vue.prototype.$toast = showToast
// }

// 将注册在vue原型链改为调用showToast
const registryDialog = {
  showDialog: showDialog
}

export default registryDialog
