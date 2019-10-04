<template>
	<div class="grid-row" :class="[$store.state.TreeGridCollection.selectedRow[row.id.toString()]?'row-selected':'']">
		<template v-for="(column,cidx) in columns">
			<div
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
					<i class="material-icons">{{row.$expanded?'keyboard_arrow_up':'keyboard_arrow_down'}}</i>
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
				<div
					v-else
					@click="openEditor($event,row,column,'click'), selection($event,row,column)"
					@dblclick="openEditor($event,row,column,'dblclick')"
					style="height: 40px"
				>{{ row.columns[column.id] }}</div>
			</div>
		</template>
		<template v-if="haveChildrens">
			<template v-for="child in row[settings.children]">
				<grid-row v-if="child.$visible || child.$visible === undefined" :row="child" :level="(level + 1)" :key="child.id"></grid-row>
			</template>
		</template>
	</div>
</template>

<script>
	export default {
		name: "GridRow",
		data() {
			return {
				expanded: false,
				click: null
			}
		},
		props: {
			level: Number,
			row: Object
		},
		computed: {
			columns() {
				return this.$store.state.TreeGridCollection.columns
			},
			settings() {
				return this.$store.state.TreeGridCollection.settings
			},
			editor() {
				return this.$store.state.TreeGridCollection.editor
			},
			haveChildrens() {
				return this.row.$expanded && this.row[this.settings.children] !== undefined && this.row[this.settings.children].length > 0
			}
		},
		mounted() {
			this.$set(this.row,'$level',this.level)
		},
		methods: {
			isTreeColumn(column,cidx) {
				if (this.settings.treeColumn !== undefined && column.id === this.settings.treeColumn)
					return true
				else if (cidx === 0 && this.settings.treeColumn === undefined)
					return true
				return false
			},
			openEditor(event,row,column,mode) {
				if (this.settings.edit.mode === mode) {
					this.$store.commit('TreeGridCollection/openEditor',{
						row: row,
						column: column
					})
				}
			},
			closeEditor() {
				this.$store.commit('TreeGridCollection/closeEditor')
			},
			expandRow() {
				this.expanded = !this.expanded
				this.$set(this.row,'$expanded',this.expanded)
			},
			selection(event,row,column) {
				if (this.settings.selection) {
					this.$store.commit('TreeGridCollection/selectRow',{row,column})
				}
			}
		}
	}
</script>

<style scoped>

</style>
