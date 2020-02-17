<template>
  <div>
    <Nav></Nav>
    <div class="safety_text" @click="safety_text">
    </div>
    <div class="safety_video" @click="safety_video">
    </div>
    <!--<cube-button :outline="true" @click="safety_text">安全须知文档</cube-button>-->
    <!--<cube-button :outline="true" @click="safety_video">安全演示文档</cube-button>-->
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'

  export default {
    methods: {
      safety_text() {
        this.$router.push('/safety_text')
      },
      safety_video() {
        // let alert = this.$dialog('该功能正在开发', 'my-wait')
        // alert.show()
        // return
        this.$router.push('/safety_video')
      }
    },
    components: {
      Nav
    }
  }
</script>
<style lang="stylus">

  .safety_text
    color #ffffff
    width 95%
    text-align center
    vertical-align middle
    font-weight bold
    height 200px
    line-height 110px
    background url("../assets/images/safety_text.png") 100% 100% no-repeat
    background-size 100% 100%
    -webkit-border-radius: 10px
    -moz-border-radius: 10px
    border-radius: 10px
    margin 8px auto
    margin-top 40px;
  .safety_video
    color #ffffff
    text-align center
    vertical-align middle
    -webkit-border-radius: 10px
    -moz-border-radius: 10px
    border-radius: 10px
    margin 25px auto
    font-weight bold
    width 95%
    height 200px
    line-height 110px
    background url("../assets/images/safety_video.png") 100% 100% no-repeat
    background-size 100% 100%
</style>
