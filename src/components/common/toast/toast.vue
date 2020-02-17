<template>
  <div id="toast" class="toast" v-if="showWrap" style="z-index:12" :class="showContent ?'fadein':'fadeout'">{{text}}
  </div>
</template>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background: rgba(0, 0, 0, 0.80);
    border: none;
    padding: 7px;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 13px;
    line-height: 20px;
    z-index: 12;
    text-align: justify;
  }

  #toast {
    z-index: 1111;
  }

  .fadein {
    animation: animate_in 0.25s;
  }

  .fadeout {
    animation: animate_out 0.25s;
    opacity: 0;
  }

  @keyframes animate_in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes animate_out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
