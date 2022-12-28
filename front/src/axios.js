import axios from 'axios'
import Cookies from 'js-cookie'
const instance = axios.create({
    baseURL: '',
    timeout: 5000,
})

// Add a request interceptor
instance.interceptors.request.use(
  (config)=> {
    // Do something before request is sent
    // 强缓存，解决 304 问题
    config.headers['Cache-Control']= 'no-cache'
    config.headers['token'] = Cookies.get('token') || 'none'
    return config;
  },
  (error)=> {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use( 
  (res)=> {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return {
      ...res.data
    };
  },
  (error)=> {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // 401跳转到login
    console.log('响应拦截器',error.response.status);

    return Promise.reject(error);
  }
);

export default instance