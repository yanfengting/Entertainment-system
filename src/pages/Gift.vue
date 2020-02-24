<template>
  <div style="box-sizing:border-box;">
    <Nav></Nav>
    <swiper></swiper>
    <div class="gtype-3 clearfix">
      <li class="gtype-item">
        <div class="gtype-icon" @click="hangxian">
          <img src="../assets/images/xianhang.png"
               alt>
        </div>
        <div class="gtype-txt">航鲜</div>
      </li>
      <li class="gtype-item">
        <div class="gtype-icon"  @click="wenchuang">
          <img src="../assets/images/wenchuang.png"
               alt>
        </div>
        <div class="gtype-txt">文创</div>
      </li>
      <li class="gtype-item">
        <div class="gtype-icon"  @click="lvyou">
          <img src="../assets/images/lvyou.png"
               alt>
        </div>
        <div class="gtype-txt">旅游</div>
      </li>
    </div>
    <div class="gcontent">
      <p class="gift-title">精品推荐</p>

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
      <!-- <div style="position: relative;display: flex" >
        <ul style="clear: both;display: block; width:100%;">
          <li  v-for="(item, index) in giftArr" :key="index"
              @click="shopDetail" style="margin:5px;;float:left;width:47%;border-radius:10px; box-shadow:0px 3px 8px rgba(0,45,128,0.2);" >
              <div class="list-img">
                <img src="//img.alicdn.com/imgextra/i4/815569543/TB2.w2_dFXXXXbQXXXXXXXXXXXX_!!815569543.jpg_640x640q85s150_.webp"
                 data-url="http://img1.shikee.com/try/2016/06/19/09430120929215230041.jpg_220x220.jpg">
              </div>
              <div class="list-mes">
                <li class="list-title">新年礼物升辉飞机模型国航南航东航波音空客380仿真大客机模型</li>
              </div>
              <div class="list-mes-item list-mes">
                <div style="color: #FF5238;margin-bottom:10px;">
                  <span class="list-price" >
                    <em>¥</em> 34.7
                  </span>             
                </div>
              </div>
            </li>
        </ul>
      </div> -->

      <!-- <article class="m-list list-theme2 clearfix" v-for="(item, index) in giftArr" :key="index">
        <a @click="shopDetail"
           class="list-item">
          <div class="list-img">
            <img v-bind:src="'http://10.191.1.1/'+ item.urlPoster">
          </div>
          <div class="list-mes">
            <li class="list-title">{{item.name}}</li>
            <div class="list-mes-item">
              <div style="color: #FF5238;">
                <span class="list-price" v-if="item.isfree === 0">
                  <em>¥</em>{{item.price}}
                </span>
                <span class="list-price" v-else>
                  免费
                </span>
              </div>
            </div>
          </div>
        </a>
        <a @click="shopDetail"
           class="list-item">
          <div class="list-img">
            <img src="//img.alicdn.com/imgextra/i4/815569543/TB2.w2_dFXXXXbQXXXXXXXXXXXX_!!815569543.jpg_640x640q85s150_.webp"
                 data-url="http://img1.shikee.com/try/2016/06/19/09430120929215230041.jpg_220x220.jpg">
          </div>
          <div class="list-mes">
            <p class="list-title">新年礼物升辉飞机模型国航南航东航波音空客380仿真大客机模型</p>
            <div class="list-mes-item">
              <div>
                <span class="list-price">
                  <em>¥</em>34.7
                </span>
              </div>
            </div>
          </div>
        </a>
      </article> -->
    </div>
  </div>
</template>
<script>
import Nav from '../components/common/Nav.vue'
import Swiper from '../components/main/Swiper.vue'
export default {
  data() {
    return {
      giftArr: []
    }
  },
  // 挂载的时候获取列表
  mounted() {
    this.axios.get('/api/item/list').then(res => { // url即在mock.js中定义的
      console.log(res.data) // 打印一下响应数据
    })
  },
  created: function () {
    console.log('here')
    var userInfo = localStorage.getItem('userInfo')
    this.userInfo = JSON.parse(userInfo) // 转为JSON
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
    hangxian () {
      this.$router.push({ path: '/giftXianHang' })
    },
    wenchuang() {
      this.$router.push({ path: '/giftWenChuang' })
    },
    lvyou() {
      this.$router.push({ path: '/giftLvYou' })
    },
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
    Nav,
    Swiper
  }
}
</script>
<style scoped>

.gtype-3 {
  padding: 20px 0 0;
  display: flex;
  justify-content: space-between;
  padding-left: 25px;
  /*box-shadow: rgb(197, 196, 196) 0px 0px 10px;*/
}

/* .gtype-3 .gtype-item {
  width: 31%;
} */
.gtype-item {
  text-align: center;
  width: 25%;
  float: left;
  position: relative;
  z-index: 0;
  padding: 10px 0 0;
  font-size: 13px;
}
.gtype-icon {
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
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
p {
  padding: 0;
  margin: 0;
}
.gcontent {
  padding: 5px 5px 5px 7px;
  box-sizing: border-box;
  color: #95a9bf;
}
.gift-title {
  margin: 10px 0 10px 10px;
  font-size: 14px;
}
.m-list .list-theme2 {
  box-sizing: border-box;
  display: flex;
}
.list-theme2 .list-item {
  padding: 10px;
  width: 43%;
  /* float: left; */
  padding-top: 5px;
}
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
.list-theme2 .list-item .list-mes {
  display: block;
  padding: 2px;
}
.list-theme2 .list-item .list-mes .list-title {
  color: black;
  font-size: 12px;
  line-height: 15px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
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
