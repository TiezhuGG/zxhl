import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: 'http://www.bagorders.com/api/admin/', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        const token = getToken()
        // console.log('request', token)
        // do something before request is sent
        if (token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        console.log('请求错误')
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
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        console.log('response success', res)
        return res
        // if (res.status_code === 200) {
        //     Message({
        //         message: res.message,
        //         type: 'success',
        //         duration: 5000
        //     })
        //     return res
        // }

        // if the custom code is not 20000, it is judged as an error.
        // if (res.code !== 20000) {
        //   Message({
        //     message: res.message || 'Error',
        //     type: 'error',
        //     duration: 5 * 1000
        //   })

        //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //     // to re-login
        //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //       confirmButtonText: 'Re-Login',
        //       cancelButtonText: 'Cancel',
        //       type: 'warning'
        //     }).then(() => {
        //       store.dispatch('user/resetToken').then(() => {
        //         location.reload()
        //       })
        //     })
        //   }
        //   return Promise.reject(new Error(res.message || 'Error'))
        // } else {
        //   return res
        // }
    },
    error => {
        console.log('response error', error.response)
        // if(error.response.status === 422) {
        //     const data = Object.keys(error.response.data.errors)
        //     Message({
        //         message: error.response.data.errors[data[0]][0],
        //         type: 'error',
        //         duration: 5 * 1000
        if (error.response.status === 422) {
            Object.values(error.response.data.errors).forEach(item => {
                item.forEach(message => {
                    Message({
                        message,
                        type: 'error',
                        duration: 5000
                    })
                })
            })
        } else {
            Message({
                message: error.response.data.message,
                type: 'error',
                duration: 5 * 1000
            })
        }
        return Promise.reject(error.response.data)
    }
)

export default service