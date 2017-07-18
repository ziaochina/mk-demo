import config from './config'
import * as api from './api'

export default {
	name: "mk-app-root",
	version: "1.0.0",
	description: "mk-app-root",
	meta: api.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-root")
	}
}