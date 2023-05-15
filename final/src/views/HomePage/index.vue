<template>
  <div>
    <div class="container" ref="vantaRef">
      <div class="topMes">
        <el-row>
          <el-col :span="16" class="swiper">
            <el-carousel height="320px">
              <el-carousel-item v-for="item in imgs" :key="item">
                <img :src="item" alt="" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :span="8">
            <div class="rightMsg">
              <div class="welcome" v-if="this.userName">
                欢迎回来，{{ userName }}
              </div>
              <div class="date">
                <span>{{ date.month }}月{{ date.IsBig }}</span>
                <span class="big">{{ date.day }}</span>
                <span>星 期 {{ date.weekday }}</span>
              </div>
              <div style="text-align: center; margin-top: 20px" v-if="this.userName">
                <el-button type="primary" plain @click="sign" v-show="!IsSign">点击打卡</el-button>
                <span v-show="IsSign">恭喜你,你已经连续签到{{ SignNums }}天</span>
              </div>
              <div class="tips" v-if="sentence.length" style="text-align: center; margin-top: 20px">
                <span>{{ sentence[senNum] }}</span>
              </div>


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
      <div class="daily">
        <h1>值日生</h1>
        <div class="name">
          <i class="el-icon-user-solid"></i>
          彭国浩
        </div>
        <div class="tel">
          <i class="el-icon-phone"></i>
          联系方式
        </div>
        <div class="btn">
          <el-button type="primary" plain @click="dailyDialogVisible = true">提交每日情况</el-button>
        </div>
      </div>
      <el-dialog title="日志" :visible.sync="dailyDialogVisible" width="30%">
        <span>
          每日情况记录：
          <el-input type="textarea" :rows="2" placeholder="请输入内容"></el-input>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dailyDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dailyDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <div class="talkArea" v-loading="anyLoading">
        <div class="talkArea-top">

          <span class="left">讨论区
            <cat class="cat" />
          </span>
          <span class="right" @click="goTalkArea">前往讨论区>></span>
        </div>
        <div class="items">
          <div class="item" v-for="i, index in hotTalkList" :key="index">
            <div class="left">
              <div class="itemImg" v-if="i.user.avatar" :style="{ 'background-image': `url(${i.user.avatar})` }">

              </div>

              <div v-else class="defaultAvatar">{{ i.user.nickName[0] }}</div>
            </div>
            <div class="right">
              <div style="color: #10a0ea; cursor: pointer" @click="gotalkDetail(i.articleId)">{{ i.title }}</div>
              <div style="font-weight: bold">{{ i.user.nickName }}</div>
              <div style="color: grey; font-size: 6px">{{ i.createTime }}</div>
            </div>
            <div class="OfArea">
              <div>所属板块:{{ i.categoryName }}</div>
              <div class="icons">
                <i class="el-icon-view">{{ i.viewCount }}</i>
                <i class="el-icon-chat-dot-square">66</i>
                <i class="el-icon-star-off">36</i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="contest" v-loading="anyLoading">
        <div class="contest-top">
          <span class="left">
            <cat class="cat" />
            比赛组队招募
          </span>
          <span class="right" @click="goContest">前往招募区>></span>
        </div>
        <div class="items">
          <div class="item" v-for="i, index in contestList" :key="index">
            <div class="title">
              <span>{{ i.name }}</span> <span>招募人：{{ i.user.nickName }}</span>
            </div>
            <div class="detail">
              <span class="area">
                <span>技术标签 </span>
                <span>{{ i.label }}</span>
              </span>
              <span class="area"><span>需求人数 </span>
                <span>{{ i.peopleNumber }}人</span>
              </span>
              <span class="area"><span style="color: grey">截止时间 </span>
                <span style="color: grey">{{ i.expirationDate.slice(0, 10) }}</span>
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
import { mapGetters } from "vuex";
import { reqsign, reqsignInfo, reqhotArticleList, reqgetRecruitList, requpdateViewCount } from "@/api";
import cat from "@/components/cat";
import * as THREE from 'three'
import BIRDS from 'vanta/src/vanta.birds'
export default {
  name: "HomePage",
  mounted() {
    this.vantaEffect = BIRDS({
      el: this.$refs.vantaRef,
      THREE: THREE,
      backgroundColor: 0xEFEFEF,
      separation: 100.00,
      quantity: 4.00
    })
    this.senNum = Math.round(Math.random() * (this.sentence.length - 1));
    this.getDate();
    // this.getSentence();
    this.getMap();
    this.getreqInfoLogin()
    this.getreqInfoAny()
  },
  components: {
    cat,
  },
  data() {
    return {
      dailyDialogVisible: false,
      anyLoading: true,
      imgs: [
        require("./img/swiper1.jpg"),
        require("./img/swiper2.jpg"),
        require("./img/swiper3.jpg"),
        require("./img/swiper4.jpg"),
        require("./img/swiper5.jpg"),
      ],
      hotTalkList: [],
      contestList: [],
      IsSign: false,
      SignNums: 0,
      date: {
        month: "",
        day: "",
        weekday: "",
        IsBig: "",
      },
      sentence: [
        '可以逃跑，可以哭泣，但不可以放弃。--鬼灭',
        '前进吧，一步一个脚印也没有关系。--鬼灭',
        '什么都不能舍弃的人，就无法改变任何东西。--进巨',
        'Life is not always fair. 生活并不总是公平。--加速世界',
        '没有力量的理想是戏言，没有理想的力量是空虚。--利姆露',
        '只要不失去你的崇高，整个世界都会为你敞开。--七天神像',
        '有些事情，不去动手是不知道的 ----有纪',
        '变得温柔和强大，就算哪天突然孤身一人，也能平静地活下去，不至于崩溃。 --言叶之庭',
        '人毕竟无法与别人共享速度与节奏，这一切只属于自己.--强风吹拂',
      ],
      senNum: 0,
    };
  },
  computed: {
    ...mapGetters("user", ["userName", "userImg", 'userId']),
  },
  methods: {
    async gotalkDetail(articleId) {
      let res = await requpdateViewCount(articleId)
      if (res.code == 200) {
        this.$router.push({ path: `/talkspecificitem/${articleId}` })
      }

    },
    goTalkArea() {
      this.$router.push({ path: "/talkPage" });
    },
    goContest() {
      this.$router.push({ path: "/contestPage" });
    },

    async getreqInfoAny() {
      let params = {
        pageNum: 1,
        pageSize: 4
      }
      this.anyLoading = true
      try {
        let res = await Promise.all([
          reqhotArticleList(),
          reqgetRecruitList(params)
        ])
        if (res) {
          console.log("res", res)
          this.hotTalkList = res[0].data.slice(0, 6)
          this.contestList = res[1].data.row
          this.anyLoading = false
          // console.log("hot", this.hotTalkList)
        }
      } catch (err) {
        this.$message({
          showClose: true,
          message: '获取公有数据异常，请刷新重试',
          type: 'error'
        });
      }
    },

    async getreqInfoLogin() {
      if (!this.userName)
        return
      try {
        let res = await Promise.all([
          reqsignInfo()
        ])
        if (res) {
          // console.log("res", res)
          this.SignNums = res[0].signCount
          this.IsSign = res[0].signFlag
        }
      } catch (err) {
        console.log("err", err)
      }
    },
    async sign() {
      // this.$router.push({path:'/amap'})
      // this.SignNums = 1;
      // this.getMap();
      let res = await reqsign()
      if (res.code == 200)
        this.$message({
          message: "恭喜你，打卡成功",
          type: "success",
        });
      this.getreqInfoLogin()
    },

    // async getSentence() {
    //   let res = await reqgetSentence();
    //   if (res.code == 200) {
    //     this.sentence = res.data;
    //     this.senNum = Math.round(Math.random() * (res.data.length - 1));
    //   }
    // },

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
      if (dayjs().day() == 0) {
        this.date.weekday = '天';
      }
      else {
        this.date.weekday = weeks[dayjs().day() - 1];
      }


    },

    getMap() {
      if ("geolocation" in navigator) {
        let options = {
          enableHighAccurary: false,
          timeout: 5000,
        };
        function success(position) {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          console.log("lat", lat, "lng", lng, "position", position);
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
    z-index: 1;
    width: 80%;
    margin-left: 10%;
    background-color: #fff;
    height: 360px;

    .swiper {
      padding: 20px;
    }

    .rightMsg {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 360px;
    }

    .welcome {
      text-align: center;
      font-size: 20px;
      margin-top: 10px;
      margin-bottom: 30px;
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
    z-index: 1;
    padding: 20px;
    margin-top: 20px;
    margin-left: 10%;
    width: 60%;
    background-color: #fff;
    min-height: 200px;

    .contest-top {
      padding: 0;
      margin: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;

      .left {
        position: relative;
        font-size: 18px;
        font-weight: bold;

        .cat {
          position: absolute;
          left: -20px;
          top: -20px;
        }
      }

      .right {
        color: #3498db;
        cursor: pointer;
        margin-right: 3%;
      }
    }

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
          display: flex;
          justify-content: space-between;
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
    z-index: 1;
    position: absolute;
    right: 10%;
    top: 400px;
    background-color: #fff;
    padding: 20px;
    width: 12%;
    max-height: 300px;

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

  .daily {
    z-index: 1;
    position: absolute;
    right: 10%;
    top: 750px;
    background-color: #fff;
    padding: 20px;
    width: 12%;

    div {
      margin-top: 20px;
      font-size: large;
    }
  }

  .talkArea {
    z-index: 1;
    padding: 20px;
    width: 60%;
    margin-top: 20px;
    background-color: #fff;
    margin-left: 10%;
    min-height: 300px;

    .talkArea-top {
      padding: 0;
      margin: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      position: relative;



      .left {
        position: relative;
        font-size: 18px;
        font-weight: bold;

        .cat {
          position: absolute;
          top: -20px;
          left: -25px;
        }
      }

      .right {
        color: #3498db;
        cursor: pointer;
        margin-right: 3%;
      }

      .right:hover {
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
          .itemImg {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;

            border: 1px solid #e6eaf0;
            background-size: cover;
          }


          .defaultAvatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #a5a4a4;
            color: #fff;
            font-size: 40px;
            text-align: center;
            line-height: 50px;
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