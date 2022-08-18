<template>
  <div class="main">
    <topOfTalk />

    <router-view></router-view>
  </div>
</template>

<script>
import topOfTalk from "@/components/topOfTalk";

export default {
  components: {
    topOfTalk,
  },
  mounted() {
    console.log(this.$route.fullPath.indexOf("/talkPage"));
  },
  
};
</script>

<style scoped lang='less'>
</style>