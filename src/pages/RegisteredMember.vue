<template>
  <div>
    <header class="mui-bar mui-bar-nav"
          style="display: flex;flex-direction: row;align-items: center; justify-content: space-between">
      <a @click="back" class="mui-action-back mui-icon mui-icon-back">
        <!--<img class="logo-left" src="../../assets/images/zuobianjiantou.png">-->
        <div class="back-icon"></div>
        <!--<i class="iconfont icon-zuobianjiantou"></i>-->
      </a>
      <h1 class="mui-title" >
        会员注册
      </h1>
      <a
        slot="overwrite-left"
        type="navicon"
        size="35"
        style="fill:#fff;padding-bottom: 0;"
        class="mui-icon mui-action-menu mui-icon-bars">
        <!--<i class="iconfont icon-1"></i>-->
        <div class="logo-right menu2"></div>
      </a>
    </header>
    <div class="member">
        <div class="account-center"></div>
        <div class="b-bo">
            <div class="t-content">
                <div class="line">
                     <span>姓名</span>
                     <input id="name" v-model="loginForm.name" readonly="readonly" type="text">
                </div>
                <div class="line line-centet">
                    <span>座位号</span>
                    <input id="seat" v-model="loginForm.seat" readonly="readonly" type="text">
                </div>
                <div class="line">
                    <span>联系方式</span>
                    <input id="tel" v-model="loginForm.tel" type="text">
                </div>
            </div>
        </div>
        <div class="b-bo-b">
            <div class="b-center">
                <div class="line left15">
                    <span>密码</span>
                    <input type="password" v-model="loginForm.password" value="" >
                </div>
                <div class="line left15">
                    <span>确认密码</span>
                    <input type="password" v-model="loginForm.repassword" value="" >
                </div>
            </div>
        </div>

        <button class="subLogin" @click="submit">注册</button>
    </div>
  </div>
</template>
<script>
import registryToast from '../components/common/toast/index'
export default {
  data () {
    return {
      loginForm: {
        tel: '',
        name: '',
        seat: '',
        password: '',
        repassword: ''
      }
    }
  },
  mounted () {
    var userInfo = localStorage.getItem('userInfo')
    this.loginForm = JSON.parse(userInfo) // 转为JSON
    console.log("loginForm")
    console.log(this.loginForm)
    // 请求会员数据
    this.axios.get('/api/member/get?phone=' + this.loginForm.tel).then(res => {
      console.log(res)
      // if (res.data.status === 200) {
      //   if(res.data.data != null){
      //     this.member = res.data.data;
      //     this.grade = res.data.data.grade;
      //     this.integral = res.data.data.integral; 
      //   }
      // }else{
      //   console.log('数据获取失败')
      // }
    })
  },
  methods: {
    back: function () {
        let _self = this
        if (this.$route.path.toLowerCase() === '/opinion' || this.$route.path.toLowerCase() === '/Opinion') {
          _self.$parent.$parent.back2()
        } else {
          this.$router.go(-1) // 返回上一层
        }
      },
    submit () {
      if(this.loginForm.password != null && this.loginForm.repassword != null){
              if(this.loginForm.password == this.loginForm.repassword){
                this.axios({
                  method: 'post',
                  url: '/api/member/save',
                  params: {
                    'name': this.loginForm.name,
                    'phone': this.loginForm.tel,
                    'password': this.loginForm.password
                  }
                }).then((res) => {
                  console.log(res)
                  this.$router.push('/main')
                  registryToast.showToast('恭喜你，成功注册会员')
                })
              }else{
                // console.log('两次密码输入不一致')
                registryToast.showToast('两次密码输入不一致')
              }
          }else{
            // console.log('密码或者确认密码不能为空')  
            registryToast.showToast('密码或者确认密码不能为空')
          }
      
    }
  },
  components: {
    // Nav
  }
}
</script>
<style scoped>
.mui-title {
  display: inline;
  font-size: 17px;
  font-weight: 500;
  line-height: 25px;
  padding: 0;
  text-align: center;
  white-space: nowrap;
  color: #000;
  margin: 0 auto;
}
* {
    margin: 0;
    padding: 0;
    border: 0;
}
.b-bo, .b-bo-b {
    width: 100%;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
}

.b-bo {
    background: #fefefe;
}
img {
  width: 100%;
}
.left15, .t-content {
    content: "viewport-units-buggyfill; margin-left: 4.412vw";
}
.t-content {
  background: #fefefe;
  margin-left: 4.412vw;
}
.line {
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  /* color: #323232; */
  font-size: 4.412vw;
  line-height: 13.235vw;
  text-align: left;
  content: "viewport-units-buggyfill; padding: 2.941vw auto; font-size: 4.412vw; line-height: 13.235vw";
}
.line-centet {
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
}
.line>span {
    width: 40%;
}
.line input {
    color: #c1c1c1;
    margin-right: 4.412vw;
    content: "viewport-units-buggyfill; margin-right: 4.412vw";
    width: 60%;
    text-align: right;
    background: #fff;
}
.account-center input {
    border: none;
}

.b-bo-b {
    margin-top: 2.941vw;
    background-color: #fff;
    content: "viewport-units-buggyfill; margin-top: 2.941vw";
}

.b-bo, .b-bo-b {
    width: 100%;
    border-top: 1px solid #f2f2f2;
}
.left15 {
    margin-left: 4.412vw;
    border-bottom: 1px solid #f2f2f2;
}
.subLogin {
  background: linear-gradient(rgb(52, 159, 253), rgb(2, 126, 234));
  display: block;
  margin-top: 50px;
  padding: 5vw 4.706vw;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  font-size: 4.706vw;
  line-height: 1;
  color: #fff;
  outline: none;
  border: none;
  border-radius: .588vw;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  content: "viewport-units-buggyfill; padding: 5vw 4.706vw; font-size: 4.706vw; border-radius: 0.588vw";
}
</style>
