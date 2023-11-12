import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middlewares/json.js'

const server = http.createServer(async (request, response) => {
    await json(request, response)
    
    const { method, url } = request

    const route = routes.find((route) => {
        return route.method === method 
            && route.url.test(url)
    })

    if (route) {
        const routeParams = request.url.match(route.url)
        const { query, ...params } = routeParams.groups

        request.params = params

        return route.handler(request, response)
    }

    return response.writeHead(404).end()
})

server.listen(3000)