<template>
  <div class="arilineApp">
    <Nav id="airline_detail"></Nav>
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
    <a class="block-item" style="margin-left: 0px; margin-right: 0px;">
      <div class="image-ctn"
           width="100%">
        <div class="airline-title">{{title}}</div>
        <img width="100%"
             v-bind:src="titleImg">
        <div class="item-text">
          <div class="detail-intro" v-html="content"></div>
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
        title: '',
        titleImg: '',
        content: '',
        descrip: ''
      }
    },
    mounted: function () {
      let airlineDetail = sessionStorage.getItem('airlineDetail')
      let airlineDetailJson = JSON.parse(airlineDetail)
      let _self = this
      this.title = airlineDetailJson.title
      this.titleImg = airlineDetailJson.titleImg
      setTimeout(function () {
        _self.content = airlineDetailJson.content
        window.scrollTo(0, 0)
      }, 1000)
      this.descrip = airlineDetailJson.descrip
    },
    components: {
      Nav
    }
  }
</script>
<style scoped>
  /* 游玩攻略  */
  .item-content {
    margin: 10px;
  }

  .image-ctn {
    padding: 10px;
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

  .airline-title {
    font-size: 15px;
    height: auto;
    text-align: center;
    /*padding: 10px 8px 8px 8px;*/
    margin: 10px 8px 8px 8px;
  }

  .item-text .detail-intro {
    color: #999;
    /*text-indent: 20px;*/
    /*margin: 0 10px;*/
    font-size: 12px;
    padding-bottom: 10px;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
  }


</style>
