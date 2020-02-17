<template>
  <div class="gametab">
    <cube-tab-bar
      :useTransition="false"
      :showSlider="false"
      v-model="selectedLabel"
      :data="tabs"
      ref="tabBar"
      class="border-bottom-1px"
    ></cube-tab-bar>
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
          <component ref="component" :is="tab.component" :data="tab.data.seller"></component>
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
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      init: false,
      index: this.initialIndex, // 默认是第几个
      slideOptions: {
        listenScroll: true, // 是否监控scroll事件
        probeType: 3, // 0 不派发scroll事件，1：非实时；2：滑动过程中；3：不仅在屏幕滑动的过程中，而且momentum 滚动动画运行过程中实时派发
        dirctionLockThreshold: 0
      }
    }
  },
  methods: {
    // 页面切换时触发
    onChange(current) {
      // 切到某个tab下，再去请求数据
      console.log(current)
      this.index = current
      const component = this.$refs.component[current]
      component.fetch && component.fetch()
    },
    onScroll(pos) {
      // console.log(pos.x)
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      const transform = (-pos.x / slideWidth) * tabBarWidth
      this.$refs.tabBar.setSliderTransform(transform)
    }
  },
  computed: {
    selectedLabel: {
      get() {
        return this.tabs[this.index].label
      },
      set(newVal) {
        // 点击菜单切换  计算当前index是什么，
        this.index = this.tabs.findIndex(value => {
          return value.label === newVal
        })

        if (!this.init) {
          this.$refs.slide.refresh()
          this.init = true
        }
        // this.index = current
        const component = this.$refs.component[this.index]
        component.fetch && component.fetch()
        sessionStorage.setItem('gameInitIndex', this.index)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  // @import "~common/stylus/variable"
.tab-wrapper
  top: 40px ;
.gametab
  display: flex;
  flex-direction: column;
  height: 100%;
  .slide-wrapper
    flex: 1;
    overflow: hidden;
  .border-bottom-1px
    overflow-x : scroll
    white-space nowrap
    height 36px;
    justify-content: space-between
    flex-basis: 172rpx
    >>>.cube-tab
      padding-left: 15px;
      padding-right:15px;
</style>
