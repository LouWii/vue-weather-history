import Vue from 'vue'
import Multiselect from 'vue-multiselect'
import TrendChart from 'vue-trend-chart'
import VTooltip from 'v-tooltip'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

Vue.component('multiselect', Multiselect)

Vue.use(TrendChart)
Vue.use(VTooltip)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
