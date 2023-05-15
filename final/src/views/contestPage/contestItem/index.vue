<template>
  <div class="main">
    <div class="topArea">
      <div class="returnList" @click="goList">
        《《 返回招募区
      </div>
      <div class="status">招募中</div>
      <div class="title">{{recruitdata.name}}</div>
      <div class="tip">(请同学自行通过右侧联系方式联系招募人)</div>
      <div class="person">
        <span>招募人:{{nickName}}</span>
        <br />
        <br />
        <span>联系方式:{{recruitdata.contactInfo}}</span>
      </div>
    </div>
    <div class="midArea">
      <div class="detail">
        <h1>招募详情</h1>
        <div class="text">
        {{recruitdata.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { } from "vuex";
import { reqgetRecruitById } from '@/api'
export default {
  mounted() {
    this.getInfo()
  },
 
  data() {
    return {
      recruitdata: {},
      nickName:'',
    }
  },
  methods: {

    async getInfo() {
      let params = {
        recruitId: this.$route.params.id
      }
      let res = await reqgetRecruitById(params)
      if (res.code == 200) {
        console.log("data", res);
        this.recruitdata = res.data
        this.nickName = res.data.user.nickName
      }
    },
    goList() {
      this.$router.push({ path: "/contestPage" })
    }
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

    .returnList {
      position: absolute;
      top: 20px;
      left: 6px;
      cursor: pointer;
    }

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
    height: 600px;
    padding: 20px 0;

    .detail {
      background: white;
      height: 100%;
      margin: 0 10%;
      border-radius: 12px;
      padding: 20px 30px;
    }

    .text {
      width: 600px;
      margin-top: 20px;
      font-size: 16px;
    }
  }
}
</style>