import Vue from 'vue'
import VueI18n from 'vue-i18n'

import CN from './zh-CN'
import JP from './ja-JP'

// import Cookies from 'js-cookie'

Vue.use(VueI18n)

const locale = sessionStorage.getItem('locale') || 'ja-JP'
const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': CN,
    'ja-JP': JP
  }
})

export const $t = i18n.t

export default i18n
