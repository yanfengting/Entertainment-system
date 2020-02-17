<template>
  <div class="content">
    <div class="cabin">
      <span class="title">客舱服务</span>
      <div class="cab Upgrade">
        <div class="describe cab-upgrade">
          <span class="first">机上升舱</span>
          <p class="second">Upgrade</p>
        </div>
        <div class="cab-num">
          <p id="one">1</p>
          <p id="two">2</p>
        </div>
      </div>
      <div class="cab">
        <div class="cab-up">
          <div class="cab-common cab-demand">
            <div class="describe">
              <span class="first">呼唤铃</span>
              <p class="second">Demand</p>
            </div>
          </div>
          <div class="cab-common cab-food">
            <a href="#picture">
              <div class="describe">
                <span class="first">机上餐食</span>
                <p class="second">Restaurant</p>
              </div>
            </a>
          </div>
        </div>
        <div class="cab-down">
          <div class="cab-common cab-itinerary">
            <div class="describe">
              <span class="first">我的行程</span>
              <p class="second">My itinerary</p>
            </div>
          </div>
          <div class="cab-common cab-safety">
            <div class="describe">
              <span class="first">安全须知</span>
              <p class="second">Safety instructions</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="picture" class="mui-popover mui-popover-action mui-popover-bottom">
          <div class="productBox">
            <div class="productConten">
              <div class="product-delcom">
                <div class="product clearfix">
                  <a href="#picture">
                    <b>取消</b>
                  </a>
                  <div class="product-img">
                    <img src="images/1.png" style="width: 86px;height: 86px;" alt>
                  </div>
                  <div class="product-text">
                    <p>￥22</p>
                    <p>XXXXXXXXXXX</p>
                  </div>
                </div>
                <div class="type">
                  <p>种类</p>
                  <span class="food">面条</span>
                  <span class="food">米饭</span>
                </div>
                <div class="type">
                  <div class="type-left">购买数量</div>
                  <div class="type-right">
                    <div
                      class="mui-numbox"
                      data-numbox-step="10"
                      data-numbox-min="0"
                      data-numbox-max="100"
                    >
                      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
                      <input class="mui-numbox-input" type="number" style="width:20px">
                      <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
                    </div>
                  </div>
                </div>
                <div class="type clearfix">
                  <div class="type-left">您的座位号</div>
                  <div class="type-right"></div>
                </div>
              </div>
            </div>
            <div class="product-footer">
              <a href="javascript:">提交订单</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="huaxia">
      <span class="title">精彩华夏</span>
      <div class="cab">
        <div class="cab-up Brand">
          <div class="describe">
            <span class="first">品牌介绍</span>
            <p class="second">Brand introduction</p>
          </div>
        </div>
        <div class="cab-down Airline">
          <div class="describe">
            <span class="first">航线特惠</span>
            <p class="second">Airline dscount</p>
          </div>
        </div>
      </div>
      <div class="cab">
        <div class="cab-up Through">
          <div class="describe">
            <span class="first">华夏通程</span>
            <p class="second">Through</p>
          </div>
        </div>
        <div class="cab-down Gift">
          <div class="describe">
            <span class="first">华夏文礼</span>
            <p class="second">Gift shop</p>
          </div>
        </div>
      </div>
    </div>

    <div class="amusement">
      <span class="title">娱乐</span>
      <div class="amuse Movies">
        <div class="describe">
          <span class="first">影视</span>
          <p class="second">Movies</p>
        </div>
      </div>
      <div class="amuse Music">
        <div class="describe">
          <span class="first">音乐</span>
          <p class="second">Music</p>
        </div>
      </div>
      <div class="amuse Games">
        <div class="describe">
          <span class="first">游戏</span>
          <p class="second">Games</p>
        </div>
      </div>
      <div class="amuse Read">
        <div class="describe">
          <span class="first">阅读</span>
          <p class="second">Read</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>

<style>
.content {
  width: 100%;
  height: 500px;
  padding: 5px 0 0 10px;
  background-color: #fff;
}

.title {
  display: block;
  font-weight: 600;
  font-size: 16px;
  /* margin-left: 5px; */
}

.swiper-container {
  /* margin-top: 44px; */
  width: 100%;
  height: 150px;
  border: 0;
}

.swiper-container img {
  width: 100%;
  height: 150px;
  border: 0;
}

.swiper-slide {
  text-align: center;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.cabin,
.huaxia {
  width: 99%;
  height: 190px;
  padding-top: 10px;
}

.cab {
  float: left;
  width: 48%;
  height: 150px;
  border-radius: 5px;
  margin: 1.5px;
}
.cab-up {
  height: 49%;
  border-radius: 5px;
  /* border: 1px solid #cdcdcd; */
  margin-bottom: 1.5px;
  display: flex;
  align-items: center;
}

.cab-down {
  height: 49%;
  border-radius: 5px;
  /* border: 1px solid #cdcdcd; */
  margin-top: 3px;
  display: flex;
  align-items: center;
}

.cab-common {
  width: 49%;
  height: 100%;
  float: left;
  border-radius: 5px;
  /* border: 1px solid #328ca3; */
  display: flex;
  align-items: center;
}

.cab-food,
.cab-safety {
  margin-left: 3px;
}

.Upgrade {
  font-size: 17px;
  font-weight: 600;
  background: #000 url(../../assets/images/1.jpg) no-repeat left top;
  background-size: 100% 150px;
}
.cab-demand {
  background: #000 url(../../assets/images/2.jpg) no-repeat left top;
  background-size: 100% 73.5px;
}

.cab-food {
  background: #000 url(../../assets/images/3.jpg) no-repeat left top;
  background-size: 100% 73.5px;
}
.cab-itinerary {
  background: #000 url(../../assets/images/4.jpg) no-repeat left top;
  background-size: 100% 73.5px;
}
.cab-safety {
  background: #000 url(../../assets/images/5.jpg) no-repeat left top;
  background-size: 100% 73.5px;
}

.Brand {
  background: #000 url(../../assets/images/6.jpg) no-repeat left top;
  background-size: 100% 73.5px;
}
.Airline {
  background: #000 url(../../assets/images/7.jpg) no-repeat left top;
  background-size: 100% 73.5px;
}
.Through {
  background: #000 url(../../assets/images/8.jpg) no-repeat left top;
  background-size: 100% 73.5px;
}

.Gift {
  background: #000 url(../../assets/images/9.jpg) no-repeat left top;
  background-size: 100% 73.5px;
}
.Movies {
  background: #000 url(../../assets/images/10.jpg) no-repeat left top;
  background-size: 100% 85px;
}
.Music {
  background: #000 url(../../assets/images/11.jpg) no-repeat left top;
  background-size: 100% 85px;
}
.Games {
  background: #000 url(../../assets/images/12.jpg) no-repeat left top;
  background-size: 100% 85px;
}
.Read {
  background: #000 url(../../assets/images/13.jpg) no-repeat left top;
  background-size: 100% 85px;
}

.recommend {
  background: #000 url(../../assets/images/14.jpg) no-repeat left top;
  background-size: 100% 85px;
}

.opinion {
  background: #000 url(../../assets/images/15.jpg) no-repeat left top;
  background-size: 100% 85px;
}

.amusement {
  width: 99%;
  height: 120px;
  padding-top: 10px;
}

.amuse {
  width: 23.3%;
  float: left;
  height: 69px;
  margin: 1.5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
</style>
