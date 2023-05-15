<template>
  <div class="main">
    <el-row class="top-nav">
      <el-col :span="5" class="title">
        <div @click="routerFun(0)">计算机学院创新实验室</div>
      </el-col>
      <el-col :span="8" class="nav">
        <div @click="routerFun(1)">实验室简介</div>
        <div @click="routerFun(2)">资源区</div>
        <div @click="routerFun(3)">招新</div>
        <div @click="routerFun(4)">学长风采</div>
      </el-col>
      <el-col :span="3">
        <el-input size="mini" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input_search">
        </el-input>
      </el-col>
      <el-col :span="4" class="login" v-show="!userName">
        <el-button size="mini" :round="true" type="primary" plain @click.native="routerFun(5)">登陆</el-button>
      </el-col>
      <el-col :span="2" class="user" v-show="userName">
        <avatarArea />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import avatarArea from "@/components/avatarArea";
export default {
  name: "topNav",
  components: {
    avatarArea,
  },
  data() {
    return {
      input_search: "",
    };
  },
  computed: {
    ...mapGetters("user", ["userName", "userImg"]),
  },
  methods: {
    routerFun(index) {
      switch (index) {
        case 0:
          this.$router.push({ path: "/home" });
          break;
        case 1:
          this.$router.push({ path: "/intor" });
          break;
        case 2:
          this.$router.push({ path: "/file" });
          break;
        case 3:
          this.$router.push({ path: "/getnew" });
          break;
        case 4:
          this.$router.push({ path: "/senior" });
          break;
        case 5:
          this.$router.push({ path: "/login" });
          break;

        case 6:
          this.$router.push({ path: "/registerPage" });
        default:
          break;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.main {
  height: 60px;
  border-bottom: 1px solid #dcdfe6;
  background-color: #fff;
  width: 100%;

  .top-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: nowrap;

    .title {
      cursor: pointer;
      font-size: 24px;
      height: 60px;
      line-height: 60px;
    }

    .nav {
      font-size: 15px;
      display: flex;
      justify-content: space-between;

      div {
        cursor: pointer;
      }

      div:hover {
        color: #409eff;
      }
    }

    .login {
      height: 60px;
      text-align: center;
      line-height: 60px;
    }
  }
}
</style>