<template>
  <div id="flight-info">
    <Nav></Nav>
    <div class="flight-content">
      <header>
        <div class="city-left">
          <div class="start-city bold-font">
            {{startCity}}
          </div>
          <div class="city-icon">
            <div class="filght-icon">

            </div>
            <div class="flightno">
              {{flightNo}}
            </div>
          </div>
          <div class="end-city bold-font">
            {{endCity}}
          </div>
        </div>
        <div class="city-right">
          <span class="label">飞行高度：</span><span class="bold-font"
                                                style="padding: 0;">{{this.$store.state.curHeight}}m</span>
        </div>
      </header>
      <content>
        <i class="start-icon"></i>
        <div class="site unarr-timer top-city">
          <div class="half-plan timetable">
            <template v-if="airport === endSiteName">
              {{endTime | splitTime}}
            </template>
          </div>
          <div class="half-plan timetable-city">
            {{endSiteName}}
          </div>
        </div>
        <i class="plan-icon" :class="transferDetail && transferDetail.length > 0?'icon-bottom':''"></i>
        <template v-for="(item,index) in transferDetail">
          <div class="site middel-city"
               :class="index === 0 && !item.show ? ['unarr-timer ', 'half-height'] : ['arr-timer ']"
               :style="{'align-items' : item.show?'center': ''}">
            <div class="half-plan timetable" v-if="!item.show">
              <div class="strang-size timepadding">{{transferDepatureDate[transferDetail.length - 1- index] |
                splitTime}}
              </div>
              <div class="time-sub timepadding">
                {{transferDepatureDate[transferDetail.length - 1- index]|
                dateDif(transferArriveDate[transferDetail.length
                - 1- index])}}
              </div>
              <div class="strang-size timepadding">{{transferArriveDate[transferDetail.length - 1-index] | splitTime}}
              </div>
            </div>
            <div v-else class="half-plan timetable" style="">
              {{item.endTime | splitTime}}
            </div>
            <div class="half-plan timetable-city">
              <span>{{item.airportName}}</span>
              <span class="name-tag" v-if="!item.show">
              经停
            </span>
              <span class="name-tag" v-else>
              通程
            </span>
              <div class="trans-info" v-if="item.show">
                <div class="dot-icon"> 通程休息室</div>
                <div class="dot-icon"> 专人引导</div>
                <div class="dot-icon"> 换乘转车</div>
                <div class="dot-icon">隔夜住宿
                </div>
                <span class="end-city-msg">行李提取地:{{endSiteName}}</span>
              </div>
            </div>
            <i class="end-icon center-icon" v-if="index !== 0"></i>
          </div>
        </template>
        <div class="site arr-timer bottom-city">
          <div class="half-plan timetable">
            {{startTime | splitTime}}
          </div>
          <div class="half-plan timetable-city">
            {{startSiteName}}
          </div>
        </div>
        <i class="end-icon"></i>
      </content>
    </div>
    <!-- 航线特惠数据 -->
    <a class="block-item ">
      <div class="ariline-image" v-for="(l,index) in salesArr" v-bind:key="index"
           @click="arilie_detail(l.title,l.titleImg,l.content,l.descrip)"
           width="100%">
        <img width="100%"
             style="height:60%;border-top-right-radius: 5px;border-top-left-radius: 5px;box-shadow: 0 1.176vw 3.529vw rgba(0,0,0,.08);"
             v-bind:src="l.titleImg">
        <div class="ariline-item-text">
          <div class="ariline-title">{{l.title}}</div>
          <div class="descrip">{{l.descrip}}</div>
        </div>
      </div>
    </a>
    <div class="bottom-desp" style="background: #ffffff;" v-show="bottomshow">
      <hr>
      <span>我是有底线的哦</span>
      <hr>
    </div>
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'

  export default {
    components: {
      Nav: Nav
    },
    data() {
      return {
        userInfo: {},
        startCity: '出发地',
        startSiteName: '',
        endSiteName: '',
        endCity: '目的地',
        flightNo: 'Gxxxx',
        startTime: '',
        endTime: '',
        transferArriveDate: [],
        transferDetail: [],
        transferDepatureDate: [],
        salesArr: [],
        bottomshow: true,
        airport: ''
      }
    },
    created() {
      this.initUserInfo()
      this.initTransInfo()
      this.airline()
    },
    methods: {
      initUserInfo() {
        var userInfo = localStorage.getItem('userInfo')
        this.userInfo = JSON.parse(userInfo) // 转为JSON
      },
      initFlightDetail(flag, transUser) {
        let _self = this
        this.axios({
          method: 'get',
          url: '/api/flightDetail/getUserFlight'
        }).then((res) => {
          // console.log(res)
          res = res.data
          if (res.status === 200) {
            this.formatFlightInfo(flag, res.data, transUser)
          } else {
            console.log('数据获取失败，请刷新重试')
          }
        })
        // 通程信息
      },
      /**
       * 格式化航班信息数据
       * @param falg 是否有通程数据
       * @param userFlight 航线信息
       * @param transUser 通程信息
       */
      formatFlightInfo(falg, userFlight, transUser) {
        let _self = this
        let arriveDetail = {}
        let departDetail = {}
        let airport = ''
        if (falg) { // 如果存在通程信息， 则需要使用用户的通程出发地和目的地
          departDetail = transUser.departureDetail
          arriveDetail = transUser.arriveDetail
          airport = transUser.airportDetail.airportName
          this.airport = airport
        } else {
          departDetail = userFlight.departDetail
          arriveDetail = userFlight.arriveDetail
          this.airport = userFlight.arriveDetail.airportName
        }
        _self.flightNo = userFlight.flightNo
        _self.initArr(arriveDetail)
        _self.startTime = userFlight.startDate
        _self.endTime = userFlight.endDate
        _self.transferDetail = userFlight.transferDetail
        let flag = -1
        let newTransferDetail = []

        let len = _self.transferDetail !== null ? _self.transferDetail.length - 1 : 0
        console.log(_self.transferDetail)
        if (transUser.transferNameCh === userFlight.arriveDetail.airportName) {
          var arrItem = userFlight.arriveDetail
          arrItem['show'] = true
          arrItem['endTime'] = userFlight.endDate
          newTransferDetail.push(arrItem)
        }
        _self.transferDetail !== null && _self.transferDetail.forEach(function (item, index) { // 过滤当前用户不经过的站点
          index = len - index
          if (falg) {
            if (item.airportName === airport) {
              flag = index
              _self.transferDetail[index].show = true
              newTransferDetail.push(item)
            } else {
              if (index > flag) {
                newTransferDetail.push(item)
              }
            }
          } else {
            newTransferDetail.push(item)
          }
        })


        _self.transferDetail = newTransferDetail
        _self.transferArriveDate = userFlight.transferArriveDate
        _self.transferDepatureDate = userFlight.transferDepatureDate
        _self.initStartDetail(departDetail)
      },
      initTransInfo() { // 获取通程数据
        let _self = this
        this.axios({
          method: 'get',
          url: '/api/transitUser/get'
        }).then((res) => {
          if (res.data.status === 200) { // 有通程数据则需要对航线数据进行格式化
            let transitUser = res.data.data
            _self.initFlightDetail(true, transitUser)
          } else { // 没有通程数据则直接显示，航线数据
            this.code = 400
            _self.initFlightDetail(false, {})
          }
        })
      },
      arilie_detail(title, titleImg, content, descrip) {
        sessionStorage.removeItem('airlineDetail')
        sessionStorage.setItem('airlineDetail', JSON.stringify({
          'title': title,
          'titleImg': titleImg,
          'content': content,
          'descrip': descrip
        }))
        this.$router.push({
          name: 'AirlineDetail'
        })
      },
      // 格式化目的地数据
      initArr(arrData) {
        if (arrData) { // 初始化目的地站点数据
          this.endCity = arrData.city
          this.endSiteName = arrData.airportName
        }
      },
      // 格式化出发地数据
      initStartDetail(startData) { // 初始化站点数据
        if (startData) {
          this.startCity = startData.city
          this.startSiteName = startData.airportName
        }
      },
      // 获取航线特惠数据
      airline() {
        var userInfo = localStorage.getItem('userInfo')
        this.userInfo = JSON.parse(userInfo) // 转为JSON
        this.axios({
          method: 'get',
          url: '/api/sales/view'
        }).then((res) => {
          if (res.data.status === 200) {
            this.salesArr = res.data.data
          } else {
          }
          this.bottomshow = true
        })
      }
    },
    filters: {
      dateDif(enddate, starttime) {
        let date = Date.parse(new Date(enddate)) - Date.parse(new Date(starttime))
        if (date) {
          let days = date / 1000 / 60 / 60 / 24
          let daysRound = Math.floor(days) // 天
          let hours = date / 1000 / 60 / 60 - (24 * daysRound)// 小时
          let hoursRound = Math.floor(hours)
          let minutes = date / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound)// 分钟
          let minutesRound = Math.floor(minutes)
          let seconds = date / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound)// 秒计算
          let secondsRound = Math.floor(seconds)// 秒
          if (hoursRound === 0) {
            return ('停留' + minutesRound + '分钟')
          } else {
            return ('停留' + hoursRound + '小时' + minutesRound + '分钟')
          }
        }
      }
      ,
      splitTime(value) {
        if (value) {
          return value.split(' ')[1]
        }
        return ''
      }
    }
  }
