import {axiosHttp} from '~/plugins/axios'
// global actions
export const actions = {
  // 全局服务初始化
  nuxtServerInit(store) {
    console.log('come to actions')
    const initAppData = [
      store.dispatch('loadNceAlbum')
    ]
    console.log('load nce album')
    return Promise.all(initAppData)
  },
  loadNceAlbum({commit}, payload) {
    console.log('help me to check', payload)
    // 检查设备类型
    axiosHttp({
      api: '/search',
      formdata: {
        keywords: '新概念',
        type: 10
      }
    }).then(res => {
      const albums = []
      const list = [2762116, 2762136, 2762234, 3054410]
      list.filter(no => {
        res.data.result.albums.map(alb => {
          if (no === alb.id) {
            albums.push(alb)
          }
          if (Number(payload) === alb.id) {
            commit('nce/ACTIVE_ALBUM', alb)
          }
        })
      })
      res.data.result.albums = albums
      commit('nce/SEARCH_ALBUM', res.data.result)
    })
  }
}
