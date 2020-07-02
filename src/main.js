import Vue from 'vue'
import Multiselect from 'vue-multiselect'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

Vue.component('multiselect', Multiselect)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
