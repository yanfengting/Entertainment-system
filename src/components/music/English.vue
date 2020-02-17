<template>
  <div id="item-music">
    <div class="scroll-nav-wrapper">
      <cube-scroll :options="scrollOptions">

      </cube-scroll>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      }
    }
  }
}
</script>

<style lang="stylus">
#item-music
  position relative
  height 100%
  .scroll-nav-wrapper
    position absolute
    width 100%
    top 0
    left 0
    bottom 0
    // border 1px solid blue
</style>
