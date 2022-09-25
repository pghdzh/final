<template>
  <div class="main">
    <topOfTalk :topMsg="topMsg" />

    <router-view></router-view>
  </div>
</template>

<script>
import topOfTalk from "@/components/topOfTalk";
import { mapState } from "vuex";
export default {
  components: {
    topOfTalk,
  },
  mounted() {
    console.log(this.$route.fullPath.indexOf("/talkPage"));
  },
  data() {
    return {
      
    }
  },
   computed: {
    ...mapState("contest", ["topMsg"]),
  },
  
};
</script>

<style scoped lang='less'>
</style>