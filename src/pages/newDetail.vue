<template>
  <div>
    <Nav></Nav>
    <div class="new-content">
      <div class="title" style="height: auto">
        {{data.title}}
      </div>
      <div class="source">
        来源：{{data.source}}
      </div>
      <div class="content content-padding" v-html="data.content">
      </div>
    </div>
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'

  export default {
    data() {
      return {
        data: {}
      }
    },
    created: function () {
      let newDetailStr = sessionStorage.getItem('newDetail')
      let newsDetail = JSON.parse(newDetailStr)
      this.data = newsDetail
    },
    components: {Nav}
  }
</script>
<style type="text/css" >
  .title {
    font-size: 16px;
    margin: 15px auto;
    line-height: 22px;
    width: 80%;
    color: #000;
    font-weight: 200;
  }

  .j_p_gallery {
    text-align: center;
  }

  .j_p_gallery img {
    max-width: 100%;
  }

  .source {
    font-size: 14px;
    color: #333;
    text-align: center;
  }

  .content-padding {
    padding-top: 15px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 12px;
  }

  p {
    line-height: 25px;
  }
</style>
