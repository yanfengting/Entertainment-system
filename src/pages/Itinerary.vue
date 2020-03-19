<template>
    <div class="arilineApp">
        <Nav></Nav>
        <div id="i_content" style="z-index: 0" v-if="this.code === 400">
            <div class="trip">
                <div class="info-item" v-if="flightDetail.departDetail">
                    <span class="info-time">{{flightDetail.departDetail.city}}</span>
                </div>
                <div class="info-item" v-else>
                    <span class="info-time">出发地</span>
                </div>
                <div class="icon-arrow">
                    <i class="iconfont-it imageSize">
                        <img src="../assets/images/plane-a.png" style="width: 50%;height: 14px;"/>
                        <div style="color: rgba(255,255,255,0.9)">{{flightDetail.flightNo}}</div>
                    </i>
                </div>
                <div class="info-item" v-if="flightDetail.arriveDetail">
                    <span>{{flightDetail.arriveDetail.city}}</span>
                </div>
                <div class="info-item" v-else>
                    <span>目的地</span>
                </div>
                <div class="info-item" style="position: absolute;right: 5px;">
                    <span class="flight-altitude">飞行高度:</span>
                    3657m
                </div>
            </div>
            <ul class="layui-timeline">
                <li class="layui-timeline-item-first" style="margin-bottom: -30px" v-if="flightDetail.arriveDetail">
                    <div class="relative">
                        <span class="time-first" v-if="flightDetail.endDate">{{flightDetail.endDate.split(' ')[1]}} </span>
                    </div>
                    <i class="layui-icon layui-timeline-axis circle-first"></i>
                    <div class="layui-timeline-content layui-text">
                        <h3 class="layui-timeline-title" v-if="flightDetail.arriveDetail">
                            {{flightDetail.arriveDetail.airportName}}
                        </h3>
                        <h3 class="layui-timeline-title" v-else></h3>
                    </div>
                </li>
                <div v-if="flightDetail.transferDetail" class="layui-icon-image rotate flight-icon"
                     style="width: 18%; left: 6.5%; top: 30px; z-index: 1;"></div>
                <li class="layui-timeline-item" v-if="flightDetail.transferArriveDate" v-for="(item) in times">
                    <div class="relative">
                        <span class="time-top">{{item.transferDepatureDate.split(' ')[1]}}</span>
                        <span class="transit">停留{{item.datedft}}</span>
                        <span class="time-bottom"
                              style>{{item.transferArriveDate.split(' ')[1]}}</span>
                    </div>
                    <div class="layui-timeline-content layui-text">
                        <h3 class="layui-timeline-title" v-if="item.transferDetail">
                            {{item.transferDetail.airportName?item.transferDetail.airportName:''}}
                            <span
                                    class="layui-timeline-type">经停</span></h3>
                    </div>
                </li>
                <li class="layui-timeline-item" v-if="!flightDetail.transferDetail">
                    <div class="relative">
                    </div>
                    <div class="layui-icon-image rotate flight-icon"
                         style="width: 18%; left: 6.5%;  z-index: 1;top:-10px"></div>
                    <div class="layui-timeline-content layui-text">
                        <h3 class="layui-timeline-title"></h3>
                    </div>
                </li>
                <li class="layui-timeline-item" v-if="flightDetail.departDetail">
                    <div class="relative">
                        <span class="time-first" v-if="flightDetail.endDate">{{flightDetail.startDate.split(' ')[1]}}</span>
                    </div>
                    <i class="layui-icon layui-timeline-axis circle"></i>
                    <div class="layui-timeline-content layui-text">
                        <h3 class="layui-timeline-title last-info"
                            style="padding-bottom:-30px">
                            {{flightDetail.departDetail.airportName?flightDetail.departDetail.airportName:''}}
                        </h3>
                    </div>
                </li>
            </ul>
        </div>
        <div id="i_content" style="z-index: 0" v-else>
            <div class="trip">
                <div class="info-item" v-if="tcflightDetail.departureDetail">
                    <span class="info-time">{{tcflightDetail.departureDetail.city}}</span>
                </div>
                <div class="info-item" v-else>
                    <span class="info-time">出发地</span>
                </div>
                <div class="icon-arrow">
                    <i class="iconfont-it imageSize">
                        <img src="../assets/images/plane-a.png" style="width: 20px;height: 16px;"/>
                        <div style="color: rgba(225,225,225,0.5)">{{tcflightDetail.beforeRealFlightNo}}</div>
                    </i>
                </div>
                <div class="info-item" v-if="tcflightDetail.arriveDetail">
                    <span>{{tcflightDetail.arriveDetail.city}}</span>
                </div>
                <div class="info-item" v-else>
                    <span>目的地</span>
                </div>
                <div class="info-item" style="position: absolute;right: 5px;">
                    <span class="flight-altitude">飞行高度:</span>
                    3657m
                </div>
            </div>
            <ul class="layui-timeline">
                <li class="layui-timeline-item-first">
                    <div class="relative">
                        <span class="time-first">{{tcflightDetail.arrivalTime}}</span>
                    </div>
                    <i class="layui-icon layui-timeline-axis circle-first"></i>
                    <div class="layui-timeline-content layui-text">
                        <h3 class="layui-timeline-title" v-if="tcflightDetail.arriveDetail">
                            {{tcflightDetail.arriveDetail.airportName?tcflightDetail.arriveDetail.airportName:''}}</h3>
                    </div>
                </li>
                <li class="layui-timeline-item" style="padding-bottom: 20%">
                    <div class="relative">
                        <span class="time-top">{{tcflightDetail.afterStartTime}}</span>
                        <span class="transit">停留时间{{tcDifference}}</span>
                        <span class="time-bottom"
                              style>{{tcflightDetail.beforeEndTime}}</span>
                        <span class="etime-first"></span>
                    </div>
                    <div class="layui-icon-image rotate flight-icon"
                         style="width: 18%; left: 6.5%; z-index: 1;"></div>
                    <div class="layui-timeline-content layui-text">
                        <h3 class="layui-timeline-title" v-if="tcflightDetail.airportDetail">
                            {{tcflightDetail.airportDetail.airportName?tcflightDetail.airportDetail.airportName:''}}
                            <span class="layui-timeline-type">通程</span>
                        </h3>
                        <div class="layui-timeline-guide">
                            <div><img src="../assets/images/huiyuandian.png" height="32" width="32"/> 通程休息室</div>
                            <div><img src="../assets/images/huiyuandian.png" height="32" width="32"/> 专人引导</div>
                            <div><img src="../assets/images/huiyuandian.png" height="32" width="32"/> 换乘转车</div>
                            <div style="margin-bottom: 2px"><img src="../assets/images/huiyuandian.png" height="32"
                                                                 width="32"/> 隔夜住宿
                            </div>
                            <div>
            <span v-if="tcflightDetail.arriveDetail"
                  style="color:#569fff;border-radius: 5px;border: 1px #569fff solid; line-height: 18px;padding: 5px;margin-top: 5px;">
             行李提取地:{{tcflightDetail.arriveDetail.airportName?tcflightDetail.arriveDetail.airportName:''}}
          </span>
                            </div>

                        </div>
                    </div>
                </li>
                <li class="layui-timeline-item" v-show="tctimes" v-for="(item) in tctimes" v-bind:key="item">
                    <div class="relative">
                        <span class="time-top">{{item.transferDepatureDate.split(' ')[1]}}</span>
                        <span class="transit">停留{{item.datedft}}</span>
                        <span class="time-bottom"
                              style>{{item.transferArriveDate.split(' ')[1]}}</span>
                    </div>
                    <i class="layui-icon layui-timeline-axis circle"></i>
                    <div class="layui-timeline-content layui-text">
                        <h3 class="layui-timeline-title" v-if="item.transferDetail">
                            {{item.transferDetail.airportName?item.transferDetail.airportName:''}}
                            <span
                                    class="layui-timeline-type">经停</span></h3>
                    </div>
                </li>
                <li class="layui-timeline-item">
                    <div class="relative">
                        <span class="time-first">{{tcflightDetail.departureTime}}</span>
                    </div>
                    <i class="layui-icon layui-timeline-axis circle"></i>
                    <div class="layui-timeline-content layui-text">
                        <h3 class="layui-timeline-title last-info"
                            style="padding-bottom:-30px">{{tcflightDetail.departureNameCh}}</h3>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 游玩攻略 -->
        <a class="block-item ">
            <div class="ariline-image" v-for="(l) in salesArr"
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
    </div>
