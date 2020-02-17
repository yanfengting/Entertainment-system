<template>
  <div class="swipe-wrapper curcontent">
    <cube-scroll ref="scroll"
                 :options="options"
                 @pulling-up="onPullingUp"
                 @scrollEnd='endScroll()'>
      <cube-swipe>
        <div class="bscroll-content">
          <ul class="list-unstyled vod-item-img ff-img-140">
            <li class="col-xs-4" v-for="(item) in swipeData" @click="toDetail(item)">
              <div class="image magazineimg">
                <div class="action-bak-height"
                     :style="{'width': '88%', 'background': 'url('+item.urlPoster+') no-repeat', 'background-size': '100% 100%', 'background-position': 'center center' }">
                </div>
              </div>
              <h2 class="text-nowrap ff-text-right">
                <a :title="item.name">{{item.name}}</a>
              </h2>
            </li>
          </ul>
        </div>
      </cube-swipe>
      <div class="bottom-desp" v-show="bottomshow">
        <hr>
        <span>我是有底线的哦</span>
        <hr>
      </div>
    </cube-scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  // import {customData} from '../../data/swipe'

  export default {
    data() {
      return {
        swipeData: [],
        options: {
          pullUpLoad: true
        },
        bottomshow: false
      }
    },
    mounted() {
      let _this = this
      this.axios.get('/api/periodical/list').then(function (res) {
        if (res.data.status === 200) {
          let data = res.data.data
          _this.swipeData = data
          setTimeout(function () {
            _this.$refs.scroll.refresh()
            _this.bottomshow = true
          }, 2000)
        }
      })
      // console.log(customData)
    },
    methods: {
      onPullingUp() {
        // 如果没有新数据
        this.$refs.scroll.forceUpdate()
      },
      endScroll() {
      },
      onItemClick(item) {
        console.log('click item:', item)
      },
      toDetail(item) {
        this.$router.push({path: '/magDetail', query: {'id': item.id}})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .bottom-desp
    height: 80px
    line-height 80px;
    font-size: 12px;
    text-align center
    display: flex
    flex-direction row
    justify-content center
    align-items: center
    color: #c3c3c3

    >>> hr
      width: 50px;
      margin: 0 10px;
      height 1px;

  .action-bak-height {
    height: 130px;
    -webkit-border-radius: 3px
    -moz-border-radius: 3px
    border-radius: 3px
    background-size: 100% auto
  }

  @media screen and (min-width: 500px) {
    .action-bak-height {
      height: 250px;
    }
  }

  .magazineimg {
    height: 135px;
    background-size: 100% auto
  }

  @media screen and (min-width: 500px) {
    .magazineimg {
      height: 255px;
    }
  }

  .swipe-wrapper
    height 100%

  .ratings
    height 100%
    position relative
    text-align left
    white-space normal

  .cube-scroll-content
    /*padding-bottom: 50px;*/

  /* transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  transition-duration: 0ms;
  transform: translate(0px, 0px) scale(1) translateZ(0px); */
  .vod-item-img
    position relative
    margin 5px

  .list-unstyled
    padding-left 0
    list-style none
    padding-top: 20px

  .vod-item-img li
    padding 1px 0px 1px 10px;
    margin: 6px 0px;

  /*box-shadow 1px 2px 1px #eef0f3;*/

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
    margin-left 0px
    font-size: 12px
    font-weight: bold
    color #000

  .magazineimg
    background-image: url(../../assets/images/magazine_icon.png);
    background-repeat no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    background-position: center center

  a
    color #000
    text-decoration none
</style>
