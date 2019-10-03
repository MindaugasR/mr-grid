<template>
	<div>
		<input type="checkbox" value="1" v-model="options.hideHeader" /> Hide header
		<input type="checkbox" value="1" v-model="options.hideFooter" /> Hide footer
		<input type="button" value="Add column" @click="addColumn" />
		<input type="button" value="Add Row" @click="addRow" />
		<div style="margin-top: 15px;"></div>
		<vue-grid
			:columns="columns"
			:rows="rows"
			:options="options"
		>
		</vue-grid>
	</div>
</template>

<script>
	let rows = []
	for (let i = 1; i <= 10; i++) {
		let data = {
			id: i,
			columns: {
				text: 'Text #' + i,
				select: Math.floor(Math.random()  * 5) + 1,
				number: Math.floor(Math.random() * 1000000000000) + 1
			}
		}
		if (i === 1) {
			data.children = []
			for (let c = 1; c <= 5; c++) {
				let child = {
					id: 'children_' + i + '_' + c,
					columns: {
						text: 'Children #' + i + "."+ c,
						select: Math.floor(Math.random()  * 5) + 1,
						number: Math.floor(Math.random() * 1000000000000) + 1
					}
				}
				if (c === 1) {
					child.children = []
					for (let a = 1; a <= 8; a++) {
						child.children.push({
							id: 'children_' + i + '_' + c + '_' + a,
							columns: {
								text: 'Children #' + i + "." + c + "." + a,
								select: Math.floor(Math.random()  * 5) + 1,
								number: Math.floor(Math.random() * 1000000000000) + 1
							}
						})
					}
				}
				data.children.push(child)
			}
		}
		rows.push(data)
	}
	export default {
		name: 'app',
		data() {
			return {
				rows: rows,
				columns: [
					{
						id: 'text',
						title: 'Text',
						width: 250,
						fixed: true,
						hide: false,
						editor: {
							type: 'Text'
						},
						filter: {
							type: 'Text'
						},
						footer: {
							text: 'Footer text'
						}
					},
					{
						id: 'select',
						title: 'Select',
						width: 300,
						filter: {
							type: 'Select'
						},
						footer: {
							template: this.selectColumnTemplate
						},
						editor: {
							type: 'Select',
							options: [
								{ id: 1, text: 'Option #1'},
								{ id: 2, text: 'Option #2'},
								{ id: 3, text: 'Option #3'},
								{ id: 4, text: 'Option #4'},
								{ id: 5, text: 'Option #5'}
							]
						}
					},
					{
						id: 'number',
						title: 'Random number',
						width: 600,
						editor: {
							type: 'Text'
						},
						filter: {
							type: 'Text'
						},
						footer: {
							template: () => {
								return this.countRowAmount()
							}
						}
					}
				],
				options: {
					width: '800px',
					height: '500px',
					treeColumn: 'text',
					hideHeader: false,
					hideFooter: false,
					edit: {
						enable: true,
						type: 'cell'
					}
				}
			}
		},
		computed: {
			selectColumnTemplate() {
				return 'Select text template'
			}
		},
		methods: {
			countRowAmount(rows) {
				let amount = 0
				rows = rows || this.rows
				rows.forEach((row) => {
					if (row.children !== undefined) amount += this.countRowAmount(row.children)
					let rowNumber = parseInt(row.columns.number)
					amount += isNaN(rowNumber)?0:rowNumber
				})
				return amount
			},
			addColumn() {
				let rand = Math.floor(Math.random() * 100) + 1
				this.columns.push({
					id: 'new_columns_' + rand,
					title: 'New Column #' + rand,
					width: 250,
					hide: false,
					editor: {
						type: 'Text'
					},
					filter: {
						type: 'Text'
					},
					footer: {
						text: 'New Column Footer #' + rand
					}
				})
			},
			addRow() {
				this.rows.push({
					id: 'new_row_' + Math.floor(Math.random() * 1000000000000) + 1,
					columns: {
						text: 'Text #11 New Column',
						select: Math.floor(Math.random()  * 5) + 1,
						number: Math.floor(Math.random() * 1000000000000) + 1,
						newColumn: "New Column row "
					}
				})
			}
		}
	}
</script>
