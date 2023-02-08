<template>
  <div>
    <div class="top">我的消息</div>
    <transition
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__zoomIn"
    >
      <div class="notify" v-if="!MsgList.length">暂无消息</div>
    </transition>
    <div class="Mes" v-if="MsgList.length">
      <div class="left-userList">
        <div class="left-top">近期消息</div>
        <div class="left-list">
          <div class="list-item" v-for="i in 3" :key="i">
            <div class="avatar">
              <img src="@/assets/avatar.webp" alt="" />
            </div>
            <div class="username">pgh</div>
            <i class="el-icon-close"></i>
          </div>
        </div>
      </div>
      <div class="right-msgArea">
        <div class="topId">pgh</div>
        <div class="msgArea">
          <div class="msgList">
            <div class="msgTime">2022-12-14 12:46</div>
            <div
              class="msgitem"
              v-for="(i, index) in MsgList"
              :key="index"
              :class="{ isme: index % 2 == 0 }"
            >
              <div class="avatar">
                <img src="@/assets/avatar.webp" alt="" />
              </div>
              <div class="msg">
                <div class="msg-con">
                  {{ i }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="inputArea">
          <div
            class="input"
            ref="editor"
            contenteditable="true"
            v-on:input="getInput"
          ></div>
          <div class="other">
            <div class="nums">{{ Msginput.length }}/500</div>
            <button @click="socketSendmsg">发送</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";
export default {
  mounted() {
    this.connected();
  },
  data() {
    return {
      MsgList: ["1"],
      Msginput: "",
    };
  },
  methods: {
    getInput() {
      this.Msginput = this.$refs.editor.innerHTML;
    },
    connected() {
      this.$socket.open(); // 开始连接socket
    },
    socketSendmsg() {
      this.$socket.emit("chat", this.Msginput);
      this.$refs.editor.innerHTML= "";
    },
  },
  sockets: {
    connecting() {
      console.log("正在连接");
    },
    disconnect() {
      console.log("Socket 断开");
    },
    connect_failed() {
      console.log("连接失败");
    },
    connect() {
      console.log("socket connected");
    },
    Mytext(data) {
      console.log(data);
    },
    chat(data) {
      this.MsgList.push(data);
    },
  },
};
</script>

<style lang='less' scoped>
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
.notify {
  width: 100%;
  border-radius: 4px;
  background-color: white;
  padding: 10px 20px;
  min-height: 200px;
  text-align: center;
}
.Mes {
  width: 100%;
  border-radius: 4px;
  background-color: white;
  display: flex;
  .left-userList {
    width: 20%;
    border-right: 1px solid gainsboro;
    font-size: 14px;
    .left-top {
      padding: 10px 20px;
      border-bottom: 1px solid gainsboro;
      box-sizing: border-box;
    }
    .left-list {
      .list-item:hover {
        background-color: #e4e5e6;
        .el-icon-close {
          display: block;
          transform: translateX(25%);
        }
      }

      .list-item {
        display: flex;
        flex-direction: row;
        padding: 19px 24px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        .avatar {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
        .username {
          margin-left: 10px;
          color: #333;
          font-size: 14px;
          min-height: 16px;
          line-height: 1;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
        .el-icon-close {
          position: absolute;
          width: 24px;
          left: 0;
          top: 34px;
          font-size: 16px;
          transform: translateX(-100%);
          transition: 0.3s;
        }
      }
    }
  }
  .right-msgArea {
    width: 80%;
    min-height: 600px;
    .topId {
      padding: 10px 20px;
      width: 100%;
      text-align: center;
      border-bottom: 1px solid gainsboro;
      box-sizing: border-box;
      font-size: 14px;
    }
    .msgArea {
      background-color: #f4f5f7;
      width: 100%;
      height: 380px;
      overflow-x: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 10px;
      }

      /* 滚动条里面的滑块 */
      &::-webkit-scrollbar-thumb {
        background-color: rgba(144, 147, 153, 0.3);
        border-radius: 20px;
        transition: background-color 0.3s;
      }
      .msgTime {
        padding: 16px 0 16px;
        text-align: center;
        width: 100%;
        color: grey;
      }
      .msgitem {
        display: flex;
        margin-bottom: 20px;
        .avatar {
          margin-left: 20px;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
        .msg {
          max-width: 480px;
          margin: 0 10px;
          position: relative;
          overflow: hidden;
          color: #333;
          box-sizing: border-box;
          .msg-con {
            box-sizing: border-box;
            font-size: 14px;
            min-height: 37px;
            line-height: 1.5;
            padding: 8px 16px;
            word-wrap: break-word;
            word-break: break-word;
            border-radius: 0 16px 16px 16px;
            overflow: hidden;
            background: #fff;
          }
        }
      }
      .isme {
        position: relative;
        margin-right: 20px;
        flex-direction: row-reverse;
        .avatar {
          display: block;
          margin-left: 0;
        }
        .msg {
          display: block;

          color: #fff;
          .msg-con {
            background-color: #80b9f2;
            border-radius: 16px 0 16px 16px;
          }
        }
      }
    }
  }
  .inputArea {
    height: 162px;
    border-top: 1px solid #d8d8d8;
    border-bottom-right-radius: 4px;
    background-color: #f4f5f7;
    flex-shrink: 0;
    padding: 10px 16px;
    position: relative;
    z-index: 2;
    .input {
      width: 100%;
      min-height: 22px;
      max-height: 300px;
      letter-spacing: 1px;
      box-sizing: border-box;
      white-space: pre-wrap;
      overflow-x: hidden;
      overflow-y: auto;
      color: #222;
      background-color: transparent;
      font-size: 14px;
      vertical-align: baseline;
      outline: none;
      line-height: normal;
      border-radius: 4px;
      word-break: break-word;
      word-wrap: break-word;
    }
    .other {
      position: absolute;
      right: 20px;
      bottom: 20px;
      display: flex;
      align-items: center;
      .nums {
        color: gray;
        margin-right: 20px;
      }
      button {
        cursor: pointer;
        margin: 0;
        position: relative;
        width: 88px;
        height: 30px;
        text-align: center;
        border: 1px solid #e7e7e7;
        background-color: #fff;
        border-radius: 4px;
      }
    }
  }
}
</style>