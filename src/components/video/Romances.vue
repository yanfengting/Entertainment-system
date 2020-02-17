<template>
  <!-- <div class="content-scroll-wrapper">
     &lt;!&ndash; 短视频 &ndash;&gt;
     <div id="scroll-act"
          class="content-scroll-list-wrap">-->
  <cube-scroll ref="scroll" :scrollEvents="['scroll','scrollEnd']"
               :data="listItem"
               :options="options"
               @scrollEnd="endScroll()"
               @pulling-up="onPullingUp"
               @scroll="onScroll">
    <div>
      <div class="dp-center"
           v-for="(item,index) in listItem"
           v-bind:key="index">
        <video ref="videoRef"
               webkit-playsinline='true'
               playsinline='true'
               :poster="item.image"
               preload="meta"
               class="video-js vjs-default-skin vjs-big-play-centered" controls
               @click="forId(index)"
               :id="forId(index)">
          <source :src="item.url"
                  type="video/mp4">
          <p class='vjs-no-js'>
            To view this video please enable JavaScript, and consider upgrading to a web browser that
            <a href='https://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a>
          </p>
        </video>

        <div class="video_list_explain text_align_center">{{item.title}}</div>
      </div>
      <div class="bottom-desp" v-show="bottomshow">
        <hr>
        <span>我是有底线的哦</span>
        <hr>
      </div>
    </div>
  </cube-scroll>
  <!-- </div>

 </div>-->
</template>
<script>
  import registryToast from '../common/toast/index'

  export default {
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data: function () {
      return {
        listItem: [],
        cur_play_id: '',
        options: {
          pullUpLoad: true
        },
        playState: true,
        page: 1,
        bottomshow: false,
        length: 5
      }
    },
    created() {
      let id = this.data.id
      let _this = this
      this.axios.get('/api/short/list?typeId=' + id + '&page=' + this.page + '&length=' + this.length).then(
        res => {
          if (res.data.status === 200) {
            let id = ''
            let data = res.data.data.data
            let startIndex = _this.listItem.length
            data.forEach(function (item, index) {
              if (index === 1) {
                id = item.id
              }
              _this.listItem.push({
                id: item.id,
                title: item.title,
                isplay: true,
                type: 'video/mp4',
                url: item.urlVideo,
                image: item.urlPoster,
                dateTime: '2018-09-10 16:30'
              })
            })
            setTimeout(function () {
              _this.initVideo(startIndex, data.length)
              setTimeout(function () {
                _this.initScroll()
              }, 1000)
            }, 200)
          }
        })
    },
    methods: {
      onPullingUp() {
        let id = this.data.id
        let _this = this
        this.page = this.page + 1
        this.axios.get('/api/short/list?typeId=' + id + '&page=' + this.page + '&length=' + this.length).then(
          res => {
            console.log('timeout', res)
            if (res.data.status === 601) {
              this.$refs.scroll.forceUpdate()
              registryToast.showToast('服务器繁忙请重试')
            } else if (res.data.status === 200) {
              let id = ''
              let data = res.data.data.data
              if (data.length <= 0) {
                this.bottomshow = true
                this.$refs.scroll.forceUpdate()
                return
              }
              let startIndex = _this.listItem.length
              data.forEach(function (item, index) {
                if (index === 1) {
                  id = item.id
                }
                _this.listItem.push({
                  id: item.id,
                  title: item.title,
                  isplay: true,
                  type: 'video/mp4',
                  url: item.urlVideo,
                  image: item.urlPoster,
                  dateTime: '2018-09-10 16:30'
                })
              })
              setTimeout(function () {
                _this.initVideo(startIndex, data.length)
                setTimeout(function () {
                  _this.initScroll()
                }, 1000)
              }, 200)
            }
          })
      },
      endScroll() {

      },
      onScroll: function (pos) {
        // console.log(pos)
      },
      forId: function (index) {
        return 'shot_video' + index + this.data.id
      },
      videojsId: function (id) { // 获取videojs 对象id
        return id + '_html5_api'
      },
      initScroll: function () {
        this.$refs.scroll.refresh()
      },
      play_next_video: function (i) {
        let forId = this.forId(i + 1)
        return this.videojsId(forId)
      },
      pause_prev_video: function (el) { // 暂停上一个视频 ， 播放当前视频
        if (this.cur_play_id === 'undefined' || this.cur_play_id === '') {
          return
        }
        let prev = document.getElementById(this.videojsId(this.cur_play_id))
        if (this.cur_play_id === el) {
          return
        }
        // console.log('调用暂停1')
        let videos = document.getElementsByTagName('video')
        let prevEl = this.videojsId(el)
        for (let i = 0; i < videos.length; i++) {
          let curVideoId = videos[i].id
          if (curVideoId !== prevEl) {
            videos[i].pause()
          }
        }
      },
      getVideoState(id) {
        let video = document.getElementById(this.videojsId(id))
        return video.paused
      },
      state_video: function (curvideo) { // 控制当前播放器播放状态
        let _this = this
        let video = document.getElementById(_this.videojsId(curvideo.id_))
        if (!video.paused) {
          curvideo.pause()
        } else {
          curvideo.play()
          _this.pause_prev_video(curvideo.id_)
          _this.cur_play_id = curvideo.id_
        }
      },
      initVideo: function (start, index) { // 初始化播放器
        let _initthis = this
        let temp = true
        for (let i = start; i < start + index; i++) {
          let id = this.forId(i)
          let videoPlayer = document.getElementById(id)
          let myPlayer = this.$video(id, {
              controls: true,
              autoplay: false,
              preload: 'auto'
            }, function onPlayerReady() {
              let _this = this
              this.on('ended', function () {
                let nextPlayId = _initthis.play_next_video(i)
                let payVideo = document.getElementById(nextPlayId)
                payVideo.play()
                _initthis.cur_play_id = _initthis.forId(i + 1)
              })
              this.on('play', function () {
//              alert('alertText')
                _initthis.pause_prev_video(id)
                _initthis.cur_play_id = id
              })
            }
          ).on('click', function () {

          })
          // myPlayer.addChild('BigPlayButton')
        }
        _initthis.initScroll()
      }
    },
    mounted() {
      this.initScroll()
    },
    beforeDestroy() {
      let videos = this.$refs.videoRef
      let _self = this
      videos.forEach(function (item) {
        _self.$video(item).dispose()
      })
    }
  }
</script>
<style type="text/css">
  .bottom-desp {
    height: 80px;
    line-height: 80px;
    font-size: 12px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #c3c3c3
  }

  .bottom-desp hr {
    width: 50px;
    margin: 0 10px;
    height: 1px;
    border: none;
    border-top: solid 1px;
  }

  .cube-scroll-content {
    /*padding-bottom: 50px;*/
  }

  /*
    .video-js button.vjs-paused {
      display: none;
    }

    .video-js button.vjs-playing {
      display: none;
    }*/
</style>
<style lang="stylus" scoped>
  .swipe-wrapper
    height 100%
    padding 10px

  .video-list a
    color black
    text-decoration none

  .dp-center
    position: relative
    padding-bottom 10px;

  .dp-center video
    width 100%
    height 100%

  .video-js
    width 100%
    height 200px


  .video_list_explain
    color #ffffff
    padding 10px;
    position: absolute
    top 0
    left 0
</style>
