<template>
  <div style="z-index: 99">
    <upgrade-alert :seat=this.userInfo.seat :upgrade_sku="upgrade_sku"></upgrade-alert>
    <demand-alert :seat="this.userInfo.seat" :demand_sku="demand_sku"></demand-alert>
    <food-alert :seat="this.userInfo.seat" :food_sku="food_sku"></food-alert>

    <transition name="fade">
      <!-- 这部分功能主要是关闭侧栏菜单，类似一层遮罩的效果 -->
      <div class="menu-mask"
           style="z-index:99;"
           v-show="isRellyShow"
           @click="hideSide"
           @touchmove.prevent></div>
    </transition>

    <transition name="slide-fade">
      <!-- 这里才是侧栏代码部分 -->
      <div class="side-content" style="z-index: 100"
           v-show="isRellyShow">
        <div class="list" @click="main">
          <div class="title">首页</div>
        </div>
        <div :class="['list',service]">
          <div class="title" @click="service = service === 'show'?'':'show'">
            <div style="width: 90%">客舱服务</div>
            <div class="image"><img src="../../assets/images/xiajiantou.png" style="height: 8px; width: 16px;"/></div>
          </div>
          <ul class="item">
            <li @click="upgrade"> 机上升舱</li>

            <li @click="demand">呼唤铃</li>
            <li @click="food">机上餐食</li>
            <li @click="itinerary">我的行程</li>
            <li @click="safety">安全须知</li>
          </ul>
        </div>
        <div :class="['list', huaxia]">
          <div class="title" @click="huaxia = huaxia === 'show'?'':'show'">
            <div style="width: 90%">精彩集锦</div>
            <div class="image"><img src="../../assets/images/xiajiantou.png" style="height: 8px; width: 16px;"/></div>
          </div>
          <ul class="item">
            <li @click="gift">空中商城</li>
            <li @click="airline">航线特惠</li>
            <li @click="through">企业文化</li>
            <li @click="brand">品牌介绍</li>
          </ul>
        </div>
        <div :class="['list', yule]">
          <div class="title" @click="yule = yule === 'show'?'':'show'">
            <div style="width: 90%">娱乐</div>
            <div class="image"><img src="../../assets/images/xiajiantou.png" style="height: 8px; width: 16px;"/></div>
          </div>
          <ul class="item">
            <li @click="Games">游戏</li>
            <li @click="Read">阅读</li>
            <li @click="video">视频</li>
            <li @click="Music">音乐</li>
          </ul>
        </div>
        <div class="list">
          <div class="title" @click="recommend">目的地推荐</div>
        </div>
        <div class="list">
          <div class="title" @click="accountCenter">个人中心
            <img v-if="orderNum>0" class="logo-right" style="width: 8px; height: 8px;"
                 src="../../assets/images/hongdian.png">
          </div>
        </div>
        <div class="list" style="border-bottom: none;">
          <div class="title" @click="opinion"> 意见反馈</div>
        </div>
        <div class="list" style="display: none;">
          <div class="item">
            <ul>
              <li class="item-top item-bottom slide-music">
                <img @click="prevMusic" class="icon-img" src="../../assets/images/prev.png" alt="">
                <img @click="playPause" class="icon-img" v-if="this.$store.state.playFlag"
                     src="../../assets/images/pause.png" alt="">
                <img @click="playPause" class="icon-img" v-else src="../../assets/images/start.png" alt="">
                <img @click="nextMusic" class="icon-img" src="../../assets/images/next.png" alt="">
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>

    <!--<li>{{this.$store.state.playFlag}}</li>
    <li :class="[{active: this.$store.state.playFlag}]">
      音乐播放器
    </li>-->

  </div>
