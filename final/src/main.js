import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import VueAMap from 'vue-amap';

import router from "@/router"
import topNav from "@/components/topNav"
import footer from "@/components/footer"
import store from '@/store'


Vue.use(ElementUI)

Vue.use(VueAMap);

Vue.component("topNav", topNav)
Vue.component(footer.name, footer)

Vue.config.productionTip = false

VueAMap.initAMapApiLoader({
  key: '39af3f49a9c7962f0cd3590674ad9e48',// 高德的key
  // 插件集合
  plugin: [
    'AMap.CircleEditor',// 圆形编辑器插件
    "AMap.Geolocation", // 定位控件，用来获取和展示用户主机所在的经纬度位置
    "AMap.Geocoder", // 地理编码与逆地理编码服务，用于地址描述与坐标间的相互转换
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.CitySearch",
  ],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
//高德的安全密钥
window._AMapSecurityConfig = {
  securityJsCode: 'a6af0cce3ad51389f8483a4b7dc3e05c',

}
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
