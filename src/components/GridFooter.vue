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
			...mapState(['settings','columns','rows']),
		},
		methods: {
			footer(column) {
				if (column.footer !== undefined) {
					if (column.footer.text !== undefined)
						return column.footer.text
					if (typeof column.footer.template !== undefined) {
						switch (typeof column.footer.template) {
							case 'object': return column.footer.template; break;
							case 'function': return column.footer.template(); break;
						}
					}
				}
				return column.title
			}
		}
	}
</script>

<style scoped>

</style>
