'use strict'

import Vue from 'vue'
import axios from 'axios'
import CONFIG from '../config'
import { Notification } from 'element-ui'
import Cookies from 'js-cookie'
import i18n from '@/locales/index'

let config = {
  baseURL: CONFIG.API_BASE,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
  }
}

const axiosInstance = axios.create(config)

// request interceptor
axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response interceptor
axiosInstance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.errno * 1 !== 0) {
      Notification({
        message: res.errmsg || i18n.t('error.unknown'),
        type: 'error',
        duration: 2 * 1000
      })
      if (res.errno == -2) {
        sessionStorage.removeItem('secretUser')
        location.href = '#/login'
      }
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    Notification({
      message: error.errmsg || i18n.t('error.unknown'),
      type: 'error',
      duration: 3 * 1000
    })
    /* eslint-disable */
    if (error.request) {
      console.warn(error.request)
    } else if (error.response) {
      console.warn(error.response)
    }
    /* eslint-enable */
    return Promise.reject(error)
  }
)

const Plugin = {}

Plugin.install = function(Vue) {
  Vue.axios = axiosInstance
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axiosInstance
      }
    },
    $axios: {
      get() {
        return axiosInstance
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
