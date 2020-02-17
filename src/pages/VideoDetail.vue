<template>
  <div>
    <Nav></Nav>
    <video ref="videoRef" controls
           id="player"
           width="100%"
           autoplay='false'
           webkit-playsinline="" playsinline="true"
           class="video-js vjs-default-skin vjs-big-play-centered">
      <source :src="adsUrl" type='video/mp4;codecs="avc1.42E01E, mp4a.40.2'>
    </video>
    <div class="media">
      <div class="media-left">
        <div class="media-object img-thumbnail ff-img"
             :style="{'background-image': 'url('+data.urlCover+')','background-repeat': 'no-repeat', 'background-size': '100% 100%', 'background-position': 'center center' }"></div>
      </div>
      <div class="media-body">
        <h2 class="text-nowrap">
          <a class="ff-text">{{data.title}}</a>
        </h2>
        <dl class="dl-horizontal">
          <!-- <dd style="display: flex;flex-direction: row;align-items: center">
             <video-rate :score="data.score"></video-rate>
             <small style="color: #94A8BF;">{{data.score}}</small>
           </dd>-->
          <dd class="ff-text-right" style="color: #94A8BF;">{{data.country}}</dd>
        </dl>
      </div>
    </div>
    <div>
      <p class="jj" style="width:90px;font-weight: 700;">简介</p>
      <div class="gamecontainer">
        <span class="gameinfo">
          {{data.info}}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'
  import VideoRate from '../components/common/VideoRate.vue'
  import Swiper from 'swiper' // 引用swiper
  import 'swiper/dist/css/swiper.min.css' // 引用css
  export default {
    data() {
      return {
        data: {},
        testUrl: '',
        adsUrl: '',
        salesArr: [],
        value: 4,
        adimgs: []
      }
    },
    created: function () {
      let id = this.$route.query.id
      let _this = this
      _this.getVideo(id)
    },
    methods: {
      getVideo: function (id) {
        let _this = this
        this.axios.get('/api/advertise/' + id).then(res => {
          if (res.data.status === 200) {
            _this.data = res.data.data
            _this.data.duration = (_this.data.duration / 60).toFixed(0)
            _this.initVideo(_this.data.urlVideo)
          }
        })
      },
      initVideo: function (urlVideo) {
        let _this = this
        let startNext = true
        if (_this.adsUrl === '') {
          startNext = false
          _this.adsUrl = _this.data.urlVideo
        }
        setTimeout(function () {
          let myPlayer = _this.$video('player', {
            controls: true,
            autoplay: false,
            preload: 'auto'
          }, function onPlayerReady() {
            let _this = this
            _this.play()
            console.log(this)
            this.on('play', function () { // 监听播放事件
              // this.play()
            })
            this.on('ended', function () {
              if (startNext) {
                _this.controls = true
                _this.controls_ = true
                _this.src(urlVideo) // 重置video的src
                _this.load(urlVideo) // 使video重新加载
              }
              // _this.controls = true
            })
          }).on('click', function () {
          })
        }, 1000)
      }
    },
    mounted() {
      var swiper = new Swiper('.swiper-container', {
        slidesPerView: 2,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    },
    beforeDestroy() {
      let videos = this.$refs.videoRef
      let _self = this
      _self.$video(videos).dispose()
    },
    components: {
      Nav, VideoRate
    }
  }
</script>
<style lang="stylus" scoped>
  .media
    padding 10px 5px

  .jj
    font-size: 14px
    margin: 10px;
    margin-left 11px;
    margin-right: 11px;

  .ff-text-right
    font-size: 13px;

  .media:first-child
    margin-top 0

  .media, .media-body
    overflow hidden
    zoom 1

  .media-left
    // margin-right 5px
  .media-body, .media-left, .media-right
    display table-cell
    vertical-align top

  .media-left, .media > .pull-left
    padding-right 10px
    padding-left 5px

  small
    font-size: 12px;

  .video-js
    width: 100%
    height: 180px

  .media-left .ff-img
    width 100px
    height 130px

  .media-object.img-thumbnail
    max-width none

  .ff-img, .img-thumbnail
    padding 3px
    border-radius 0
    border-color #f5f5f5

  .media-body, .media-left, .media-right
    display table-cell
    vertical-align top

  .media-body
    width 10000px

  .media, .media-body
    overflow hidden
    zoom 1

  .media-body h2
    margin-top 0
    font-size 1.2em

  .text-nowrap
    margin 5px
    margin-left: 0px;
    white-space nowrap

  dl.dl-horizontal
    margin 0
    padding 0

  .gameinfo
    padding-left: 10px;
    font-size: 13px;

  .media-body dt, .vod-detail .media-body dd
    margin-bottom 5px

  .dl-horizontal dt
    width auto
    float left

  dd
    margin-bottom 5px

  .dl-horizontal dd
    margin-left auto

  a.ff-text
    color #000
    font-weight bold
    font-size: 14px

  h2 small
    font-size 75%
    margin-left 5px
    color orange

  // 剧照
  .mt-20
    margin-top 20px !important

  .ml-10
    margin-left 14px

  .photo-pic .photo-pic-list li
    margin 0 17px 19px 0

  .cur
    cursor pointer
    width 20%
    padding 5px

  .cur
    cursor pointer

  .l
    float left
    display inline

  li
    list-style none
</style>
