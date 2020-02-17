<template>
  <div>
    <Nav></Nav>
    <div class="tab-wrapper">
      <Videotab :tabs="tabs" :tabs-name="tabsName" :nav_current="nav_current" :initialIndex='initindex'></Videotab>
    </div>
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'
  import Videotab from '../components/tab/Videotab'
  import Actions from '../components/video/Actions'
  import Romances from '../components/video/Romances'
  import Fictions from '../components/video/Fictions'

  export default {
    data() {
      return {
        videoArr: [],
        tabsName: [],
        nav_current: '',
        initindex: 0
      }
    },
    created: function () {
      // sessionStorage.setItem('nav_current', )
      this.initindex = sessionStorage.getItem('nav_current')
      if (!this.initindex) {
        this.initindex = 0
      }
      if (this.$store.state.playFlag) {
        let audio = document.getElementById('music')
        audio.pause()
        this.$store.state.playFlag = false
        this.$createToast({
          type: 'warn',
          time: 2000,
          txt: '欢迎来到视频专区，音乐已关闭'
        }).show()
      }
      let _this = this
      this.axios.get('/api/film/listType').then(
        res => {
          console.log(res)
          if (res.status === 200) {
            // this.videoArr = res.data.data
            // console.log(this.videoArr)
            let tabs = []
            let tabsName = []
            res.data.data.forEach(function (item) {
              if (item.hrefName === '_shot') {
                tabs.push({
                  label: item.modelName,
                  component: Romances,
                  data: {
                    id: item.id
                  }
                })
              } else if (item.hrefName === '_movie') {
                tabs.push({
                  label: item.modelName,
                  component: Actions,
                  data: {
                    id: item.id
                  }
                })
              } else {
                tabs.push({
                  label: item.modelName,
                  component: Fictions,
                  data: {
                    id: item.id
                  }
                })
              }
              tabsName.push(item.modelName)
            })
            _this.tabsName = tabsName
            _this.videoArr = tabs
            _this.nav_current = tabsName[0]
          } else {
            console.log('数据获取失败，请刷新重试')
          }
        },
        function (err) {
          console.log(err)
        }
      )
    },
    computed: {
      tabs: {
        get: function () {
          return this.videoArr
        },
        set: function (value) {
          this.videoArr = value
        }
      }
    },
    components: {Nav, Videotab}
  }
</script>
<style lang="stylus">
  .tab-wrapper
    position fixed
    top 50px
    bottom 0
    left 0
    right 0
    height: 100%
</style>
