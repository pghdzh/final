<template>
  <div class="main">
    <h1>实验室简介</h1>
    <div class="container">
      Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nemo magnam quod consequatur corrupti, quae, necessitatibus odio, alias voluptates eligendi debitis eum? Exercitationem optio modi voluptate nemo sapiente soluta deserunt. ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, deserunt est aspernatur quaerat voluptates rerum. Officia itaque ex delectus nam nihil, deleniti facilis. Nostrum facere amet, consequatur minus qui rerum.
    </div>
    <h1>各小组介绍</h1>
    <transition-group 
    appear
    name="animate__animated animate__bounce"
    enter-active-class="animate__backInUp"
    >
   
    <el-card class="card"  v-for="i in 4" :key="i">
        <h2>小组名字</h2>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ex eius eligendi alias et, officia autem, natus hic suscipit est aut molestias fugiat vel excepturi doloribus facere modi quos facilis!
        </div>
    </el-card>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "IntorPage",
};
</script>

<style scoped lang="less">
.main{
  margin-top: 60px;
  min-height: 800px;
  background-color: rgb(239, 239, 239);
  padding: 40px 80px;
 
  .container{
    margin: 20px;
    min-height: 300px;
  }
  .card{
    margin: 20px 0;
    width: 80%;
    margin-left: 10%;
  }
  font-size: large;
}
</style>