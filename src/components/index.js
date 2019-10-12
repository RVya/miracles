/* Export All Components From Components Folder */

import Vue from 'vue'
import { default as SvgIcon } from './SvgIcon'
import { default as Divider } from './Divider'
import { default as FmcNumber } from './Number'
import { default as Dot } from './Dot'
import { default as Pagination } from './Pagination'
import { default as MagicNumber } from './MagicNumber'
import { default as Countdown } from './Countdown'
import { default as Loading } from './Loading'
import { default as SelectButton } from './SelectButton'
import { default as Filter } from './Filter'
import { default as Sorter } from './Sorter'

Vue.component('svg-icon', SvgIcon)
Vue.component('fmc-divider', Divider)
Vue.component('fmc-number', FmcNumber)
Vue.component('fmc-dot', Dot)
Vue.component('fmc-pagination', Pagination)
Vue.component('fmc-magic-number', MagicNumber)
Vue.component('fmc-count-down', Countdown)
Vue.component('fmc-loading', Loading)
Vue.component('fmc-select-button', SelectButton)
Vue.component('fmc-filter', Filter)
Vue.component('fmc-sorter', Sorter)
