<template>
  <div id="app" class="main">

    <topNav class="topNav" v-show="
      $route.fullPath.indexOf('/talkPage') == -1 &&
      $route.fullPath.indexOf('/contestPage') == -1 &&
      $route.fullPath.indexOf('/talkspecificitem') == -1
    " />
    <router-view></router-view>
    <divFooter v-show="
      $route.fullPath.indexOf('/talkspecificitem') == -1"></divFooter>

  </div>
</template>

<script>

// import ScaleBox from "vue2-scale-box";

// import devPixelRatio from "@/utils/devicePixelRatio.js";

export default {
  name: "App",
  // components: { ScaleBox },
  created() {
    // new devPixelRatio().init(); // 初始化页面比例
  },

};

// 配置文件

const config = {
  // pluginRootPath: '/static/live2dw/',//插件在站点上的根目录(相对路径)
  tagMode: false,//标签模式, 是否仅替换 live2d tag标签而非插入到所有页面中
  debug: false,//调试, 是否在控制台输出日志
  name: {
    canvas: 'MId'//自定义cavas标签的id（可不需要）
  },
  model: {
    jsonPath: sessionStorage.getItem("live2d") || '/static/live2dw/tororo/assets/tororo.model.json', //主文件路径
    scale: 1,//模型与canvas的缩放  
  },
  display: {
    superSample: 2, // 超采样等级
    position: 'right', //显示位置：左或右
    width: 100,// canvas的长度
    height: 150,//canvas的高度
    hOffset: 0,//canvas水平偏移
    vOffset: 0,//canvas垂直偏移
  },
  react: {//透明度条件
    opacityDefault: 1,//默认透明度
    opacityOnHover: 0.5//鼠标移上透明度
  },
  dev: {
    border: false,//在canvas周围显示边界
  },
  mobile: {
    show: true,//是否在移动设备上显示
    scale: 0.5,//移动设备上的缩放
    motion: true, // 移动设备是否开启重力感应
  },
  log: true,
  dialog: {
    enable: true,//显示人物对话框
    hitokoto: false,//使用一言API
  }
};



L2Dwidget.init(config)

</script>

<style scoped lang='less'>
/* 设置响应式 */
@media (max-width: 1200px) {
    .main {
        transform: scale(0.7);
    }
}

@media (max-width: 1000px) {
    .main {
        transform: scale(0.6);
    }
}

@media (max-width: 800px) {
    .main {
        transform: scale(0.5);
    }
}

@media (max-width: 600px) {
    .main {
        transform: scale(0.4);
    }
}

.topNav {
  position: fixed;
  top: 0;
  z-index: 99;
  min-width: 1200px;
}

div#app {
  min-width: 1200px;
}
</style>
