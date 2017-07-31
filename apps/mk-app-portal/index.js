import config from './config'
import * as data from './data'

export default {
	name: "mk-app-portal",
	version: "1.0.7",
	description: "mk-app-portal",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-portal")
	}
}