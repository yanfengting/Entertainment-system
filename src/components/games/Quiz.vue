<template>
  <div id="videoAction">
    <cube-scroll ref="scroll" :scrollEvents="['scroll']"
                 :data="data"
                 @scroll="onScroll">
      <div style="padding-bottom: 100px;position: relative;display: flex">
        <ul style="clear: both;display: block;padding-bottom: 100px;width:100%">
          <li v-for="item in data"
              :key="item.name"
              :label="item.name"
              @click="gamedetail(item)">
            <div class="game-content">
              <div class="quiz-height"
                   :style="{'background': 'url('+item.poster+') no-repeat', 'background-size': '100% 100%', 'background-position': 'center center' }"></div>
            </div>
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
    </cube-scroll>
  </div>
</template>
<script>
  // import goodsData from '../../data/goods-list.json'
  // const goods = goodsData.goods
  export default {
    props: {
      data: {
        type: Array,
        default() {
          return {}
        }
      }
    },
    data() {
      return {}
    },
    mounted() {
    },
    created() {
      let _this = this
      setTimeout(function () {
        _this.$refs.scroll.refresh()
      }, 2000)
    },
    methods: {
      onScroll(pos) {
        console.log(pos)
      },
      gamedetail(items) {
        this.$router.push({ path: './gamesDetail', query: { 'id': items.id } })
      }
    }
  }
</script>
<style type="text/css">
  /* .cube-scroll-content {
    padding-bottom: 50px;
  } */

  div.quiz-height {
    height: 140px;
    background-size: 100% auto
  }

  @media screen and (min-width: 500px) {
    div.quiz-height {
      height: 260px;
    }
  }

  div.game-content {
    height: 143px;
    padding: 7px 8px 8px 5px;
    background-size: 100% auto
  }

  @media screen and (min-width: 500px) {
    div.game-content {
      height: 263px;
    }
  }
</style>
<style lang="stylus" scoped>
  #videoAction
    position relative
    text-align left
    // margin: 15px 10px 15px 10px;
    height 500px // 这个高度范围里面滚动，问题设置太大会有一些显示不出来

    .game-content
      background: url("../../assets/images/game_bak.png") no-repeat
      -webkit-background-size: 100% 100%
      background-size: 100% 100%
      background-position: center center

    .scroll-nav-wrapper
      position absolute
      width 100%
      top 0
      left 0
      bottom 0

    /*
        .quiz-height
          width: 100%;
          height: 100px;
    */

    ul
      overflow hidden
      font-size 14px
      line-height 1.4
      color #666
      margin 6px

    li
      float left
      width 33.33333333%
      margin 0

      p
        overflow hidden
        text-align center
        white-space nowrap
        text-overflow ellipsis
</style>
