import * as api from './api'


var _options = {
	fetchList: (pagination, filter) => {
		return api.fetchList(pagination, filter)
	}
}

function config(options) {
	if (options) {
		_options = { ..._options, ...options }
	}
}

config.getCurrent = () => _options

export default config