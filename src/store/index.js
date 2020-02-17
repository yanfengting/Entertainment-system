import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import Lyric from 'lyric-parser'

Vue.use(Vuex)

const state = {
  isShow: false,
  curMusic: '',
  musicName: '',
  baseUrl: '',
  playMusic: '',
  timeDuration: '00:00',
  curHeight: 0,
  timeDurationInt: 0,
  intDfb: 0,
  lrc: '',
  lyric: {
    lines: []
  },
  lrc_text: [],
  timeNow: '00:00',
  playType: 1, // 1 循环播放 2 随机播放  3 单曲循环
  timeNowInt: 0,
  duration: 0,
  playFlag: false,
  oLRC: {
    ti: '', // 歌曲名
    ar: '', // 演唱者
    al: '', // 专辑名
    by: '', // 歌词制作人
    offset: 0, // 时间补偿值，单位毫秒，用于调整歌词整体位置
    ms: [] // 歌词数组{t:时间,c:歌词}
  }
}

const getters = {
  isShowMethod(state) {
    return state.isShow
  }
}

const actions = {
  showSideBar({ commit }) {
    commit('showBar')
  },
  hideSideBar({ commit }) {
    commit('hideBar')
  }
}

const mutations = {
  setCurHeight(state, height) {
    state.curHeight = height
  },
  showBar(state) {
    state.isShow = true
  },
  hideBar(state) {
    state.isShow = false
  },
  playMusic(state, params) {
    let res = params.src
    let musicName = params.musicName
    state.playMusic = res
    state.musicName = musicName
    if (params.duration) {
      state.duration = params.duration
    }
    res = state.baseUrl + res
    let audio = document.getElementById('music')
    let oldSrc = audio.src
    if (audio !== null && res !== '') {
      // 检测播放是否已暂停.audio.paused 在播放器播放时返回false.
      // if (audio.paused) {
      if (oldSrc !== res) {
        audio.src = res
        audio.currentTime = 0
        audio.play() // audio.play();// 这个就是播放
        state.playFlag = true
      } else if (state.playFlag === false) {
        audio.play() // audio.play();// 这个就是播放
        state.playFlag = true
      } else {
        // audio.currentTime = 0
        audio.pause() // audio.play();// 这个就是播放
        state.playFlag = false
      }
    } else {
      audio.currentTime = 0
      audio.pause() // audio.play();// 这个就是播放
      state.playFlag = false
    }
  },
  getMathRandom(num) {
    return Math.ceil(Math.random() * num)
  },
  getCurMusicIndex: function (state, type) {
    let musicStr = sessionStorage.getItem('musics')
    let musics = JSON.parse(musicStr)
    let resIndex = 0
    musics.forEach(function (item, index) {
      if (item.src === state.playMusic) {
        resIndex = index
      }
    })
    let music
    switch (state.playType) {
      case 1: // 按顺序播放
        if (type === 1) {
          resIndex = resIndex + 1
          if (resIndex >= musics.length) {
            resIndex = 0
          }
        } else {
          resIndex = resIndex - 1
          if (resIndex < 0) {
            resIndex = musics.length - 1
          }
        }
        music = musics[resIndex]
        break
      case 2: // 随机播放
        resIndex = mutations.getMathRandom(musics.length - 1)
        music = musics[resIndex]
        break
      case 3: // 循环播放
        if (type === 1) {
          resIndex = resIndex + 1
          if (resIndex >= musics.length) {
            resIndex = 0
          }
        } else if (type === 2) {
          resIndex = resIndex - 1
          if (resIndex < 0) {
            resIndex = musics.length - 1
          }
        }
        music = musics[resIndex]
        break
    }
    sessionStorage.setItem('curMusic', JSON.stringify(music))
    state.musicName = music.name
    state.duration = music.duration
    return music
  },
  endMusic(state) {
    let music = mutations.getCurMusicIndex(state, 3)
    mutations.playMusic(state, { 'src': music.src, 'musicName': music.name })
  },
  nextMusic(state) {
    let music = mutations.getCurMusicIndex(state, 1)
    let _this = this
    mutations.playMusic(state, { 'src': music.src, 'musicName': music.name })
  },
  prevMusic(state) {
    let music = mutations.getCurMusicIndex(state, 2)
    mutations.playMusic(state, { 'src': music.src, 'musicName': music.name })
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
