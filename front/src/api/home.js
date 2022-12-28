import axios from '@/axios.js'
// class HomeApi extends Axios {
//   static async test() {
//     return Axios.get('/API/home')
//   }
// }
function test() {
  return axios.get('/API/home')
}
export {
  test,
}