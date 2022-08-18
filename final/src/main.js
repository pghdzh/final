import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router"
import topNav from "@/components/topNav"
import footer from "@/components/footer"
import store from '@/store'

Vue.use(ElementUI)
Vue.component("topNav", topNav)
Vue.component(footer.name, footer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
