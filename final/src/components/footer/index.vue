<template>
  <div class="main">
    <span>ICP备 123456789号 </span>
    <span> 版权所有@计算机学院创新实验室 </span>
  </div>
</template>

<script>
export default {
  name: "divFooter",
};
</script>

<style scoped lang='less'>
.main{
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #000;
    color: #fff;
    span{
        margin: 0 40px;
    }
}
</style>