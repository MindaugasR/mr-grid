import Vue from 'vue'
import App from './App.vue'
import VueGrid from '../src/index'

Vue.config.productionTip = false

Vue.use(VueGrid)

new Vue({
  render: h => h(App),
}).$mount('#app')
