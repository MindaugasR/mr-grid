<template>
	<div class="grid-row">
		<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
		<div
			v-for="(column,cidx) in columns"
			:key="column.id"
			:column="column.id"
			:title="row.columns[column.id]"
			:style="{width: column.width + 'px', 'line-height': '40px'}"
			v-if="!column.hide"
			role="cell"
			:class="['grid-cell', 'number-cell',column.fixed?'grid-column-fixed':'']"
		>
			<template v-if="level > 1 && isTreeColumn(column,cidx)">
				<div class="grid-empty"  v-for="i in (level - 1)" :key="i"></div>
			</template>
			<div
				class="tree-open tree-icon"
				v-if="row[settings.children] !== undefined && isTreeColumn(column,cidx) && row[settings.children].length > 0"
				@click="expandRow()"
			>
				<i class="material-icons">{{row.expand?'keyboard_arrow_up':'keyboard_arrow_down'}}</i>
			</div>
			<component
				v-if="settings.edit.enable && typeof editor[row.id] !== 'undefined' && editor[row.id][column.id] && column.editor !== undefined"
				:is="column.editor.type + `_Editor`"
				:value.sync="row.columns[column.id]"
				:row="row"
				:column="column"
				class="grid-editor"
				@close-editor="closeEditor(row,column)"
			></component>
			<div v-else @click="openEditor($event,row,column)">{{ row.columns[column.id] }}</div>
		</div>
		<template v-if="haveChildrens">
			<grid-row v-for="child in row[settings.children]" :row="child" :level="(level + 1)" :key="child.id"></grid-row>
		</template>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name: "GridRow",
		data() {
			return {
				expanded: false
			}
		},
		props: {
			level: Number,
			row: Object
		},
		computed: {
			...mapState(['columns','settings','editor']),
			haveChildrens() {
				return this.row.expand && this.row[this.settings.children] !== undefined && this.row[this.settings.children].length > 0
			}
		},
		methods: {
			isTreeColumn(column,cidx) {
				if (this.settings.treeColumn !== undefined && column.id === this.settings.treeColumn)
					return true
				else if (cidx === 0 && this.settings.treeColumn === undefined)
					return true
				return false
			},
			openEditor(event,row,column) {
				this.$store.commit('openEditor',{
					row: row,
					column: column
				})
			},
			closeEditor(row) {
				this.$store.commit('closeEditor',row)
			},
			expandRow() {
				this.expanded = !this.expanded
				this.$set(this.row,'expand',this.expanded)
			}
		}
	}
</script>

<style scoped>

</style>
