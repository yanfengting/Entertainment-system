<template>
  <div width="100%">
    <header class="mui-bar mui-bar-nav"
            style="display: flex;flex-direction: row;align-items: center; justify-content: space-between">
      <div class="mui-action-back mui-icon mui-icon-back mui-action-menu"></div>
      <h1 class="mui-title"
          @click="itinerary">
        <div class="start" v-if="flightDetail.departDetail">
          <span class="site">{{flightDetail.departDetail.city}}</span>
          <span class="time">出发{{startDate}}</span>
        </div>
        <div class="start" v-else>
          <span class="site">出发地</span>
        </div>
        <div class="middle">
          <span class="site">
            <div class="flight"></div>
          </span>
          <span class="time" v-if="type === 400">直达</span>
          <span class="time" v-else>通程 <!--{{tcinfo.arriveDetail.city}}--></span>
        </div>
        <div class="start" v-if="flightDetail.arriveDetail">
          <span class="site">{{flightDetail.arriveDetail.city}}</span>
          <span class="time" v-if="day>0" style="display: flex">{{endDate}} <div style="line-height: 1">+{{day}}</div> </span>
          <span class="time" v-else>到达{{endDate}}</span>
        </div>
        <div class="start" v-else>
          <span class="site">目的地</span>
        </div>
      </h1>
      <!-- 音乐图标 -->
      <template v-if="this.$store.state.playFlag">
        <a href="javascript:;" @click="Music" class="mui-icon mui-action-menu mui-icon-bars music-btn">
          <div class="music-btn music-btn-icon"
               alt></div>
        </a>
      </template>
      <a @click="showSide"
         slot="overwrite-left"
         type="navicon"
         size="35"
         style="fill:#fff;padding-bottom: 0;display: block;"
         class="mui-icon mui-action-menu mui-icon-bars">
        <!--<i class="iconfont icon-1"></i>-->
        <div class="logo-right menu2"></div>
        <div v-if="orderNum>0" class="logo-right hongdian"
             style="height: 10px;width: 10px;left: 10px;position: absolute;border-radius: 50%;"></div>
      </a>
      <!--<a class="mui-action-back mui-icon mui-icon-back mui-pull-left">-->
    </header>
    <!-- 轮播图 -->
    <cube-slide :speed="200"
                ref="slide"
                :data="items">
      <cube-slide-item v-for="(item, index) in items"
                       :key="index">
         <!-- 实现根据资源类型去跳转不同的页面 -->
        <!-- 4 资源下载 3跳转注册 1,2大图察看-->
        <!-- 4 /cancrieasproxy/adv/hebei.apk -->
        <!-- 3 保证数据库src ：/cancrieasproxy/adv/registeredmeber.jpg 和 resourceType：3-->
        <a :href="item.resourceId" download="hebei_app.apk" v-if = "item.resourceType == 4"
           class="main-bak-height">
          <img class="swipe-img"
               :src="item.src">
        </a>
        <a @click = "router" v-else-if = "item.resourceType == 3"
           class="main-bak-height">
          <img class="swipe-img"
               :src="item.src">
        </a>
        <a :href="item.src"  v-else
           class="main-bak-height"
           :style="{'background': 'url('+item.src+') no-repeat', 'background-size': '100% 100%', 'background-position': 'center center' }">
          <img class="swipe-img"
               :src="item.src">
        </a>
      </cube-slide-item>
    </cube-slide>
    <Sidebar></Sidebar>

    <div class="mainindex">
      <div class="maincontent">
        <!--<p class="title-one">1客舱服务</p>-->
        <div class="cabin">
          <Upgrade :seat=this.userInfo.seat :upgrade_sku=upgrade_sku></Upgrade>
          <!--<div class="cab clearfix">-->
          <!--<div class="cab-up">-->
          <Demand :seat=this.userInfo.seat :demand_sku=demand_sku></Demand>
          <Food :seat=this.userInfo.seat :food_sku=food_sku></Food>
          <!--</div>-->
          <!--<div class="cab-down">-->
          <div class="cab-common "
               @click="itinerary">
            <div class="item">
              <div class="top-describe cab-common cab-itinerary">
                <!--<p class="second">My itinerary</p>-->
              </div>
              <span class="first-font">行程</span>
            </div>
          </div>
          <div class="cab-common "
               @click="safety">
            <div class="item">
              <div class="top-describe cab-common cab-safety">
                <!--<p class="second">Safety instructions</p>-->
              </div>
              <span class="first-font">须知</span>
            </div>
          </div>
          <!--</div>-->
          <!--</div>-->
        </div>

        <!--<p class="title-two">2精彩华夏</p>-->
        <div class="huaxia">
          <div class="cab clearfloat">
            <div class="cab-down recommend item-border"
                 @click="recommend">
              <div class="describe">
                <span class="first">目 的 地 推 荐</span>
                <p class="second">Recommend</p>
              </div>
            </div>
            <div class="cab-down Airline item-border"
                 @click="airline">
              <div class="describe">
                <span class="first">航 线 特 惠</span>
                <p class="second">Routes preferential</p>
              </div>
            </div>
            <div class="cab-up Brand item-border"
                 @click="brand">
              <div class="describe">
                <span class="first">品 牌 介 绍</span>
                <p class="second">Brand introduction</p>
              </div>
            </div>
          </div>
          <div class="cab clearfloat">
            <div class="cab-down Gift item-border"
                 @click="gift">
              <div class="describe">
                <span class="first">空 中 商 城</span>
                <p class="second">G5 mall</p>
              </div>
            </div>
            <div class="cab-up Through item-border"
                 @click="through">
              <div class="describe">
                <span class="first">企 业 文 化</span>
                <p class="second">Through</p>
              </div>
            </div>
            <div class="cab-down opinion item-border"
                 @click="opinion">
              <div class="describe">
                <span class="first">意 见 反 馈</span>
                <p class="second">Opinions</p>
              </div>
            </div>
          </div>
        </div>

      </div>
        <!--3 游戏音乐视频阅读  -->
      <footer>
        <div class="amusement">
          <div class="amuse Games"
               @click="Games">
            <div class="foo-describe">
              <span class="first">游戏</span>
              <p class="second">Games</p>
            </div>
          </div>
          <div class="amuse Read"
               @click="Read">
            <div class="foo-describe">
              <span class="first">阅读</span>
              <p class="second">Read</p>
            </div>
          </div>
          <div class="amuse Video"
               @click="video">
            <div class="foo-describe">
              <span class="first">视频</span>
              <p class="second">Video</p>
            </div>
          </div>
          <div class="amuse Music"
               @click="Music">
            <div class="foo-describe">
              <span class="first">音乐</span>
              <p class="second">Music</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    <!--<img class="main-background" src="../assets/images/mianbg.png" height="2107" width="1133"/>-->
  </div>
