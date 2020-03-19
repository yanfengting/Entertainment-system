<template>
  <div class="base">
    <!--<img src="../assets/images/离线登录背景.png" class="login-back" alt="">-->
    <div class="login">
      <div class="login-header">
        <div class="logo">
          <div>
            <img src="../assets/images/logo.png" alt>
          </div>
        </div>
        <p class="welcome">
          <span>欢迎乘坐</span>
          <span v-if="flight.flightNo">{{flight.flightNo}}</span>
          <span v-else>GXXXX</span>
          <span>航班，</span>
          <span v-if="flight.arriveDetail">{{flight.departDetail.city}}</span> <span v-else>出发地</span>
          -
          <span v-if="flight.departDetail">{{flight.arriveDetail.city}}</span>
          <span v-else>目的地</span>
        </p>
        <p class="info">为了给您更好的服务，请填写以下信息：</p>
      </div>
      <div class="login-content">
        <!--<div v-show="!online" style="width: 100% ;height:50px;"></div>-->
        <div class="phone-base flexinput">
          <input type="text" class="phone" placeholder="姓名" v-model="loginForm.name">
          <div v-show="loginflag" @click="loginForm.name = ''; loginflag = false" class="icon-error"></div>
          <!--<img v-show="loginflag" src="../assets/images/error.png" height="48" width="48"/>-->
        </div>
        <div class="seat-base flexinput">
          <input type="text" class="phone" placeholder="座位号" v-model="loginForm.seat">
          <div v-show="seatflag" @click="loginForm.seat = '' ;  seatflag = false" class="icon-error"></div>
        </div>
        <div class="tel-base flexinput">
          <input type="tel" class="phone" placeholder="手机号" v-model="loginForm.tel">
          <div v-show="phoneflag" @click="loginForm.tel = '' ; phoneflag = false" class="icon-error"></div>
        </div>
        <div class="code-base flexinput" v-show="online">
          <div class="codeNum">
            <input type="number" class="class-code" placeholder="验证码" v-model="loginForm.verification">
            <button class="close_tel" v-show="show" @click="getCode">获取验证码</button>
            <button class="close_tel2" v-show="!show">重新获取({{count}}s)</button>
          </div>
          <div v-show="codeflag" @click="loginForm.verification = '' ; codeflag = false" class="icon-error"></div>
          <!--<img v-show="codeflag" src="../assets/images/error.png" height="48" width="48"/>-->
        </div>
        <p v-if="errors.length">
        <ul>
          <li class="error" v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
        </p>
      </div>
      <div class="login-footer">
        <div class="safe-info">
          <div class="check-item">
            <cube-checkbox v-model="loginForm.check" :option="option"></cube-checkbox>
          </div>
          <a class="safe-detail" @click="safety_text">娱乐系统<span style="text-decoration: underline">用户协议</span></a>
          <div class="safe-detail_v">v3.01.05</div>
        </div>
        <input class="subLogin" type="submit" value="登录" @click="checkForm">
      </div>
    </div>
  </div>
</template>

