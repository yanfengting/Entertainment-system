<template>
  <div v-if="is_sku" class="specification_mask2"  style="z-index: 11">
        <div class="specification_com2" @click.stop="is_sku==false" >
          <div class="productConten">
            <div class="product-delcom">
              <div class="header">
                <div class="img-wrap">
                  <img :src="thumbUrl" alt="">
                </div>
                <div class="main" >
                  <div class="price-wrap">
                    <p class="food-price"><strong>¥</strong>{{price}}<span>/份</span></p>
                  </div>
                  <div class="product-delcom" style="margin-left:-5px" v-if="i==-1">
                    <p style="">选择餐食种类</p>
                  </div>
                  <div class="product-delcom" style="margin-left:-5px" v-if="i!==-1">
                    <p style="">已选<span>{{type}}</span></p>
                    <p >{{description}}</p>
                  </div>
                </div>
                <a class="sku-close" @click="cancelMask" aria-label="关闭">
                </a>
              </div>
            </div>

            <div class="product-delcom" >
              <p style="margin:15px 5px; font-size: 14px;">种类</p>
              <ul class="product-footerlist clearfix">
                <li
                  v-for="(l,index) in skuArr"
                  v-bind:key="index"
                  @click="specificationBtn(l,index)"
                  :class="{orange:i === index}"
                >{{l.type}}</li>
              </ul>
            </div>
          </div>

          <div type="flex" class="van-row--flex sku_specification2">
            <div class="van-col van-col--12" :span="12" >购买数量</div>
            <div class="van-col van-col--12" :span="12" style="text-align: right">
              <button class="van-stepper__plus" v-on:click="decrement">-</button>
              <input type="text" class="van-stepper__plus" size="1" v-model="num" ref="num">
              <button class="van-stepper__plus" @click="increment">+</button>
            </div>
          </div>
          <div type="flex" class="van-row--flex sku_specification3">
            <div class="van-col van-col--12" :span="12">总价</div>
            <div v-if="i!==-1" class="van-col van-col--12 number" style="text-align: right">
              <div id="number" class="number"  style="height: auto; border: 1px solid #fff;  text-align: right;"><strong>¥</strong>{{countPrice}}</div>
            </div>
          </div>
          <div type="flex" class="van-row--flex sku_specification3" >
            <div class="van-col van-col--12" :span="12" style="line-height: 45px;">您的座位号</div>
            <div class="van-col van-col--12 number" style="text-align: right">
              <input id="number" type="text" v-model="newseat" ref="input">
            </div>
          </div>
          <cube-button class="foodBtn" @click="sku_addCart" :primary="true" v-show="i!=-1">提交订单</cube-button>
          <cube-button class="foodBtn1"  :primary="true" v-show="i===-1">提交订单</cube-button>
        </div>
      </div>
