import config from './config'
import * as api from './api'

export default {
	name: "mk-app-root-about",
	version: "1.0.0",
	description: "about",
	meta: api.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-root-about")
	}
}