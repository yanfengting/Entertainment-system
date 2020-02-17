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
    <div class="slide-wrapper">
      <cube-slide
        :loop="false"
        :auto-play="false"
        :show-dots="false"
        :initial-index="initialIndex"
        ref="slide"
        @change="onChange"
        @scroll="onScroll"
        :options="slideOptions"
      >
        <cube-slide-item v-for="(tab, index) in tabs" :key="index">
          <component ref="component" :is="tab.component" :contentdata="tab.data.seller"></component>
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
    data() {
      return {
        index: 0, // 默认是第几个
        init: false,
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
        this.initialIndex = current
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
          return this.tabs[this.initialIndex].label === 'undefined' ? '' : this.tabs[this.initialIndex].label
        },
        set(newVal) {
          // 点击菜单切换  计算当前index是什么，
          if (!this.init) {
            this.$refs.slide.refresh()
            this.init = true
          }
          // 点击菜单切换  计算当前index是什么，
          this.initialIndex = this.tabs.findIndex(value => {
            return value.label === newVal
          })
          sessionStorage.setItem('readInitIndex', this.initialIndex)
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  // @import "~common/stylus/variable"
  .cube-scroll-content
    /*padding-bottom: 200px*/

    .Videotab
      >>> .cube-tab
        padding: 0px;
      flex-direction: column;
      height: 100%;

      .slide-wrapper
        flex: 1;
        overflow: hidden;
</style>
