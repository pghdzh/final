<template>
  <div>
    <div class="container">
      <div class="topMes">
        <el-row>
          <el-col :span="16" class="swiper">
            <el-carousel height="260px">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :span="8">
            <div class="welcome" v-if="this.userName">
              欢迎回来，{{ userName }}
            </div>
            <div class="date">
              <span>{{ date.month }}月{{ date.IsBig }}</span>
              <span class="big">{{ date.day }}</span>
              <span>星 期 {{ date.weekday }}</span>
            </div>
            <div class="tips" v-if="sentence.length">
              <span>{{ sentence[senNum].content }}</span>
            </div>
            <div
              style="text-align: center; margin-top: 20px"
              v-if="this.userName"
            >
              <el-button type="primary" plain @click="sign" v-show="!SignNums"
                >点击打卡</el-button
              >
              <span v-show="SignNums"
                >恭喜你,你已经连续签到{{ SignNums }}天</span
              >
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="notify">
        <h1>实验室公告</h1>
        <ul>
          <li>公告</li>
          <li>公告</li>
          <li>公告</li>
          <li>公告</li>
          <li>公告</li>
          <li>公告</li>
        </ul>
      </div>
      <div class="talkArea">
        <div class="talkArea">
          <span class="left">讨论区</span>
          <span class="right" @click="goTalkArea">前往讨论区>></span>
        </div>
        <div class="items">
          <div class="item" v-for="i in 6" :key="i">
            <div class="left">
              <img src="@/assets/logo.png" alt="" />
            </div>
            <div class="right">
              <div style="color: #10a0ea; cursor: pointer">讨论标题</div>
              <div style="font-weight: bold">发布者</div>
              <div style="color: grey; font-size: 6px">发布时间</div>
            </div>
            <div class="OfArea">
              <div>所属板块:前端</div>
              <div class="icons">
                <i class="el-icon-view">77</i>
                <i class="el-icon-chat-dot-square">66</i>
                <i class="el-icon-star-off">36</i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="contest">
        <h1>近期比赛</h1>
        <div class="items">
          <div class="item" v-for="i in 4" :key="i">
            <div class="title">比赛名字</div>
            <div class="detail">
              <span class="area">
                <span
                  style="
                    background-color: #e74c3c;
                    padding: 0 4px;
                    color: #fff;
                    font-weight: bold;
                  "
                  >比赛性质
                </span>
                <span
                  style="
                    background-color: #f1c40f;
                    padding: 0 4px;
                    color: #fff;
                    width: 40px;
                    font-weight: bold;
                  "
                  >oj类型</span
                >
              </span>
              <span class="area"
                ><span>是否结束 </span>
                <span>举办方</span>
              </span>
              <span class="area"
                ><span style="color: grey">开始时间 </span>
                <span style="color: grey">结束时间</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState } from "vuex";
import { reqgetSentence } from "@/api";
export default {
  name: "HomePage",
  mounted() {
    this.getDate();
    this.getMap();
    this.getSentence();
  },
  data() {
    return {
      SignNums: 0,
      date: {
        month: "",
        day: "",
        weekday: "",
        IsBig: "",
      },
      sentence: [],
      senNum: 0,
    };
  },
  computed: {
    ...mapState("user", ["userName", "userImg"]),
  },
  methods: {

    goTalkArea(){
      this.$router.push({path:'/talkPage'})
    },

    sign() {
      this.SignNums = 1;
      this.$message({
        message: "恭喜你，打卡成功",
        type: "success",
      });
    },

    async getSentence() {
      let res = await reqgetSentence();
      if (res.code == 200) {
        this.sentence = res.data;
        console.log(res.data.length);
        this.senNum = Math.round(Math.random() * (res.data.length - 1));
      }
    },

    getDate() {
      let month = [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
      ];
      let weeks = ["一", "二", "三", "四", "五", "六", "天"];
      let IsBig = [
        "大",
        "平",
        "大",
        "小",
        "大",
        "小",
        "大",
        "大",
        "小",
        "大",
        "小",
        "大",
      ];
      this.date.month = month[dayjs().month()];
      this.date.IsBig = IsBig[dayjs().month()];
      this.date.day = dayjs().date();
      this.date.weekday = weeks[dayjs().day() - 1];
    },

    getMap() {
      if ("geolocation" in navigator) {
        let options = {
          enableHighAccurary: true,
          timeout: 5000,
        };
        function success(position) {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          console.log("lat", lat, "lng", lng);
        }
        function error(err) {
          let errMsg = [
            "您拒绝共享位置信息",
            "获取不到位置信息",
            "获取位置信息超时",
          ];
          console.log(errMsg[err.code - 1]);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
      } else {
        console.log("无法获取您的位置，请检查定位或重试");
      }
    },
  },
};
</script>

<style scoped lang='less'>
.container {
  position: relative;
  width: 100%;
  background-color: rgb(239, 239, 239);
  margin-top: 60px;
  padding: 20px 0;
  .topMes {
    width: 80%;
    margin-left: 10%;
    background-color: #fff;
    height: 260px;
    .swiper {
      .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
    .welcome {
      text-align: center;
      font-size: 20px;
      margin-top: 10px;
    }
    .date {
      margin: 20px 0;
      text-align: center;
      span {
        display: inline-block;
        width: 20px;
        vertical-align: top;
        line-height: 20px;
        margin-left: 10px;
        margin-right: 10px;
        font-weight: bold;
        color: rgba(5, 67, 16, 0.79);
        font-size: 17px;
      }
      .big {
        width: 100px;
        font-size: 80px;
        line-height: 55px;
      }
    }
    .tips {
      text-align: center;
      span {
        width: 80%;
      }
    }
  }
  .contest {
    padding: 20px;
    margin-top: 20px;
    margin-left: 10%;
    width: 60%;
    background-color: #fff;
    .items {
      justify-content: space-around;
      display: flex;
      margin: 10px 0;
      flex-wrap: wrap;
      margin-left: 10px;

      .item {
        margin: 10px;
        width: 40%;
        border: 1px solid;
        border-color: #f5cecd;
        border-radius: 4px;
        .title {
          cursor: pointer;
          padding: 6px 10px;
          color: #dd514c;
          font-weight: bold;
          background-color: rgba(221, 81, 76, 0.15);
        }
        .title:hover {
          color: #0056b3;
        }
        .detail {
          display: flex;
          padding: 14px 10px;
          justify-content: space-between;
          .area {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
  .notify {
    position: absolute;
    right: 10%;
    top: 300px;
    background-color: #fff;
    padding: 20px;
    width: 12%;
    ul {
      li {
        margin: 15px 0;
        font-size: large;
        cursor: pointer;
        color: #3498db;
      }
      li:hover {
        color: #0056b3;
      }
    }
  }
  .talkArea {
    padding: 20px;
    width: 60%;
    margin-top: 20px;
    background-color: #fff;
    margin-left: 10%;

    .talkArea {
      padding: 0;
      margin: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 18px;
        font-weight: bold;
      }
      .right {
        color: #3498db;
        cursor: pointer;
        margin-right: 3%;
      }
      .right:hover{
        color: #0056b3;
      }
    }
    .items {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .item {
        margin: 5px;
        border-radius: 4px;
        width: 40%;
        border: 1px solid #10a0ea;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 10px;
        .left {
          img {
            width: 40px;
            border-radius: 50%;
          }
        }
        .right {
          div {
            margin: 4px 0;
          }
        }
        .OfArea {
          width: 40%;
          .icons {
            margin-top: 20px;
            display: flex;
            justify-content: space-around;
          }
        }
      }
    }
  }
}
</style>