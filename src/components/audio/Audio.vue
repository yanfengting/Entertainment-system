<template>
  <div class="music-controls" style="display: none;">
    <!-- <div class="prev">
       上一首
     </div>
     <div class="pause" v-on:click="playPause()">
       {{this.$store.state.playFlag ? '暂停' : '播放'}}
     </div>
     <div class="next">
       下一首
     </div>-->
    <audio :src="music" ref="player" controls="controls" preload id="music" hidden>
      您的浏览器不支持 audio 标签。
    </audio>
  </div>
</template>
<script>
  export default {
    name: 'Caudio',
    props: {
      'music': String
      // 'playFlay': Boolean
    },
    data() {
      return {
        'playFlag': false
      }
    },
    mounted() {
      this.addEventListeners()
    },
    methods: {
      addEventListeners: function () {
        const self = this
        self.$refs.player.addEventListener('timeupdate', self._currentTime)
        self.$refs.player.addEventListener('canplay', self._durationTime)
        self.$refs.player.addEventListener('ended', self._endmusic)
      },
      removeEventListeners: function () {
        const self = this
        self.$refs.player.removeEventListener('timeupdate', self._currentTime)
        self.$refs.player.removeEventListener('canplay', self._durationTime)
      },
      _currentTime: function () {
        const self = this
        self.timeNow = parseInt(self.$refs.player.currentTime)
        this.$store.state.timeNowInt = self.timeNow
        this.$store.state.timeNow = this._formatTime(self.timeNow)
        this._bfb()
        if (self.timeNow >= this.$store.state.timeDurationInt) {
          if (this.$store.state.timeDurationInt) {
            this.$store.commit('endMusic')
          } else {
            // alert('音乐播放失败')
          }
        }
      }, // 结束
      _endmusic: function () {
        this.$store.commit('endMusic')
      },
      _durationTime: function () {
        const self = this
        self.timeDuration = (this.$store.state.duration)
        this.$store.state.timeDurationInt = self.timeDuration
        this.$store.state.timeDuration = this._formatTime(self.timeDuration)
      },
      _bfb: function () {
        let bfb = this.$store.state.timeNowInt / this.$store.state.timeDurationInt
        this.$store.state.intDfb = bfb * 100 + '%'
        // console.log(this.$store.state.intDfb)
      },
      _formatTime: function (s) {
        return this._addzero(Math.floor(s / 60)) + ':' + this._addzero(s % 60)
      },
      _addzero: function (e) {
        if (e < 10) {
          return '0' + e
        } else {
          return e
        }
      },
      playPause: function () {
        this.$store.commit('playMusic', this.$store.state.playMusic)
      }
    }
  }
</script>

<style scoped>

</style>
