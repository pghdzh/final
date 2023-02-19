<template>
  <div class="">
    <div class="top">
      系统通知
    </div>
    <div class="Mes">
      <div class="system-item" v-for="i in 10" :key="i">
        <div class="item-top">
          <span class="title">通知标题</span>
          <span class="time">2023年2月16日 18:23</span>
        </div>
        <div class="item-bottom">
          <span class="text">
            通知内容Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quae repellendus adipisci sequi, cum,
            autem ea
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
::-webkit-scrollbar {
  width: 2px;
  height: 1px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

.top {
  width: 100%;
  background-color: white;
  color: grey;
  font-size: 16px;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 20px 0;
  box-sizing: border-box;
}

.Mes {
  width: 100%;
  border-radius: 4px;
  padding: 10px 0;
  height: 700px;
  overflow-y: auto;

  .system-item {
    padding: 24px 16px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgb(198, 202, 195);
    margin-bottom: 10px;
    border-radius: 4px;
    line-height: 24px;
    position: relative;
    box-sizing: border-box;
    transform: translateY(0);

    .item-top {
      box-sizing: border-box;

      .title {
        color: #333;
        font-weight: 700;
      }

      .time {
        color: #999;
        font-size: 12px;
        line-height: 22px;
        margin: 0 10px;
      }
    }

    .item-bottom {
      color: #666;
      padding-left: 8px;

      .text {
        word-break: break-word;
        line-height: 19px;
      }
    }
  }
}</style>