import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

// create an axios instance

const service = axios.create({
  baseURL: 'http://1.14.123.114:7070', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
 
    if (store.state.user.token) {
      config.headers.Authorization ='Bearer ' + store.state.user.token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use((res) => {
  return res.data;
}, (error) => {
  return Promise.reject(new Error('faile'));
}
);

export default service
