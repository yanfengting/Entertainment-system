<template>
  <div class="scroll-list-chinese">
    <cube-scroll>
      <!--<Scrollyic style="height: 85%;" ref="scroll" :data = "data">-->
      <div class="hotcont music-padding" >
        <div ref="lyricLine" v-for="(item, index) in data" :key="index"
             :class="getClass(item)">
          <!--<a href="javascript:void(0);">-->
          <!--<div class="sgfl sgfl-cred" v-if="index<10">0{{index+1}}</div>
          <div class="sgfl sgfl-cred" v-if="index>10">{{index+1}}</div>-->
          <div class="sgfr f-bd f-bd-btm">
            <div class="sgchfl" @click="musicdetail(item)">
              <div class="f-thide sgtl">{{item.name}}</div>
              <div class="f-thide sginfo"><i class="u-hmsprt sghot"></i>{{item.singer}}</div>
            </div>
            <div class="sgchfr">
              <template v-if="judgePlay(item)">
                <div class="start-btn" @click="opMusic(item)" src="" alt=""></div>
              </template>
              <template v-else>
                <div class="pause-btn" @click="musicdetail(item)" src="" alt=""></div>
              </template>
            </div>
          </div>
          <!--</a>-->
        </div>
      </div>
    </cube-scroll>
    <!--</Scrollyic>-->
  </div>
</template>
<script>
  import Scrollyic from '../scroll/Scrollyic.vue'

  export default {
    props: {
      data: {
        type: Array,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        show: true
      }
    },
    mounted() {
      let _this = this
    },
    methods: {
      opMusic(item) {
        let _this = this
        if (this.show) {
          _this.show = false
          setTimeout(function () {
            _this.$store.commit('playMusic', { 'src': item.src, 'musicName': item.name, 'duration': item.duration })
            _this.show = true
          }, 500)
        }
      },
      judgePlay(item) {
        let clazz = this.getCurMusic(item)
        if (clazz) {
          if (this.$store.state.playFlag) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      },
      getCurMusic(item) {
        let musicStr = sessionStorage.getItem('curMusic')
        if (!musicStr) {
          return false
        }
        let music = JSON.parse(musicStr)
        return music.id === item.id ? true : false
      },
      getClass(item) {
        let flag = this.getCurMusic(item)
        let clazz = flag ? 'music-active' : ''
        // console.log(clazz)
        return ['m-sglst', 'm-sgitem', clazz]
      },
      musicdetail(item) {
        // this.$router.push('musicDetail')
        // this.$store.state.curMusic = item.src
        // this.$store.commit('playMusic', { 'src': item.src, 'musicName': item.name })
        let keep = this.getCurMusic(item)
        if (!this.$store.state.playFlag) {
          keep = false
        }
        sessionStorage.setItem('curMusic', JSON.stringify(item))
        this.$router.push({ path: 'musicDetail', query: { 'id': item.id, 'keep': keep } })
        // this.$router.push({ name: 'musicDetail', params: { 'id': id } })
      }
    },
    components: { Scrollyic }
  }
</script>

<style lang="stylus" scoped>
  .scroll-list-chinese
    height 100%
  .music-padding
    padding-bottom 60px;
  .pause-btn
    background: url("../../assets/images/_list_pause.png") no-repeat center center
    background-size: 100% 100%
    width: 25px;
    height: 25px

  .m-hmhot .hotcont
    position relative

  .scroll-list-wrap
    height 350px

  a, a:visited
    color #333

  .m-sgitem, .m-sgitem .sgfl
    display -ms-flexbox
    display flex

  .music-active
    background: #f2f9ff;

  .music-active.m-sgitem
    border-left-color: #0088ff

  .m-sgitem
    border-left 3px solid #fff
    padding-left 10px
    border-bottom 1px solid #eee

  .m-sgitem .sgfl-cred
    color #df3436

  .sgchfr img
    width: 25px;
    height: 25px

  .m-sgitem .sgfl
    -ms-flex-align center
    align-items center
    width 28px
    font-size 17px
    color #999

  .m-sgitem, .m-sgitem .sgfl
    display -ms-flexbox
    display flex

  .m-sgitem .sgfr
    -ms-flex 1 1 auto
    flex 1 1 auto
    display -ms-flexbox
    display flex
    position relative

  .f-bd
    position relative

  .m-sgitem .sgchfl
    -ms-flex 1 1 auto
    flex 1 1 auto
    padding 10px 0
    width 0

  .m-sgitem .sgtl
    font-size 17px

  .start-btn
    background: url("../../assets/images/_list_start.png") no-repeat center center
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    width: 25px;
    height: 25px

  .f-thide
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    word-break normal

  .m-sgitem .sginfo
    margin-top 5px
    font-size 12px
    color #888

  .m-sgitem .sgchfr
    display -ms-flexbox
    display flex
    -ms-flex-align center
    align-items center
    padding 0 10px

  .f-thide
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    word-break normal

  .f-bd-btm:after
    // border-bottom 1px solid #000
  .f-bd:after
    position absolute
    z-index 2
    content ''
    top 0
    left 0
    pointer-events none
    box-sizing border-box

  .f-bd:after
    width 200%
    height 200%
    transform scale(0.5)
</style>
