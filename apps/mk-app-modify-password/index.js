import config from './config'
import * as data from './data'

export default {
	name: "mk-app-modify-password",
	version: "1.0.2",
	description: "mk-app-modify-password",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-modify-password")
	}
}