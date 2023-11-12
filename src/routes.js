import { randomUUID } from 'node:crypto'
import { Database } from "./database.js"
import { buildRoteUrl } from "./utils/build-rote-url.js"

const database = new Database()

export const routes = [
    {
        method: 'POST',
        url: buildRoteUrl('/tasks'),
        handler: (request, response) => {
            const data = request.body
            console.log(request.body)

            if (data.title && data.description) {
                Object.assign(data, {
                    id: randomUUID(),
                    completed_at: null,
                    created_at: new Date(),
                    updated_at: null
                })

                database.insert('tasks', data)
                return response.writeHead(201).end()
            }

            return response.writeHead(400).end()
        }
    },
    {
        method: 'GET',
        url: buildRoteUrl('/tasks'),
        handler: (request, response) => {
            const tasks = database.select('tasks')
            
            return response.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'PUT',
        url: buildRoteUrl('/tasks/:id'),
        handler: function(request, response) {
            const data = request.body
            const id = request.params.id

            database.update('tasks', data, id)
            
            return response.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        url: buildRoteUrl('/tasks/:id'),
        handler: function(request, response) {
            database.delete('tasks', request.params.id)
            
            return response.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        url: buildRoteUrl('/tasks/:id/complete'),
        handler: function(request, response) {
            const id = request.params.id
            
            if (id) {
                database.setTaskComplete(id)

                return response.writeHead(204).end()
            }

            return response.writeHead(400).end()
        }
    }
]