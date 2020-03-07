<template>
  <div id="app">
    <router-view/>
    <Caudio :music="this.$store.state.curMusic"></Caudio>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        'playFlag': false,
        'music': '',
        webscok: {},
        webscoket: {},
        lockReconnect: false
      }
    },
    created() {
      this.$store.state.curMusic = this.music
      // this.connectWebSocket()
      // console.log('获取数据', this.$store.state.curMusic)
    },
    // // 挂载的时候获取新闻列表
    // mounted() {
    //   this.axios.get('/api/flightDetail/get').then(res => { // url即在mock.js中定义的
    //     console.log(res.data) // 打印一下响应数据
    //   })
    // },
    methods: {
      connectWebSocket() {
        this.initWebSocket()
        let _this = this
        setTimeout(function () {
          _this.initWebSocket()
        }, 50000)
      },
      initWebSocket() {
        // const wsuri = 'ws://118.178.84.155:5050/websocket' // ws地址
        const wsuri = 'ws://10.191.1.9/websocket'
        this.websock = new WebSocket(wsuri)
        this.websock.onopen = this.websocketonopen
        this.websock.onerror = this.websocketonerror
        this.websock.onmessage = this.websocketonmessage
        this.websock.onclose = this.websocketclose
      },
      exitFullscreen() {
        var de = document
        try {
          if (de.exitFullscreen) {
            de.exitFullscreen()
          } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen()
          } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen()
          }
        } catch (e) {
          console.error('不支持 exitFullscreen', e)
        }
      },
      websocketonopen() {
        this.lockReconnect = true
        console.log('WebSocket连接成功')
      },
      websocketonerror(e) { // 错误
        console.log('WebSocket连接发生错误')
      },
      websocketonmessage(e) { // 数据接收
        var msg = JSON.parse(e.data)
        // 注意：长连接我们是后台直接1秒推送一条数据，
        // 但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
        // 这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
        let type = msg.type
        let data = msg.message
        if (type === 0) {
          if (data === '1') {
            let count = sessionStorage.getItem('show_warn')
            if (count >= 2) {
              this.showRadio('乘务员广播中，请稍后', true)
            } else {
              count++
              sessionStorage.setItem('show_warn', count)
            }
          } else if (data === '2') {
            let count = sessionStorage.getItem('show_warn')
            if (count >= 2) {
              this.showPlay('娱乐系统已暂停使用，请稍后', true)
            } else {
              count++
              sessionStorage.setItem('show_warn', count)
            }
          } else if (data === '0') {
            this.showRadio('乘务员广播中，请稍后', false)
          } else if (data === '3') {
            this.showPlay('娱乐系统已暂停使用，请稍后', false)
          }
        } else {
          this.$store.commit('setCurHeight', data)
        }
      },
      showRadio(msg, show) {
        let alert = this.$dialog(msg, 'my-radio', false)
        this.opAudio(alert, show)
        this.opVideo(alert, show)
      },
      showPlay(msg, show) {
        let alert = this.$dialog(msg, 'my-play', false)
        this.opAudio(alert, show)
        this.opVideo(alert, show)
      },
      opAudio(alert, show) {
        let audio = document.getElementById('music')
        if (show) {
          // debugger
          if (this.$store.state.playFlag) {
            audio.pause()
            this.$store.state.playFlag = false
          }
          alert.show()
        } else {
          if (!this.$store.state.playFlag) {
            this.$store.state.playFlag = true
            audio.play()
          }
          alert.hide()
        }
      },
      opVideo(alert, show) {
        let videos = document.getElementsByTagName('video')
        if (show) {
          this.exitFullscreen()
          for (let i = 0; i < videos.length; i++) {
            if (!videos[i].paused) {
              videos[i].pause()
            }
          }
          alert.show()
        } else {
          alert.hide()
        }
      },
      websocketsend(agentData) { // 数据发送
        this.websock.send(agentData)
      },
      websocketclose(e) { // 关闭
        this.initWebSocket()
        console.log('connection closed (' + e.code + ')')
      }
    }
  }
</script>
<style lang="stylus">
  html, body, #app {
    margin: 0;
    padding: 0;
    height: 100%;
    -webkit-overflow-scrolling: touch
    /*width: 100%;*/

  }

  img {
    max-width: 100%;
  }

  div.cube-dialog-fade-enter-active {
    -webkit-animation: none;
    animation: none
  }

  .cube-sticky-ele {
    padding-top: 5px;
  }

  .my-content {
    text-align: center

  }

  .my-radio {
    text-align: center
    background: url("assets/images/radio_broadcast.png") no-repeat center bottom
    -webkit-background-size: 40px 40px
    background-size: 40px 40px
    padding-top: 80px;
  }

  .cube-dialog-alert, .cube-dialog-confirm {
    z-index: 1111;
  }

  .cube-popup_mask cube-dialog {
    z-index: 1111;
  }

  .my-play {
    text-align: center
    background: url("assets/images/prohibit.png") no-repeat center bottom
    -webkit-background-size: 40px 40px
    background-size: 40px 40px
    padding-top: 80px;
  }

  .music-controls {
    position: fixed;
    background: #fff
    width: 300px;
    display: flex;
    flex-direction row;
    justify-content space-between
  }

  /**.cube-scroll-content{
    padding-bottom: 80px
  }*/
  .cube-tab {
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: #ffffff;
    color: rgb(172, 180, 194);
    font-size: 14px
  }

  .border-bottom-1px {
    overflow-x: scroll
    height 36px;
    white-space nowrap
    /*border-top 1px solid #dee0e2*/
    border-bottom 1px solid #dee0e2
    justify-content: space-between
    flex-basis: 172 rpx
  }

  input {
    -webkit-appearance: none;
  }

  input, button, select, textarea {
    outline: none;
  }

  .cube-tab {
    padding: 0px;
    background: #ffffff;
  }

  .cube-tab_active {
    color: #ffffff
    background: linear-gradient(180deg, #4ca5f6, #027ee8);
    border-top-left-radius 5px
    border-top-right-radius 5px
  }
</style>
