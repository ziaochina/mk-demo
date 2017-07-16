var _options

function config(options) {
	_options = options
}

config.getCurrent = () => _options

export default config