</template>
<script>
    import Nav from '../components/common/Nav.vue'

    export default {
        data() {
            return {
                flightDetail: [],
                times: [],
                tctimes: [],
                salesArr: [],
                code: 0,
                tcflightDetail: [],
                tcDifference: ''// 通程中转时间差
            }
        },
        created: function () {
            var userInfo = localStorage.getItem('userInfo')
            this.userInfo = JSON.parse(userInfo) // 转为JSON
            // 普通行程
            this.axios({
                method: 'get',
                url: '/api/flightDetail/getUserFlight'
            }).then((res) => {
                if (res.status === 200) {
                    let datas = res.data.data // 航班详情
                    this.flightDetail = datas
                    let departIfo = datas.transferDetail // 经停数据
                    // let departIfo =[{'city':'城市1','airportName':'机场1'},{'city':'城市2','airportName':'机场2'}]
                    let transferArriveDate = datas.transferArriveDate // 经停开始时间
                    // let transferArriveDate = ['2019-07-26 12:20', '2019-07-26 15:20']
                    let transferDepatureDate = datas.transferDepatureDate // 经停结束时间
                    // let transferDepatureDate = ['2019-07-26 12:30', '2019-07-26 15:30']
                    if (departIfo) { // 不止一个经停
                        for (let i = transferArriveDate.length - 1; i >= 0; i--) {
                            let obj = []
                            let jisuan = this.dateDif(transferDepatureDate[i], transferArriveDate[i]) // 经停时 停留时长
                            // console.log(departIfo.length)
                            obj.transferDetail = departIfo[i] // 经停机场
                            obj.transferArriveDate = transferArriveDate[i] // 经停开始时间
                            obj.transferDepatureDate = transferDepatureDate[i] // 经停结束时间
                            obj.datedft = jisuan // 停留时长
                            // console.log(obj)
                            this.times.push(obj)
                        }
                    }
                } else {
                    console.log('数据获取失败，请刷新重试')
                }
            })
            // 通程信息

            this.axios({
                method: 'get',
                url: '/api/transitUser/get'
            }).then((res) => {
                // console.log(res)
                if (res.data.status === 200) {
                    this.tcflightDetail = res.data.data
                    // 通程中转时间
                    let enddate = this.tcflightDetail.flightDate + ' ' + this.tcflightDetail.afterStartTime
                    let starttime = this.tcflightDetail.flightDate + ' ' + this.tcflightDetail.beforeEndTime
                    this.tcDifference = this.dateDif(enddate, starttime) // 中转经停时间
                    if (this.times) {
                        for (let i = this.times.length - 1; i >= 0; i--) {
                            let obj = []
                            if (this.times[i].transferDetail.airportName === this.tcflightDetail.airportDetail.airportName) {
                                return
                            } else {
                                obj.transferDetail = this.times[i].transferDetail // 经停机场
                                obj.transferArriveDate = this.times[i].transferArriveDate// 经停开始时间
                                obj.transferDepatureDate = this.times[i].transferDepatureDate // 经停结束时间
                                obj.datedft = this.times[i].datedft // 停留时长
                                // console.log('hello')
                                // console.log(obj)
                                this.tctimes.push(obj)
                            }
                        }
                    }
                } else {
                    this.code = 400
                }
            })
            this.airline()
        },
        methods: {
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
                    let time = (hoursRound + '小时' + minutesRound + '分钟')
                    this.tcDifference = time
                    return time
                }
            },
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
                })
            },
            arilie_detail(title, titleImg, content, descrip) {
                this.$router.push({
                    name: 'AirlineDetail',
                    params: {
                        'title': title,
                        'titleImg': titleImg,
                        'content': content,
                        'descrip': descrip
                    }
                })
            }
        },
        components: {
            Nav
        }
    }
