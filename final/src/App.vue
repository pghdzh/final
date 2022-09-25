<template>
  <div id="app">
    <topNav class="topNav" v-show="$route.fullPath.indexOf('/talkPage')==-1 && $route.fullPath.indexOf('/contestPage')==-1" />
    <router-view></router-view>
    <divFooter></divFooter>
  </div>
</template>

<script>
export default {
  name: "App",
};

//小帅哥： https://unpkg.com/live2d-widget-model-chitose@1.0.5/assets/chitose.model.json
//萌娘：https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json
//<!--小可爱（女）：https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json-->
//<!--小可爱（男）：https://unpkg.com/live2d-widget-model-haruto@1.0.5/assets/haruto.model.json-->
//<!--初音：https://unpkg.com/live2d-widget-model-miku@1.0.5/assets/miku.model.json-->
//配置文件
const config = {
  model: {
    jsonPath:
      "https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json", //主文件路径
    scale: 1, //模型与canvas的缩放
  },
  display: {
    superSample: 2, // 超采样等级
    position: "right", //显示位置：左或右
    width: 100, // canvas的长度
    height: 150, //canvas的高度
    hOffset: 0, //canvas水平偏移
    vOffset: 0, //canvas垂直偏移
  },
  react: {
    //透明度条件
    opacityDefault: 1, //默认透明度
    opacityOnHover: 0.5, //鼠标移上透明度
  },
  dev: {
    border: false, //在canvas周围显示边界
  },
  mobile: {
    show: true, //是否在移动设备上显示
    scale: 0.5, //移动设备上的缩放
    motion: true, // 移动设备是否开启重力感应
  },
  log: false,
  dialog: {
    enable: true, //显示人物对话框
    hitokoto: true, //使用一言API
  },
};
L2Dwidget.init(config);
</script>

<style scoped lang='less'>
.topNav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
}
</style>
