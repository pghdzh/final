<template>
  <div class="main">
    <div class="TopNav">
      <div class="nav">
        <div @click="$router.push({ path: '/talkPage' })" class="home"><i class="el-icon-d-arrow-left"></i> 返回讨论区</div>
      </div>
      <div class="title">{{ article.title }}</div>
    </div>
    <div class="container">
      <div class="content-area">
        <div class="content">
          <mavon-editor v-model="article.content" :subfield="false" :defaultOpen="'preview'" :editable="false"
            :toolbarsFlag="false" />
        </div>
        <div class="talklist" v-if="talklist.length">
          <talkBox :comment="i" :articleId="article.articleId" @reply="getcomment()" v-for="i in talklist"
            :key="i.commentId" />
          <div class="pagination" v-if="commentTotal >= pageSize">
            <el-pagination background layout="sizes,prev, pager, next" :total="commentTotal" :current-page.sync="pageNum"
              :page-sizes="[5, 7, 10, 20]" :page-size="pageSize" @size-change="sizechange" @current-change="currentchange"
              @prev-click="currentchange" @next-click="currentchange">
            </el-pagination>
          </div>
        </div>
        <div class="empty" v-if="!talklist.length">
          没有更多评论~
        </div>
      </div>

      <div class="right-board">
        <div>
          <span class="board-left">板块</span>
          <span class="board-nav">{{ article.categoryName }}</span>
        </div>
        <div>
          <span class="board-left">楼主</span>
          <span style="color: #8e44ad; cursor: pointer">{{ nickName}}</span>
        </div>
        <div>
          <span class="board-left">发帖时间</span>
          <span style="color: grey">{{ article.createTime }}</span>
        </div>
      </div>
      <div class="reply-box-container" v-if="userImg">
        <div class="reply-box">
          <div class="box-normal">
            <div class="reply-box-avatar">
              <div class="avatarImg" :style="{ 'background-image': `url(${userImg})` }"></div>
            </div>
            <div class="reply-box-warp">
              <textarea class="reply-box-textarea" placeholder="发布一条友善的评论吧" v-model="AddCommentContent"></textarea>
            </div>
            <div class="reply-box-send">
              <div class="send-text" @click="addComment()">发布</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import _ from 'lodash';
import talkBox from "./talkBox";
import { mapGetters } from "vuex";
import { reqarticle, reqcommentList, reqaddComment } from "@/api";
export default {
  mounted() {
    this.getInfo();
  },
  computed: {
    ...mapGetters("user", ["userName", "userImg"]),
  },
  components: {
    talkBox,
  },
  data() {
    return {
      pageSize: 5,
      pageNum: 1,
      talklist: [],
      article: {},
      commentTotal: -1,
      AddCommentContent: '',
      nickName:"",
    };

  },
  methods: {
    async getInfo() {
      // console.log("id", this.$route.params.id);
      let res = await reqarticle(this.$route.params.id);
      if (res.code == 200) {
        console.log("data", res.data);
        this.article = _.cloneDeep(res.data);
        this.nickName = res.data.user.nickName
      }
      this.getcomment()
    },
    async getcomment() {
      let res2 = await reqcommentList({
        articleId: this.$route.params.id,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });
      if (res2.code == 200) {
        // console.log("res2.data", res2.data);
        this.talklist = res2.data.row
        this.commentTotal = res2.data.totalSize
      }
    },
    async addComment() {
      if (!this.userName) {
        this.$message({
          showClose: true,
          message: '请先登陆'
        });
        return
      }
      if (!this.AddCommentContent) {
        this.$message({
          showClose: true,
          message: '请先填写回复内容'
        });
        return
      }
      let params = {
        articleId: this.article.articleId,
        content: this.AddCommentContent,

      }
      let res = await reqaddComment(params)
      if (res.code == 200) {
        this.$message({
          showClose: true,
          type: 'success',
          message: '回复成功'
        });
        this.AddCommentContent = ''
        this.getcomment()
        return
      }
    },
    currentchange(pageNum) {
      console.log("pageN", pageNum)
      this.pageNum = pageNum
      this.getcomment()
    },
    sizechange(pageSize) {
      console.log("pages", pageSize)
      this.pageSize = pageSize
      this.getcomment()
    }
  },
};
</script>

<style scoped lang='less'>
.main {
  width: 100%;
  // background-color: rgb(239, 239, 239);

  padding-bottom: 100px;

  .TopNav {
    height: 128px;
    background-color: rgb(35, 37, 38);
    width: 100%;
    position: relative;
    color: white;
    margin-bottom: 20px;

    .nav {
      padding: 20px;
      display: flex;
      width: 17%;
      justify-content: space-between;

      .home {
        font-size: 16px;
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

  .container {
    width: 90%;
    margin: 0 5%;
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 700px;

    .content-area {
      width: 75%;

      .content {
        width: 90%;
        min-height: 200px;
        border: 1px solid gainsboro;
        font-size: 15px;
        line-height: 24px;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 1px 3px gainsboro;
      }

      .talklist {
        width: 73%;
        padding-bottom: 60px;

        .pagination {
          display: flex;
          width: 100%;
          justify-content: center;
        }
      }

      .empty {
        display: flex;
        justify-content: center;
        margin-top: 200px;
        color: gray;
        font-size: 14px;
      }
    }


    .right-board {
      width: 15%;
      padding: 0 20px;
      height: 160px;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      box-shadow: 0 1px 2px gainsboro;

      div {
        display: flex;
        justify-content: space-between;

        span {
          font-size: medium;
        }

        .board-nav {
          color: #3498db;

        }



        .board-left {
          font-weight: bold;
        }
      }
    }

    .reply-box-container {
      width: 60%;
      box-sizing: border-box;
      position: fixed;
      left: 5%;
      bottom: 0px;
      background-color: #fff;

      .reply-box {
        .box-normal {
          display: flex;
          height: 50px;

          .reply-box-avatar {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 50px;

            .avatarImg {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              overflow: hidden;
              border: 1px solid #e6eaf0;
              background-size: cover;
            }
          }

          .reply-box-warp {
            flex: 1;

            .reply-box-textarea {
              width: 95%;
              height: 80%;
              padding: 5px 10px;
              border: 1px solid gainsboro;
              border-radius: 6px;
              background-color: #fff;
              font-family: inherit;
              line-height: 38px;
              resize: none;
              outline: none;
            }
          }

          .reply-box-send:hover {
            background-color: #409eff;
          }

          .reply-box-send {
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            flex-basis: 70px;
            margin-left: 10px;
            border-radius: 4px;
            background: #63acf5;
            color: #fff;
            cursor: pointer;

            .send-text {
              position: absolute;
              z-index: 9;
              font-size: 16px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>