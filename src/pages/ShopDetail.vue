<template>
  <div >
    <Nav></Nav>
    <!-- 轮播图 -->
    <cube-slide :speed="200" ref="slide"  >
      <!-- <cube-slide-item>
        <a ><img src="../assets/images/flight1.jpg"></a>
      </cube-slide-item> -->
      <cube-slide-item>
        <a ><img src="../assets/images/flight2.jpg"></a>
      </cube-slide-item>
      <cube-slide-item>
        <a ><img src="../assets/images/flight3.jpg"></a>
      </cube-slide-item>
    </cube-slide>

    <!-- <cube-slide :speed="200" ref="slide" :data="items" @change="changePage">
      <cube-slide-item
        v-for="(item, index) in items"
        :key="index"
        @click.native="clickHandler(item, index)"
      >
        <a >
          <img :src="item.image">
        </a>
      </cube-slide-item>
    </cube-slide> -->

    <div class="module-price">
      <div class="real-price">
        <span>
          <strong>¥</strong> {{shopdetailArr.price}}
        </span>
      </div>
    </div>

    <div class="module-price">
      <p>{{shopdetailArr.name}}</p>
    </div>
    <div class="module-price" v-for="(item, index) in shopdetailArr.thumbUrls" :key="index">
      <img src="item" alt="">
    </div>

    <div class="module-price">
      <p
        class="module-content"
      >{{shopdetailArr.description}}</p>
    </div>

    <div style="display:flex">
      <button @click="saveLink" class="savegift blue">保存链接</button>
      <button @click="buyGoods" class="savegift orange">购买商品</button>
    </div>

    <!-- 弹框 -->
    <div v-if="is_sku" class="specification_mask2" style="z-index: 11">
        <div class="specification_com2" @click.stop="is_sku==false">
          <div class="productConten">
            <div class="product-delcom">
              <div class="header">
                <div class="img-wrap">
                  <img src="../assets/images/flight3.jpg" alt="">
                    <!-- <img src="//img.alicdn.com/imgextra/i1/3201286958/TB2IT6BX5CYBuNkHFCcXXcHtVXa_!!3201286958.jpg_640x640q85s150_.webp" alt=""> -->
                  <!-- <img :src="thumbURL" alt=""> -->
                </div>
                <div class="main">
                  <div class="price-wrap">
                    <!-- <p class="">￥{{price}}</p> -->
                    <p><strong>¥</strong> {{shopdetailArr.price}}</p>
                  </div>
                  <li>{{shopdetailArr.name}}</li>
                </div>
                <a class="sku-close" @click="cancelMask" aria-label="关闭">
                  <!-- <i class="iconfont icon-chahao"></i> -->
                </a>
              </div>
            </div>
          </div>

          <div type="flex" class="van-row--flex sku_specification2">
            <div class="van-col van-col--12" :span="12">购买数量</div>
            <div class="van-col van-col--12" :span="12" style="text-align: right">
              <button class="van-stepper__plus" v-on:click="decrement">-</button>
              <input type="text" class="van-stepper__input" size="1" v-model="num" ref="num">
              <button class="van-stepper__plus" @click="increment">+</button>
            </div>
          </div>
          <div type="flex" class="van-row--flex sku_specification2">
            <div class="van-col van-col--12" :span="12">您的座位号</div>
            <div class="van-col van-col--12 number" style="text-align: right">
              <input id="number" type="text" v-model="newseat" ref="input">
            </div>
          </div>
          <cube-button @click="goods_addCart" class="demandBtn1"  :primary="true" >购买商品</cube-button>
          <!-- <cube-button @click="goods_addCart" :primary="true">提交订单</cube-button> -->
        </div>
      </div>
  </div>
</template>
<script>
import Nav from '../components/common/Nav.vue'

export default {
  data() {
    return {
      is_sku: false, // 规格弹窗
      price: null,
      thumbURL: null,
      i: 0,
      num: 1,
      skuArr: [],
      items: [
        {
          url: 'http://www.didichuxing.com/',
          image:
            '../assets/images/flight1.jpg'
        },
        {
          url: 'http://www.didichuxing.com/',
          image:
            '../assets/images/flight2.jpg'
        },
        {
          url: 'http://www.didichuxing.com/',
          image:
            '../assets/images/flight3.jpg'
        }
      ],
      destArr: [],
      newseat: this.$route.query.seat,
      shopdetailArr: []
    }
  },
  created: function() {
     let newseat = this.$route.query.seat
     let id = this.$route.query.id
     console.log(id)
    //  let _this = this
     this.getVideo(id)
  },
  methods: {
    getVideo(id) {
      // let _this = this
      // 参数：city mobile
      this.axios.get('/api/item/' + id).then(
        res => {
          // console.log(res)
          if (res.status === 200) {
            this.shopdetailArr = res.data.data
            console.log(this.shopdetailArr)
          } else {
            console.log('数据获取失败，请刷新重试')
          }
        },
        function(err) {
          console.log(err)
        }
      )
    },
    saveLink() {},
    buyGoods() {
         this.is_sku = true
    //   let data = new FormData()
    //   data.append('seatNo', this.seat)
    //   // data.append('item', this.type)
    //   this.axios.post('/api/item/submit', data).then(
    //     res => {
    //       console.log(res)
    //     },
    //     function(err) {
    //       console.log(err)
    //     }
    //   )
    },
    // 点击蒙层取消
    cancelMask: function() {
      this.is_sku = false
    },
    increment() {
      this.num++
    },
    decrement() {
      if (this.num <= 1) {
        // alert('受不1了啦，宝贝不能再减少啦')
        this.num = 1
      } else {
        this.num--
      }
    },
    goods_addCart() {
        this.is_sku = false
        this.$dialog('订单提交成功', 'my-order')
    },
    changePage(current) {
      // console.log('当前轮播图序号为:' + current)
    },
    clickHandler(item, index) {
      // console.log(item, index)
    }
  },
  components: {
    Nav
  }
}
</script>
<style>

.module-price {
  padding: 5px 20px;
}
.module-price .real-price {
  color: #FF5238;
  height: 35px;
  line-height: 35px;
  font-size: 24px;
}
.module-price {
    line-height: 20px;
  font-size: 15px;
}
.module-content {
  font-size: 12px;
  line-height: 20px;
  text-indent: 2em;
  margin: 20px;
}

.savegift {
  width: 50%;
  padding: 10px;
  border: none;
  color: white;
}
.blue {
  background-color: rgb(63, 160, 240);
}
/*.orange {*/
  /*background-color: #ffffff !important;*/
/*}*/
</style>
