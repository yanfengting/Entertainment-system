<template>
  <div>
    <Nav></Nav>
    <div style="margin:20px;" v-for="(l,index) in safety_text" v-bind:key="index">
      <p style="margin:20px;text-align:center;font-size:18px;">{{l.title}}</p>
      <div class="vid-wrap">
        <video controls autoplay="autoplay">
          <source v-bind:src="l.videoUrl" type="video/mp4">
        </video>
      </div>
    </div>
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'

  export default {
    data() {
      return {
        safety_text: null
      }
    },
    created: function () {
      this.axios({
        method: 'get',
        url: '/api/safety/view',
        params: {
          'type': 'video'
        }
      }).then((res) => {
          if (res.status === 200) {
            // console.log(res)
            this.safety_text = res.data.data
          } else {
            console.log('数据获取失败，请刷新重试')
          }
        },
        function (err) {
          console.log(err)
        })
    },
    components: {
      Nav
    }
  }
</script>
<style>
  /* video {
    max-width: 100%;
    height: auto;
  } */
  .vid-wrap {
    margin-top: 10px;
    width: 100%;
    background: #000;
    position: relative;
    padding-bottom: 56.25%; /*需要用padding来维持16:9比例,也就是9除以16*/
    height: 0;
  }

  .vid-wrap video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
  }

</style>
