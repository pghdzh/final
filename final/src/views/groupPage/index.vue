<template>
  <div class="main">
    <transition-group 
    appear
    name="animate__animated animate__bounce"
    enter-active-class="animate__backInUp"
    >
    <el-card class="card"  v-for="i in 4" :key="i">
        <h1>小组名字</h1>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ex eius eligendi alias et, officia autem, natus hic suscipit est aut molestias fugiat vel excepturi doloribus facere modi quos facilis!
        </div>
    </el-card>
    </transition-group>
  </div>
</template>

<script>
import 'animate.css'
export default {
  name: "groupPage",
};
</script>

<style scoped lang="less">
.main{
  margin-top: 60px;
  height: 800px;
   background-color: rgb(239, 239, 239);
   padding: 20px 0;
  .card{
    margin: 20px 0;
    width: 80%;
    margin-left: 10%;
  }
}
</style>