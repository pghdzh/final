<template>
  <div class="user">
    <span class="img" @click="routerFun(7)">
      <div class="avatar" :style="{ 'background-image': `url(${userImg})` }"></div>
    </span>
    <div class="hidArea">
      <span class="userName">{{ userName }}</span>
      <div class="funArea">
        <div @click="routerFun(7)">个人主页</div>
        <el-badge :is-dot="Isdot" class="item">
          <span @click="routerFun(8)">我的消息</span>
        </el-badge>
      </div>
      <div class="leave">
        <el-button size="mini" :round="true" type="primary" plain @click.native="routerFun(6)">登出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { reqLogout } from "@/api";
export default {
  computed: {
    ...mapGetters("user", ["userName", "userImg"]),
  },
  data() {
    return {
      Isdot: true
    }
  },
  methods: {
    ...mapMutations("user", ["updateUser", 'updateToken']),
    async routerFun(index) {
      switch (index) {
        case 6:
          let res = await reqLogout()
          console.log("logout", res)
          this.updateUser(
            {
              nickName: "",
              avatar: "",
              userId: null,
            },
          );
          this.updateToken("")
          this.$router.push({ path: "/" });
          break;
        case 7:
          this.$router.push({ path: "/user" });
          break;
        case 8:
          this.Isdot = false
          this.$router.push({ path: "/mymessage" });
          break;
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
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #e6eaf0;
      background-size: cover;

    }
  }

  .hidArea {
    position: absolute;
    width: 15em;
    display: none;
    margin-top: 60px;
    height: 90px;
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

      div {
        width: 40%;
        margin: 5px 0;
      }

      div:hover {
        color: #2faee3;
      }
    }
  }
}

.user:hover .hidArea {
  display: block;
}
</style>