</template>
<script>
  import registryToast from '../components/common/toast/index'
  import Sidebar from '../components/common/Sidebar.vue'
  import Swiper from '../components/main/Swiper.vue'
  import Upgrade from '../components/main/Upgrade.vue'
  import Demand from '../components/main/Demand.vue'
  import Food from '../components/main/Food.vue'
  import registryDialog from '../components/common/dialog/index'

  export default {
    data() {
      return {
        skuArr: {},
        items: [],
        orderNum: 0,
        flightDetail: [],
        upgrade_sku: false,
        demand_sku: false,
        food_sku: false,
        props: ['upgrade_sku'],
        endDate: '',
        startDate: '',
        day: 0,
        type: 0,
        tcinfo: [],
        resourceType: 0
      }
    },
    created: function () {
      // console.log(this.$store.state.playFlag)
      // this.getParams()
      // 接收传给main页面的表单数据
      var userInfo = localStorage.getItem('userInfo')
      this.userInfo = JSON.parse(userInfo) // 转为JSON
      if (!userInfo) {
        localStorage.clear()
        sessionStorage.clear()
        this.$router.push('/')
      }
      // console.log(userInfo)
      // console.log('seat ' + this.userInfo.seat)
      // '/api/adv/list?mobile=' + this.userInfo.tel + '&position=' + 1
      this.axios.get('/api/adv/list?mobile=' + this.userInfo.tel + '&position=' + 1).then(res => {
        // console.log("轮播图")
        // console.log(res)
        if (res.data.status === 200) {
          this.items = res.data.data
        }
      })
      this.axios({
        method: 'post',
        url: 'api/order/unfinished'
      }).then((res) => {
        // console.log(res)
        if (res.status === 200) {
          this.orderNum = res.data.data
          // this.giftArr = res.data.data
        } else {
          console.log('数据获取失败，请刷新重试')
        }
      })
      this.initHeaderFlight()
      this.tcHeaderInfo()
    },
    watch: {
      $route: 'getParams'
    },
    methods: {
      router() {
        // 请求会员数据 判断 如果手机号存在于数据库，提示已经注册会员
        this.axios.get('/api/member/get?phone=' + this.userInfo.tel).then(res => {
          // console.log(res)
          if (res.data.status === 200) {
            if (res.data.data != null) {
              registryToast.showToast('您已经是会员了！')
            } else {
              this.$router.push('/registered_member')
            }
          } else {
            console.log('数据获取失败')
          }
        })
      },
      initHeaderFlight() {
        let flightStr = sessionStorage.getItem('flight')
        if (flightStr) {
          let flight = JSON.parse(flightStr)
          this.flightDetail = flight
          this.startDate = flight.startDate.split(' ')[1]
          this.endDate = flight.endDate.split(' ')[1]
          this.dateDif(this.flightDetail.endDate, this.flightDetail.startDate)
        } else {
          // sessionStorage.setItem('flight', JSON.stringify(this.flight))
          this.axios({
            method: 'get',
            url: 'api/flightDetail/getUserFlight'
          }).then((res) => {
            if (res.status === 200) {
              this.flightDetail = res.data.data
              this.startDate = res.data.data.startDate.split(' ')[1]
              this.endDate = res.data.data.endDate.split(' ')[1]
              this.dateDif(this.flightDetail.endDate, this.flightDetail.startDate)
            } else {
              console.log('数据获取失败，请刷新重试')
            }
          })
        }
      },
      tcHeaderInfo() {
        this.axios({
          method: 'get',
          url: '/api/transitUser/get'
        }).then((res) => {
          if (res.data.status === 200) {
            this.tcinfo = res.data.data
          } else if (res.data.status === 400) {
            this.type = res.data.status
          }
        })
      },
      getParamSelect(msg) {
        alert(this.msg.value)
        // console.log(this.msg.value) // 获取子组件传值结果
      },
      // getParams() {
      //   // 取到路由带过来的参数
      //   this.seat = this.$route.params.seat
      //   console.log(this.seat)
      // },
      getRouterInfo(params) {
        // console.log(params)
        // console.log(' 餐食 ' + params.food_sku + ' 升舱 ' + params.upgrade_sku + ' 呼唤铃 ' + params.demand_sku)
        this.food_sku = params.food_sku
        this.upgrade_sku = params.upgrade_sku
        this.demand_sku = params.demand_sku
      },
      showSide() {
        this.$store.dispatch('showSideBar')
      },
      itinerary() {
        this.$router.push('/flight_info')
      },
      safety() {
        this.$router.push('/safety')
      },
      video() {
        sessionStorage.removeItem('nav_current')
        this.$router.push('/video')
      },
      Music() {
        // this.showwait()
        // return
        this.$router.push('/music')
      },
      Games() {
        // this.showwait()
        // return
        this.$router.push('/games')
      },
      Read() {
        sessionStorage.removeItem('readInitIndex')
        this.$router.push('/read')
      },
      brand() {
        this.$router.push('/brand')
      },
      airline() {
        this.$router.push('/airline')
      },
      through() {
        this.$router.push('/through')
      },
      gift() {
        // this.showwait()
        // return
        this.$router.push('/gift')
      },
      recommend() {
        // this.showwait()
        // return
        this.$router.push('/recommend')
      },
      opinion() {
        this.$router.push('/opinion')
      },
      showwait() {
        let toast = this.$dialog('该功能正在开发中', 'my-wait')
      },
      dateDif(enddate, starttime) {
        // console.log(Date.parse(new Date(enddate)) + '---' + Date.parse(new Date(starttime)))

        var date = Date.parse(new Date(enddate)) - Date.parse(new Date(starttime))

        // console.log(date)
        var days = date / 1000 / 60 / 60 / 24
        var daysRound = Math.floor(days) // 天
        this.day = daysRound
        var hours = date / 1000 / 60 / 60 - (24 * daysRound)// 小时
        var hoursRound = Math.floor(hours)
        var minutes = date / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound)// 分钟
        var minutesRound = Math.floor(minutes)
        var seconds = date / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound)// 秒计算
        var secondsRound = Math.floor(seconds)// 秒
        var time = (hoursRound + '小时' + minutesRound + '分钟')
        // console.log(time)
        return time
      }
    },
    components: { Sidebar, Upgrade, Demand, Food }
  }
