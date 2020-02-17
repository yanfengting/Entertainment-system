<template>
  <div class="swipe-wrapper">
    <cube-scroll ref="scroll" :options="options" @pulling-up="onPullingUp"
                 @scrollEnd='endScroll()'>
      <cube-swipe>
        <transition-group name="swipe"
                          tag="ul">
          <li class="swipe-item-wrapper"
              v-for="(data,index) in newsArr"
              :key="data.id">
            <!--<cube-swipe-item ref="swipeItem"
                             :btns="data.btns"
                             :index="index"
                             @btn-click="onBtnClick">-->
            <div @click="onItemClick(data, index)"
                 class="item-inner">
              <div class="text">
                <h2 class="item-name"
                    v-html="data.title"></h2>
                <p class="item-desc">{{data.releaseTime}}</p>
              </div>
              <div class="icon">
                <img style="-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;"
                     :src="data.urlImg">
              </div>
            </div>
            <!--</cube-swipe-item>-->
          </li>
        </transition-group>
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
  //   import CubePage from '../../components/cube-page.vue'
  // import { customData } from '../../data/swipe'
  export default {
    props: {
      contentdata: {
        type: Array,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        newsArr: [],
        options: {
          pullUpLoad: true
        },
        bottomshow: false
      }
    },
    created() {
      let _this = this
      this.axios.get('/api/news/list').then(
        res => {
          console.log(res)
          if (res.status === 200) {
            this.newsArr = res.data.data
            setTimeout(function () {
              _this.bottomshow = true
            })
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
        this.$refs.scroll.forceUpdate()
      },
      endScroll() {
      },
      onItemClick(item) {
        sessionStorage.setItem('newDetail', JSON.stringify(item))
        this.$router.push('/newDetail')
      },
      onBtnClick(btn, index) {
        if (btn.action === 'delete') {
          this.$createActionSheet({
            title: '确认要删除吗',
            active: 0,
            data: [{content: '删除'}],
            onSelect: () => {
              this.swipeData.splice(index, 1)
            }
          }).show()
        } else {
          this.$refs.swipeItem[index].shrink()
        }
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

  .swipe-wrapper
    height 100%

    .swipe-item-wrapper
      overflow hidden
      &:first-child
        .item-inner::before
          border-bottom: none

      &.swipe-enter-active, &.swipe-leave-active
        transition all 0.3s

        .item-inner
          transition all 0.3s

      &.swipe-enter, &.swipe-leave-to
        .item-inner
          height 0

      .item-inner
        display flex
        box-sizing border-box
        align-items center
        position: relative
        padding 20px 20px
        padding-bottom: 0px;
        min-height 80px

        &:before
          position: absolute
          top: 10px;
          height: 1.5px;
          width: 88%
          content: ''
          border-bottom: solid 1.5px #f7f9fc

        .icon
          flex 0 0 100px
          width 100px
          height: 80px;
          padding-left 15px
          -webkit-border-radius: 3px
          -moz-border-radius: 3px
          border-radius: 3px
          img
            width: 100%
            height: 100%
            object-fit cover

        .text
          display flex
          flex-direction column
          justify-content center
          flex 1
          line-height 20px
          overflow hidden
          font-size 16px

          .item-name
            margin-bottom 10px
            color #333
            word-break: break-all;
            white-space: normal;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow hidden

          .item-desc
            color #666
            font-size 12px
</style>