</template>
<script>
  import registryToast from '../common/toast/index'

  export default {
    props: {
      seat: {
        type: String
      },
      food_sku: {
        type: Boolean
      }
    },
    data() {
      return {
        newseat: this.seat,
        price: null,
        type: null,
        thumbUrl: null,
        description: null,
        i: -1,
        skuArr: [],
        num: 1,
        is_sku: this.issku, // 规格弹窗
        countPrice: 0
      }
    },

    watch: {
      food_sku: function (val, oldVal) {
        this.is_sku = val
      }
    },
    created: function() {
    // this.getParams()
    // 接收传给main页面的表单数据
    var userInfo = localStorage.getItem('userInfo')
    this.userInfo = JSON.parse(userInfo) // 转为JSON
    // console.log('tel: ' + this.userInfo.tel)
    this.axios({
        method: 'get',
        url: 'api/food/list'
      }
    ).then((res) => {
      // console.log(res)
      if (res.status === 200) {
        if (res.data.data.length !== 0) {
          this.skuArr = res.data.data
          this.price = res.data.data[0].price
          this.type = res.data.data[0].type
          // this.foodtype = res.data.data.type
          this.thumbUrl = res.data.data[0].thumbUrl
          this.name = res.data.data[0].type
          this.description = res.data.data[0].description
          this.i = -1
        } else {
          this.is_sku = false
          console.log('没有餐食数据')
        }
      } else {
        console.log('餐食数据获取失败，请刷新重试')
      }
    })
  },
    methods: {
      toast() {
        registryToast.showToast('请选择种类')
      },
      increment() {
        this.num++
        this.countPrice = Number(this.countPrice) + this.price
      },
      decrement() {
        if (this.num <= 1) {
          // alert('受不1了啦，宝贝不能再减少啦')
          this.num = 1
        } else {
          this.num--
          this.countPrice = this.Subtr(this.countPrice, this.price)
        }
      },
      Subtr(arg1, arg2) { // 减法
        var r1, r2, m, n
        try {
          r1 = arg1.toString().split('.')[1].length
        } catch (e) {
          r1 = 0
        }
        try {
          r2 = arg2.toString().split('.')[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2))
        n = (r1 >= r2) ? r1 : r2
        return ((arg1 * m - arg2 * m) / m).toFixed(n)
      },
      // 点餐食
      addCart() {
        // this.is_sku = true
        this.axios({
          method: 'get',
          url: 'api/food/list'
        }).then((res) => {
          // console.log(res)
          if (res.status === 200) {
            if (res.data.data !== null) {
              this.is_sku = true
              // console.log(this.skuArr)
              this.skuArr = res.data.data
              this.description = res.data.data[0].description
              this.thumbUrl = res.data.data[0].thumbUrl
              this.type = res.data.data[0].type
              this.i = -1
            } else {
              this.is_sku = false
              this.$parent.getRouterInfo({
                food_sku: false,
                demand_sku: false,
                upgrade_sku: false
              })
            }
          } else {
            console.log('餐食数据获取失败，请刷新重试')
          }
        })
        // 获取我的订单
        this.axios({
          method: 'get',
          url: '/api/order/list',
          headers: { 'token': this.userInfo.token }
        }).then((res) => {
          // console.log('我的订单')
          // console.log(res)
          if (res.status === 200) {
            // this.brandArr = res.data.data
            // console.log(this.brandArr)
          } else {
            console.log('数据获取失败，请刷新重试')
          }
        })
      },
      // 点击蒙层取消
      cancelMask: function () {
        this.food_sku = false
        this.$parent.cancelMask()
      },
      // 选择种类
      specificationBtn: function(item, index) {
        this.i = index // 点击选中
        this.price = item.price
        this.countPrice = this.price
        this.name = item.name
        this.type = item.type
        this.thumbUrl = item.thumbUrl
        this.num = 1
        // console.log(index)
        // console.log(item.name)
      },
      // 提交订单
      sku_addCart(item) {
        // this.seat = this.$refs.input.value // input框接收一个传过来的座位号，编辑以后获取
        // console.log(this.newseat)
        this.$emit('getCalled', this.newseat)
        this.newnum = this.$refs.num.value
        // console.log('价钱 ' + this.price)
        // console.log('种类 ' + this.type)
        // console.log('座位号 ' + this.seat)
        // console.log('数量 ' + this.newnum)
        this.is_sku = false
        if (this.i === -1) {
        } else {
          this.axios({
            method: 'post',
            url: '/api/food/submit',
            params: {
              'seatNo': this.seat,
              'type': this.type,
              'num': this.newnum,
              'mobile': this.userInfo.tel
            }
          }).then((res) => {
              if (res.data.status === 200) {
                // 弹框提交成功
                this.$dialog('订单提交成功', 'my-order')
              } else {
                this.$dialog('网络或系统错误，请重新提交', 'my-error')
              }
            }
            , function (err) {
              console.log(err)
            })
        }
      },
      /* setInputStatus() {
        let _self = this
        this.axios.get('/api/4g/status', { emulateJSON: true })
          .then(function (response) {
            if (response.data.status === 200) {
              // 登录后跳转的页面
              _self.readonly = false
            } else {
              _self.readonly = true
            }
            console.log(_self.readonly)
          }, function (error) {
            console.log('4g请求失败', error)
          })
      }, */
      setInputStatus() {
        let _self = this
        this.axios.get('/api/4g/status', { emulateJSON: true })
          .then(function (response) {
            if (response.data.status === 200) {
              // 登录后跳转的页面
              _self.readonly = false
            } else {
              _self.readonly = true
            }
            // console.log(_self.readonly)
          }, function (error) {
            console.log('4g请求失败', error)
          })
      },
      showSuccess() {
        this.$dialog('订单提交成功', 'my-order')
      },
      showError(msg) {
        let msgStr = '网络或系统错误，请重新提交'
        if (msg) {
          msgStr = msg
        }
        this.$dialog(msg, 'my-error')
      }
    }
  }
