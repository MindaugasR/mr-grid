export default {
	namespaced: true,
	state: {
		settings: {},
		rows: [],
		columns: [],
		editor: {},
		selectedRow: {}
	},
	mutations: {
		addRows(state,rows) {
			state.rows = rows
		},
		updateRows(state,rows) {
			state.rows = rows
		},
		selectRow(state,{row,column}) {
			state.selectedRow = {}
			state.selectedRow[row.id.toString()] = column.id
		},
		addSettings(state,settings) {
			state.settings = Object.assign({}, this.settings, settings)
		},
		addColumns(state,columns) {
			state.columns = columns
		},
		updateColumn(state,obj) {
			state.columns[obj.index] = obj.column
		},
		openEditor(state,obj) {
			state.editor = {}
			switch (state.settings.edit.type) {
				case 'cell':
				default:
					if (obj.row !== undefined && obj.column !== undefined) {
						if (state.editor[obj.row.id.toString()] === undefined) {
							state.editor[obj.row.id.toString()] = {}
						}
						state.editor[obj.row.id.toString()][obj.column.id] = true
					}
				break;
				case 'row':
					if (obj.row !== undefined) {
						state.columns.forEach((column) => {
							if (state.editor[obj.row.id.toString()] === undefined) {
								state.editor[obj.row.id.toString()] = {}
							}
							state.editor[obj.row.id.toString()][column.id] = true
						})
					}
				break;
			}
		},
		closeEditor(state) {
			state.editor = {}
		}
	},
	actions: { },
	getters: {
		getRows: (state) => {
			return state.rows
		},
		getColumns(state) {
			return state.columns
		},
		getSettings(state) {
			return state.settings
		}
	}
}
