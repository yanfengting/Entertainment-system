<template>
  <div id="dialog" class="dialog" v-if="showWrap" style="z-index: 9999999;" :class="showContent ?'fadein':'fadeout'">
    <div class="cube-popup cube-popup_mask cube-dialog" style="z-index: 100;">
      <div class="cube-popup-mask dialog-mask"></div>
      <div class="cube-popup-container cube-popup-center dialog-content">
        <div class="cube-popup-content">
          <div class="cube-dialog-main"><span class="cube-dialog-close"><i class="cubeic-close"
                                                                           @click="showWrap= false , showContent = false"></i></span>
            <div class="cube-dialog-alert">
              <h2 class="cube-dialog-title">
                <div :class="icon"></div>
              </h2>
              <div class="cube-dialog-content"><p class="my-content">{{text}}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  div.dialog-mask {
    width: 100%;
    position: absolute;
    z-index: 110;
    height: 100%;
  }

  .dialog-content {
    position: fixed;
    z-index: 111;
  }

  .dialog {
    position: fixed;
    width: 100%;
    right: 0;
    bottom: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.40);
    border: none;
    border-radius: 5px;
    transform: translate(0, 0);
    color: #fff;
    font-size: 13px;
    z-index: 999999;
    text-align: justify;
  }

  #dialog {
    z-index: 999999;
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