</script>
<style lang="stylus">
  .orange {
    /*background-color: snow;*/
    /*color: white;*/
  }

  .product-delcom .header {
    margin-top: 10px;
  }

  .cab-common .cube-btn {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .productConten p {
    height: 18px;
    text-align: left;
  }

  .product-footerlist {
    margin-top: 10px;
  }

  .product-footerlist li {
    /*border: 1px dashed orange;*/
    // border-radius: 5px;
    // color: orange;
    text-align: center;
    padding: 5px 10px;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .product-line {
    line-height 20px;
  }

  .product-footerlist li.productActive {
    background-color: #007fff;
    color: #007fff;
  }

  .food div.img-wrap {
    height: 100px;
  }

  .product-footerlist li.noneActive {
    background-color: #ccc;
    opacity: 0.4;
    color: #000;
    pointer-events: none;
  }

  .item {
    width: 100%;
    text-align: center;
  }

  .specification_mask2 {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 111111;
  }

  .specification_com2 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    border-radius: 10px 10px 0px 0px;
  }

  .sku_specification3 {
    /*border-top: 1px solid #EEEEEE*/
    border-bottom 1px solid #EEEEEE
    box-sizing: border-box;
    padding: 5px 0px;
    margin auto 15px;
  }

  .van-row--flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }

  .van-col--12 {
    width: 50%;
  }

  .van-col {
    float: left;
    text-align: left;
    font-size: 15px;
    line-height: 25px;
    box-sizing: border-box;
  }

  .van-stepper__plus {
    width: 30px;
    height: 26px;
    box-sizing: border-box;
    /*background-color: #fff;*/
    /*background #ebedf0*/
    border: 1px solid #ffff;
    position: relative;
    /*padding: 5px;*/
    vertical-align: middle;
  }

  .van-stepper__input {
    width: 30px;
    height: 20px;
    padding: 1px;
    border: 1px solid #ffffff;
    /*border-width: 1px 0;*/
    border-radius: 0;
    box-sizing: content-box;
    color: #7d7e80;
    font-size: 15px;
    vertical-align: middle;
    text-align: center;
    -webkit-appearance: none;
  }

  #number {
    height: 40px;
    width: 100px;
    border-radius: 3px;
    float: right;
    border: 1px solid #ebedf0;
    text-align: center;
    font-size: 20px;
  }

  .choose_sku2 {
    max-height: 300px;
    overflow: scroll;
  }

  .sku-close {
    width: 30px;
    display: block;
    float: right;
    text-align: right;
    padding: 10px;
  }

  .sku_title2 {
    font-size: 15px;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: left;
  }

  .sku_ul2 {
    display: flex;
    flex-wrap: wrap;
  }

  ol, ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .sku_li2 {
    box-sizing: border-box;
    padding: 5px 10px;
    margin: 0 0.15rem 0.15rem 0;
    border-radius: 5px;
    font-size: 15px;
  }

  .productActive {
    background: #ffd100;
  }

  .foodBtn {
    color: #fff;
    /*background: #06f;*/
    background: linear-gradient(to bottom, rgb(52, 159, 253), rgb(2, 126, 234));
    width: 92%;
    margin: 5px auto;
  }

  .foodBtn1 {
    color: #fff;
    /*background: #06f;*/
    background: linear-gradient(to bottom, rgb(52, 159, 253), rgb(2, 126, 234));
    width: 92%;
    margin: 10px auto;
  }

  .foodBtn1:active {
    background: #06f;
  }

  .foodBtn:active {
    background: #06f;
  }
</style>
