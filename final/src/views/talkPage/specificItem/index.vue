<template>
  <div class="main">
    <div class="container">
      <div class="talklist">
        <talkBox bcolor="red" />
        <talkBox bcolor="blue" v-for="i in 5" :key="i" />
      </div>
      <div class="right-board">
        <div>
          <span class="board-left">板块</span>
          <span class="board-nav">前端</span>
        </div>
        <div>
          <span class="board-left">楼主</span>
          <span style="color: #8e44ad; cursor: pointer">pgh</span>
        </div>
        <div>
          <span class="board-left">发帖时间</span>
          <span style="color:grey">2022-8-4 11:31:14</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import talkBox from "./talkBox";
export default {
  components: {
    talkBox,
  },
};
</script>

<style scoped lang='less'>
.main {
  width: 100%;
  background-color: rgb(239, 239, 239);
  padding: 20px 0;
  .container {
    width: 80%;
    margin: 0 10%;
    display: flex;
    justify-content: space-between;
    .talklist {
      width: 73%;
    }
    .right-board {
      width: 25%;
      padding: 0 20px;
      height: 160px;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      box-shadow: 0 1px 2px gainsboro;
      div {
        display: flex;
        justify-content: space-between;
        span {
          font-size: medium;
        }
        .board-nav {
          color: #3498db;
          cursor: pointer;
        }
        .board-nav:hover {
          color: #0056b3;
        }
        .board-left {
          font-weight: bold;
        }
      }
    }
  }
}
</style>