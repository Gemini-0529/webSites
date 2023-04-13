import axios from '../axios'

export function getUserInfo(params) {
  return axios.get('/API/user/getUserInfo',{
    params
  })
}

export function updateUser(params) {
  return axios.post('/API/user/updateUserInfo', params)
}
