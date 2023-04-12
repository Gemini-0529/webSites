import axios from '@/axios.js'

export function menuList(params) {
  return axios.get('/API/menu/menuList', {
    params
  })
}
export function addLeftMenu(params) {
  return axios.post('/API/menu/addMenu', params)
}
// function testpost(params) {
//   return axios.post('/API/xxx', {
//     ...params
//   })
// }
