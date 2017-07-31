import config from './config'

export function getMeta() {
    return {
        name: 'root',
        component: '::div',
        className: 'mk-app-root',
        children: {
            name: 'currentApp',
            component: 'AppLoader',
            appName: '{{data.currentAppName}}',
            onRedirect: '{{$onRedirect}}'
        }
    }
}

export function getInitState() {
    const hash = document.location.hash || ''
    const startAppName = hash ? hash.substr(1) : config.current.startAppName

    return {
        data: {
            currentAppName: startAppName
        }
    }
}