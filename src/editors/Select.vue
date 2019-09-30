<template>
	<select @change="changeValue($event)" @focusout="closeEditor" ref="selectEditor">
		<option
			v-for="(option,index) in column.editor.options"
			:key="index"
			:selected="option.id === selected"
			:value="option.id"
		>
			{{option.text}}
		</option>
	</select>
</template>

<script>
	export default {
		name: "Select_Editor",
		props: {
			value: [String, Number],
			row: Object,
			column: Object
		},
		data() {
			return {
				selected: this.value
			}
		},
		mounted() {
			this.$refs.selectEditor.focus()
		},
		methods: {
			changeValue(event) {
				this.$emit('update:value', event.target.value)
			},
			closeEditor() {
				this.$emit('close-editor')
			}
		}
	}
</script>

<style scoped>
	select {
		width: 100%;
		height: 38px;
		padding-left: 9px;
		border-radius: 0;
		border: none;
		font-size: inherit;
		background-color: transparent;
		border-bottom: 2px solid #0288d1;
		margin-left: -9px;
		outline: none;
	}
</style>
