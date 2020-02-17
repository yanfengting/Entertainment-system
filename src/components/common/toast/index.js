import vue from 'vue'

// 静态组件
import toastComponent from './toast.vue'

// 返回一个扩展实力构造器
const ToastConstructor = vue.extend(toastComponent)

// 定义弹出组件的函数 两个参数 显示文本和显示时间
function showToast(text, showtime = 3000) {
    const toastDom = new ToastConstructor({
        el: document.createElement('div'),
        data() {
            return {
                text: text,
                showWrap: true, // 是否显示组件
                showContent: true // 作用:在隐藏组件之前,显示隐藏动画
            }
        }
    })

    // 把实例化的toast.vue 添加到body中
    document.body.appendChild(toastDom.$el)

    // 隐藏
    setTimeout(() => {
        toastDom.showContent = false
    }, showtime)
    // 过了 showtime 时间后隐藏整个组件
    setTimeout(() => {
        toastDom.showWrap = false
    }, showtime)
}

// 注册为全局组件的函数
// 将组件注册到 vue 的 原型链里去,
// 这样就可以在所有 vue 的实例里面使用 this.$toast()

// function registryToast() {
//     vue.prototype.$toast = showToast
// }

// 将注册在vue原型链改为调用showToast
const registryToast = {
    showToast: showToast
}

export default registryToast
