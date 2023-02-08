<template>
  <div class="main">
    <div class="top">
      <div class="left">
        <div class="avatar">
          <img :src="userImg" alt="" />
        </div>
        <div class="nameAndsign">
          <div>{{ userName }}</div>
          <div style="font-size: 14px; margin-top: 6px">
            这个人很懒什么都没有留下(签名)
          </div>
        </div>
      </div>
      <div class="right" @click="goSetPage">
        <el-button plain><i class="el-icon-setting">个人设置</i></el-button>
      </div>
    </div>
    <div class="mid">
      <div class="personIntor">
        <h1>个人介绍</h1>
        <div class="detail">详细个人介绍</div>
      </div>
      <div class="otherInfo">
        <div class="item">
          <span class="item-left">用户ID</span>
          <span class="item-right">1</span>
        </div>
        <div class="item">
          <span class="item-left">所属小组</span>
          <span class="item-right">综合开发小组</span>
        </div>
        <div class="item">
          <span class="item-left">学习方向</span>
          <span class="item-right">前端</span>
        </div>
        <div class="item">
          <span class="item-left">联系方式</span>
          <span class="item-right">123456798</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { requserInfo } from "@/api";
export default {
  name: "userPage",
  mounted() {
    this.getuserInfo();
  },
  computed: {
    ...mapGetters("user", ["userName", "userImg"]),
  },
  methods: {
    goSetPage() {
      console.log(1);
      this.$router.push({ path: "/personSet" });
    },
    async getuserInfo() {
      let res = await requserInfo();
      if (res.code == 200) {
        console.log("userINfo", res.data.avatar);
      }
    },
  },
};
</script>

<style scoped lang='less'>
.main {
  margin-top: 60px;
  background-color: rgb(239, 239, 239);
  height: 600px;
  padding: 20px 10%;
  .top {
    position: relative;
    width: 100%;
    height: 240px;
    background-image: url("./imgs/BigBack.jpg");
    background-position: center;
    background-size: 100%;
    .left {
      position: absolute;
      left: 24px;
      bottom: 24px;
      display: flex;
      align-items: center;
      .avatar {
        img {
          width: 84px;
          height: 84px;
          border-radius: 50%;
        }
      }
      .nameAndsign {
        margin-left: 10px;
        width: 400px;
        color: white;
        font-size: 30px;
      }
    }
    .right {
      position: absolute;
      right: 24px;
      bottom: 24px;
    }
  }
  .mid {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .personIntor {
      border-radius: 4px;
      box-shadow: 0 1px 3px gainsboro;
      box-sizing: border-box;
      background-color: white;
      width: 70%;
      padding: 1.8em;
      .detail {
        padding: 20px 10px;
        font-size: 14px;
      }
    }
    .otherInfo {
      border-radius: 4px;
      box-shadow: 0 1px 3px gainsboro;
      box-sizing: border-box;
      width: 25%;
      background-color: white;

      padding: 1em 2em;
      .item {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-content: center;
        .item-left {
          font-size: 15px;
        }
        .item-right {
          color: gray;
        }
      }
    }
  }
}
</style>