import { request } from 'node:http'
import { createReadStream } from 'node:fs'
import { parse } from 'csv-parse'

const csvPath = new URL('../assets/data.csv', import.meta.url)
const requestOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/tasks',
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    }
}



const parser = createReadStream(csvPath).pipe(parse({columns: true}))

for await (const record of parser) {
    const requestHttp = request(requestOptions, response => {
        response.on('data', data => {
            console.log(data.toString())
        })
    })
    requestHttp.on('error', error => {
        console.log(error)
    })
    requestHttp.write(JSON.stringify(record))
    requestHttp.end()
}

