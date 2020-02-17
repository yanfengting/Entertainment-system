<template>
  <div class="cab-common ">
    <div class="item" @click="addCart()">
      <div class="top-describe cab-common Upgrade">
        <!--<p class="second">Upgrade</p>-->
      </div>
      <span class="first-font">升舱</span>
      <upgrade-alert :upgrade_sku="upgrade_sku" :seat="newseat"></upgrade-alert>
    </div>
  </div>
</template>
<script>

  import UpgradeAlert from './UpgradeAlert'

  export default {
    components: {UpgradeAlert},
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
        is_sku: this.upgrade_sku, // 规格弹窗
        description: '',
        newseat: this.seat
      }
    },
    created: function () {
    },
    methods: {
      addCart() {
        this.axios({
          method: 'get',
          url: 'api/upgrade/chickUsable'
        }).then((res) => {
          if (res.data.status === 200) {
            if (!res.data.data) {
              this.$dialog('该功能已关闭，暂时无法使用', 'my-eable')
              return
            }
            this.upgrade_sku = true
          }
        })
      },
      // 点击蒙层取消
      cancelMask: function () {
        this.upgrade_sku = false
      }
    }
  }
</script>
