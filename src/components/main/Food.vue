<template >
  <div class="cab-common ">
    <div class="item" @click="addCart">
      <div class="top-describe cab-food cab-common">

        <!--<p class="second">Restaurant</p>-->
      </div>
      <span class="first-font">餐食</span>
      <food-alert :food_sku="sku_food" :seat="newseat"></food-alert>
    </div>
  </div>
</template>
<script>
  import FoodAlert from './FoodAlert'
export default {
  components: { FoodAlert },
  // props: {
  //   seat: {
  //     type: String
  //   },
  //   food_sku: {
  //     type: Boolean
  //   }
  // },
  watch: {
    sku_food: function (val, oldVal) {
      this.is_sku = val
       }
  },
  data() {
    return {
      newseat: this.seat,
      sku_food: this.food_sku
    }
  },
  methods: {
    // 点餐食
    addCart() {
      this.axios({
          method: 'get',
          url: 'api/food/chickUsable'
        }).then((res) => {
          if (res.data.status === 200) {
            if (!res.data.data) {
              this.$dialog('该功能已关闭，暂时无法使用', 'my-eable')
              return
            }
            this.sku_food = true
          }
        })
    },
    // 点击蒙层取消
    cancelMask: function() {
      this.sku_food = false
    }
  }
}
</script>
<style lang="stylus">
.orange {
  /*background-color: #007fff;*/
  color: #fff;
  /*border: 1px solid #06f;*/
  background:#0088ff !important;
}

.productConten {
  /*margin-bottom: 10px;*/
}

.productConten p {
  text-align: left;
}

// header
.header {
  // padding: 10px 0 10px 126px;
  /*margin-top: 10px;*/
  position: relative;
  display: flex;
  border-radius 10px
  .img-wrap {
    width: 40%;
    height: 112px;
    // position: absolute;
    // top: -28px;
    // left: 10px;
    border-radius: 4px;
    overflow: hidden;
    padding: 1px;
    background-color: #fff;
    img {
      width 100%
    }
  }

  .main {
    width 60%
    color: #051b28;
    line-height: 18px;
    margin-top 10px
    /*padding-right: 20px;*/
    padding-left: 10px;
    .price-wrap {
      width: 210px;
      height: 30px;
      margin   20px 20px 0px 0px;
      font-size: 22px;
      color #ff5339
      span{
        font-size: 16px;
        /*color black*/
      }
    }
  }

  .sku-close {
    position: absolute;
    top: -10px;
    right: -15px;
  }
}

// 种类
.product-delcom {
  margin: 5px 10px 0px 10px ;
  color: #323232;
  font-size: 12px;
}

.product-footerlist {
  margin-top: 3px;
}

.product-footerlist li {
  /*border: 1px dashed #007fff;*/
  // border-radius: 5px;
  // color: orange;
  font-size 12px;
  text-align: center;
  padding: 2px 10px;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius 5px;
  background-color #f2f2f2;
  line-height 26px
}

.product-footerlist li.productActive {
  /*background-color: orange;*/
  color: #fffff;
  border: 1px solid #ffffff;
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
  border-radius:10px 10px 0px 0px
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
  font-size: 14px;
  line-height: 30px;
  box-sizing: border-box;
}

.van-stepper__plus {
  text-align center
  width: 30px;
  height: 26px;
  box-sizing: border-box;
  background-color: #ebedf0;
  border: 1px solid #ffffff;
  position: relative;
  /*padding: 5px;*/
  vertical-align: middle;
}

.van-stepper__input {
  width: 30px;
  height: 23px;
  background #ebedf0
  /*padding: 1px;*/
  border-top: 1px solid #ebedf0;
  border-bottom: 1px solid #ebedf0;
  /*border-width: 1px 0;*/
  border-radius: 0;
  box-sizing: content-box;
  color: #7d7e80;
  font-size: 14px;
  vertical-align: middle;
  text-align: center;
  -webkit-appearance: none;
}

#number {
  height: 30px;
  width: 113px;
  border-radius: 3px;
  float: right;
  /*border: 1px solid #ebedf0;*/
  text-align: center;
  font-size: 20px;
}
.number {
  color: #ff5339;
  background: #fff;

}
.choose_sku2 {
  max-height: 300px;
  overflow: scroll;
}

.sku_specification2 {
  border-top: 1px solid #EEEEEE
  border-bottom 1px solid #EEEEEE
  box-sizing: border-box;
  padding: 5px 0px;
  margin auto 15px;
}
.sku-close {
  width: 30px;
  display: block;
  float: right;
  text-align: right;
  padding: 10px;
}

.sku_title2 {
  font-size: 14px;
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
  font-size: 14px;
}

.productActive {
  background: #ffd100;
}
  .food-price{
    font-size 30px
  }
  .food-price>span{
    color:#333
  }
</style>
