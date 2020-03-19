<template>
  <cube-slide :speed="200"
              ref="slide"
              class="swipe-img"
              :data="items">
    <cube-slide-item v-for="(item, index) in items"
                     :key="index">
      <!-- <a :href="'http://10.191.1.1' + item.src">
        <img v-bind:src="'http://10.191.1.1' + item.src">
      </a> -->
      <a :href="item.src">
        <img v-bind:src="item.src">
      </a>
    </cube-slide-item>
  </cube-slide>
</template>
<script>
export default {
  data () {
    return {
      items: [
        // {
        //   image:
        //     'http://pic1.win4000.com/wallpaper/6/57fc51a354def.jpg',
        //   src: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.huicent.ns'
        // },
        // {
        //   image:
        //     'http://pic1.win4000.com/wallpaper/6/57fc51a354def.jpg'
        // },
        // {
        //   image:
        //     'http://pic1.win4000.com/wallpaper/6/57fc51a4a800d.jpg'
        // },
        // {
        //   image:
        //     'http://pic1.win4000.com/wallpaper/6/57fc51a67b681.jpg'
        // },
        // {
        //   image:
        //     'http://pic1.win4000.com/wallpaper/6/57fc51a896002.jpg'
        // }
      ]
    }
  },
  created: function () {
    this.axios({
      method: 'get',
      url: '/api/adv/list',
      params: {
        'position': 4
      }
    }).then((res) => {
      // console.log("轮播图")
      // console.log(res)
      if (res.data.status === 200) {
        if (res.data.data.length !== 0) {
          this.items = res.data.data
        }
      } else {
        console.log('轮播图获取失败')
      }
    })
  }
}
</script>
<style scoped>
.swipe-img img {
  width: 100%;
  height: auto;
}
</style>
