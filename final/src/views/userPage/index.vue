<template>
  <div class="main">
    <el-dialog title="更换头像" :visible.sync="dialogAvatar" width="30%">
      <span>
        <h3>头像：</h3>
        <div class="addAvatar" v-loading="avatarLoading">
          <el-upload class="avatar-uploader" action="http://1.14.123.114:7070/update/avatar" :headers="headerObj"
            name="file" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <div class="avatar" v-if="changeAvatar">
              <div class="avatarleft">
                <img :src="changeAvatar" alt="">
              </div>
              <div class="avatarright" :style="{ 'background-image': `url(${changeAvatar})` }">

              </div>
            </div>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAvatar = false">取 消</el-button>
        <el-button type="primary" @click="updatedAvatar()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="top">
      <div class="left">
        <div class="avatar">
          <div class="avatarImg" :style="{ 'background-image': `url(${userImg})` }" v-if="userImg"></div>
          <div v-else class="defaultAvatar">{{ userName[0] }}</div>
          <div class="changeAvatar" @click="dialogAvatar = true">
            更换头像
          </div>
        </div>
        <div class="nameAndsign">
          <div>{{ userName }}</div>
          <div style="font-size: 14px; margin-top: 6px">
            {{ userInfo.signature }}
          </div>
        </div>
      </div>
      <div class="right">
        <el-button plain @click="personRouter(1)"><i class="el-icon-setting">个人设置</i></el-button>
      </div>
    </div>
    <div class="mid">
      <div class="personIntor">
        <h1>个人介绍</h1>
        <div class="detail">{{ userInfo.introduction }}</div>
      </div>
      <div class="midright">
        <div class="Webinfo">
          <div class="detailInfo">
            <span>登陆天数：{{ LoginNums }}</span>
            <span>发帖数：{{ mytalk.length }}</span>
          </div>
          <div class="live2d">
            <el-select v-model="live2dValue" placeholder="请选择右下角人物模型">
              <el-option v-for="item in options" :key="item.live2dValue" :label="item.label" :value="item.live2dValue"
                :disabled="LoginNums + mytalk.length <= item.num">
              </el-option>
            </el-select>
          </div>

        </div>
        <div class="otherInfo">
          <div class="item">
            <span class="item-left">用户ID</span>
            <span class="item-right">{{ userInfo.userId }}</span>
          </div>
          <div class="item">
            <span class="item-left">所属小组</span>
            <span class="item-right">{{ group }}</span>
          </div>
          <div class="item">
            <span class="item-left">学习方向</span>
            <span class="item-right">{{ userInfo.learnDir }}</span>
          </div>
          <div class="item">
            <span class="item-left">性别</span>
            <span class="item-right">{{ sex }}</span>
          </div>
          <div class="item">
            <span class="item-left">联系方式</span>
            <span class="item-right">{{ userInfo.phoneNumber }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mine">
      <div class="leftTalk">
        <h1>我的帖子</h1>
        <div v-if="mytalk.length">
          <el-table :data="mytalk" style="width: 100%" max-height="300">
            <el-table-column prop="createTime" label="发布日期" width="200">
            </el-table-column>
            <el-table-column prop="title" label="帖子标题" width="180">
            </el-table-column>
            <el-table-column prop="categoryName" label="所属板块" width="100">
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="deleteEvent(0, scope.row)">
                  删除
                </el-button>
                <el-button type="text" size="small"
                  @click="$router.push({ path: `/talkspecificitem/${scope.row.articleId}` });">
                  前往查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="!mytalk.length" class="empty">
          你还没有发表过帖子哦，快去 <router-link to="/talkPage">讨论区</router-link> 和大家友好交流吧
        </div>
      </div>
      <div class="rightContest">
        <h1> 我的招募</h1>
        <div v-if="mycontest.length">
          <el-table :data="mycontest" style="width: 100%" max-height="300">
            <el-table-column prop="expirationDate" label="截止日期" width="200">
            </el-table-column>
            <el-table-column prop="name" label="比赛名称" width="180">
            </el-table-column>
            <el-table-column prop="label" label="技术标签" width="100">
              <template slot-scope="scope">
                <el-tag :type="tagType[Math.floor(Math.random() * 5)]" disable-transitions>{{ scope.row.label }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="deleteEvent(1, scope.row)">
                  删除
                </el-button>
                <el-button type="text" size="small" @click="$router.push({ path: `/contestPage/contestItem` })">
                  前往查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="!mycontest.length" class="empty">
          你还没有发表过招募哦，快去 <router-link to="/contestPage">招募区</router-link> 寻找合适的小伙伴吧
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { reqgetInfo, requpdateuserinfo, reqsignInfo, reqgetArticleById, reqdeleteArticle, reqgetRecruitListByUserId, reqdeleteRecruit } from "@/api";
import { getToken } from "@/utils/token"
export default {
  name: "userPage",
  mounted() {
    this.getuserInfo();
    this.getArticle();
    this.getcontest();
  },
  data() {
    return {
      avatarLoading: false,
      userInfo: {},
      filePath: { filePath: 'avatar' },
      dialogAvatar: false,
      LoginNums: 10,
      headerObj: { Authorization: 'Bearer ' + getToken() },
      changeAvatar: '',
      options: [{
        live2dValue: '/static/live2dw/tororo/assets/tororo.model.json',
        label: '白猫'
      },
      {
        live2dValue: '/static/live2dw/蕾姆/lem.json',
        label: '蕾姆',
        num: 1
      }, {
        live2dValue: '/static/live2dw/薇尔莉特/weier.json',
        label: '薇尔莉特',
        num: 2
      }],
      live2dValue: sessionStorage.getItem('live2d') || '/static/live2dw/tororo/assets/tororo.model.json',
      tagType: ["primary", "success", "info", "warning", "danger"],

      mytalk: [],
      mycontest: [{
        date: "2023年5月21日",
        title: '华迪杯',
        tag: 'vue',
      },
      {
        date: "2023年5月21日",
        title: '华迪杯',
        tag: 'vue',
      },
      {
        date: "2023年5月21日",
        title: '华迪杯',
        tag: 'vue',
      },
      {
        date: "2023年5月21日",
        title: '华迪杯',
        tag: 'vue',
      },
      {
        date: "2023年5月21日",
        title: '华迪杯',
        tag: 'vue',
      }],
    }
  },
  watch: {
    live2dValue(curr) {
      console.log("curr", curr)
      sessionStorage.setItem('live2d', curr)
      this.$router.go(0);
    }
  },
  computed: {
    ...mapGetters("user", ["userName", "userImg", "userId"]),
    sex() {
      let SexArr = ['男', '女', '未知']
      return SexArr[Number(this.userInfo.sex)]
    },
    group() {
      let groupArr = ['小组1', '小组2', '小组3', '小组4']
      return groupArr[this.userInfo.deptId]
    }
  },
  methods: {
    ...mapMutations('user', ['updateUser']),
    handleAvatarSuccess(res, file) {
      this.avatarLoading = false
      this.changeAvatar = res.data;
    },

    beforeAvatarUpload(file) {
      this.avatarLoading = true
      const isJPG = (file.type === "image/jpeg" || file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 100;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 100MB!");
      }
      return isJPG && isLt2M;
    },

    async deleteEvent(index, row) {
      let title = '帖子'
      if (index == 1) {
        title = '招募'
      }
      console.log("row", row)
      this.$confirm(`此操作将删除该${title}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (index == 0) {
          let resDele = await reqdeleteArticle(row.articleId)
          if (resDele.code == 200) {
            this.getArticle()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        }
        if (index == 1) {
          let resDele = await reqdeleteRecruit({recruitId:row.recruitId})
          if (resDele.code == 200) {
            this.getcontest()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    personRouter(index) {
      switch (index) {
        case 1:
          this.$router.push({ path: "/personSet" });
          break;
        default:
          break;
      }
    },
    async updatedAvatar() {

      if (!this.changeAvatar) {
        this.$message({
          showClose: true,
          message: '请先上传图片'
        });
        return
      } else {

        let params = {
          avatar: this.changeAvatar,
          userId: this.userInfo.userId
        }
        let res = await requpdateuserinfo(params)
        if (res.code == 200) {
          this.updateUser({
            nickName: this.userInfo.nickName,
            avatar: this.changeAvatar,
            userId: this.userInfo.userId
          })
          this.$message({
            showClose: true,
            type: 'success',
            message: '修改头像成功'
          });

          this.dialogAvatar = false
          return
        }
      }

    },
    async getuserInfo() {

      try {
        let res = await Promise.all([
          reqgetInfo(),
          reqsignInfo(),
        ])
        if (res) {
          // console.log("res", res)
          this.userInfo = res[0].user
          this.LoginNums = res[1].signCount
        }
      } catch (err) {
        this.$message({
          showClose: true,
          message: '获取用户信息错误,错误原因' + err
        })
      }
    },
    async getArticle() {
      let res = await reqgetArticleById({ userId: this.userId, pageNum: 1, pageSize: 100 })

      if (res.code == 200) {
        this.mytalk = res.data.row
      }
    },
    async getcontest() {
      let res = await reqgetRecruitListByUserId({ userId: this.userId, })
      if (res.code == 200) {
        console.log("REs", res)
        this.mycontest = res.data
        for (let i = 0; i < this.mycontest.length; i++) {
          this.mycontest[i].expirationDate = this.mycontest[i].expirationDate.slice(0, 10)
        }
      }
    },
  },
};
</script>

<style scoped lang='less'>
.addAvatar {
  margin-left: 100px;

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    .avatarleft {
      img {
        width: 100%;
        height: 100px;
      }
    }

    .avatarright {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #e6eaf0;
      background-size: cover;
    }
  }
}

.main {
  margin-top: 60px;
  background-color: rgb(239, 239, 239);
  min-height: 800px;
  padding: 20px 10%;

  .top {
    position: relative;
    width: 100%;
    height: 240px;
    background-image: url("./imgs/BigBack.jpg");
    background-position: center;
    background-size: 100%;

    .left {
      position: absolute;
      left: 24px;
      bottom: 24px;
      display: flex;
      align-items: center;

      .avatar {
        cursor: pointer;
        position: relative;

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

        .avatarImg {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #e6eaf0;
          background-size: cover;
        }

        .changeAvatar {
          display: none;
          position: absolute;
          left: 0;
          top: 0;
          width:100px;
          height: 100px;
          background-color: rgba(0, 0, 0, .5);
          color: #fff;
          text-align: center;
          border-radius: 50%;
          line-height: 100px;
        }
      }

      .avatar:hover {
        .changeAvatar {
          display: block;  
        }
      }

      .nameAndsign {
        margin-left: 10px;
        width: 400px;
        color: white;
        font-size: 30px;
      }
    }

    .right {
      position: absolute;
      right: 24px;
      bottom: 24px;
    }
  }

  .mid {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .personIntor {
      border-radius: 4px;
      box-shadow: 0 1px 3px gainsboro;
      box-sizing: border-box;
      background-color: white;
      width: 70%;
      padding: 1.8em;

      .detail {
        padding: 20px 10px;
        font-size: 14px;
        min-height: 200px;
      }
    }

    .midright {
      width: 25%;

      .Webinfo {
        border-radius: 4px;
        box-shadow: 0 1px 3px gainsboro;
        box-sizing: border-box;
        width: 100%;
        background-color: white;
        height: 100px;
        padding: 1em 2em;
        margin-bottom: 40px;

        .detailInfo {
          display: flex;
          justify-content: space-around;
          margin: 10px;
        }

        .live2d {
          display: flex;
          justify-content: center;
        }
      }

      .otherInfo {
        border-radius: 4px;
        box-shadow: 0 1px 3px gainsboro;
        box-sizing: border-box;
        width: 100%;
        background-color: white;
        height: 160px;
        padding: 10px 40px;

        .item {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-content: center;

          .item-left {
            font-size: 15px;
          }

          .item-right {
            color: gray;
          }
        }
      }
    }
  }

  .mine {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .empty {
      position: absolute;
      top: 45%;
      left: 20%;
      width: 60%;
      font-size: 14px;

      a {
        text-decoration: none;
      }

      a:hover {
        color: #2faee3;
      }
    }

    .leftTalk {
      border-radius: 4px;
      box-shadow: 0 1px 3px gainsboro;
      box-sizing: border-box;
      background-color: white;
      width: 45%;
      height: 350px;
      padding: 1.8em;
      position: relative;

      /deep/ .el-table__body-wrapper::-webkit-scrollbar {
        width: 3px; // 横向滚动条
        height: 3px; // 纵向滚动条 必写
      }

      // 滚动条的滑块
      /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
        background-color: #ddd;
        border-radius: 3px;
      }
    }

    .rightContest {
      border-radius: 4px;
      box-shadow: 0 1px 3px gainsboro;
      box-sizing: border-box;
      background-color: white;
      width: 45%;
      height: 350px;
      padding: 1.8em;
      position: relative;

      /deep/ .el-table__body-wrapper::-webkit-scrollbar {
        width: 3px; // 横向滚动条
        height: 3px; // 纵向滚动条 必写
      }

      // 滚动条的滑块
      /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
        background-color: #ddd;
        border-radius: 3px;
      }
    }
  }
}


// 滚动条的宽度
</style>