<template>
	<div>
		<div class="grid-body" :style="{width: settings.width, height: settings.height}" :id="TableID">
			<grid-header></grid-header>
			<grid-body></grid-body>
			<grid-footer></grid-footer>
		</div>
	</div>
</template>

<script>
	
	import GridHeader from '../components/GridHeader'
	import GridBody from '../components/GridBody'
	import GridFooter from '../components/GridFooter'
	import {mapState} from 'vuex'
	export default {
		name: 'VueGrid',
		components: {GridHeader,GridBody,GridFooter},
		data() {
			return {
				TableID: 'TreeGrid-' + Math.floor(Math.random() * 101),
				data: [],
				defaultOptions: {
					width: '100%',
					height: '100%',
					children: 'children',
					hideHeader: false,
					edit: {
						allow: true,
						mode: 'click',
						type: 'cell'
					}
				}
			}
		},
		props: {
			columns: {
				require: true,
				type: Array,
				validator: function (value) {
					return value.length > 0
				}
			},
			rows: Array,
			options: Object
		},
		computed: {
			...mapState({
				settings: 'settings'
			}),
			cfg() {
				return {
					...this.defaultOptions,
					...this.options
				}
			},
		},
		watch: {
			options: {
				deep: true,
				handler: function() {
					this.$store.commit('settings',this.cfg)
				}
			},
			columns: {
				deep: true,
				handler: function(val) {
					this.$store.commit('columns',val)
					this.data = this.updateRowsColumns(this.data)
					this.$store.commit('rows',[...this.data])
				}
			},
			rows: {
				deep: true,
				handler: function(val) {
					this.data = val
					this.$store.commit('data',[...this.data])
					this.$store.commit('rows',[...this.data])
				}
			},
		},
		methods: {
			updateRowsColumns(rows) {
				let length = rows.length
				for (let i = 0; i <= length; i++) {
					if (rows[i] !== undefined) {
						if (rows[i][this.settings['children']] !== undefined)
							rows[i][this.settings['children']] = this.updateRowsColumns(rows[i][this.settings['children']])
						
						this.columns.forEach((column) => {
							if (rows[i].columns[column.id] === undefined)
								rows[i].columns[column.id] = ''
						})
					}
				}
				
				return rows
			}
		},
		mounted() {
			this.data = this.rows
			this.$store.commit('columns',this.columns)
			this.$store.commit('data',[...this.data])
			this.$store.commit('rows',[...this.data])
			this.$store.commit('settings',this.cfg)
		}
	}
</script>
