<template>
  <div>
    <Nav></Nav>
    <div class="tab-wrapper">
      <Musictab :tabs="tabs" :initialIndex=0></Musictab>
    </div>
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'
  import Musictab from '../components/tab/Musictab'
  import Chinese from '../components/music/Chinese'

  export default {
    data() {
      return {
        musicArr: [{
          label: '',
          data: [{ 'seller': [{ 'name': '', 'singer': '' }] }]
        }]
      }
    },
    mounted: function() {

    },
    created: function () {
      let _this = this
      this.axios.get('/api/music/list').then(
        res => {
          // console.log(res)
          if (res.status === 200) {
            let tabs = []
            let musicList = []
            for (let i = 0; i < res.data.data.length; i++) {
              let musicDatas = res.data.data[i].items
              // musicDatas.forEach(function (item) {
              //   item.src = 'http://118.178.84.155:5050/' + item.src
              // })
              musicList.push(...musicDatas)
              tabs.push({
                label: res.data.data[i].type,
                component: Chinese,
                data: {
                  seller: musicDatas
                }
              })
            }
            sessionStorage.setItem('musics', JSON.stringify(musicList))
            _this.musicArr = tabs
            _this.tabs = tabs
          } else {
            console.log('数据获取失败，请刷新重试')
          }
        },
        function (err) {
          console.log(err)
        }
      )
    },
    computed: {
      tabs: {
          get: function () {
            // console.log('get')
             return this.musicArr
          },
          set: function (value) {
            // console.log(value)
            this.musicArr = value
          }
      }
    },
    components: { Nav, Musictab }
  }
</script>
<style lang="stylus">
  .tab-wrapper
    position fixed
    top 50px
    bottom 0
    left 0
    right 0
</style>