</script>

<style lang="stylus">
  .cube-slide-item > a.main-bak-height {
    height: 150px;
  }

  @media screen and (min-width: 500px) {
    .cube-slide-item > a.main-bak-height {
      height: 300px;
    }
  }

  a.music-btn, div.music-btn {
    width: 20px;
    height: 20px;
  }

  .music-btn-icon {
    background-image: url(../assets/images/topmusic.png);
    background-repeat: no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
  }

  .header .img-wrap.upgrade
    border: none;
    -webkit-border-radius: 3px
    -moz-border-radius: 3px
    border-radius: 3px

  .header .img-wrap.upgrade img
    border-radius 3px

  .cube-dialog-alert .cube-dialog-btn
    display: none

  .cube-dialog-alert
    padding-bottom: 20px

  .cube-slide-item > a, .cube-slide-item > a > img
    width: 100%
    height: 100%

  .sku-close
    background: url("../assets/images/close_w_icon.png") no-repeat center center;
    background-size: auto 100%
    margin-top: 10px

  .my-wait
    text-align: center
    background: url("../assets/images/waiting.png") no-repeat center bottom
    -webkit-background-size: 40px 40px
    background-size: 40px 40px
    padding-top: 80px;

  .cube-dialog-main
    border-radius: 5px;

  .my-order
    text-align: center
    background: url("../assets/images/order_icon.png") no-repeat center bottom
    -webkit-background-size: 40px 40px
    background-size: 40px 40px
    padding-top: 80px;

  .my-error
    text-align: center
    background: url("../assets/images/error_icon.png") no-repeat center bottom
    -webkit-background-size: 40px 40px
    background-size: 40px 40px
    padding-top: 80px;

  .my-eable
    text-align: center
    background: url("../assets/images/eable.png") no-repeat center bottom
    -webkit-background-size: 40px 40px
    background-size: 40px 40px
    padding-top: 80px;

  .cube-slide-dots > span
    border-radius 10px

  .cube-slide-dots
    bottom 15px

  .swipe-img
    width 100%
    height 100%
    max-height 200px

  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    width 100%

  div.cube-slide-dots
    left: 50% !important
    width: 200px;

  body, html
    overflow-x hidden
    height 100%
    position relative
    font-size 18px
    color black
    z-index 0

  .site
    overflow hidden
    text-overflow ellipsis

  .cube-dialog-close
    z-index: 111111

  ul, li
    margin 0
    padding 0

  .icon-1:before
    font-size 15px

  /* 机上升舱 */
  /* 内容 */
  .mui-bar
    right 0
    left 0
    height 44px
    /* border-bottom: 1px solid rgb(118, 130, 151); */
    background-color #fff
    backface-visibility hidden
    box-shadow none

  .logo-first
    /* vertical-align: top; */
    width 100%
    height 100%
    /*background: url("../assets/images/topmusic.png") no-repeat center center*/
    background-position: 100% 100%;
    -webkit-background-size: 100% 100%
    background-size: 100% 100%

  /*width 18px*/
  /*height 18px*/
  /*margin auto*/
  /* 清除浮动代码 */
  .clearfix:after
    display block
    overflow hidden
    clear both
    height 0
    visibility hidden
    content ''

  .mainindex
    margin auto 10px

  .maincontent
    width 100%
    height 310px

  /*background-color #fff*/
  input {
    border: solid 1px;
  }

  .title-one
    font-weight 700
    font-size 16px
    padding-bottom 5px
    padding-left 10px
    padding-top 10px

  .title-two
    font-weight 700
    font-size 16px
    padding-bottom 5px
    padding-left 10px
    padding-top 10px

  .title-three
    display block
    font-weight 700
    font-size 16px
    padding-bottom 5px
    padding-left 10px
    padding-top 10px

  .cabin
    height 80px
    margin-top 20px
    /*border-left 10px #fff solid*/
    /*border-right 10px #fff solid*/
    display flex
    flex-direction row
    justify-content space-between

  .huaxia
    height 225px

  /*border-left 10px #fff solid*/
  /*border-right 10px #fff solid*/

  .amusement
    display flex

  /*margin-top 3px*/
  /*border-left 10px #fff solid*/
  /*border-right 10px #fff solid*/

  .item-border
    /*border 1.5px #fff solid*/
  .cab
    float left
    width 49.2%
    height 150px
    margin 0.3%

  /* margin: 1.5px; */
  /* border: 1.5px #fff solid; */
  .cab-up
    height 50%
    border-radius 10px
    /* margin-bottom: 1.5px; */
    display flex
    align-items center

  /* border-top: 1.5px #fff solid;
  border-bottom: 1.5px #fff solid; */
  .cab-down
    height 50%
    border-radius 8px
    /* margin-top: 3px; */
    display flex
    align-items center

  .cab-common
    width 50px
    height 50px
    /*border-radius 10px*/
    /*border 1.5px solid #fff*/
    display flex
    flex-direction column
    align-items center

  .cab-food, .cab-safety
    /* margin-left: 3px; */
    /* border: 1.5px #fff solid; */
  .iconfont
    border solid 1px #000000;
    border-radius: 50%
    height: 15px
    display: block
    width: 15px;

  .Upgrade
    /*border 1.5px solid #fff*/
    border-radius 8px
    font-size 17px
    font-weight 600
    background url('../assets/images/upgrade.png') no-repeat left top
    background-size 100% 100%

  .cab-demand
    background url('../assets/images/huhuanling.png') no-repeat left top
    /*background-size 100% 73.5px*/
    background-size 100% 100%

  .cab-food
    background url('../assets/images/food.png') no-repeat left top
    /*background-size 100% 73.5px*/
    background-size 100% 100%

  .cab-itinerary
    background url('../assets/images/xingcheng.png') no-repeat left top
    /*background-size 100% 73.5px*/
    background-size 100% 100%

  .cab-safety
    background url('../assets/images/xuzhi.png') no-repeat left top
    /*background-size 100% 73.5px*/
    background-size 100% 100%

  .Brand
    background url('../assets/images/Brand.png') no-repeat left top
    background-size 100% 100%
    margin-bottom 1.5px

  .Airline
    background url('../assets/images/Airline.png') no-repeat left top
    background-size 100% 100%
    margin-bottom 1.5px

  .Through
    background url('../assets/images/Through.png') no-repeat left top
    background-size 100% 100%
    margin-bottom 1.5px

  .Gift
    background url('../assets/images/shopping_mall.png') no-repeat left top
    background-size 100% 100%
    margin-bottom 1.5px

  .Video
    background url('../assets/images/video.png') no-repeat left top
    background-size 100% 100%

  .Music
    background url('../assets/images/muisc.png') no-repeat left top
    background-size 100% 100%

  .Games
    background url('../assets/images/games.png') no-repeat left top
    background-size 100% 100%
    background-position center center

  .Read
    background url('../assets/images/read.png') no-repeat left top
    background-size 100% 100%
    background-position center center

  .recommend
    background url('../assets/images/recommend.png') no-repeat left top
    background-size 100% 100%
    margin-bottom 1.5px
    background-position center center

  .opinion
    background url('../assets/images/opinion.png') no-repeat left top
    background-size 100% 100%
    margin-bottom 1.5px
    background-position center center

  .amuse
    width 24.2%
    height 79px
    /*border 1.5px #fff solid*/
    border-radius 10px
    display flex
    align-items center
    margin 0.3%

  .cab-num
    display flex
    margin 0 auto

  .cab-num p
    margin 0
    padding 0
    width 50%
    text-align center
    color white

  /* margin: 5px 10px; */
  .cab-upgrade
    padding 40px 0 0 0

  /* footer */
  footer
    width 100%
    height 85px
    line-height 85px
    vertical-align middle

  .foot
    width 50%
    height 85px
    float left
    line-height 85px
    text-align center
    display flex
    align-items center

  .describe span
    width 80%
    height 15px
    line-height 20px
    display block
    color #fff

  .describe
    width 80%
    margin-left 10%
    margin-top 30px

  .top-describe span
    width 80%

  height 15px
  line-height 20px
  display block
  color #fff
  .top-describe
    width 80%
    margin-left 10%
    margin-top 15px

  .foo-describe span
    width 100%
    height 15px
    line-height 20px
    display block
    color #fff

  .foo-describe
    width 100%
    margin-top 20px
    text-align center

  .first
    font-size 14px
    font-weight bold

  .first-font
    font-size 12px
    color #000000 e3

  .second
    color rgba(255, 255, 255, 0.6)
    margin-top 5px
    font-size 10px
    font-weight normal
    line-height 10px
    word-wrap break-word
    height 25px

  .main-background
    position absolute
    top 0
    z-index -1
    width 100%
</style>
