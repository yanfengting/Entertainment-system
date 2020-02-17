import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login.vue'
import Main from '@/pages/Main.vue'
import Itinerary from '@/pages/Itinerary.vue'
import Safety from '@/pages/Safety.vue'
import FlightInfo from '@/pages/FlightInfo.vue'

import Video from '@/pages/Video.vue'
import MovieDetail from '@/pages/MovieDetail.vue'
import Music from '@/pages/Music.vue'
import MusicDetail from '@/pages/MusicDetail.vue'
import Games from '@/pages/Games.vue'
import GamesDetail from '@/pages/GamesDetail.vue'
import Read from '@/pages/Read.vue'

import Brand from '@/pages/Brand.vue'
import Airline from '@/pages/Airline.vue'
import AirlineDetail from '@/pages/AirlineDetail.vue'
import Through from '@/pages/Through.vue'
import Gift from '@/pages/Gift.vue'
import GiftWenChuang from '@/pages/GiftWenChuang.vue'
import GiftLvYou from '@/pages/GiftLvYou.vue'
import GiftXianHang from '@/pages/GiftXianHang.vue'
import ShopDetail from '@/pages/ShopDetail.vue'

import Recommend from '@/pages/Recommend.vue'
import RecommendDetail from '@/pages/RecommendDetail.vue'
import Opinion from '@/pages/Opinion.vue'
import newDetail from '@/pages/newDetail.vue'

import SafetyVideo from '@/pages/SafetyVideo.vue'
import SafetyText from '@/pages/SafetyText.vue'
import AccountCenter from '@/pages/AccountCenter.vue'
import AccountOrder from '@/pages/AccountOrder.vue'
import magDetail from '@/pages/magDetail.vue'
import VideoDetail from '@/pages/VideoDetail.vue'
import UserProtocol from '@/pages/UserProtocol.vue'
import RegisteredMember from '@/pages/RegisteredMember.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/main',
    name: 'Main',
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
      requireAuth: true
    },
    component: Main
  }, {
    path: '/safety',
    name: 'Safety',
    component: Safety
  }, {
    path: '/itinerary',
    name: 'Itinerary',
    component: Itinerary
  }, {
    path: '/video',
    name: 'Video',
    component: Video
  }, {
    path: '/movieDetail',
    name: 'MovieDetail',
    component: MovieDetail
  }, {
    path: '/music',
    name: 'Music',
    component: Music
  }, {
    path: '/musicDetail',
    name: 'MusicDetail',
    component: MusicDetail
  }, {
    path: '/games',
    name: 'Games',
    component: Games
  }, {
    path: '/gamesDetail',
    name: 'GamesDetail',
    component: GamesDetail
  }, {
    path: '/read',
    name: 'Read',
    component: Read
  }, {
    path: '/brand',
    name: 'Brand',
    component: Brand
  }, {
    path: '/airline',
    name: 'Airline',
    component: Airline
  }, {
    path: '/airline_detail',
    name: 'AirlineDetail',
    component: AirlineDetail
  }, {
    path: '/through',
    name: 'Through',
    component: Through
  }, {
    path: '/gift',
    name: 'Gift',
    component: Gift
  }, {
    path: '/giftWenChuang',
    name: 'GiftWenCHuang',
    component: GiftWenChuang
  }, {
    path: '/giftXianHang',
    name: 'GiftXianHang',
    component: GiftXianHang
  }, {
    path: '/giftLvYou',
    name: 'GiftLvYou',
    component: GiftLvYou
  }, {
    path: '/shopDetail',
    name: 'ShopDetail',
    component: ShopDetail
  }, {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  }, {
    path: '/recommend_detail',
    name: 'RecommendDetail',
    component: RecommendDetail
  }, {
    path: '/opinion',
    name: 'Opinion',
    component: Opinion
  }, {
    path: '/safety_text',
    name: 'safety_text',
    component: SafetyText
  }, {
    path: '/safety_video',
    name: 'safety_video',
    component: SafetyVideo
  }, {
    path: '/account_center',
    name: 'account_center',
    component: AccountCenter
  }, {
    path: '/account_order',
    name: 'account_order',
    component: AccountOrder
  }, {
    path: '/newDetail',
    name: 'newDetail',
    component: newDetail
  }, {
    path: '/magDetail',
    name: 'magDetail',
    component: magDetail
  }, {
    path: '/videoDetail',
    name: 'videoDetail',
    component: VideoDetail
  }, {
    path: '/user_protocol',
    name: 'user_protocol',
    component: UserProtocol
  }, {
    path: '/flight_info',
    name: 'flight_info',
    component: FlightInfo
  }, {
    path: '/registered_member',
    name: 'registered_member',
    component: RegisteredMember
  }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
