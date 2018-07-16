import {axiosHttp} from '~/plugins/axios'

export const state = () => ({
  // 检索所有结果
  searchAlbum: {
    albums: []
  },
  activeAlbum: {},
  albuminfo: {},
  songsList: [],
  transitionSwitch: false
})

export const mutations = {
  SEARCH_ALBUM(state, payload) {
    state.searchAlbum = payload
  },
  ACTIVE_ALBUM(state, payload) {
    state.activeAlbum = payload
  },
  SET_SONG(state, {album, songs}) {
    state.albuminfo = album
    state.songsList = songs
  },
  CHANGE_TRAN_SWITCH(state, payload) {
    state.transitionSwitch = payload
  }
}

export const actions = {
  _getAlbumer({commit}, id) {
    axiosHttp({
      api: '/album',
      formdata: {id}
    }).then(res => {
      commit('SET_SONG', res.data)
    })
  }
}