<script>
  import registryToast from '../components/common/toast/index'
  //  任何地方使用
  //  registryToast.showToast('网络连接成功')
  // var that

  export default {
    name: 'login',
    data() {
      return {
        loginflag: false,
        codeflag: false,
        seatflag: false,
        phoneflag: false,
        online: false,
        show: true,
        count: '',
        timer: null,
        flight: [],
        check: '',
        // num: 10,
        loginForm: {
          tel: '',
          seat: '',
          name: '',
          check: true,
          verification: '',
          token: ''
        },
        option: {
          label: '',
          value: 'optionValue',
          disabled: false
        },
        errors: []
      }
    },
    created() {
      let userInfoStorage = localStorage.getItem('userInfo') // JSON.stringify 将JSON转为字符串存到变量里
      if (userInfoStorage) {
        this.$router.push('/main')
      }
      // that = this.online
      let _self = this
      // /api/4g/status 4g这个接口是有权限的,所以请求的根路径
      this.axios.get('', { emulateJSON: true })
        .then(function (response) {
          // 登录后跳转的页面
          if (response.data.status === 200) {
            registryToast.showToast('网络连接成功')
            _self.online = true
          } else {
            registryToast.showToast('离线状态')
            _self.online = false
          }
        }, function (error) {
          console.log('4g请求失败', error)
        })
      this.axios({
        method: 'get',
        url: '/api/flightDetail/get'
      }).then((res) => {
        // console.log(res)
        if (res.status === 200) {
          this.flight = res.data.data
        } else {
          console.log('数据获取失败，请刷新重试')
        }
      })
      let userFormStr = sessionStorage.getItem('formitem')
      if (userFormStr) {
        let userForm = JSON.parse(userFormStr)
        this.loginForm = userForm
      }
    },
    methods: {
      scroll() {
        $('input,textarea').on('blur', function () {
          window.scroll(0, 0)
        })
        $('select').on('change', function () {
          window.scroll(0, 0)
        })
      },
      safety_text() {
        let userFrom = this.loginForm
        sessionStorage.setItem('formitem', JSON.stringify(userFrom))
        this.$router.push('/user_protocol')
      },
      getCode: function (e) {
        e.preventDefault()
        this.errors = []
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/ // 验证是不是以13,15,18,17开头的数字
        if (this.loginForm.tel === '') {
          this.error(4)
        // } else if (this.loginForm.tel.length !== 11) {
        } else if (this.loginForm && this.loginForm.tel && this.loginForm.tel.length !== 11) {
          this.error(4)
        } else if (!myreg.test(this.loginForm.tel)) {
          this.error(4)
        } else {
          const TIME_COUNT = 30
          if (!this.timer) { // timer: null // 该变量是用来记录定时器的,防止点击的时候触发多个setInterval
            this.count = TIME_COUNT
            this.show = false
            this.checkTel()
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.show = true
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
        }
      },
      checkTel() {
        this.axios({
          method: 'post',
          url: '/api/sms/send',
          params: {
            'mobile': this.loginForm.tel
          }
        }).then((res) => {
          // console.log(res)
          if (res.data.status === 200) {
            // 登录后跳转的页面
            this.show = false
            registryToast.showToast('验证码发送成功')
          } else {
            registryToast.showToast(res.data.msg)
          }
        })
      },
      checkForm: function (e) {
        var num = /^\d{6}$/ // 验证是否6位数字
        e.preventDefault() // 为了阻止什么也不写点登录提示：请填写验证码！
        this.errors = []
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/ // 验证是不是以13,15,18,17开头的数字
        // eslint-disable-next-line eqeqeq
        if (this.online == false) {
          // 离线状态
          if (this.loginForm.name === '') {
            registryToast.showToast('姓名不能为空')
            this.error(5)
          } else if (this.loginForm.seat === '') {
            registryToast.showToast('座位号不能为空！')
            this.error(4001)
          } else if (this.loginForm.tel === '') {
            registryToast.showToast('请输入手机号！')
            this.error(4)
          // } else if (this.loginForm.tel.length !== 11) {
          } else if (this.loginForm && this.loginForm.tel && this.loginForm.tel.length !== 11) {
            registryToast.showToast('请输入11位的手机号码！')
            this.error(4)
          } else if (!myreg.test(this.loginForm.tel)) {
            registryToast.showToast('请输入有效的手机号码！')
            this.error(4)
          } else if (this.loginForm.check === false) {
            registryToast.showToast('请确认勾选华夏航空娱乐系统安全须知！')
          } else {
            this.axios({
              method: 'post',
              url: '/api/user/login',
              params: {
                'seatNo': this.loginForm.seat,
                'name': this.loginForm.name,
                'mobile': this.loginForm.tel
              }
            }).then((res) => {
              // console.log(res)
              if (res.data.status === 200) {
                this.loginForm.token = res.data.data
                localStorage.setItem('userInfo', JSON.stringify(this.loginForm)) // JSON.stringify 将JSON转为字符串存到变量里
                this.$router.push({ path: '/main' })
                registryToast.showToast('登录成功')
              } else {
                this.error(res.data.status)
                if (res.data.status === 4003) {
                  registryToast.showToast('验证码错误')
                  return
                }
                if (res.data.status === 4002) {
                  registryToast.showToast('名字或座位号错误')
                  return
                }
                registryToast.showToast(res.data.msg)
              }
            })
          }
        } else {
          if (this.loginForm.name === '') {
            registryToast.showToast('姓名不能为空')
            this.error(5)
          } else if (this.loginForm.seat === '') {
            this.error(4001)
            registryToast.showToast('座位号不能为空！')
          } else if (this.loginForm.tel === '') {
            registryToast.showToast('请输入手机号！')
            this.error(4)
          // } else if (this.loginForm.tel.length !== 11) {
          } else if (this.loginForm && this.loginForm.tel && this.loginForm.tel.length !== 11) {
            this.error(4)
            registryToast.showToast('请输入11位的手机号码！')
          } else if (!myreg.test(this.loginForm.tel)) {
            this.error(4)
            registryToast.showToast('请输入有效的手机号码！')
          } else if (this.loginForm.verification === '') {
            this.error(4)
            registryToast.showToast('请填写验证码！')
          } else if (!num.test(this.loginForm.verification)) {
            this.error(4003)
            registryToast.showToast('请填写6位数的验证码！')
          } else if (this.loginForm.check === false) {
            registryToast.showToast('请确认勾选华夏航空娱乐系统安全须知！')
          } else {
            // console.log(this.loginForm)
            // this.thisAjax()
            this.axios({
              method: 'post',
              url: '/api/user/login',
              params: {
                'seatNo': this.loginForm.seat,
                'name': this.loginForm.name,
                'mobile': this.loginForm.tel,
                'verificationCode': this.loginForm.verification
              }
            }).then((res) => {
              // console.log(res)
              if (res.data.status === 200) {
                this.loginForm.token = res.data.data
                localStorage.setItem('userInfo', JSON.stringify(this.loginForm)) // JSON.stringify 将JSON转为字符串存到变量里
                this.$router.push({ path: '/main' })
                registryToast.showToast('登录成功')
              } else {
                this.error(res.data.status)
                registryToast.showToast(res.data.msg)
              }
            })
            // 把表单数据传给main页面
            localStorage.setItem('userInfo', JSON.stringify(this.loginForm)) // JSON.stringify 将JSON转为字符串存到变量里
            sessionStorage.removeItem('formitem')
          }
        }
      },
      // 封装注册发送请求方法
      thisAjax() {
      },
      error(type) {
        switch (type) {
          case 4002: // 姓名或者座位号错误
            this.seatflag = true
            this.loginflag = true
            this.codeflag = false
            this.phoneflag = false
            break
          case 4001: // 非法错误
            this.seatflag = true
            this.loginflag = false
            this.codeflag = false
            this.phoneflag = false
            break
          case 4003: // 验证码错误
            this.codeflag = true
            this.phoneflag = false
            this.seatflag = false
            this.loginflag = false
            break
          case 4: // 手机号错误提示
            this.phoneflag = true
            this.codeflag = false
            this.seatflag = false
            this.loginflag = false
            break
          case 5: // 名字错误
            this.loginflag = true
            this.phoneflag = false
            this.codeflag = false
            this.seatflag = false
            break
        }
      }
    }

  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .error {
    color: red;
  }

  input {
    flex: 1;
  }

  .base {
    background: url("../assets/images/lxloginbg.png");
    background-size: 100% 100%;
    height: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /*position: fixed;*/
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;

  }

  a {
    cursor: pointer;
  }

  .flexinput {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30px;
    margin-top: 15px;
  }

  .phone-base {
    /*padding-left: 40px;*/
    background: url("../assets/images/userName.png") no-repeat left top;
    background-size: 12px;
    background-position: left center;
    /*background-position-y: 18px;*/
    /*background-position-x: 40px;*/
    /*margin-top: 10px;*/
    /*height: 55px;*/
  }

  .phone-base > img {
    width: 18px;
    height: 18px;
    position: relative;
    left: 42%;
    bottom: 30px;
  }

  .icon-error {
    position: absolute;
    left: 195px;
    background: url("../assets/images/error.png") no-repeat;
    width: 15px;
    height: 15px;
    background-size: 100% 100%;
    background-position: center center;
  }

  .seat-base {
    /*padding-left: 40px;*/
    background: url("../assets/images/xingzhuang.png") no-repeat left center;
    background-size: 12px;
    background-position: left center;
    /*background-position-y: 16px;*/
    /*background-position-x: 40px;*/
    /*height: 55px;*/
  }

  .seat-base > img {
    width: 18px;
    height: 18px;
    position: relative;
    left: 42%;
    bottom: 30px;
  }

  .tel-base {
    background: url("../assets/images/phoneNum.png") no-repeat left center;
    /*background-position-y: 14px;*/
    /*background-position-x: 40px;*/
    /*padding-left: 40px;*/
    background-size: 12px;
    background-position: left center;
  }

  .codeNum input {
    width: 40%;
    padding-bottom: 0px;
  }

  .code-base button {
    width: 80px;
    height: 24px;
    /*font-weight: 200;*/
    font-size: 11px;
  }

  .code-base {
    background: url("../assets/images/dcode.png") no-repeat left center;
    /*background-position-y: 22px;*/
    /*background-position-x: 40px;*/
    /*padding-left: 40px;*/
    background-size: 12px;
    background-position: left center;
    margin-top: 15px;
    /*display: flex;*/
    /*flex-direction: row;*/
    /*justify-content: center;*/
    /*align-items: center;*/
  }

  .code-base > img {
    width: 18px;
    height: 18px;
    position: relative;
    left: 42%;
    bottom: 25px;
  }

  .codeNum {
    width: 100%;
    display: block;
    font-size: 16px;
    height: 33px;
    margin-left: 20px;
    /* color: #666;     */
    outline: none;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid #ffffff;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  input.phone {
    padding-bottom: 5px;
  }

  .phone {
    margin-left: 20px;
    width: 100%;
    outline: none;
    padding-top: 5px;
    position: relative;
    display: block;
    font-size: 16px;
    outline: none;
    /*padding-top: 18px;*/
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid #ffffff;
  }

  .flexinput input {
    border-radius: 0;
  }

  .login-back {
    width: 100%;
    height: 100%;
    object-fit: fill;

  }

  .close_tel {
    font-size: 12px;
    width: 100px;
    height: 25px;
    line-height: 25px;
    border-radius: 2px;
    background-color: rgb(0, 102, 255);
    color: white;
    right: 20%;
    top: 255px;
    outline: none;
    border: 0;
    font-weight: 400;
    cursor: pointer;
  }

  .close_tel2 {
    font-size: 12px;
    width: 100px;
    height: 33px;
    line-height: 25px;
    border-radius: 5px;
    background-color: rgba(0, 102, 255, 0.4);
    color: white;
    right: 20%;
    top: 255px;
    outline: none;
    border: 0;
    font-weight: 400;
    cursor: pointer;
    /*font-size: 12px;*/
    /*width: 100px;*/
    /*height: 33px;*/
    /*line-height: 25px;*/
    /*border-radius: 5px;*/
    /*background-color: rgb(211, 211, 211);*/
    /*color: white;*/
    /*position: absolute;*/
    /*right: 20%;*/
    /*top: 255px;*/
    /*outline: none;*/
    /*border: 0;*/
    /*font-weight: 400;*/
    /*cursor: pointer;*/
  }

  .login {
    /*padding-top: 30px;*/
    /*background-color: ;*/
    max-width: 250px;
    height: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    justify-content: center;
    align-items: center;
  }

  .login-content {
    height: 50%;
  }

  .logo {
    width: 150px;
    /* border: #666 1px solid; */
    margin: 10px auto;
  }

  .logo img {
    display: block;
    width: 100%;
    height: auto;
  }

  .phone::-webkit-input-placeholder {
    color: #ffffff;
    font-size: 12px;
    font-weight: 200;
  }

  .phone:-moz-placeholder {
    color: #ffffff;
    font-size: 12px;
    font-weight: 200;
  }

  .phone::-moz-placeholder {
    color: #ffffff;
    font-size: 12px;
    font-weight: 200;
  }

  .phone:-ms-input-placeholder {
    color: #ffffff;
    font-size: 12px;
    font-weight: 200;
  }

  input.class-code {
    border: none;
  }

  input.class-code::-webkit-input-placeholder {
    color: #ffffff;
    font-weight: 200;
    font-size: 12px;
  }

  input.class-code:-moz-placeholder {
    color: #ffffff;
    font-size: 12px;
    font-weight: 200;
  }

  input.class-code::-moz-placeholder {
    color: #ffffff;
    font-size: 12px;
    font-weight: 200;
  }

  input.class-code:-ms-input-placeholder {
    color: #ffffff;
    font-size: 12px;
    font-weight: 200;
  }

  .login p {
    font-size: 12px;
    width: 100%;
    line-height: 14px;
    font-weight: 200;
    text-align: center;
    margin: 3px auto;
  }

  .welcome {
    /*padding: 10px 5px 5px 5px;*/
    color: #ffffff;
  }

  .safe-info {
    display: flex;
    flex-direction: row;
    width: 240px;
    height: 40px;
    /*line-height: 40px;*/
    /*margin: 0 auto 0;*/
    align-items: center;
    margin: 0 auto;
    justify-content: center;
    font-size: 12px;
    color: grey;
  }

  /* .check-item {
    width: 240px;
    margin: 10px  auto;
    font-size: 12px;
    color: sgrey;
  } */

  .safe-detail {
    margin: 10px 0;
    color: rgba(255, 255, 255, 0.8);
    /*line-height: 12px;*/
  }

  .safe-detail_v {
    margin: 10px 0;
    color: rgba(255, 255, 255, 0.8);
    position: relative;
    width: 32%;
    text-align: right;
  }

  .info {
    color: #ffffff;
  }

  input {
    padding-bottom: 10px;
    background: none;
    color: #ffffff;
  }

  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
  }

  .subLogin {
    display: block;
    margin: 0px auto 0px auto;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: rgb(0, 102, 255);
    color: white;
    font-weight: 200;
    border-radius: 2px;
    font-size: 15px;
    outline: none;
    border: 0;
    cursor: pointer;
    letter-spacing: 10px;
  }

  .online {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    letter-spacing: 15px;
    color: rgb(180, 173, 173);
    height: 40px;
    line-height: 40px;
  }
</style>
<style>
  .cube-slide-dots {
    left: 80% !important;
  }

  .cube-slide-dots > span {
    display: inline-block;
    vertical-align: bottom;
    margin: 0 1px;
    width: 18px;
    height: 5px;
    background: rgba(242, 242, 242, 0.8);
    content: "viewport-units-buggyfill; width: 2.941vw";
  }

  .cube-slide-dots > span.active {
    background: #fff;
  }
</style>
