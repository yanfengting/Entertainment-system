<template>
  <div v-if="is_sku" class="specification_mask2" style="z-index: 11">
    <div class="specification_com2" @click.stop="is_sku==false">
      <div class="productConten">
        <div class="product-delcom demand">
          <div class="header">
            <div class="img-wrap">
              <img :src="thumbUrl" alt>
            </div>
            <div class="main">
              <div class="product-delcom" style="margin-left:-10px;margin-left:-10px;position: absolute;" v-if="i==-1">
                <p style="">选择种类</p>
              </div>
              <div class="product-delcom" style="margin-left:-10px;margin-left:-10px;position: absolute;" v-if="i!==-1">
                <p style="">已选<span>{{type}}</span></p>
                <p >{{description}}</p>
              </div>
            </div>
            <a class="sku-close" @click="cancelMask" aria-label="关闭">
              <!--<i class="iconfont icon-chahao"></i>-->
            </a>
          </div>
        </div>
        <div class="product-delcom product-line" style="text-align: left;color: red;padding-top: 0px;">
          根据中国民航法规，起飞后20分钟，落地前40分钟及颠簸时，乘务员无法为您提供服务，衷心希望得到您的理解
        </div>
        <div class="product-delcom" style="margin-top: 0;">
          <p style="margin:15px 5px; font-size: 14px;">种类</p>
          <ul class="product-footerlist clearfix">
            <li
              v-for="(l,index) in skuArr"
              v-bind:key="index"
              @click="specificationBtn(l,index)"
              :class="{orange:i === index}"
            >{{l.type}}
            </li>
          </ul>
        </div>
      </div>

      <div type="flex" class="van-row--flex sku_specification2" style="">
        <div class="van-col van-col--12" :span="12">数量</div>
        <div class="van-col van-col--12" :span="12" style="text-align: right">
          <button class="van-stepper__plus" v-on:click="decrement">-</button>
          <input type="text" class="van-stepper__plus" size="1" v-model="num" ref="num">
          <button class="van-stepper__plus" @click="increment">+</button>
        </div>
      </div>
      <div type="flex" class="van-row--flex sku_specification3">
        <div class="van-col van-col--12" :span="12" style="line-height: 45px;">您的座位号</div>
        <div class="van-col van-col--12 number" style="text-align: right">
          <input id="number" type="text" v-model="newseat" ref="input">
        </div>
      </div>

      <template v-if="i!==-1">
        <cube-button class="demandBtn" @click="sku_addCart" :primary="true">呼唤乘务员</cube-button>
      </template>
      <template v-else>
        <cube-button class="demandBtn" @click="toast" :primary="true">呼唤乘务员</cube-button>
      </template>
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
      demand_sku: {
        type: Boolean
      }
    },
    data() {
      return {
        newseat: this.seat,
        description: null,
        thumbUrl: null,
        i: -1,
        skuArr: [],
        // price: '',
        num: 1,
        is_sku: this.issku, // 规格弹窗
        readonly: true
      }
    },

    watch: {
      demand_sku: function (val, oldVal) {
        this.is_sku = val
      }
    },
    created: function () {
      this.setInputStatus()
      var userInfo = localStorage.getItem('userInfo')
      this.userInfo = JSON.parse(userInfo) // 转为JSON
      // console.log('tel: ' + this.userInfo.tel)
      this.axios({
          method: 'get',
          url: '/api/callbell/list'
        }
      ).then((res) => {
        // console.log(res)
        if (res.status === 200) {
          // res.data.data != null    data 不等于空 只是数组是空的而已
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
          }
        } else {
          console.log('callbell数据获取失败，请刷新重试')
        }
      })
    },
    methods: {
      toast() {
        registryToast.showToast('请选择种类')
      },
      increment() {
        this.num++
      },
      decrement() {
        if (this.num <= 1) {
          this.num = 1
        } else {
          this.num--
        }
      },
      // 点呼唤铃
      addCart() {
        // this.is_sku = true
        this.axios({
          method: 'get',
          url: 'api/callbell/list'
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
            console.log('呼唤铃数据获取失败，请刷新重试')
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
        this.demand_sku = false
        this.$parent.cancelMask()
      },
      // 选择种类
      specificationBtn: function (item, index) {
        this.i = index // 点击选中
        this.description = item.description
        this.type = item.type
        this.thumbUrl = item.thumbUrl
        // console.log(index)
        // console.log(item.type)
      },
      // 提交订单
      sku_addCart(item) {
        let _this = this
        this.$emit('getCalled', this.newseat) // input框接收一个传过来的座位号，编辑以后获取
        this.newnum = this.$refs.num.value
        this.is_sku = false
        if (this.i === -1) {
        } else {
          this.axios({
            method: 'post',
            url: '/api/callbell/submit',
            params: {
              'seatNo': this.newseat,
              'type': this.type,
              'num': this.newnum,
              'mobile': this.userInfo.tel
            },
            headers: { 'token': this.userInfo.token }
          }).then((res) => {
            if (res.data.status === 200) {
              // 弹框提交成功
              _this.showSuccess()
            } else if (res.data.status === 400) {
              // _this.showError(res.data.msg)
              registryToast.showToast(res.data.msg)
              return
            } else {
              _this.showError()
            }
            this.demand_sku = false
            this.$parent.cancelMask()
          })
        }
      },
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

  .demand div.img-wrap {
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

  .demandBtn {
    color: #fff;
    /*background: #06f;*/
    background: linear-gradient(to bottom, rgb(52, 159, 253), rgb(2, 126, 234));
    width: 92%;
    margin: 5px auto;
  }

  .demandBtn1 {
    color: #fff;
    /*background: #06f;*/
    background: linear-gradient(to bottom, rgb(52, 159, 253), rgb(2, 126, 234));
    width: 92%;
    margin: 10px auto;
  }

  .demandBtn1:active {
    background: #06f;
  }

  .demandBtn:active {
    background: #06f;
  }
</style>
