export function buildRoteUrl(url) {
    const routeParameterRegex = /:([a-zA-Z]+)/g
    const urlWithParams = url.replaceAll(routeParameterRegex, '(?<$1>[a-z0-9\-_]+)')

    const urlRegex = new RegExp(`^${urlWithParams}(?<query>\\?(.*))?$`)

    return urlRegex
}