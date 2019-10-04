<template>
	<div>
		<template v-for="(row,index) in rows">
			<grid-row v-if="row.$visible || row.$visible === undefined" :row="row" :level="1" :key="index"></grid-row>
		</template>
	</div>
</template>

<script>
	import GridRow from './GridRow'

	export default {
		name: "GridBody",
		components: {GridRow},
		computed: {
			rows() {
				return this.$store.state.TreeGridCollection.rows
			}
		}
	}
</script>

<style scoped>

</style>
