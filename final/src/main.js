import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';


import router from "@/router"
import topNav from "@/components/topNav"
import footer from "@/components/footer"
import store from '@/store'
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client'

// import "@/utils/rem"

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: SocketIO('http://127.0.0.1:3000', {
      autoConnect: false // 取消自动连接     
    }),
    extraHeaders: { 'Access-Control-Allow-Origin': '*' }
  })
)

Vue.use(ElementUI)



Vue.component("topNav", topNav)
Vue.component(footer.name, footer)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
