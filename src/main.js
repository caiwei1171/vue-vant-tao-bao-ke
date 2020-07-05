import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入全局样式表
import "@/assets/css/global.css"

// 引入font图标
import "@/assets/css/font/iconfont.css"

// 引入plugins下的vant.js文件
import "@/plugins/vant.js"

// 引入设置移动端的相关配置
import "amfe-flexible"

// 加载动画,dialog提示框
import {Toast,Dialog} from "vant"
const load = (duration = {}) => {
  Toast.loading({
    message: '数据加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration
  })
}
const dialog = (title = "",message = "") =>{
  return Dialog.confirm({
    title,
    message
  })
}
Vue.prototype.$api = load
Vue.prototype.$dialog = dialog
//下面代码若挂载某个组件中可以这样使用
// this.$toast.loading({
//   message: '数据加载中...',
//   forbidClick: true,
//   loadingType: 'spinner',
//   duration:!this.box.length ? 0 : 1500
// })

// 设置浏览器的大标题
// Vue.directive('title', {
//   inserted:function(el){
//     document.title = el.dataset.title
//   }
// })
// <div v-title data-title="分类"></div>
Vue.config.productionTip = false

//弹出框禁止滑动
Vue.prototype.noScroll = function(){  
  var mo = function(e){ 
    e.preventDefault()
  } 
  document.body.style.overflow = 'hidden' //隐藏滚动条
  document.addEventListener('touchmove',mo,false)// 禁止页面滑动
} 
//弹出框可以滑动
Vue.prototype.canScroll = function(){  
  var mo = function(e){    
    e.preventDefault()  
  }  
  document.body.style.overflow = ''// 出现滚动条 
  document.removeEventListener('touchmove',mo,false)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
