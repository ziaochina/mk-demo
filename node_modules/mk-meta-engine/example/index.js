import React from 'react'
import {
	config,
	start,
	componentFactory
} from '../src'

import _src from './src/index.js'

config({
	apps: {
		[_src.name]: _src
	},
	targetDomId:'app',
	startAppName:'example'
})


Object.keys(_src.components).forEach(key=>{
	componentFactory.registerAppComponent(_src.name, key, _src.components[key])
})

start()