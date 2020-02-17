<template>
  <div>
    <Nav></Nav>
    <div class="view-wrapper" id="brand">
      <cube-scroll-nav :current="current" @change="changeHandler" @sticky-change="stickyChangeHandler" ref="scroll">
        <cube-scroll-nav-panel v-for="item in brandArr" :key="item.title" :label="item.title">
          <div class="item-content" v-html="item.content"></div>
        </cube-scroll-nav-panel>
        <div class="bottom-desp" v-show="bottomshow">
          <hr>
          <span>我是有底线的哦</span>
          <hr>
        </div>
      </cube-scroll-nav>
    </div>
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'

  export default {
    data() {
      return {
        current: '',
        brandArr: [],
        bottomshow: false
      }
    },
    created: function () {
      var userInfo = localStorage.getItem('userInfo')
      this.userInfo = JSON.parse(userInfo) // 转为JSON
      this.axios({
        method: 'get',
        url: '/api/route/view',
        headers: {'token': this.userInfo.token}
      }).then((res) => {
        console.log(res)
        if (res.data.status === 200) {
          this.brandArr = res.data.data
          this.current = res.data.data[0].title
          this.bottomshow = true
          let _this = this
        } else if (res.data.status === 401) {
          this.$router.replace('/')
        } else {
          console.log('数据获取失败，请刷新重试')
        }
      })
    },
    methods: {
      changeHandler(label) {
        if (label !== 'cube-scroll-nav-bar' && label !== '') {
          this.current = label
        }
      },
      stickyChangeHandler(current) {
        if (current !== 'cube-scroll-nav-bar' && current !== '') {
          this.current = current
        }
      }
    },
    components: {
      Nav
    }
  }
</script>
<style type="text/css">
  #brand div.cube-scroll-content {
    padding-bottom: 2px
  }
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .bottom-desp
    height: 80px
    line-height 80px;
    font-size: 12px;
    text-align center
    display: flex
    flex-direction row
    justify-content center
    align-items: center
    color: #c3c3c3

    >>> hr
      width: 50px;
      margin: 0 10px;
      height 1px;

  #brand
    >>> div.cube-scroll-content
      padding-bottom: 0
      height 40px;
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 100%

  .cube-scroll-nav-panel div.item-content p {
    word-break: break-all;
    white-space: normal
    overflow auto
    position: relative

  }

  .cube-scroll-nav-panel div.item-content img {
    max-width: 100%;
  }

  .cube-scroll-nav-panel div.item-content {
    width: 98%;
    margin: 0 auto;
  }

  .cube-scroll-nav-bar {
    border-bottom: 1px solid #f4f4f4;
  }

  .cube-scroll-nav-panel-title {
    display: none
  }

  .cube-scroll-nav-panel {
    width: 90%;
    margin: auto;

     /* img {
        width: 114px;
        height: 114px;
      }*/

    ul {
      overflow: hidden;
      font-size: 14px;
      line-height: 1.4;
      color: #666;
    }

    li {
      text-align center
      width: 100%;
    }

    div {
      width: 114px;
      margin: 0 auto 15px;

      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .cube-scroll-nav-panel-title {
    padding: 15px 0px 15px 0px;
    font-size: 16px;
    text-align: center;
  }

  .cube-scroll-nav-panel div.item-content p img {
    display: inline;
    position: relative
  }

  .cube-scroll-nav-bar-item {
    display: inline-block;
    padding: 0px 6px;
    margin: 0px;
    /*width: 25%;*/
    /*padding: 2.941vw 4.412vw;*/
    color: rgb(172, 180, 194);
    content: "viewport-units-buggyfill; "
  }

  .cube-scroll-nav-bar-item
    width: 100px
    height: 36px;
    line-height 36px;
    overflow hidden
    text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    white-space: nowrap;

  .cube-scroll-nav-bar-item_active {
    color: #fff;
    background: linear-gradient(to bottom, rgb(76, 165, 246), rgb(2, 126, 232));
    border-top-left-radius 5px
    border-top-right-radius 5px
  }
</style>
