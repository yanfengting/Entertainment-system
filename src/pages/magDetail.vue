<template>
  <div style="height: 90%">
    <Nav></Nav>
    <div class="flipbook-viewport">
      <div class="container">
        <div class="flipbook">
          <template v-for="(item,index) in resData " >
            <div class="flipbook-detail" @click="showImgPrv(index)"  v-bind:key="item"
                 :style="{'background-image': 'url('+item+')', 'background-size':'100% 100%','background-repeat': 'no-repeat', 'background-position': 'center center'}">
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav from '../components/common/Nav.vue'
  // import jQuery from 'jquery'
  // import turn from '../assets/lib/turn.min'
  export default {
    data() {
      return {
        resData: [],
        initialIndex: 0
      }
    },
    methods: {
      showImgPrv(index) {
        this.initialIndex = index
        const params = {
          $props: {
            imgs: this.resData,
            initialIndex: 'initialIndex', // 响应式数据的key名
            loop: false
          },
          $events: {
            change: (i) => {
              // 必须更新 initialIndex
              this.initialIndex = i
            }
          }
        }
        this.$createImagePreview({ ...params }).show()
      }
    },
    created: function () {

    },
    mounted() {
      let id = this.$route.query.id
      let _this = this
      this.axios.get('api/periodical/' + id).then(function (res) {
        if (res.data.status === 200) {
          res.data.data.forEach(function (item) {
            _this.resData.push(item.src)
          })
          // res.data.data
          let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
          let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
          setTimeout(function () {
            jQuery('.flipbook').turn({
              // Width
              width: width - 40,
              // Height
              display: 'single',
              height: height - 200,
              // Elevation
              elevation: 50,
              // Enable gradients
              gradients: true,
              // Auto center this flipbook
              autoCenter: true
            })
          }, 800)
        }
      })
    },
    components: {
      Nav
    }
  }
</script>
<style scoped>
  @import '../assets/lib/basic.css';

  #app {
    overflow: hidden;
  }

  html, body {
    overflow: hidden;
  }

  .flipbook-detail {
    width: 100%;
    height: 100%;
  }

  .flipbook {
    margin: 0 auto;
    /*margin-top: 45%;*/
  }

  .flipbook-viewport .container {
    /*left: 138%;*/
  }
</style>
