<template>
  <div class="arilineApp">
    <Nav></Nav>
    <!-- 游玩攻略 -->
    <!--<a class="block-item ">-->
    <!--<div class="image-ctn"-->
    <!--width="100%">-->
    <!--<img width="100%"-->
    <!--src="http://pic.carnoc.com/file/180712/18071206115178.jpg">-->
    <!--<div class="item-text">-->
    <!--<div class="title">重庆->深圳->上海</div>-->
    <!--<p class="intro">华夏航空：近期公司计划在东南亚“一带一路”国家新增部分国际航线华夏航空：近期公司计划在东南亚“一带一路”国家新增部分国际航线</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</a>-->
    <a class="block-item ">
      <div class="ariline-image" v-for="(l,index) in salesArr" @click="arilie_detail(l.title,l.titleImg,l.content,l.descrip)"
           width="100%" v-bind:key="index">
        <img width="100%"
             style="height:60%;border-top-right-radius: 5px;border-top-left-radius: 5px;box-shadow: 0 1.176vw 3.529vw rgba(0,0,0,.08);"
             v-bind:src="l.titleImg">
        <div class="ariline-item-text">
          <div class="ariline-title">{{l.title}}</div>
          <div class="descrip">{{l.descrip}}</div>
        </div>
      </div>
    </a>
    <div class="bottom-desp" v-show="bottomshow">
      <hr>
      <span>我是有底线的哦</span>
      <hr>
    </div>
    <!--<a class="block-item ">-->
    <!--<div class="image-ctn"-->
    <!--width="100%">-->
    <!--<img width="100%"-->
    <!--src="http://pic.carnoc.com/file/190320/19032002442524.jpg">-->
    <!--<div class="item-text">-->
    <!--<div class="title">重庆->深圳->上海</div>-->
    <!--<p class="intro">华夏航空：近期公司计划在东南亚“一带一路”国家新增部分国际航线</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</a>-->
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'

  export default {
    data() {
      return {
        salesArr: [],
        bottomshow: false
      }
    },
    created: function () {
      var userInfo = localStorage.getItem('userInfo')
      this.userInfo = JSON.parse(userInfo) // 转为JSON
      this.axios({
        method: 'get',
        url: '/api/sales/view',
        headers: {'token': this.userInfo.token}
      }).then((res) => {
        console.log(res)
        if (res.data.status === 200) {
          this.salesArr = res.data.data
          this.bottomshow = true
          console.log(this.salesArr)
        } else if (res.data.status === 401) {
          this.$router.replace('/')
        } else {
          console.log('数据获取失败，请刷新重试')
        }
      })
    },
    methods: {
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
      }
    },
    components: {
      Nav
    }
  }
</script>
<style scoped>
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

  .arilineApp {
    background: #fcfcfc;
    height: 100%;
  }

  /* 游玩攻略  */
  .item-content {
    margin: 10px;
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

  .ariline-item-text {
    padding: 4px 0px;
    display: flex;
    flex-direction: column;
    align-items: last;
  }

  .ariline-item-text .ariline-title {
    font-size: 15px;
    text-align: left;
    padding: 15px 0px 5px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    /*padding: 8px;*/
  }

  .ariline-item-text .descrip {
    color: #999;
    /*height: 20px;*/
    line-height: 16px;
    margin: 0 10px;
    font-size: 12px;
    padding-bottom: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .ariline-image {
    min-height: 220px;
    background-color: #ffffff;
    box-shadow: 0 1.176vw 3.529vw rgba(0, 0, 0, .08);
    /*border-radius: .588vw .588vw 1.471vw 1.471vw;*/
    margin: 20px auto;
  }
</style>
