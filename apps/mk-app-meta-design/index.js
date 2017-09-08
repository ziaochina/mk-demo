import config from './config'
import * as data from './data'
import CodeMirror from './components/codeMirror'

export default {
	name: "mk-app-meta-design",
	version: "1.0.1",
	description: "mk-app-meta-design",
	meta: data.getMeta(),
	components: [{
		name: 'CodeMirror',
		component: CodeMirror
	}],
	config: config,
	dependencies: ['js-beautify', 'react-codemirror2'],
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "mk-app-meta-design")
	}
}