</template>
<script>
  import UpgradeAlert from '../main/UpgradeAlert'
  import DemandAlert from '../main/DemandAlert'
  import FoodAlert from '../main/FoodAlert'

  export default {
    components: { DemandAlert, UpgradeAlert, FoodAlert },
    data() {
      return {
        food_sku: false,
        demand_sku: false,
        upgrade_sku: false,
        orderNum: 0,
        yule: '',
        service: '',
        huaxia: ''
      }
    },
    created: function () {
      var userInfo = localStorage.getItem('userInfo')
      this.userInfo = JSON.parse(userInfo) // 转为JSON
      this.axios({
        method: 'post',
        url: '/api/order/unfinished'
      }).then((res) => {
        // console.log(res)
        if (res.status === 200) {
          this.orderNum = res.data.data
          // this.giftArr = res.data.data
        } else {
          console.log('数据获取失败，请刷新重试')
        }
      })
    },
    methods: {
      hideSide: function () {
        this.$store.dispatch('hideSideBar')
      },
      playPause: function () {
        this.$store.commit('playMusic', this.$store.state.playMusic)
      },
      nextMusic: function () {
        this.$store.commit('nextMusic')
      },
      prevMusic: function () {
        this.$store.commit('prevMusic')
      },
      // 点击蒙层取消
      cancelMask: function () {
        this.upgrade_sku = false
        this.demand_sku = false
      },
      accountCenter: function () {
        this.$router.push('/account_center')
        this.hideSide()
      },
      main() {
        this.$router.push('/main')
        this.hideSide()
      },
      food() {
        this.axios({
          method: 'get',
          url: 'api/food/chickUsable'
        }).then((res) => {
          if (res.data.status === 200) {
            if (!res.data.data) {
              this.$dialog('该功能已关闭，暂时无法使用', 'my-eable')
            } else {
              this.food_sku = true
              this.hideSide()
            }
          }
        })
        // this.showwait()
        // return
        // this.$parent.getRouterInfo({
        //   food_sku: true,
        //   demand_sku: false,
        //   upgrade_sku: false
        // })
        // this.hideSide()
      },
      upgrade() {
        this.axios({
          method: 'get',
          url: 'api/upgrade/chickUsable'
        }).then((res) => {
          if (res.data.status === 200) {
            if (!res.data.data) {
              this.$dialog('该功能已关闭，暂时无法使用', 'my-eable')
            } else {
              this.upgrade_sku = true
              this.hideSide()
            }
          }
        })
      },
      demand() {
        this.axios({
          method: 'get',
          url: 'api/callbell/chickUsable'
        }).then((res) => {
          if (res.data.status === 200) {
            if (!res.data.data) {
              this.$dialog('该功能已关闭，暂时无法使用', 'my-eable')
            } else {
              this.demand_sku = true
              this.hideSide()
            }
          }
        })
      },
      itinerary() {
        // this.$router.push('/itinerary')
        this.$router.push('/flight_info')
        this.hideSide()
      },
      safety() {
        this.$router.push('/safety')
        this.hideSide()
      },
      video() {
        sessionStorage.removeItem('nav_current')
        this.$router.push('/video')
        this.hideSide()
      },
      Music() {
        // this.showwait()
        this.hideSide()
        // return
        this.$router.push('/music')
      },
      Games() {
        // this.showwait()
        this.hideSide()
        // return
        this.$router.push('/games')
      },
      Read() {
        this.$router.push('/read')
        this.hideSide()
      },
      brand() {
        this.$router.push('/brand')
        this.hideSide()
      },
      airline() {
        this.$router.push('/airline')
        this.hideSide()
      },
      through() {
        this.$router.push('/through')
        this.hideSide()
      },
      gift() {
        // this.showwait()
        this.hideSide()
        // return
        this.$router.push('/gift')
      },
      recommend() {
        // this.showwait()
        this.hideSide()
        // return
        this.$router.push('/recommend')
      },
      opinion() {
        this.$router.push('/opinion')
        this.hideSide()
      },
      showwait() {
        let alert = this.$dialog('该功能正在开发', 'my-wait')
        alert.show()
      }
      // toggle: function (index, list) {
      //   // eslint-disable-next-line no-return-assign
      //   this.lists.forEach((list, i) => list.show = i === index)
      //   // console.log(index)
      // },
      // doThis: function (index) {
      //   console.log(index)
      // }
    },
    computed: {
      isRellyShow() {
        return this.$store.getters.isShowMethod
      }
    }
  }
</script>
<style type="text/css">
  .side-content .show .item {
    display: none;
  }

  .side-content .show .image {
    transform: rotate(270deg);
  }
</style>
<style lang="stylus">
  .menu-mask
    z-index 7
    width 100%
    height 100%
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    opacity 1
    background rgba(8, 22, 61, 0.6)

  .side-content
    font-size 18px
    overflow auto
    z-index 10
    padding 5px 10px 10px 20px
    position fixed
    width 55%
    height 98.6%
    /**background rgb(0, 50, 116)**/
    background: #ffffff
    top 0
    right 0
    bottom 0
    border-top-left-radius 5px;
    border-bottom-left-radius 5px;

  /* -webkit-overflow-scrolling: touch; */
  .fade-enter-to, .fade-leave
    transition opacity 0.3s

  .fade-enter, .fade-leave-to
    opacity 0

  .slide-fade-enter-to, .slide-fade-leave
    transition transform 0.3s
    transform translate(0px, 0px)

  .slide-fade-enter, .slide-fade-leave-to
    opacity 0
    -webkit-transform translate(286px, 0px)
    transform translate(286px, 0px)
    -webkit-transition opacity 0.3s ease-in-out 0.3s, -webkit-transform 0.3s ease-in-out
    transition opacity 0.3s ease-in-out 0.3s, transform 0.3s ease-in-out

  /* 菜单内部 */
  *
    margin 0
    padding 0

  .slide-music
    display: flex;
    flex-direction row
    justify-content space-between
    padding: 10px 0px;

  .icon-img
    width: 20px;
    height: 20px;

  .list ul
    list-style none

  .list li
    padding-left 10px
    line-height 2

  .list li:hover
    background-color #E6F0FA

  .list
    padding 0
    /*margin-bottom 10px*/
    /**background-color rgb(0, 50, 116)**/
    background-color #FFFFFF
    border-bottom 1px #E7E8EB solid

  .list .title
    display flex
    /* border: 1px solid #ccc; */
    padding 10px 10px 0px 10px
    cursor pointer
    -webkit-user-select none
    user-select none
    font-size 16px
    font-weight: 400 /*font-weight bold*/
    color #007CEB
    /**background-color rgb(0, 62, 142)**/
    background-color #FFFFFF
    text-align left

  .title .image
    width 10%

  .list .item
    /* border: 1px solid #ccc; */
    color #517093
    font-weight 200
    font-size 15px
    text-align left
    padding-left 10%

  /* box-shadow: 1px 1px 1px 1px #E7E8EB*/ //右边阴影

  /*> li*/

  /*border-bottom solid 1px #E7E8EB*/
  /*.item-top*/
  /*padding 5px 10px*/
  /*border-top #F7F9FC 10px solid*/
  /*.item-bottom*/
  /*border-bottom #F7F9FC 10px solid*/
</style>
