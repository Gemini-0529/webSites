import axios from '@/axios.js'
const base_url = import.meta.env.VITE_APP_URL

export function menuList(params) {
  return axios.get(`${base_url}/menu/menuList`, {
    params
  })
}

export function addLeftMenu(params) {
  return axios.post(`${base_url}/menu/addMenu`,params)
}

export function parentMenu(params) {
  return axios.get(`${base_url}/menu/parentMenu`, {
    params
  })
}
