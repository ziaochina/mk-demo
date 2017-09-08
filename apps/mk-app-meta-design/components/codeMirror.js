import React from 'react'
import CodeMirror from 'react-codemirror2'
import 'codemirror/theme/material.css'
import "codemirror/lib/codemirror.css"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/css/css"

export default function CodeMirrorComponent(props) {
	return <CodeMirror {...props}/>
}
