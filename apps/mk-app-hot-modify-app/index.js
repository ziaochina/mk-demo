import config from './config'
import * as data from './data'
import CodeMirror from 'mk-component/lib/components/codeMirror'

export default {
	name: "mk-app-hot-modify-app",
	version: "1.0.1",
	description: "mk-app-hot-modify-app",
	meta: data.getMeta(),
	components: [{
		name: 'CodeMirror',
		component: CodeMirror
	}],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-hot-modify-app")
	}
}