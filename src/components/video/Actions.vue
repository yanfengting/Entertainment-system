<template>
  <!-- 影视 -->

  <div id="scroll-act"
       class="swipe-wrapper">
    <cube-scroll ref="actionScroll" :scrollEvents="['scroll','scrollEnd']"
                 :data="swipeData"
                 @pulling-up="onPullingUp"
                 :options="options"
                 @scrollEnd="endScroll()"
                 @scroll="onScroll">
      <!--<cube-swipe>-->
      <div style="position: relative;display: flex">
        <ul class="list-unstyled vod-item-img ff-img-140" style="display: block;clear: both;height: 100% ;">
          <li class="col-xs-4" v-for="(item,index) in swipeData"
              v-bind:key="index"
              @click="moviedetail(item.id)">
            <div class="image fictions-bak">
              <div class="action-bak-height"
                   :style="{ 'background-image': 'url('+item.urlPoster+')' , 'background-repeat': 'no-repeat',  'background-size': '100% auto', 'background-position': 'center center' }">
              </div>
            </div>

            <h2 class="text-nowrap ff-text-right">
              <a :title="item.title"
                 style="display: block;width: 100%; overflow:hidden;text-overflow:ellipsis; white-space:nowrap;">{{item.title}}</a>
            </h2>
            <div class="score-content">
              <!--<cube-rate v-model="item.score"></cube-rate>-->
              <video-rate :score="item.score"></video-rate>
              <span class="score">{{item.score}}</span>
            </div>
          </li>
        </ul>

      </div>
      <div class="bottom-desp" v-show="bottomshow">
        <hr>
        <span>我是有底线的哦</span>
        <hr>
      </div>
      <!--</cube-swipe>-->
      <!-- <cube-swipe @item-click="onItemClick"
                  @btn-click="onBtnClick"
                  :data="swipeData">
      </cube-swipe> -->
    </cube-scroll>
  </div>

</template>

<script type="text/ecmascript-6">
  // import CubePage from '../demo/cube-page.vue'
  import VideoRate from '../common/VideoRate.vue'

  export default {
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        options: {
          pullUpLoad: true
        },
        bottomshow: false,
        swipeData: [
          {
            item: {
              text: '测试1',
              value: 1
            }
          }
        ]
      }
    },
    mounted() {

    },
    created() {
      let id = this.data.id
      let _this = this
      this.axios.get('/api/movie/list?typeId=' + id).then(
        res => {
          if (res.data.status === 200) {
            _this.swipeData = res.data.data
            setTimeout(function () {
              _this.$refs.actionScroll.refresh()
              _this.bottomshow = true
            }, 2000)
          }
        })
    },
    methods: {
      onPullingUp() {
        // 如果没有新数据
        this.$refs.actionScroll.forceUpdate()
      },
      endScroll() {
      },
      onScroll(pos) {
      },
      onItemClick(item) {
        console.log('click item:', item)
      },
      moviedetail(id) {
        this.$router.push({path: '/movieDetail', query: {'id': id}})
      },
      onBtnClick(btn, index) {

      }
    },
    components: {VideoRate}
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
    height: 150px;
    background-size: 100% auto
  }

  .score {
    font-size: 12px;
    color: #94A8BF;
  }

  @media screen and (min-width: 500px) {
    .action-bak-height {
      height: 280px;
    }
  }

  #scroll-act .cube-rate {
    max-width: 70%;
  }

  .score-content {
    display: flex;
    flex-direction row
    align-items: center
    justify-content: space-around
  }

  .score-content .cube-rate .cube-rate-item {
    margin-right: 3px;
  }

  .swipe-wrapper
    height 100%
    background: rgba(247,249,252,1)

  .scroll-act
    background #f7f9fc

  .cube-scroll-list-wrapper
    height: 100%
    padding-bottom 200px;

  // border 1px solid red
  .vod-item-img
    position relative
    margin 5px

  .list-unstyled
    padding-left 0
    list-style none

  .vod-item-img li
    padding 1px
    padding-left: 2px;
    margin 4px
    background:#ffffff
    box-shadow 4px 2px 4px #eef0f3;
    -webkit-border-radius: 7px
    -moz-border-radius: 7px
    border-radius: 7px

  .col-xs-4
    width 30%
    float left

  .vod-item-img li .image
    position relative
    overflow hidden

  .ff-img
    width 100%;
    height 100%

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

  .ff-text-right a
    font-size: 12px
    font-weight: 200
    padding: 2px;
    color #000

  .ff-img-140 h2 a
    color: #000

  .ff-img-140 img
    width: 100%
    height: 100%;

  a
    color #000
    text-decoration none
</style>
