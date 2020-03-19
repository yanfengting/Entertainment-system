<template>
  <div v-if="is_sku == true" class="specification_mask2" style="z-index: 11">
    <div class="specification_com2" @click.stop="is_sku==false">
      <div class="productConten">
        <div class="product-delcom">
          <div class="header">
            <div class="img-wrap upgrade "
                 :style="{'background': 'url('+thumbUrl+') no-repeat','background-size':'100% 100%', 'background-position': 'center center'}">
              <!--// <img v-bind:src="thumbUrl" alt>-->
            </div>
            <div class="main">
              <div class="price-wrap">
                <p><strong>¥</strong>{{price}}</p>
              </div>
              <div>
                <ul class="product-footerlist clearfix">
                  <li
                    v-for="(l,index) in skuArr"
                    v-bind:key="index"
                    @click="specificationBtn(l,index)"
                    :class="{orange:i === index}"
                  >{{l.classType}}
                  </li>
                </ul>
              </div>
              <a class="sku-close" @click="cancelMask" aria-label="关闭">
                <!--<i class="iconfont icon-chahao"></i>-->
              </a>
            </div>
          </div>
        </div>
        <div class="product-delcom" style="height: 200px;overflow: scroll;margin-top: 0px;">
          <p style="">{{description}}</p>
        </div>
      </div>

      <div type="flex" class="van-row--flex sku_specification2" style="display: none;">
        <div class="van-col van-col--12" :span="12">购买数量</div>
        <div class="van-col van-col--12" :span="12" style="text-align: right">
          <button class="van-stepper__plus" v-on:click="decrement">-</button>
          <input type="text" class="van-stepper__plus" size="1" v-model="num" ref="num">
          <button class="van-stepper__plus" @click="increment">+</button>
        </div>
      </div>
      <div type="flex" class="van-row--flex sku_specification3">
        <div class="van-col van-col--12" :span="12" style="line-height: 45px;">您的座位号</div>
        <div class="van-col van-col--12 number" style="text-align: right">
          <input id="number" type="text" :readonly="readonly? false: 'readonly'" v-model="newseat" ref="input">
        </div>
      </div>
      <template v-if="i!==-1">
        <cube-button :class="['demandBtn', unable?'unable-btn':'']" @click="sku_addCart" :primary="true">提交订单
        </cube-button>
      </template>
      <template v-else>
        <cube-button :class="['demandBtn', unable?'unable-btn':'']" @click="toast" :primary="true">
          提交订单
        </cube-button>
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
      upgrade_sku: {
        type: Boolean
      }
    },
    data() {
      return {
        price: null,
        thumbUrl: null,
        i: -1,
        skuArr: [],
        num: 1,
        unable: false,
        is_sku: this.upgrade_sku, // 规格弹窗
        description: '',
        newseat: this.seat,
        readonly: true
      }
    },
    watch: {
      upgrade_sku: function (val, oldVal) {
        this.is_sku = val
      }
    },
    created: function () {
      this.axios({
        method: 'get',
        url: 'api/upgrade/list'
      }).then((res) => {
        // console.log(res)
        if (res.data.status === 200) {
          this.price = res.data.data[0].price
          this.thumbUrl = res.data.data[0].thumbUrl
          this.classType = res.data.data[0].classType
          this.description = res.data.data[0].description
          this.unable = res.data.data[0].priceState === 1 ? true : false
          this.skuArr = res.data.data
          this.i = -1
        } else {
        }
      })
    },
    methods: {
      toast() {
        if (this.unable) {
          return
        }
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
      // 点餐食
      addCart() {
        this.axios({
          method: 'get',
          url: 'api/upgrade/list'
        }).then((res) => {
          // console.log(res)
          // console.log(this.is_sku)
          if (res.data.status === 200) {
            if (res.data.data.length !== 0) {
              this.is_sku = true
              this.skuArr = res.data.data
              this.price = res.data.data[0].price
              this.thumbUrl = res.data.data[0].thumbUrl
              this.classType = res.data.data[0].classType
              this.description = res.data.data[0].description
              this.i = -1
            } else {
              this.is_sku = false
              this.$parent.cancelMask()
            }
          } else {
          }
        })
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
      // 点击蒙层取消
      cancelMask: function () {
        // this.is_sku = false
        // this.upgrade_sku = false
        this.$parent.cancelMask()
      },
      // 选择种类
      specificationBtn: function (item, index) {
        this.i = index // 点击选中
        this.price = item.price
        this.classType = item.classType
        this.thumbURL = item.thumbURL
        this.description = item.description
        if (this.is_sku && this.unable) {
          registryToast.showToast('由于运行保障原因，您乘坐的航班暂不支持机上升舱。')
        }
      },
      // 提交订单
      sku_addCart(item) {
        if (this.unable) {
          return
        }
        // this.seat = this.$refs.input.value // input框接收一个传过来的座位号，编辑以后获取
        let _this = this
        this.$emit('getCalled', this.newseat)
        this.newnum = this.$refs.num.value
        var userInfo = localStorage.getItem('userInfo')
        this.userInfo = JSON.parse(userInfo) // 转为JSON
        this.is_sku = false
        if (this.price <= 0) {
          registryToast.showToast('服务器已经关闭')
          _this.$parent.cancelMask()
          return
        }
        if (this.i === -1) {
        } else {
          this.axios({
            method: 'post',
            url: '/api/upgrade/submit',
            params: {
              'seatNo': this.seat,
              'classType': this.classType,
              'mobile': this.userInfo.tel
            }
          }).then((res) => {
              if (res.data.status === 200) {
                _this.showSuccess()
              } else {
                _this.showError()
              }
              _this.$parent.cancelMask()
            }
            , function (err) {
              console.log(err)
            })
        }
      },
      showSuccess() {
        this.$dialog('订单提交成功', 'my-order')
      },
      showError() {
        this.$dialog('网络或系统错误，请重新提交', 'my-error')
      }
    }
  }
</script>
<style lang="stylus">
  button.unable-btn
    background: #e9e9e9

  .cube-btn-primary.unable-btn.cube-btn_active.unable-btn, .cube-btn-primary.unable-btn:active
    background: #e9e9e9
</style>
