import config from './config'
import * as data from './data'

export default {
	name: "mk-app-versions",
	version: "1.0.0",
	description: "mk-app-versions",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-versions")
	}
}