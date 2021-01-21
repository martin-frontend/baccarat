import axios from 'axios'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom status
   * Here is just an example
   * You can also judge the status by HTTP Status status
   */
  response => {
    // if the custom status is not 20000, it is judged as an error.
    if (response.status !== 201 && response.status !== 200) {
      console.log(response.message)

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (response.status === 50008 || response.status === 50012 || response.status === 50014) {
        // to re-login
        alert('You have been logged out, you can cancel to stay on this page, or log in again')
      }
      return Promise.reject(new Error(response.message || 'Error'))
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
