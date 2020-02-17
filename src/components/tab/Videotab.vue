<template>
  <div class="Videotab">
    <cube-tab-bar
      :useTransition="false"
      :showSlider="false"
      v-model="selectedLabel"
      :data="tabs"
      ref="tabBar"
      class="border-bottom-1px"
    ></cube-tab-bar>
    <!--<cube-scroll-nav-bar direction="horizontal" :current="nav_current" @change="changeHandle" :labels="tabsName"/>-->
    <div class="slide-wrapper">
      <cube-slide
        :loop="false"
        :auto-play="false"
        :show-dots="false"
        :initial-index="index"
        ref="slide"
        @change="onChange"
        @scroll="onScroll"
        :options="slideOptions"
      >
        <cube-slide-item v-for="(tab, index) in tabs" :key="index">
          <component ref="component" :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>

      </cube-slide>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Videotab',
    props: {
      tabs: {
        type: Array,
        default() {
          return {}
        }
      },
      tabsName: {
        type: Array,
        default() {
          return {}
        }
      },
      initialIndex: {
        type: Number,
        default: 0
      },
      nav_current: {
        type: String,
        default() {
          return ''
        }
      }
    },
    data() {
      return {
        index: this.initialIndex, // 默认是第几个
        init: false,
        slideOptions: {
          listenScroll: true, // 是否监控scroll事件
          probeType: 3, // 0 不派发scroll事件，1：非实时；2：滑动过程中；3：不仅在屏幕滑动的过程中，而且momentum 滚动动画运行过程中实时派发
          dirctionLockThreshold: 0
        }
      }
    },
    created() {
      console.log(this.nav_current) // = this.tabsName[0]
    },
    methods: {
      // 页面切换时触发
      onChange(current) {
        this.index = current
        let video = document.getElementsByTagName('video')
        video && video.length > 0 && video.forEach(function (item) {
          item.pause()
        })
      },
      changeHandle(cur) {
        console.log(cur)
        this.nav_current = cur
      },
      onScroll(pos) {
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        const transform = (-pos.x / slideWidth) * tabBarWidth
        // this.$refs.tabBar.setSliderTransform(transform)
      }
    },
    computed: {
      selectedLabel: {
        get() {
          return this.tabs[this.index].label === 'undefined' ? '' : this.tabs[this.index].label
        },
        set(newVal) {
          // 点击菜单切换  计算当前index是什么，
          if (!this.init) {
            this.$refs.slide.refresh()
            this.init = true
          }
          this.index = this.tabs.findIndex(value => {
            return value.label === newVal
          })
          sessionStorage.setItem('nav_current', this.index)
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  // @import "~common/stylus/variable"
  .Videotab
    padding: 0px;
    display: flex;
    flex-direction: column;
    height: 100%;
    font-size 14px

    .slide-wrapper
      flex: 1;

    /*overflow: hidden*/

    .border-bottom-1px
      overflow-x: scroll
      white-space nowrap
      height 36px;
      /*border-top 1px solid #dee0e2*/
      border-bottom 1px solid #dee0e2
      justify-content: space-between
      flex-basis: 172 rpx

    >>> .cube-tab_active
      color #ffffff
      background: linear-gradient(180deg, #4ca5f6, #027ee8);
    border-top-left-radius 5px
    border-top-right-radius 5px

</style>
