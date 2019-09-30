<template>
	<div>
		<input type="text" value="" v-model="filterText" />
	</div>
</template>

<script>
	export default {
		name: "Text_Filter",
		data() {
			return {
				filterText: ''
			}
		},
		props: {
			column: Object
		},
		watch: {
			filterText: function(val) {
				let data = {}
				data[this.column.id] = val
				this.$emit('update:search',data);
			}
		}
	}
</script>

<style scoped>
	input {
		width: 100%;
		height: 27px;
		border-radius: 0;
		font-size: inherit;
		background-color: #FFF;
		outline: none;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	input:focus{
		outline: none;
	}
</style>
