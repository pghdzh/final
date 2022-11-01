<template>
  <div class="user">
    <span class="img" @click="routerFun(7)">
      <img :src="userImg" alt="" />
    </span>
    <div class="hidArea">
      <span class="userName">{{ userName }}</span>
      <div class="funArea">
        <span>我的关注</span>
        <span>我的收藏</span>
        <span>个人设置</span>
        <span>我的帖子</span>
      </div>
      <div class="leave">
        <el-button
          size="mini"
          :round="true"
          type="primary"
          plain
          @click.native="routerFun(6)"
          >登出</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {reqLogout} from "@/api"
export default {
  computed: {
    ...mapState("user", ["userName", "userImg"]),
  },
  methods: {
    ...mapMutations("user", ["updateUser"]),
   async routerFun(index) {
      switch (index) {
        case 6:
          // let res = await reqLogout()
          // console.log("logout",res)
          this.updateUser({
            userInfo: {
              nickName: "",
              avatar: "",
            },
            token: "",
          });
          break;
        case 7:
          this.$router.push({ path: "/user" });
        default:
          break;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.user {
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-around;
  .img {
    img {
      height: 60px;
      border-radius: 50%;
      width: 60px;
    }
  }

  .hidArea {
    position: absolute;
    width: 15em;
    display: none;
    margin-top: 60px;
    height: 120px;
    overflow: hidden;
    text-align: center;
    color: #6c757d;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 15px 1px gainsboro;
    .userName {
      font-size: 20px;
    }
    .funArea {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      span {
        width: 40%;
        margin: 5px 0;
      }
    }
  }
}
.user:hover .hidArea {
  display: block;
}
</style>