<template>
  <div id="scroll-act"
       class="swipe-wrapper">
    <!-- 宣传片 -->
    <cube-scroll ref="fictionScroll"
                 :data="swipeData"
                 :options="options"
                 @scrollEnd="endScroll()"
                 @pulling-up="onPullingUp"
                 @scroll="onScroll">
      <div style="position: relative;display: flex">
        <ul class="list-unstyled vod-item-img ff-img-140">
          <li class="col-xs-4" v-for="(item) in swipeData" @click="moviedetail(item.id)">
            <div class="image fictions-bak">
              <div class="action-bak-height"
                   :style="{ 'background-image': 'url('+item.urlCover+')' , 'background-repeat': 'no-repeat',  'background-size': '100% auto', 'background-position': 'center center' }">
                <!-- <img class="img-responsive img-thumbnail ff-img"
                      data-original="/Uploads/vod/2019-04-07/5ca9580f1a6a0.jpg"
                      :alt="item.title"
                      width="100%"
                      :src="item.urlPoster"
                      style="display: inline-block;">-->
              </div>
              <h2 class="text-nowrap ff-text-right">
                <a :title="item.title"
                   style="display: block;width: 100%; overflow:hidden;text-overflow:ellipsis; white-space:nowrap;">{{item.title}}</a>
              </h2>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom-desp" v-show="bottomshow">
        <hr>
        <span>我是有底线的哦</span>
        <hr>
      </div>
    </cube-scroll>
  </div>
</template>
<script>
  // import BScroll from 'better-scroll'
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
        swipeData: [],
        ratings: [],
        options: {
          pullUpLoad: true
        },
        bottomshow: false,
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        }
      }
    },
    created() {
      let id = this.data.id
      let _this = this
      this.axios.get('/api/advertise/list?typeId=' + id).then(
        res => {
          if (res.data.status === 200) {
            _this.swipeData = res.data.data
            setTimeout(function () {
              _this.$refs.fictionScroll.refresh()
              // console.log('fictions refresh')
            }, 2000)
          }
        })
    },
    mounted() {
    },
    methods: {
      onPullingUp() {
        this.bottomshow = true
        // 如果没有新数据
        this.$refs.fictionScroll.forceUpdate()
      },
      endScroll() {
        /*
        const toast = this.$createToast({
          time: 1000,
          txt: '没有更多数据了...'
        })
        toast.show()
        */
      },
      onScroll(pos) {
        // console.log(pos)
      },
      moviedetail(id) {
        this.$router.push({path: '/videoDetail', query: {'id': id}})
      }
    }
  }
</script>
<style type="text/css">
  .cube-scroll-content {
    /*padding-bottom: 50px;*/
  }
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
</style>
<style lang="stylus" scoped>
  .action-bak-height {
    height: 150px;
    background-size: 100% auto
  }

  @media screen and (min-width: 500px) {
    .action-bak-height {
      height: 280px;
    }
  }

  .swipe-wrapper
    height 100%
    background: rgba(247,249,252,1)

  .ratings
    height 100%
    position relative
    text-align left
    white-space normal

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
    border-radius 7px;
    box-shadow 4px 2px 4px #eef0f3;
  /*box-shadow 1px 2px 1px #eef0f3;*/

  .col-xs-4
    width 30%
    float left

  .vod-item-img li .image
    position relative
    overflow hidden

  .ff-img, .img-thumbnail
    border-radius 5px

  .ff-img-140 img
    width: 100%
    height: 100%

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
    font-size: 12px
    font-weight: 200
    padding: 2px;
    color #000

  .scroll-act
    background-color: rgba(247, 249, 252, 1);

  .fictions-bak
    background: #ffffff
    border-radius: 3px
    box-shadow: 1px 0.588vw 1px 1px #eef0f3;

    >>> .action-bak-height
          margin: 4px;
          margin-top: 0px;
          margin-bottom: 0px;
          border-radius: 3px

  a
    color #000
    text-decoration none
</style>
