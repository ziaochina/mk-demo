import config from './config'
import * as data from './data'

export default {
	name: "mk-app-portal-about",
	version: "1.0.0",
	description: "mk-app-portal-about",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-portal-about")
	}
}