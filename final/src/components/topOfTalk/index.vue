<template>
  <div class="main">
    <div class="nav">

      <div @click="goHome" class="home">《《 返回主页</div>
      <div class="minNav">
        <span>{{ topMsg.minNav[0] }}</span>

        <span>{{ topMsg.minNav[1] }}</span>

        <span>{{ topMsg.minNav[2] }}</span>
      </div>
    </div>
    <div class="title">{{ topMsg.title }}</div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route);
  },
  props: ["topMsg"],
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push({ path: "/home" });
    },
  },
};
</script>

<style scoped lang='less'>
.main {
  height: 128px;
  background-color: rgb(35, 37, 38);
  width: 100%;
  position: relative;
  color: white;
  .nav {
    padding: 20px;
    display: flex;
    width: 17%;
    justify-content: space-between;
    .home {
      cursor: pointer;
    }
  }
  .title {
    position: absolute;
    font-weight: bold;
    top: 40%;
    left: 10%;
    font-size: 28px;
  }
}
</style>