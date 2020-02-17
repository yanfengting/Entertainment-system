<template>
  <div class="swipe-wrapper curcontent">
    <cube-scroll ref="scroll" :scrollEvents="['scroll','scrollEnd']"
                 @scrollEnd = 'endScroll()'
                 @pulling-up="onPullingUp"
                 :data="swipeData"
                 :options = "options"
                 @scroll="onScroll">
      <cube-swipe>
        <div class="bscroll-content">
          <ul class="list-unstyled vod-item-img ff-img-140">
            <li class="col-xs-4" v-for="(item) in swipeData" @click="toDetail(item.src)">
              <p class="image">
                <a>
                  <img class="img-responsive img-thumbnail ff-img"
                       data-original="/Uploads/vod/2019-04-07/5ca9580f1a6a0.jpg"
                       :alt="item.name"
                       :src="item.urlPoster"
                       style="display: inline-block;">
                </a>
              </p>
              <h2 class="text-nowrap ff-text-right">
                <a href="javascript:;" :title="item.name"
                   style="display: block;width: 100%; overflow:hidden;text-overflow:ellipsis; white-space:nowrap;">{{item.name}}</a>
              </h2>
            </li>
          </ul>
        </div>
      </cube-swipe>
    </cube-scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  //   import CubePage from '../../components/cube-page.vue'
  // import { customData } from '../../data/swipe'

  export default {
    props: {
      contentdata: {
        type: Number,
        default() {
          return ''
        }
      }
    },
    data() {
      return {
        swipeData: [],
        options: {
          pullUpLoad: true
        }
      }
    },
    mounted() {
      let _this = this
      // api/ebook/list
      this.axios.get('/api/ebook/list?typeId=' + this.contentdata).then(
        res => {
          if (res.status === 200) {
            this.swipeData = res.data.data
            setTimeout(function () {
              _this.$refs.scroll.refresh()
            }, 1000)
          } else {
            console.log('数据获取失败，请刷新重试')
          }
        },
        function (err) {
          console.log(err)
        }
      )
    },
    methods: {
      onPullingUp() {
        const toast = this.$createToast({
          time: 1000,
          txt: '我是有底线的哦'
        })
        toast.show()
        // 如果没有新数据
        this.$refs.scroll.forceUpdate()
      },
      endScroll() {
       /* const toast = this.$createToast({
          time: 1000,
          txt: '没有更多数据了...'
        })
        toast.show()*/
      },
      onScroll(pos) {
      },
      onItemClick(item) {
      },
      toDetail(src) {
        window.open(src, '_blank')
      },
      onBtnClick(btn, index) {
        if (btn.action === 'delete') {
          this.$createActionSheet({
            title: '确认要删除吗',
            active: 0,
            data: [
              {content: '删除'}
            ],
            onSelect: () => {
              this.swipeData.splice(index, 1)
            }
          }).show()
        } else {
          this.$refs.swipeItem[index].shrink()
        }
      }
    },
    components: {}
  }
</script>

<style lang="stylus" scoped>
  .swipe-wrapper
    height 100%

  .curcontent img
    width: 100%
    height 100%

  .ratings
    height 100%
    position relative
    text-align left
    white-space normal

  .cube-swipe
    height: 100%;

  .curcontent
    height 100%

    >>> .bscroll-content
      height: 100%
      display: flex

    .cube-scroll-content
      height: 80%
      overflow hidden

  /* transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  transition-duration: 0ms;
  transform: translate(0px, 0px) scale(1) translateZ(0px); */
  .vod-item-img
    position relative
    margin 5px

  .list-unstyled
    padding-left 0
    clear: both
    height 100%
    list-style none

  .vod-item-img li
    padding 1px
    margin 4px
    box-shadow 1px 2px 1px #eef0f3;
    -webkit-border-radius: 7px;
    -moz-border-radius: 7px;
    border-radius: 7px;

  .col-xs-4
    width 30%
    float left

  .vod-item-img li .image
    position relative
    overflow hidden

  .ff-img, .img-thumbnail
    border-radius 5px

  .vod-item-img li p
    margin 0
    padding 0

  .vod-item-img h2
    margin 0
    font-size 15px
    line-height 20px
    overflow hidden

  .text-nowrap
    white-space nowrap

  .vod-item-img li .image .continu
    position absolute
    bottom 5px
    right 8px
    color orange
    z-index 2
    font-size 0.8em

  .ff-img-140 h2 a
    color #dd0d0b

  .ff-text-right
    color #000

  .ff-img-140 h2 a
    color #000

  .ff-text-right a
    text-align center
    font-size: 13px
    font-weight: 200
    color #000

  a
    color #000
    text-decoration none
</style>
