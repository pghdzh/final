<template>
  <div class="detail">
    <div class="root-reply-container">
      <div class="root-reply-avatar">
        <div class="avatarImg" :style="{ 'background-image': `url(${comment.user.avatar})` }" v-if="comment.user.avatar">
        </div>

        <div class="defaultAvatar" v-else>
          {{ comment.user.nickName[0] }}
        </div>
      </div>
      <div class="content-warp">
        <div class="user-info">
          <div class="user-name">{{ comment.user.nickName }}</div>
          <!-- <div class="up">楼主</div> -->
        </div>
        <div class="root-reply">
          <div class="root-reply-content">
            {{ comment.content }}
          </div>
          <div class="reply-info">
            <span class="reply-time"> {{ comment.createTime }}</span>
            <!-- <span class="reply-like">
              <i class="iconfont icon-dianzan"></i>
              <span>666</span>
            </span> -->
            <span class="reply-btn"
              @click="changeAddParams(comment.commentId, -1, comment.user.userId, comment.user.nickName)">回复</span>
          </div>
        </div>
      </div>
    </div>
    <div class="sub-reply-container">
      <div class="sub-reply-list">
        <div class="sub-reply-item" v-for="i, index in comment.children" :key="index" v-show="
          (index * currentPage1 < 3 || !isfold) &&
          7 * (currentPage1 - 1) + index <= comment.children.length
        ">
          <div class="sub-user-info">
            <div class="sub-reply-avatar">
              <div class="avatarImg" :style="{ 'background-image': `url(${i.user.avatar})` }" v-if="i.user.avatar"></div>

              <div class="defaultAvatar" v-else>
                {{ i.user.nickName[0] }}
              </div>
            </div>
            <div class="sub-user-name">{{ i.user.nickName }}</div>
          </div>
          <span class="sub-reply-content">
            {{ i.content }}
          </span>
          <div class="sub-reply-info">
            <span class="sub-reply-time"> {{ i.createTime }} </span>
            <!-- <span class="sub-reply-like">
              <i class="iconfont icon-dianzan"></i>
              <span>666</span>
            </span> -->
            <span class="sub-reply-btn"
              @click="changeAddParams(comment.commentId, i.commentId, i.user.userId, i.user.nickName)">回复</span>
          </div>
        </div>
        <div class="view-more">
          <div class="view-more-default" v-show="isfold && comment.children.length">
            <span> 共{{ comment.children.length }}条回复 </span>
            <span class="view-more-btn" @click="isfold = false" v-if="comment.children.length > 3">
              ,点击查看
            </span>
          </div>
          <div class="view-more-pagination" v-show="!isfold">
            <el-pagination :current-page.sync="currentPage1" :page-size="7" layout="total, prev, pager, next"
              :total="comment.children.length">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="reply-box-container" v-show="sendArea">
      <div class="reply-box">
        <div class="box-normal">
          <div class="reply-box-avatar">
            <img :src="userImg" alt="" v-if="userImg" />
            <div class="defaultAvatar" v-else>
              {{ userName[0] }}
            </div>
          </div>
          <div class="reply-box-warp">
            <textarea class="reply-box-textarea" v-model="commentContent" :placeholder="replyPlace"> </textarea>
          </div>
          <div class="reply-box-send">
            <div class="send-text" @click="addComment()">发布</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-line"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { reqaddComment } from "@/api";
export default {
  computed: {
    ...mapGetters("user", ["userName", 'userImg']),
  },
  props: ["comment", "articleId"],
  mounted() {
    // console.log("articleId", this.articleId)
    // console.log("comment", this.comment)
  },
  data() {
    return {
      isfold: true,
      currentPage1: 1,
      sendArea: false,
      commentContent: '',
      rootId: -1,
      toCommentId: -1,
      toUserId: -1,
      replyPlace: ''
    };
  },
  methods: {
    changeAddParams(rootId, toCommentId, toUserId, userName) {
      this.sendArea = true
      this.replyPlace = '@' + userName
      this.rootId = rootId
      this.toCommentId = toCommentId
      this.toUserId = toUserId
    },
    async addComment() {
      if (!this.userName) {
        this.$message({
          showClose: true,
          message: '请先登陆'
        });
        return
      }
      if (!this.commentContent) {
        this.$message({
          showClose: true,
          message: '请先填写回复内容'
        });
        return
      }
      let params = {
        articleId: this.articleId,
        content: this.commentContent,
        rootId: this.rootId,
        toCommentId: this.toCommentId,
        toUserId: this.toUserId,
      }
      // console.log("params", params)

      let res = await reqaddComment(params)
      if (res.code == 200) {
        this.$message({
          showClose: true,
          type: 'success',
          message: '回复成功'
        });
        this.commentContent = ''
        this.$emit('reply')
        return
      }
    }
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

      .avatarImg {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #e6eaf0;
        background-size: cover;
      }

      .defaultAvatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #a5a4a4;
        color: #fff;
        font-size: 30px;
        text-align: center;
        line-height: 40px;
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
            left: -8px;
            top: 8px;
            cursor: pointer;

            .avatarImg {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              overflow: hidden;
              border: 1px solid #e6eaf0;
              background-size: cover;
            }

            .defaultAvatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: #a5a4a4;
              color: #fff;
              font-size: 14px;
              text-align: center;
              line-height: 40px;
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

        .view-more-default {
          .view-more-btn {
            cursor: pointer;
          }

          .view-more-btn:hover {
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

          .defaultAvatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #a5a4a4;
            color: #fff;
            font-size: 30px;
            text-align: center;
            line-height: 40px;
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