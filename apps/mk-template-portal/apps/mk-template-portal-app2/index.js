import config from './config'
import * as api from './api'

export default {
	name: "mk-template-portal-app2",
	version:"1.0.0",
	description:"app2",
	meta : api.getMeta(),
	components:[],
	config:config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-template-portal-app2")
	}
}