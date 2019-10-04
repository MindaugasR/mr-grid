<template>
	<div class="grid-footer">
		<template  v-if="!settings.hideFooter">
			<div
				v-for="(column,index) in columns"
				:key="index"
				:column="column.id"
				:title="column.title"
				:style="{width: column.width + 'px', 'line-height': '41px'}"
				v-if="column.hide === undefined || !column.hide"
				:class="['grid-footer-cell',column.fixed?'grid_column_fixed':'']"
				role="column"
			>
				<div class="grid-footer-title">
					<slot :name="`footer.` + column.id" :column="column" :rows="rows" :text="column.title">{{footer(column)}}</slot>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name: "GridFooter",
		computed: {
			...mapState(['columns','rows']),
			columns() {
				return this.$store.state.TreeGridCollection.columns
			},
			settings() {
				return this.$store.state.TreeGridCollection.settings
			}
		},
		methods: {
			footer(column) {
				let title = column.title
				if (column.footer !== undefined) {
					if (typeof column.footer.template !== undefined) {
						switch (typeof column.footer.template) {
							case 'object': title =  column.footer.template; break;
							case 'function': title = column.footer.template(); break;
						}
					}
					if (column.footer.text !== undefined)
						title =  column.footer.text
				}
				return title
			}
		}
	}
</script>

<style scoped>

</style>
