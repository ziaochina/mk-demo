import config from './config'
import * as api from './api'

export default {
	name: "mk-app-card",
	version:"1.0.0",
	description:"mk-app-card",
	meta : api.getMeta(),
	components:[],
	config:config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-card")
	}
}