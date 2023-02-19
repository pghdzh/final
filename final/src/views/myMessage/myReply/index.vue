<template>
  <div>
    <div class="top">
      回复我的
    </div>
    <div class="Mes">
      <div class="reply-item" v-for="i in 6" :key="i">
        <div class="item-content">
          <div class="left-avatar">
            <img src="@/assets/avatar.webp" alt="">
          </div>
          <div class="center-box">
            <div class="line1">
              <span class="name">昵称</span>
              <span class="tip">回复了你的评论</span>
            </div>
            <div class="line2">
              回复内容Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima voluptas minus inventore repellat
              facilis facere a quod. Quia, rerum aspernatur quas voluptas, nesciunt esse voluptatibus, temporibus amet vel
              assumenda totam!
            </div>
            <div class="line3">
              <span class="time">2023年2月17日 12:31</span>
              <span class="goreply">前往回复</span>
              <span class="delete"> 删除该通知</span>
            </div>
          </div>
          <div>
            <div class="right-box">
              你的评论Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere debitis unde, incidunt excepturi odit
              optio in fuga natus, nulla quidem repellat ad recusandae non necessitatibus, et nostrum ducimus pariatur.
              Repellendus!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
::-webkit-scrollbar {
  width: 2px;
  height: 1px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

.top {
  width: 100%;
  background-color: white;
  color: grey;
  font-size: 16px;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 20px 0;
  box-sizing: border-box;
}

.Mes {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  padding: 10px 20px;
  box-sizing: border-box;
  height: 700px;
  overflow-y: auto;

  .reply-item {
    padding: 24px 16px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgb(198, 202, 195);
    margin-bottom: 10px;
    border-radius: 4px;
    box-sizing: border-box;

    .item-content {
      display: flex;
      box-sizing: border-box;

      .left-avatar {
        width: 60px;
        height: 46px;
        margin-right: 20px;

        img {
          display: block;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          box-sizing: border-box;
        }
      }

      .center-box {
        .line1 {
          color: #505050;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin-bottom: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-word;
          font-size: 14px;
          line-height: 15px;
          max-height: 4.285714285714286em;

          .name {
            color: #222;
            margin-right: 8px;
            font-weight: bold;
          }
        }

        .line2 {
          margin-bottom: 10px;
          margin-right: 14px;
          font-size: 14px;
          color: #222;
        }

        .line3 {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          color: #999;
          font-size: 12px;
          line-height: 22px;

          .time {
            margin-right: 15px;
          }

          .goreply {
            cursor: pointer;
            margin-right: 15px;
          }

          .goreply:hover {
            color: #409eff;
          }

          .delete {
            cursor: pointer;
            margin-right: 15px;
          }

          .delete:hover {
            color: #409eff;
          }
        }
      }

      .right-box {

        margin-left: 20px;
        width: 60px;
        height: 60px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        font-size: 14px;
        line-height: 15px;
        max-height: 4.285714285714286em;
      }
    }
  }
}
</style>