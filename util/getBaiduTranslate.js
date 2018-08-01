import $ from 'jquery'
import {MD5} from './md5'

let appId = '20180801000190816'
let key = 'gOLq4GJ4ZFOdrK3_gqEP'
/* eslint-disable */
export const baiduTranlate = ({query}) => {

  let salt = (new Date).getTime()
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  var from = 'en'
  var to = 'zh'
  var str1 = appId + query + salt + key
  var sign = MD5(str1)

  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
      type: 'get',
      dataType: 'jsonp',
      data: {
        q: query,
        appid: appId,
        salt: salt,
        from: from,
        to: to,
        sign: sign
      },
      success: (data) => {
        resolve(data)
      },
      error: (data) => {
        reject(data)
      }
    })
  })
}
