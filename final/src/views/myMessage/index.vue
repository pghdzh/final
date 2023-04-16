<template>
  <div class="container">
    <div class="mid">
      <div class="left-nav">
        <div class="nav-top">
          <i class="el-icon-s-promotion"></i>
          消息中心
        </div>
        <div class="nav-list">
          <div class="list-item" :class="{itemSelected : navIndex == 1}" @click="mesRoute(1)">系统通知</div>
          <div class="list-item" :class="{itemSelected : navIndex == 2}" @click="mesRoute(2)">回复我的</div>
          <div class="list-item" :class="{itemSelected : navIndex == 3}" @click="mesRoute(3)">我的消息</div>
        </div>
      </div>
      <div class="right-detail">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navIndex:1,
    };
  },
  methods: {
    mesRoute(index) {
      switch (index) {
        case 1:
          this.navIndex = 1
          this.$router.push({ path: "/mymessage/sysMes" });
          break;
        case 2:
        this.navIndex = 2
          this.$router.push({ path: "/mymessage/myReply" });
          break;
        case 3:
        this.navIndex = 3
          this.$router.push({ path: "/mymessage/myMes" });
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.container {
  margin-top: 60px;
  background-color: rgb(239, 239, 239);
  min-height: 850px;
  .mid {
    width: 70%;
    margin-left: 15%;
    height: 850px;
    display: flex;
    justify-content: space-between;
    .left-nav {
      width: 15%;
      background-color: rgba(225, 225, 225, 0.3);
      height: 100%;
      text-align: center;
      .nav-top {
        font-size: 16px;
        font-weight: bold;
        margin: 20px 0;
      }
      .nav-list {
        .list-item {
          margin: 15px 0;
          font-size: 16px;
          cursor: pointer;
          font-weight: bold;
          color: grey;
        }
        .itemSelected{
          color: #2faee3;
        }
        .list-item:hover {
          color: #2faee3;
        }
      }
    }
    .right-detail {
      width: 83%;
      min-height: 100%;
    }
  }
}
</style>