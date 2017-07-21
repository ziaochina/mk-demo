import config from './config'
import * as data from './data'

export default {
	name: "mk-app-root",
	version: "1.0.2",
	description: "mk-app-root",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-root")
	}
}