import Vuex from 'vuex'
import VueGrid from './components/VueGrid.vue'
import store from './utils/store'
import './grid.scss'

export default function install(Vue) {
	Vue.use(Vuex)
	Vue.component('VueGrid', VueGrid)
	Vue.prototype.$store = new Vuex.Store(store)
	
	
	const editors = require.context('./editors/', true, /\.vue$/i)
	editors.keys().map(key => Vue.component(key.split('/').pop().split('.')[0] + '_Editor', editors(key).default))
	
	const filters = require.context('./filters/', true, /\.vue$/i)
	filters.keys().map(key => Vue.component(key.split('/').pop().split('.')[0] + '_Filter', filters(key).default))
}

