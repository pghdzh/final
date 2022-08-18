<template>
  <div class="detail">
    <div class="avatar">
      <img :src="userImg" alt="" />
    </div>
    <div :class="bcolor" class="talkBox">
      <div class="boxTop">
        <span class="box-name">{{ userName }}</span>
        <span class="box-time">2022-8-3 22:47:36</span>
        <span class="respond">回复</span>
      </div>
      <div class="text">
        <div class="box-detail">
          具体内容 Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Voluptate quae totam beatae, incidunt reprehenderit quaerat mollitia
          amet dolorem ipsa delectus ad, numquam quo ratione possimus
          voluptates. Tempore numquam commodi doloribus.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("user", ["userImg", "userName"]),
  },
  props:['bcolor'],
  
};
</script>

<style scoped lang='less'>
.blue {
  border: 1px solid #0e90d2;
}
.blue::before {
  border-color: transparent;
  border-right-color: #0e90d2;
}

.red {
  border: 1px solid #dd514c;
}
.red::before {
  border-color: transparent;
  border-right-color: #dd514c;
}
.detail {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  .avatar {
    margin-right: 15px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .talkBox {
    width: 90%;
    
    background-color: white;
    position: relative;

    .boxTop {
      background-color: #f8f8f8;
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      font-size: large;
      .box-name {
        color: #8e44ad;
      }
      .box-time {
        color: grey;
        font-size: small;
        margin-left: 10px;
      }
      .respond {
        float: right;
        margin-right: 20px;
        cursor: pointer;
        font-weight: bold;
      }
      .respond:hover {
        color: #0056b3;
      }
    }
    .text {
      margin: 20px;
      h1 {
        margin-bottom: 10px;
      }
      .box-detail {
        font-size: 14px;
      }
    }
  }
  .talkBox::before {
    position: absolute;
    top: 10px;
    left: -8px;
    width: 0;
    height: 0;
    display: block;
    content: " ";

    border-style: solid solid outset;
    border-width: 8px 8px 8px 0px;
    pointer-events: none;

    z-index: 1;
    box-sizing: border-box;
  }
  .talkBox::after {
    box-sizing: border-box;
    position: absolute;
    top: 10px;
    left: -8px;
    right: 100%;
    width: 0;
    height: 0;
    display: block;
    content: " ";
    border-color: transparent;
    border-style: solid solid outset;
    border-width: 8px 8px 8px 0;
    pointer-events: none;
    border-right-color: #f8f8f8;
    margin-left: 1px;
    z-index: 2;
  }
}
</style>