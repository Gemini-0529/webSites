import axios from '@/axios.js'

function menuList(params) {
  return axios.get('/API/menu/menuList', {
    params
  })
}
// function testpost(params) {
//   return axios.post('/API/xxx', {
//     ...params
//   })
// }

export {
  menuList
}