</script>
<style lang="stylus">
  #flight-info
    .strang-size
      font-weight: bold

    .end-city-msg
      color: #569fff;
      font-size: 10px;
      border-radius: 3px;
      border: 1px #569fff solid;
      padding: 2px;
      margin-top: 4px;

    .dot-icon
      background: url("../assets/images/huiyuandian.png") no-repeat
      background-size: 6px 6px
      background-position left center
      font-size: 10px;
      color: #999
      padding: 2px 10px;

    .name-tag
      display: inline-block
      padding: 3px
      color: #ffffff
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      background: rgba(0, 136, 255, 1)
      margin-left: 3px;
      text-align: center
      padding-left: 6px;
      padding-right: 6px;

    .time-sub
      color: rgba(0, 136, 255, 1)

    .flight-content
      min-height: 220px;
      background-color: #ffffff;
      box-shadow: 0 1.176vw 3.529vw rgba(0, 0, 0, .08);
      /*border-radius: .588vw .588vw 1.471vw 1.471vw;*/
      margin: 20px auto;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border-radius: 5px;
      margin: 3.118vw;

      header
        background: #0086fc
        display flex
        padding: 12px;
        border-top-left-radius: 1.471vw;
        border-top-right-radius: 1.471vw;
        color: #ffffff
        font-weight: bold;
        flex-direction row
        justify-content space-evenly
        justify-items center
        font-size: 14px

        .flightno
          font-size: 8px;
          color: rgba(255, 255, 255, 0.6)

        .bold-font
          font-weight: bold
          padding: 0px 10px
          font-size: 14px;

        .city-right
          display: flex
          flex-direction row
          justify-items center
          justify-content flex-end
          align-items center
          font-size: 11px;
          width: 40%;

        .city-left
          display: flex
          width: 60%;
          flex-direction row
          justify-content flex-start
          align-items center

          .city-icon
            display: flex
            flex-direction column
            justify-content center
            align-items center

            .filght-icon
              background: url("../assets/images/plane-a.png") no-repeat
              background-size: 100% 100%
              background-position: center center
              height: 8px;
              width: 16px;
              margin: 3px 0px;

      content
        display flex
        flex-direction column
        justify-items center
        align-items center
        padding: 20px 0px;
        position: relative;

        .icon-bottom
          margin-bottom: -45px;

        .plan-icon
          background: url("../assets/images/plane-b.png") no-repeat
          background-size: 100% 100%
          background-position: center center
          height: 30px;
          width: 28px;
          z-index: 2

        .half-plan
          width: 50%
          padding: 0px 25px;

        div.half-height
          height: 50px;

          .timetable-city
            min-height: 60%;

        .middel-city
          position: relative
          align-items: flex-end;

          .timetable-city
            min-height: 34%;

        .timepadding
          padding: 2px 0px;

        .unarr-timer
          width: 100%;
          height: 100px;
          background: url("../assets/images/slices.png");
          background-repeat repeat-y
          background-position-y 10px;
          background-position: center center
          background-size 3px auto

        .arr-timer
          width: 100%;
          height: 100px;
          background: url("../assets/images/arrive_bak.png");
          background-repeat repeat-y
          background-position: center center
          background-size 3px auto
          background-position-y 10px;

        .start-icon
          width: 100%;
          height: 11px;
          z-index: 1;
          background: url("../assets/images/slices_rate.png");
          background-repeat no-repeat
          background-position: center center
          background-size 10px 10px

        .site
          display: flex
          flex-direction row
          justify-content center

        .top-city
          margin-top: -10px;

        .bottom-city
          align-items flex-end
          margin-bottom: -10px;

        .end-icon
          width: 100%;
          height: 11px;
          background: url("../assets/images/yaun.png");
          background-repeat no-repeat
          background-position: center center
          background-size 10px 10px
          z-index: 1;

        .timetable
          text-align: right
          font-weight: bold
          color: #94A8BF
          font-size: 13px;

        .center-icon
          position: absolute
          bottom: 20px;
          left: 0;
          right: 0px;

        .timetable-city
          font-weight: 200
          font-size: 14
          padding-top: 2px;
</style>
