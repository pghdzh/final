<template>
  <div class="main">
    <h1>历届大佬</h1>
   <div class="items">
     <transition-group
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__zoomIn"
     
    >
      <div class="item" v-for="i in 3" :key="i">
        <div class="left">头像/照片</div>
        <div class="detail">
          <h3>姓名</h3>
          <div style="color: grey">毕业去向</div>
          <div class="intor">
            介绍Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Tempora delectus fugiat mollitia deleniti esse officiis maiores sint
            commodi, assumenda quidem porro iusto, at cupiditate totam
            temporibus? Maxime commodi odit sunt?
          </div>
        </div>
      </div>
    </transition-group>
   </div>
  </div>
</template>

<script>
import 'animate.css'
export default {
  name: "SeniorPage",
};
</script>

<style scoped lang="less">
.main {
  margin-top: 60px;
  padding: 20px;
  h1 {
    margin-left: 18%;
  }
  .items {
    margin-left: 20%;
    margin-top: 20px;
    .item {
      display: flex;
      margin-top: 20px;
      .left {
        border: 1px solid #000;
        width: 10%;
        margin-right: 20px;
        height: 200px;
      }
      .detail {
        width: 50%;
        .intor {
          margin: 20px;
          font-size: 13px;
          color: rgb(52, 59, 154);
        }
      }
    }
  }
}
</style>