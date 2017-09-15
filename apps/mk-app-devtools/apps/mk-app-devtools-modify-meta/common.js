import less from 'less/lib/less'

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
    addStyleSheet
}