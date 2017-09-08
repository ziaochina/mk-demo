import beautify from 'js-beautify'
import less from 'less/lib/less'
import utils from 'mk-utils'

export function beautifyJS(str) {
    return beautify.js_beautify(str, { indent_size: 4 })
}

export function beautifyCSS(str) {
    return beautify.css_beautify(str, { indent_size: 4 })
}

export function addStyleSheet(str) {
    less().render(str, (e, output) => {
        if(e){
            utils.exception.error(e)
            return
        }

        var s = document.querySelector('#mk-meta-design-dynamic-style')
        if (s)
            s.remove()

        var head = document.head || document.getElementsByTagName('head')[0]
        var style = document.createElement('style')
        style.id = 'mk-meta-design-dynamic-style'
        style.type = 'text/css'
        style.innerHTML = output.css
        head.appendChild(style)
    })
}

export default {
    beautifyJS,
    beautifyCSS,
    addStyleSheet
}