</script>
<style>
    .arilineApp {
        /*background: #fcfcfc;*/
        height: 100%;
    }

    /* 游玩攻略  */
    .item-content {
        margin: 10px;
    }

    .flight-icon {
        background-image: url("../assets/images/plane-b.png");
        background-repeat: no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        background-position: center center;
        height: 30px;
        /*background: url("../assets/images/plane-b.png") no-repeat 100% 100% ;*/
    }

    .flight-card {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        border-radius: 2px 2px 2px 2px;
        margin-bottom: 10px;
    }

    .flight-card .img {
        height: 100px;
        background-image: url("//pic.c-ctrip.com/flight/fuzzy/default/284.jpg");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 2px 2px 0 0;
    }

    .flight-card .item-text {
        /* height:55px; */
        width: 100%;
    }

    .ariline-item-text .ariline-title {
        font-size: 15px;
        text-align: left;
        padding: 15px 0px 5px 8px;
        /*padding: 8px;*/
    }

    .ariline-item-text .descrip {
        color: #999;
        height: 20px;
        line-height: 16px;
        margin: 0 10px;
        font-size: 12px;
        padding-bottom: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }

    .ariline-image {
        min-height: 220px;
        background-color: #ffffff;
        box-shadow: 0 1.176vw 3.529vw rgba(0, 0, 0, .08);
        /*border-radius: .588vw .588vw 1.471vw 1.471vw;*/
        margin: 20px auto;
    }

    #i_content {
        /*margin: 0 auto;*/
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        border-radius: 5px;
        margin: 14px;
    }

    .icon-jiantou2:before {
        color: #aaaaaa;
        display: flex;
        flex-direction: column;
    }

    .icon-jiantou2 > span {
        font-size: 10px;
    }

    span {
        padding: 0;
        margin: 0;
    }

    .trip {
        position: relative;
        white-space: nowrap;
        /*margin-top: 25px;*/
        color: #ffffff;
        padding: 15px 5px;
        font-size: 0;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background: rgb(0, 134, 252);
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .info-item {
        font-size: 14px;
        font-weight: bold;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
    }

    .info-item span {
        font-weight: bold;
    }

    .flight-altitude {
        font-weight: 200;
    }

    .info-item span.flight-altitude {
        font-size: 13px;
        font-weight: 200;
    }

    .icon-arrow {
        margin: auto 3px;
        display: inline-block;
        position: relative;
        float: none;
        vertical-align: middle;
        text-align: center;
    }

    .iconfont-it {
        font-family: iconfont !important;
        font-size: 4.706vw;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        content: "viewport-units-buggyfill; font-size: 4.706vw";
    }

    .flytime {
        position: relative;
        white-space: nowrap;
        margin-top: 5px;
        text-align: center;
    }

    .flytime span {
        font-size: 12px;
        color: #aaaaaa;
    }

    /* 具体行程 */
    ul,
    li {
        /*做时间轴的线*/
        margin: 0;
        padding: 0;
    }

    .imageSize {
        font-size: 8px !important;
    }

    .last-info {
        padding: 0 0 -30px 0;
    }

    .layui-timeline {
        padding-left: 40%;
        padding-top: 30px;
        padding-bottom: 50px;
    }

    .layui-timeline-item {
        position: relative;
        padding-bottom: 100px;
        padding-right: 0px;
    }

    .layui-timeline-item-first {
        position: relative;
        padding-bottom: 100px;
        padding-right: 0px;
    }

    li {
        list-style: none;
    }

    .relative {
        color: #aaaaaa;
    }

    .layui-timeline-item:first-child::before {
        display: block;
    }

    .layui-timeline-item:last-child::before {
        content: "";
        position: absolute;
        top: 0;
        z-index: 0;
        height: 100%;
        border: 1px solid rgba(255, 255, 255, 0);
    }

    .layui-timeline-item::before {
        content: "";
        position: absolute;
        top: 0;
        z-index: 0;
        height: 100%;
        background: url("../assets/images/arrive_bak.png") repeat;
        width: 4px;
        /*border: 2px solid #349ffd;*/
        margin-left: 27px;
    }

    .layui-timeline-item:last-child::before {
        background: none;
    }

    .layui-timeline-item-first::before {
        content: "";
        position: absolute;
        top: 0;
        left: -1px;
        z-index: 0;
        height: 100%;
        border-left: 3px dashed #349ffd;
        margin-left: 28px;
    }

    .layui-timeline-axis {
        position: absolute;
        left: 23px;
        top: 0;
        z-index: 10;
        width: 20px;
        height: 20px;
        line-height: 20px;
        /*background-color: #fff;*/
        color: #5fb878;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
    }

    .layui-icon-image {
        position: relative;
        left: -5px;
        /*background: #fff;*/
        top: -20px;
    }

    .layui-icon {
        font-family: layui-icon !important;
        font-size: 16px;
        font-style: normal;
    }

    .layui-timeline-content {
        padding-left: 45px;
    }

    .layui-text {
        line-height: 22px;
        font-size: 15px;
    }

    .layui-timeline-title {
        font-size: 15px;
        position: relative;
        top: -5px;
        display: flex;
    }

    .layui-timeline-guide {
        color: #999;
        font-size: 10px;
        line-height: 14px;
    }

    .layui-timeline-guide img {
        width: 4px;
        height: 4px;
    }

    .layui-timeline-type {
        background: #0086fc;
        color: rgba(255, 255, 255, 0.9);
        font-size: 12px;
        width: 35px;
        text-align: center;
        margin-left: 5px;
        border-radius: 5px;
    }

    .circle-first {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px dashed #0086fc;
        background: #fff;
    }

    .circle {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px solid #0086fc;
        background-color: #0086fc;
    }

    .etime-first {
        font-size: 13px;
        color: #569fff;
        top: 45%;
        left: -5px;
        position: absolute;
    }

    .though-text {
        position: relative;
        top: 45px;
        font-size: 13px;
    }

    .though-item {
        position: absolute;
        left: 14px;
        top: 60px;
        border-radius: 5px;
        color: white;
        background-color: #569fff;
        margin: 0 auto;
        width: 18px;
        font-size: 15px;
        font-weight: 700;
        padding: 40px 5px;
        line-height: 24px;
        height: 50px;
    }

    .transit {
        position: absolute;
        left: -105px;
        display: block;
        width: 120px;
        text-align: right;
        font-size: 12px;
        color: #569fff;
    }

    .time-first {
        font-size: 13px;
        position: absolute;
        font-family: Source Han Sans SC;
        font-weight: 500;
        color: rgba(148, 168, 191, 1);
        left: -20px;
    }

    .time-top {
        position: absolute;
        top: -20px;
        left: -20px;
        font-size: 13px;
        font-family: Source Han Sans SC;
        font-weight: 500;
        color: rgba(148, 168, 191, 1);
    }

    .time-bottom {
        position: absolute;
        font-family: Source Han Sans SC;
        font-weight: 500;
        color: rgba(148, 168, 191, 1);
        top: 20px;
        left: -22px;
        font-size: 13px;
    }

    .layui-timeline-item:last-child {
        padding-bottom: 0;
    }

    .remind {
        margin: 10px;
        padding: 10px;
        font-size: 12px;
        border-radius: 3px;
        background-color: rgba(245, 187, 187, 0.24);
    }

    /* 游玩攻略  */
    .block-item {
        display: block;
        margin: 10px;
        cursor: pointer;
        /*box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);*/
        /*border-radius: 2px 2px 5px 5px;*/
        /*margin-bottom: 4px;*/
    }

    a {
        color: black;
    }

    .item-text {
        /* height:55px; */
        width: 100%;
    }

    .item-text .title {
        font-size: 15px;
        padding: 8px;
    }

    .item-text .intro {
        color: #999;
        text-indent: 20px;
        margin: 0 10px;
        font-size: 12px;
        padding-bottom: 10px;
        white-space: normal;
        word-wrap: break-word;
        word-break: break-all;
    }

    .rotate {
        transform: perspective(300px) rotateY(40deg);
    }
</style>
