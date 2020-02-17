<template>
  <div>
    <Nav></Nav>
    <div
      style="border-bottom:1px #eee solid; margin-bottom:20px;position:relative;display: flex;flex-direction: row">
      <div style="margin:10px;display:flex;flex-direction:row;width:55%;">
        <div class="game-content contentdetail" >
          <div class="quiz-height detail-height"
               :style="{'background': 'url('+'http://10.191.1.1' +data.poster+') ', 'background-repeat': 'no-repeat', 'background-size': '100% 100%', 'background-position': 'center center' }"></div>
        </div>
        <div class="game-desc">
          <div class="game-name">{{data.name}}</div>
          <button
            style="font-size:15px;z-index:1111;width:90px;padding: 5px 15px;background-color:#569fff;color:white;outline:none;border:none;border-radius:5px"
            @click="playGame()">开始游戏
          </button>
        </div>
      </div>
    </div>
    <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for="(adimg,index) in data.thumbs"
             v-bind:key="index">
          <img width="100%"
               height="auto"
               :src="adimg"
               class="swiper-lazy">
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>

    <div>
      <p style="width:90px;font-size:15px;font-weight: 700;margin:10px ;">简介</p>
      <div class="gamecontainer">
        <span class="gameinfo">
          {{data.description}}
        </span>
      </div>

    </div>
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'
  import Swiper from 'swiper' // 引用swiper
  import 'swiper/dist/css/swiper.min.css' // 引用css
  export default {
    data() {
      return {
        data: {},
        value: 5
      }
    },
    // mounted: function () {

    // },
    created: function () {
      let id = this.$route.query.id
      let _this = this
      console.log(id)
      // let swiper = this.initbanner()
      this.axios.get('/api/game/' + id).then(function (res) {
        let data = res.data
        if (data.status === 200) {
          _this.data = data.data
          if (_this.data.score === 0) {
            _this.data.score = 0
          }
          _this.initbanner()
        }
      })
    },
    methods: {
      initbanner() {
        let swiper = new Swiper('.swiper-container', {
          spaceBetween: 30,
          observer: true,
          observeParents: true,
          loop: true,
          freeMode: true,
          pagination: {
            el: '.swiper-pagination'
          }
        })
      },
      playGame() {
        let _this = this
        this.axios.get('/api/adv/random?type=2&position=3').then(function (data) {
            let res = data.data
            if (res.status === 200) {
              // if (res.data === '') {
              let windowOpen = window.open(_this.data.src, '_blank')
              if (windowOpen == null || typeof (windowOpen) === 'undefined') {
                this.$createToast({
                  type: 'warn',
                  time: 5000,
                  txt: '您的游戏被safari 浏览器禁止弹出了， 请找到【设置》Safari浏览器》阻止弹出式窗口】将选项设为关闭；在重试'
                }).show()
              }
              // }
            }
          }
        )
      }
    },
    components: {
      Nav
    }
  }
</script>
<style lang="stylus">
  /* 轮播图 */
  .swiper-container
    width 100%
    height 100%

  div.game-content.contentdetail
    width 116.43px;
    height: 123px;
    padding: 7px 8px 8px 4px;
    background: url("../assets/images/game_bak.png") no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    background-position: center center
    .detail-height
      height: 120px;
    .quiz-height
      background-size: 100% 100%;

  .swiper-slide
    text-align center
    font-size 18px
    background #fff
    /* Center slide text vertically */
    display -webkit-box
    display -ms-flexbox
    display -webkit-flex
    display flex
    -webkit-box-pack center
    -ms-flex-pack center
    -webkit-justify-content center
    justify-content center
    -webkit-box-align center
    -ms-flex-align center
    -webkit-align-items center
    align-items center

  .gamecontainer
    margin 10px
    display -webkit-box
    -webkit-box-orient vertical
    overflow hidden
    text-overflow ellipsis
    /* margin: 10px 0 10px 0; */
    font-size 15px

  .container.fold
    -webkit-line-clamp 5

  .container.unfold
    -webkit-line-clamp 100

  .show
    font-size 13px
    color cornflowerblue

  .game-desc
    display: flex;
    position: relative;
    flex-direction column
    align-items center
    justify-content center

  .game-name
    height 40%
    width: 100%
    font-size: 16
    font-weight: 700
    color: #424B55

  .gameinfo
    overflow hidden
    text-overflow ellipsis
    display -webkit-box
    /* -webkit-line-clamp: 5; */
    -webkit-box-orient vertical
    line-height 20px

  .game-img
    width 70px;
    height: 80px;

  <
  <
  <
  .cube-rate-item .cube-rate-item-def
    width 10px
</style>
