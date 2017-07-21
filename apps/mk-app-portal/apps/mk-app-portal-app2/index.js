import config from './config'
import * as data from './data'

export default {
	name: "mk-app-portal-app2",
	version: "1.0.0",
	description: "mk-app-portal-app2",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-portal-app2")
	}
}