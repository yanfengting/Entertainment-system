<template>
  <div>
    <Nav></Nav>
    <div class="safety-content" v-for="(l) in safety_text" v-bind:key="l">
      {{l.title}}
      <p v-html="l.content"></p>
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
      // var userInfo = localStorage.getItem('userInfo')
      // this.userInfo = JSON.parse(userInfo) // 转为JSON
      // console.log('tel ' + this.userInfo.tel)
      this.axios({
        method: 'get',
        url: '/api/safety/view',
        params: {
          'type': 'html'
        }
        // headers: { 'token': this.userInfo.token }
      }).then((res) => {
          if (res.status === 200) {
            console.log(res)
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
<style lang="stylus" scoped>
  .safety-content
    margin: 20px;
</style>
