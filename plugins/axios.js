import Vue from 'vue'
import axios from 'axios'

// 请求地址前缀
export const prependUrl = '/api'

// 组件中请求
export const axiosHttp = ({type, api, formdata}) => {
  formdata = Object.assign({}, formdata)
  api = prependUrl + api
  type = type ? type.toLowerCase() : type || 'get'
  if (type !== 'get') {
    return axios[type](api, formdata)
  } else {
    // formdata.timeStamp = new Date().getTime()
    return axios.get(api, {params: formdata})
  }
}

Vue.prototype.$http = axiosHttp
