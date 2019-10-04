<template>
	<div>
		<select @change="filterSelect" v-model="selectedData">
			<option value=""></option>
			<option v-for="(option,value) in options" :value="value" :key="value">{{value}}</option>
		</select>
	</div>
</template>

<script>
	export default {
		name: "Select_Filter",
		data() {
			return {
				options: {},
				selectedData: ''
			}
		},
		computed: {
			rows() {
				return this.$store.state.TreeGridCollection.rows
			}
		},
		props: {
			column: Object
		},
		mounted() {
			this.getOptions()
		},
		methods: {
			getOptions() {
				this.options = {}
				this.rows.forEach((row) => {
					this.options[row.columns[this.column.id].toString()] = true
				})
			},
			filterSelect(e) {
				let data = {}
				data[this.column.id] = e.target.value
				this.$emit('update:search',data);
			}
		}
	}
</script>

<style scoped>
	select {
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
</style>
