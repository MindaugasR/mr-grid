<template>
	<div class="grid-header">
		<div class="resize-line" ref="resizeLine"></div>
		<template  v-if="!settings.hideHeader">
			<div class="grid-header-row">
				<template v-for="(column,index) in columns">
					<div
						:key="index"
						:column="column.id"
						:title="column.title"
						:style="{width: column.width + 'px', 'line-height': '41px'}"
						v-if="column.hide === undefined || !column.hide"
						role="column"
						:class="['grid-header-cell', haveFilters?'grid-filters':'',column.fixed?'grid-column-fixed':'']"
					>
						<div :class="['grid-header-title',haveFilter(column)?'':'grid-no-filter-title']">
							<slot :name="`header.` + column.id.toString().toLowerCase()" :text="column.title" :column="column">{{column.title}}</slot>
						</div>
						<i :class="['material-icons','sort-icon',sort.column[column.id]?sort.column[column.id]:'sort-hidden']" @click="sortBy(column.id)">sort</i>
						<div class="header-resizer" @mousedown="startDrag"></div>
						<component
								v-if="(column.filter !== undefined && column.filter.type !== undefined)"
								:is="column.filter.type + `_Filter`"
								:search.sync="filter.val"
								:column="column"
								:ref="`filter_` + column.id"
								class="grid-filter"
						></component>
						<div
							v-else
							:style="{width: column.width + 'px', 'line-height': '41px'}"
							class="grid-no-filter"
						></div>
					</div>
				</template>
			</div>
		</template>
	</div>
</template>
<script>

	export default {
		name: "TreeHeader",
		data() {
			return {
				filter: {
					holder: {},
					val: ''
				},
				sort: {
					key: '',
					orders: {},
					column: {}
				},
				drag: {
					dragging: false,
					curCol: null,
					pageX: null
				}
			}
		},
		computed: {
			columns() {
				return this.$store.state.TreeGridCollection.columns
			},
			rows() {
				return this.$store.state.TreeGridCollection.rows
			},
			settings() {
				return this.$store.state.TreeGridCollection.settings
			}
		},
		mounted() {
			window.addEventListener('mouseup', this.stopDrag)
			document.addEventListener('mousemove', (e) => {
				if (this.drag.dragging) {
					if (this.drag.curCol) {
						this.changeResizeLine(e)
					}
				}
			})
		},
		watch: {
			columns: function(val) {
				val.forEach((column) => {
					this.sort.orders[column.id] = 1
				})
			},
			'filter.val': function(val) {
				this.filter.holder = {...this.filter.holder, ...val}
				Object.keys(this.filter.holder).forEach((column) => {
					if (this.$refs['filter_' + column] !== undefined) {
						if (typeof this.$refs['filter_' + column][0].filter === 'undefined')
							this.filterData(this.rows,column,this.filter.holder[column])
						else
							this.$refs['filter_' + column][0].filter(this.rows)
					}
				})
			}
		},
		methods: {
			sortBy(col) {
				this.sort.key = col
				this.sort.orders[col] = this.sort.orders[col] * -1
				this.sort.column = {}
				let output = this.rows.slice().sort((a, b) => {
					a = a.columns[this.sort.key]
					b = b.columns[this.sort.key]
					return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.orders[this.sort.key] || 1)
				})
				this.$set(this.sort.column,col,(this.sort.orders[col] === -1 ? 'grid-sort-desc' : 'grid-sort-asc'))
				this.$store.commit('TreeGridCollection/updateRows',output)
			},
			startDrag(e) {
				this.drag.dragging = true
				this.drag.index = Array.from(e.target.parentElement.parentNode.children).indexOf(e.target.parentElement)
				this.drag.column = e.target.parentElement.getAttribute('column')
				this.drag.curCol = e.target.parentElement
				this.drag.pageX = e.pageX
				this.$refs.resizeLine.style.opacity = 1
				this.changeResizeLine(e)
			},
			stopDrag() {
				if (this.drag.dragging) {
					let width = parseFloat(this.$refs.resizeLine.style.left)
					if (this.drag.index > 0) {
						let minus = 0
						for (let i = 0; i < this.drag.index; i++) {
							minus += this.columns[i].width
						}
						width -= minus
					}
					width -= 17 * this.drag.index
					this.$refs.resizeLine.style.opacity = 0
					let column = this.columns[this.drag.index]
					column.width = width - 17
					this.drag.dragging = false
				}
			},
			changeResizeLine(e) {
				let diffX = e.pageX - this.drag.pageX
				let add = 17 * (this.drag.index + 1);
				for (let i = 0; i <= this.drag.index;i++) {
					add += parseFloat(this.columns[i].width)
				}
				this.$refs.resizeLine.style.left = (add + diffX) + 'px'
			},
			haveFilter(column) {
				return (column.filter !== undefined && column.filter.type !== undefined)
			},
			haveFilters() {
				let r = false
				this.columns.forEach((column) => {
					if (column.filter !== undefined && column.filter.type !== undefined)
						r = true
				})
				return r
			},
			filterData(rows,column,text) {
				let count = rows.length - 1
				for (let i = 0; i <= count; i++) {
					let row = rows[i]
					this.$set(row,'$visible',false)
					if (row.children)
						this.$set(row,'children',this.filterData(row.children,column,text))
					
					if (row.children !== undefined && row.children.length > 0) {
						let total = 0
						row.children.forEach((child) => {
							if (child.$visible)
								total++
						})
						if (total > 0)
							this.$set(row,'$visible',true)
						else
							this.$set(row,'$visible',false)
					}
					if (row.columns[column].toString().toLowerCase().indexOf(text) > -1)
						this.$set(row,'$visible',true)
					
				}
				return rows
			}
		}
	}
</script>
