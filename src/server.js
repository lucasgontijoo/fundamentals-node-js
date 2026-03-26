// Stateful - Stateless
// Cabeçalhos (Requisição/resposta) => Metadados

import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios
// Route Parameters: Identificação de recurso
// Request Body: Envio de informações de um formulário (HTTPs)

//http://localhost:3333/users?userId=1&name=Lucas

// GET http://localhost:3333/users/1
// DELETE http: //localhost:3333/users/1

// POST http://localhost:3333/users

// Edição e remoção

const server = http.createServer(async(req, res) => {
    const { method, url } = req // mesma coisa que const method = req.method (usa desestruturação)

    await json(req, res)

    const route = routes.find(route => {
        return route.method == method && route.path.test(url)
    })

    if(route) {
        const routeParams = req.url.match(route.path)

        const { query, ...params } = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end('Not found')
})

server.listen(3333)