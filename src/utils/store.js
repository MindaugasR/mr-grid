export default {
	state: {
		columns: [],
		rows: [],
		data: [],
		settings: [],
		editor: {}
	},
	mutations: {
		columns (state,columns) {
			state.columns = columns
		},
		data (state,rows) {
			state.data = rows
		},
		rows (state,rows) {
			state.rows = rows
		},
		settings (state,settings) {
			state.settings = settings
		},
		changeColumn(state,obj) {
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
		closeEditor(state,row) {
			if (state.editor[row.id] !== undefined) {
				state.editor = {}
			}
		}
	},
	getters: {
		getRows: (state) => {
			return state.rows
		},
		getRowChildrens: (state) => (index) => {
			if (index === undefined) {
				return state.rows
			}
			else {
				let split = index.split(".")
				let rows = state.rows
				split.forEach((part) => {
					rows = rows[part]
				})
				return rows.children
			}
		}
	}
}
