var _options = {}

function config(options) {
	if(options){
		_options = {... _options, ...options }
	}
}

config.getCurrent = () => _options

export default config