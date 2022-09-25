<template>
  <div class="main">
    <div class="topArea">
      <div class="status">招募中</div>
      <div class="title">互联网+招人</div>
      <div class="tip">(请同学自行通过右侧联系方式联系招募人)</div>
      <div class="person">
        <span>招聘人:pgh</span>
        <br />
        <br />
        <span>联系方式(qq):1234564</span>
      </div>
    </div>
    <div class="midArea">
      <div class="detail">
        <h1>招募详情</h1>
       <div class="text">
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
        tenetur quam ipsa accusamus vero enim neque earum fugiat expedita,
        numquam nisi officia vel maiores voluptas iusto fuga dignissimos debitis
        assumenda!
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  mounted() {
    this.updatetopMsg({
      minNav: ["招募区/", "比赛/", "招募详情"],
      title: "招募区",
    });
  },

  methods: {
    ...mapMutations("contest", ["updatetopMsg"]),
  },
};
</script>

<style scoped lang='less'>
.main {
  .topArea {
    padding: 20px 10%;
    background: #444c60 url(./img/detail-bg.jpg) center center no-repeat;
    color: white;
    position: relative;
    .status {
      font-size: 16px;
    }
    .title {
      margin-top: 20px;
      font-weight: bolder;
      font-size: 40px;
    }
    .tip {
      margin-top: 40px;
    }
    .person {
      position: absolute;
      top: 20%;
      right: 20%;
      font-size: 16px;
    }
  }
  .midArea {
    background-color: rgb(239, 239, 239);
    height: 400px;
    padding: 20px 0;
    .detail {
      background: white;
      height: 100%;
      margin: 0 10%;
      border-radius: 12px;
      padding: 20px 30px;
    }
    .text{
      width: 600px;
      margin-top: 20px;
      font-size: 16px;
    }
  }
}
</style>