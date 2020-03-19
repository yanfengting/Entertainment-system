<template>
  <div class="account-center">
    <Nav></Nav>
    <div class="account-center-top">
      <img src="../assets/images/avatar.png" style="width: 100px;margin-top: 45px;"/>
      <div style="margin-top:5px;">{{userInfo.name}}</div>
      <div v-if="member != 0" style="font-size:13px;color:rgb(255,203,0);margin-top:5px; line-height: 5vw;">
        <div>会员 {{grade}}</div>
        <div>积分 {{integral}}</div>
      </div>
      <div v-else style="font-size:13px;color:rgb(149,198,251);margin-top:5px; line-height: 5vw;">
        <div>游客</div>
      </div>
    </div>
    <div class="b-bo">
      <div class="t-content">
        <div class="line"><span>姓名</span>
          <input id="name" readonly type="text" v-model="userInfo.name">
        </div>
        <div class="line line-centet"><span>座位号</span>
          <input id="seat" readonly v-model="userInfo.seat" type="text">
        </div>

        <div class="line"><span>联系方式</span>
          <input id="tel" type="text" v-model="userInfo.tel">
        </div>
      </div>
    </div>
    <div class="b-bo-b">
      <div class="b-center">
        <div @click="accountOrder" class="line left15" ><span>我的订单
        <img v-if="orderNum>0" class="logo-right" style="width: 8px; height: 8px;margin-top: 16px;"
             src="../assets/images/hongdian.png">
        </span>
          <input type="text" value=">" disabled="disabled">
        </div>
      </div>
    </div>
    <div ><img v-if="member == 0" @click="registeredMember" src="../assets/images/registered_member.jpg" alt=""></div>
  </div>
</template>
<script>
  import Nav from '../components/common/Nav.vue'

  export default {
    data() {
      return {
        msg: '',
        userInfo: '',
        orderNum: 0,
        member: [], // 从数据库拿到的加入购物车的商品
        grade: '',
        integral: ''
      }
    },
    methods: {
      accountOrder: function () {
        // console.log('我的订单')
        this.$router.push('/account_order')
      },
      registeredMember() {
        this.$router.push('/registered_member')
      }
    },
    created: function () {
      var userInfo = localStorage.getItem('userInfo')
      // console.log(userInfo)
      this.userInfo = JSON.parse(userInfo)
      let name = this.$route.params.paramsName // 获取传入参数的值 不是router 而是route
      // console.log(name)
      // 请求会员数据 判断如果手机号存在于数据库，提示已经注册会员
      this.axios.get('/api/member/get?phone=' + this.userInfo.tel).then(res => {
        // console.log(res)
        if (res.data.status === 200) {
          if (res.data.data.length !== null) {
            this.member = res.data.data
            this.grade = res.data.data.grade
            this.integral = res.data.data.integral
          }
        } else {
          console.log('数据获取失败')
        }
      })
      // 请求订单数据
      this.axios({
        method: 'post',
        url: '/api/order/unfinished'
      }).then((res) => {
        // console.log(res)
        if (res.status === 200) {
          this.orderNum = res.data.data
          // this.giftArr = res.data.data
        } else {
          console.log('数据获取失败，请刷新重试')
        }
      })
    },
    components: {
      Nav
    }
  }
</script>
<style type="text/css">
.account-center input {
  border: none;
}
</style>
<style lang="stylus" rel="stylesheet/stylus">
.account-center
  background-color #f7f9fc
  height: 100%;

.account-center-top
  width 100%;
  text-align center
  color #fff
  height 37%;
  background-image url("../assets/images/center.png")
  background-repeat no-repeat
  background-size 100%

.b-bo
  width 100%
  border-top 1px #f2f2f2 solid
  border-bottom 1px #f2f2f2 solid
  background #fefefe

.b-bo-b
  width 100%
  margin-top 10px
  border-top 1px #f2f2f2 solid
  border-bottom 1px #f2f2f2 solid
  background-color #fff

.b-content
  background #fefefe
  padding-left 20px;
  margin-left 15px

.t-content
  background #fefefe
  margin-left 15px
.left15
  margin-left: 15px
.line-centet {
  border-top 1px #f2f2f2 solid
  border-bottom 1px #f2f2f2 solid
}

.line
  padding 10px auto;
  color #323232;
  font-size 15px;
  line-height 45px
  display flex;
  flex-direction row

.line > span {
  display flex
  flex-direction row
  width 40%
}

.line > span div
  width 13px
  height 13px
  background-color red
  border-radius 10px
  text-align center
  font-size 12px
  color #fff
  padding-top 1px

.line > a
  color #c1c1c1;
  margin-right 15px

.line input {
  width 60%;
  text-align right;
  color #c1c1c1;
  background #fff;
  margin-right: 15px
}
</style>
