<template>
	<div>
		<input :type="type" aria-label="Film title" v-model="text" ref="textEditor" @blur="closeEditor" />
	</div>
</template>

<script>
	export default {
		name: "Text_Editor",
		props: {
			value: [String, Number],
			row: Object,
			column: Object
		},
		data() {
			return {
				text: this.value,
				type: typeof this.value === 'string'?'text':'number'
			}
		},
		watch: {
			text: function(val) {
				this.$emit('update:value', this.text)
			}
		},
		mounted() {
			this.$refs.textEditor.select()
		},
		methods: {
			closeEditor() {
				this.$emit('close-editor')
			}
		}
	}
</script>
<style scoped>
	input {
		width: 100%;
		height: 35px;
		padding: 0 9px;
		border-radius: 0;
		border: none;
		font-size: inherit;
		background-color: transparent;
		border-bottom: 2px solid #0288d1;
		margin-left: -9px;
		outline: none;
	}
	input:focus{
		outline: none;
	}
</style>
