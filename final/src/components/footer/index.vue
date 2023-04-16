<template>
  <div class="main">
    <div class="inner-footer">

      <div>
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 310 27" preservaAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 58-18 88-18 58 18 88 18  v44h-352z" />
          </defs>
          <g class="parallax">

            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(0,0,0,0.8)" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(0,0,0,0.7)" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(0,0,0,0.5)" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(0,0,0,0.3)" />
            <use xlink:href="#gentle-wave" x="48" y="9" fill="rgba(0,0,0,0.1)" />
           
          </g>
        </svg>
      </div>
      <div class="content">
        <span>ICP备 123456789号 </span>
        <span> 版权所有@计算机学院创新实验室 </span>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "divFooter",

};
</script>

<style scoped lang='less'>
.main {
  position: relative;
  text-align: center;
  color: #fff;
  background: rgb(239, 239, 239);


  .inner-footer {
    height: 4vh;
    width: 100%;
    padding: 0;
    margin: 0;
    background: rgb(239, 239, 239);
  }


  .waves {
    background: rgb(239, 239, 239);
    width: 100%;
    height: 5vh;
    margin-top: -7px;
    min-height: 100px;
    max-height: 150px;
  }

  .content {
    position: absolute;
    top: 7vh;
    height: 5vh;
    text-align: center;
    background-color: #000;
    width: 100%;
    padding-top: 20px;
  }

  .parallax>use {
    animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
  }

  .parallax>use:nth-child(1) {
    animation-delay: -10s;
    animation-duration: 25s;
  }

  .parallax>use:nth-child(2) {
    animation-delay: -8s;
    animation-duration: 28s;
  }

  .parallax>use:nth-child(3) {
    animation-delay: -6s;
    animation-duration: 30s;
  }

  .parallax>use:nth-child(4) {
    animation-delay: -4s;
    animation-duration: 33s;
  }

  .parallax>use:nth-child(5) {
    animation-delay: -2s;
    animation-duration: 36s;
  }

 


  @keyframes move-forever {
    0% {
      transform: translate3d(-170%, 0, 0);
    }

    100% {
      transform: translate3d(170%, 0, 0);
    }
  }


}
</style>