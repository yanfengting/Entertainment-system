<template>
  <div class="cab-common ">
    <div class="item" @click="addCart()">
      <div class="top-describe cab-demand cab-common">
        <!--<p class="second">Demand</p>-->
      </div>
      <span class="first-font">呼唤铃</span>
      <demand-alert :demand_sku="demand_sku" :seat="newseat"></demand-alert>
      <!--<div v-if="is_sku" class="specification_mask2">
        <div class="specification_com2" @click.stop="is_sku==false">
          <div class="productConten">
            <div class="product-delcom demand">
              <div class="header">
                <div class="img-wrap">
                  <img :src="thumbUrl" alt>
                </div>
                <div class="main">

                  <div class="product-delcom" style="margin-left:-10px;margin-left:-10px;position: absolute;">
                    <p>已选 <span v-if="i===-1">种类</span><span v-else>{{type}}</span></p>
                    <p v-if="i!==-1">{{description}}</p>
                  </div>
                </div>
                <a class="sku-close" @click="cancelMask" aria-label="关闭">
                  &lt;!&ndash;<i class="iconfont icon-chahao"></i>&ndash;&gt;
                </a>
              </div>
            </div>
            <div class="product-delcom product-line" style="text-align: left;color: red;padding-top: 0px;">
              根据中国民航法规，起飞后20分钟，落地前30分钟及颠簸时，乘务员无法为您提供服务，衷心希望得到您的理解
            </div>
            <div class="product-delcom">
              <p>种类</p>
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

          <div type="flex" class="van-row&#45;&#45;flex sku_specification2" style="">
            <div class="van-col van-col&#45;&#45;12" :span="12">数量</div>
            <div class="van-col van-col&#45;&#45;12" :span="12" style="text-align: right">
              <button class="van-stepper__plus" v-on:click="decrement">-</button>
              <input type="text" class="van-stepper__plus" size="1" v-model="num" ref="num">
              <button class="van-stepper__plus" @click="increment">+</button>
            </div>
          </div>
          <div type="flex" class="van-row&#45;&#45;flex sku_specification3">
            <div class="van-col van-col&#45;&#45;12" :span="12" style="line-height: 45px;">您的座位号</div>
            <div class="van-col van-col&#45;&#45;12 number" style="text-align: right">
              <input id="number" type="text" v-model="newseat" ref="input">
            </div>
          </div>
          <cube-button class="demandBtn" @click="sku_addCart" :primary="true" v-show="i!==-1">呼唤乘务员</cube-button>
          <cube-button class="demandBtn1" @click="toast" :primary="true" v-show="i===-1">呼唤乘务员</cube-button>

        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
  import DemandAlert from './DemandAlert'

  export default {
    components: { DemandAlert },
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
        newseat: this.seat
      }
    },
    watch: {
      demand_sku: function (val, oldVal) {
        this.is_sku = val
      }
    },
    methods: {
      // 点呼唤铃
      addCart() {
        this.axios({
          method: 'get',
          url: 'api/callbell/chickUsable'
        }).then((res) => {
          if (res.data.status === 200) {
            if (!res.data.data) {
              this.$dialog('该功能已关闭，暂时无法使用', 'my-eable')
              return
            }
            this.demand_sku = true
          }
        })
      },
      // 点击蒙层取消
      cancelMask: function () {
        this.demand_sku = false
      }
    }
  }
</script>
<style lang="stylus">
  .orange {
    /*background-color: snow;*/
    /*color: white;*/
  }

  .productConten p {
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
    height: 122px;
  }

  .product-footerlist li.noneActive {
    background-color: #ccc;
    opacity: 0.4;
    color: #000;
    pointer-events: none;
  }

  //
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
    line-height: 30px;
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
    height: 30px;
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
