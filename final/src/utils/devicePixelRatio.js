class devicePixelRatio {
    /* 获取系统类型 */
    getSystem() {
      const agent = navigator.userAgent.toLowerCase();
      const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
      if (isMac) return false;
      // 目前只针对 win 处理，其它系统暂无该情况，需要则继续在此添加即可
      if (agent.indexOf("windows") >= 0) return true;
    }
    /* 监听方法兼容写法 */
    addHandler(element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
      } else {
        element["on" + type] = handler;
      }
    }
    /* 校正浏览器缩放比例 */
    correct() {
      // 页面devicePixelRatio（设备像素比例）变化后，计算页面body标签zoom修改其大小，来抵消devicePixelRatio带来的变化
      document.getElementsByTagName("body")[0].style.zoom =
        1 / window.devicePixelRatio;
    }
    /* 监听页面缩放 */
    watch() {
      const that = this;
      // 注意: 这个方法是解决全局有两个window.resize
      that.addHandler(window, "resize", function () {
        that.correct(); // 重新校正浏览器缩放比例
      });
    }
    /* 初始化页面比例 */
    init() {
      const that = this;
      // 判断设备，只在 win 系统下校正浏览器缩放比例
      if (that.getSystem()) {
        that.correct(); // 校正浏览器缩放比例
        that.watch(); // 监听页面缩放
      }
    }
  }
  export default devicePixelRatio;