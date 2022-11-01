<template>
  <div class="main">
    <div class="container">
      <div class="content-area">
        <div class="content">
          文章内容Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Tempore, repellendus. Delectus tempora nam ratione veniam optio. Sunt
          at provident est ad! Vitae vero molestias explicabo voluptatem tempora
          aut et voluptas.
        </div>
        <div class="talklist">
          <talkBox bcolor="blue" v-for="i in 5" :key="i" />
          <div class="pagination">
            <el-pagination
              background
              layout="sizes,prev, pager, next"
              :total="1000"
              :current-page.sync="pageNum"
              :page-sizes="[5, 7, 10, 20]"
              :page-size="pageSize"
            >
            </el-pagination>
          </div>
        </div>
      </div>

      <div class="right-board">
        <div>
          <span class="board-left">板块</span>
          <span class="board-nav">前端</span>
        </div>
        <div>
          <span class="board-left">楼主</span>
          <span style="color: #8e44ad; cursor: pointer">pgh</span>
        </div>
        <div>
          <span class="board-left">发帖时间</span>
          <span style="color: grey">2022-8-4 11:31:14</span>
        </div>
      </div>
      <div class="reply-box-container">
        <div class="reply-box">
          <div class="box-normal">
            <div class="reply-box-avatar">
              <img src="@/assets/avatar.webp" alt="" />
            </div>
            <div class="reply-box-warp">
              <textarea
                class="reply-box-textarea"
                placeholder="发布一条友善的评论吧"
              >
              </textarea>
            </div>
            <div class="reply-box-send">
              <div class="send-text">发布</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import talkBox from "./talkBox";
import { reqarticle, reqcommentList } from "@/api";
export default {
  mounted() {
    this.getInfo();
  },
  components: {
    talkBox,
  },
  data() {
    return {
      pageSize: 5,
      pageNum: 1,
    };
  },
  methods: {
    async getInfo() {
      console.log("id", this.$route.params.id);
      let res = await reqarticle(this.$route.params.id);
      if (res.code == 200) {
        console.log("data", res.data);
      }
      let res2 = await reqcommentList({
        articleId: this.$route.params.id,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });
      if (res2.code == 200) {
        console.log("res2.data", res2.data);
      }
    },
  },
};
</script>

<style scoped lang='less'>
.main {
  width: 100%;
  // background-color: rgb(239, 239, 239);
  padding: 20px 0;
  padding-bottom: 100px;
  .container {
    width: 90%;
    margin: 0 5%;
    display: flex;
    justify-content: space-between;
    position: relative;
    .content {
      width: 90%;
      min-height: 200px;
      border: 1px solid gainsboro;
      font-size: 15px;
      line-height: 24px;
    }
    .talklist {
      width: 73%;
      .pagination {
        display: flex;
        width: 100%;
        justify-content: center;
      }
    }
    .right-board {
      width: 35%;
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
          cursor: pointer;
        }
        .board-nav:hover {
          color: #0056b3;
        }
        .board-left {
          font-weight: bold;
        }
      }
    }
    .reply-box-container {
      width: 60%;

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
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
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