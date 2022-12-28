import axios from '@/axios.js'

function register(params) {
  return axios.post('/API/register/register',{
    ...params
  })
}

export {
  register
}