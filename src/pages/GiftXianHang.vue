<template>
  <div style="box-sizing:border-box;">
    <Nav></Nav>
    <div class="gtype-3-type">
      <div class="gtype-item-type">
        <div class="gtype-icon-type">
          <img src="../assets/images/xianhang.png"
               alt>
        </div>
      </div>
      <div class="gtype-item-type-right">
        <div class="type-title">鲜航</div>
        <div class="type-info">华夏云集(重庆)文化传媒有限公司于壹零壹陆年注册成立，主要经营设计、制作、代理、发布国内广告等。</div>

      </div>
    </div>
    <div class="gcontent">
      <div style="position: relative;display: flex" >
        <ul style="clear: both;display: block; width:100%;">
          <li  v-for="(item, index) in giftArr" :key="index"
              @click="shopDetail" style="margin:5px;;float:left;width:47%;border-radius:10px; box-shadow:0px 3px 8px rgba(0,45,128,0.2);" >
              <div class="list-img">
                <img v-bind:src="item.urlPoster">
              </div>
              <div class="list-mes">
                <li class="list-title">{{item.name}}</li>
              </div>
              <div class="list-mes-item list-mes">
                <div style="color: #FF5238;margin-bottom:10px;">
                  <span class="list-price" v-if="item.isfree === 0">
                    <strong>¥</strong>{{item.price}}
                  </span>
                  <span class="list-price" v-else>
                    免费
                  </span>
                </div>
              </div>
            </li>
        </ul>
      </div>
      <!--<p class="gift-title">精品推荐</p>-->
      <!-- <article class="m-list list-theme2 clearfix" v-for="(item, index) in giftArr" :key="index">
        <div style="position: relative;display: flex" >
        <ul style="clear: both;display: block; width:100%;">
          <li  v-for="(item, index) in giftArr" :key="index"
              @click="shopDetail" style="margin:5px;;float:left;width:47%;border-radius:10px; box-shadow:0px 3px 8px rgba(0,45,128,0.2);" >
              <div class="list-img">
                <img v-bind:src="'http://10.191.1.1/'+ item.urlPoster">
              </div>
              <div class="list-mes">
                <li class="list-title">{{item.name}}</li>
              </div>
              <div class="list-mes-item list-mes">
                <div style="color: #FF5238;margin-bottom:10px;">
                  <span class="list-price" v-if="item.isfree === 0">
                    <em>¥</em>{{item.price}}
                  </span>
                  <span class="list-price" v-else>
                    免费
                  </span>
                </div>
              </div>
            </li>
        </ul>
      </div>
      </article> -->
    </div>
  </div>
</template>
<script>
import Nav from '../components/common/Nav.vue'

export default {
  data() {
    return {
      giftArr: []
    }
  },
  // 挂载的时候获取列表
  // mounted() {
  //   this.axios.get('/api/item/list').then(res => { // url即在mock.js中定义的
  //     console.log(res.data) // 打印一下响应数据
  //   })
  // },
  created: function () {
    var userInfo = localStorage.getItem('userInfo')
    this.userInfo = JSON.parse(userInfo) // 转为JSON
    console.log('here')
    this.axios({
      method: 'get',
      url: '/api/item/list?type=文创'
    }).then((res) => {
      console.log(res)
      if (res.data.status === 200) {
        this.giftArr = res.data.data
        // console.log(this.skuArr)
        //   this.price = res.data.data[0].price
        //   this.thumbURL = res.data.data[0].thumbURL
        //   this.classType = res.data.data[0].classType
        //   this.description = res.data.data[0].description
        //   this.i = 0
      } else if (res.data.status === 401) {
        this.$router.replace('/')
      } else {
        console.log('数据获取失败，请刷新重试')
      }
    })
  },
  methods: {
    shopDetail () {
      this.$router.push({
        path: '/shopdetail',
        query: {
          seat: this.userInfo.seat
        }
      })
    }
  },
  components: {
    Nav
  }
}
</script>
<style scoped>
.gtype-3-type {
  padding: 20px 0 0 10px;
  display: flex;
  justify-content: space-between;
  /*padding-left: 25px;*/
  /*box-shadow: rgb(197, 196, 196) 0px 0px 10px;*/
}

/* .gtype-3 .gtype-item {
  width: 31%;
} */
.gtype-item-type {
  text-align: center;
  width: 32%;
  float: left;
  position: relative;
  z-index: 0;
  font-size: 13px;
}
.gtype-item-type-right {
  width: 65%;
  float: left;
  position: relative;
  z-index: 0;
  padding: 10px 0 0;
  font-size: 13px;
  line-height: 20px;
}
.type-title{
  font-size: 16px;
}
.type-info{
  color:#95a9bf;
}
.gtype-icon-type {
  height: 105px;
  display: flex;
  /*align-items: center;*/
  /*justify-content: center;*/
}
.gtype-icon img {
  width: 100px;
}
.gtype-txt {
  word-wrap: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  color: #95a9bf;
  padding: 14px 10px 0px 10px;
  line-height: 22px;
}

/* 精品推荐 */
.list-img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.list-img img {
  width: 100%;
  height: 100%;
  /* height: 95px; */
  /* margin-top: -50%; */
  background-color: #fff;
  border: none;
}
.list-mes-item{
  display: block;
}

.list-title {
  margin-left:10px;
  margin-right:10px;
  margin-bottom:5px;
  font-size: 13px;
  color: #333333;
  line-height:20px;
}
.list-price {
  margin-left:10px;
  margin-right:10px;
  font-size: 15px;
  font-family:Source Han Sans SC;
  font-weight:bold;
  color:rgba(255,82,56,1);
}
</style>
