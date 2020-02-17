<template>
  <div>
    <Nav></Nav>
    <!-- 游玩攻略 -->
    <a class="block-item ">
      <div class="image-ctn"
           width="100%">
        <div class="title">{{title}}</div>
        <img width="100%"
             v-bind:src="titleImg">
        <div class="item-text">
          <p class="intro" v-html="content"></p>
        </div>
      </div>
    </a>
    <!--<a class="block-item ">-->
      <!--<div class="image-ctn"-->
           <!--width="100%">-->
        <!--<img width="100%"-->
             <!--src="http://img95.699pic.com/photo/50054/1457.jpg_wh300.jpg">-->
        <!--<div class="item-text">-->
          <!--<div class="title">特色美食</div>-->
          <!--<p class="intro">武汉户部巷美食一条街武汉户部巷美食一条街武汉户部巷美食一条街武汉户部巷美食一条街武汉户部巷美食一条街</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</a>-->
  </div>
</template>
<script>
import Nav from '../components/common/Nav.vue'

export default {
  data () {
    return {
      title: this.$route.params.title,
      titleImg: this.$route.params.titleImg,
      content: this.$route.params.content
    }
  },
  created: {
  },
  methods: {
  },
  components: {
    Nav
  }
}
</script>
<style scoped>
img {
  width: 100%;
  height: auto;
}
.block-item {
  display: block;
  margin: 10px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 2px 2px 5px 5px;
}
a {
  color: black;
}

.item-text {
  /* height:55px; */
  width: 100%;
}
.item-text .title {
  font-size: 15px;
  padding: 8px;
}
.item-text .intro {
  color: #999;
  text-indent: 20px;
  margin: 0 10px;
  font-size: 12px;
  padding-bottom: 10px;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
}
  .intro img{
    text-align: center;
    width: 30px;
    height: 30px;  }
</style>
