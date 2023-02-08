<template>
  <div class="detail">
    <div class="root-reply-container">
      <div class="root-reply-avatar">
        <img src="@/assets/avatar.webp" alt="" />
      </div>
      <div class="content-warp">
        <div class="user-info">
          <div class="user-name">pgh</div>
          <div class="up">楼主</div>
        </div>
        <div class="root-reply">
          <div class="root-reply-content">
            回复内容Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Obcaecati architecto sequi dolorum, libero aliquam placeat fugiat.
            Beatae culpa eaque dicta repellat, molestiae earum commodi, sapiente
            nesciunt vitae sequi fuga deserunt?
          </div>
          <div class="reply-info">
            <span class="reply-time"> 2022-10-19 21:46 </span>
            <!-- <span class="reply-like">
              <i class="iconfont icon-dianzan"></i>
              <span>666</span>
            </span> -->
            <span class="reply-btn" @click="sendArea = true">回复</span>
          </div>
        </div>
      </div>
    </div>
    <div class="sub-reply-container">
      <div class="sub-reply-list">
        <div
          class="sub-reply-item"
          v-for="i in 7"
          :key="i"
          v-show="
            (i * currentPage1 < 3 || !isfold) &&
            7 * (currentPage1 - 1) + i <= 12
          "
        >
          <div class="sub-user-info">
            <div class="sub-reply-avatar">
              <img src="@/assets/avatar.webp" alt="" />
            </div>
            <div class="sub-user-name">nhh</div>
          </div>
          <span class="sub-reply-content">
            子评论{{ 7 * (currentPage1 - 1) + i }}
          </span>
          <div class="sub-reply-info">
            <span class="sub-reply-time"> 2022-10-19 21:46 </span>
            <!-- <span class="sub-reply-like">
              <i class="iconfont icon-dianzan"></i>
              <span>666</span>
            </span> -->
            <span class="sub-reply-btn" @click="sendArea = true">回复</span>
          </div>
        </div>
        <div class="view-more">
          <div class="view-more-default" v-show="isfold">
            <span> 共12条回复， </span>
            <span class="view-more-btn" @click="isfold = false">
              点击查看
            </span>
          </div>
          <div class="view-more-pagination" v-show="!isfold">
            <el-pagination
              :current-page.sync="currentPage1"
              :page-size="7"
              layout="total, prev, pager, next"
              :total="12"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="reply-box-container" v-show="sendArea">
      <div class="reply-box">
        <div class="box-normal">
          <div class="reply-box-avatar">
            <img src="@/assets/avatar.webp" alt="" />
          </div>
          <div class="reply-box-warp">
            <textarea class="reply-box-textarea"> </textarea>
          </div>
          <div class="reply-box-send">
            <div class="send-text">发布</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-line"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("user", ["userName"]),
  },
  props: ["bcolor"],
  data() {
    return {
      isfold: true,
      currentPage1: 1,
      sendArea: false,
    };
  },
};
</script>

<style scoped lang='less'>
.detail {
  width: 100%;
  position: relative;
  .root-reply-container {
    padding: 22px 0 0 80px;
    .root-reply-avatar {
      position: absolute;
      display: flex;
      justify-content: center;
      position: absolute;
      left: 0;
      width: 80px;
      cursor: pointer;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .content-warp {
      .user-info {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
        font-size: 13px;
        .user-name {
          font-weight: 500;
          margin-right: 5px;
          font-size: 13px;
        }
        .up {
          font-weight: 400;
          box-sizing: border-box;
        }
      }
      .root-reply {
        .root-reply-content {
          width: 95%;
          padding: 2px 0;
          font-size: 15px;
          line-height: 24px;
        }
        .reply-info {
          display: flex;
          align-items: center;
          margin-top: 2px;
          span {
            margin-right: 8px;
            color: grey;
          }
          .reply-time {
            font-size: 13px;
          }
          .reply-like {
            i {
              cursor: pointer;
            }
            i:hover {
              color: #409eff;
            }
          }
          .reply-btn {
            cursor: pointer;
          }
          .reply-btn:hover {
            color: #409eff;
          }
        }
      }
    }
  }
  .sub-reply-container {
    padding-left: 80px;
    .sub-reply-list {
      .sub-reply-item {
        font-size: 15px;
        line-height: 24px;
        position: relative;
        padding: 8px 0 8px 42px;
        border-radius: 4px;
        .sub-user-info {
          display: inline-flex;
          align-items: center;
          margin-right: 9px;
          line-height: 24px;
          vertical-align: baseline;
          white-space: nowrap;
          .sub-reply-avatar {
            position: absolute;
            left: 8px;
            cursor: pointer;
            img {
              width: 24px;
              height: 24px;
              border-radius: 50%;
            }
          }
        }
        .sub-reply-info {
          display: flex;
          align-items: center;
          position: relative;
          margin-top: 2px;
          font-size: 13px;
          color: grey;
          span {
            margin-right: 19px;
          }
          .sub-reply-like {
            i:hover {
              color: #409eff;
            }
          }
          .sub-reply-btn {
            cursor: pointer;
          }
          .sub-reply-btn:hover {
            color: #409eff;
          }
        }
      }
      .view-more {
        padding-left: 8px;
        font-size: 13px;
        .view-more-default{
          .view-more-btn{
            cursor: pointer;
          }
          .view-more-btn:hover{
            color: #409eff;
          }
        }
      }
    }
  }
  .reply-box-container {
    padding: 25px 0 10px 80px;
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
  .bottom-line {
    margin-left: 80px;
    border-bottom: 1px solid gainsboro;
    margin-top: 14px;
    margin-bottom: 10px;
  }
}
</style>