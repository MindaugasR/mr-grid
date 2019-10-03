<template>
	<div>
		<grid-row v-for="(row,index) in rows" :row="row" :level="1" :key="index"></grid-row>
	</div>
</template>

<script>
	import GridRow from './GridRow'
	import {mapState} from 'vuex'
	export default {
		name: "GridBody",
		components: {GridRow},
		computed: {
			...mapState(['rows'])
		}
	}
</script>

<style scoped>

</style>
