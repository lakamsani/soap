
import 'reflect-metadata'
import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import morganlogger from 'morgan'
import path from 'path'

import { MockSOAPServer } from './MockSOAPServer'

const port = process.env.PORT || 2347

// create express app
const app = express()
app.use(bodyParser.json())
app.use(morganlogger('dev'))
app.use(bodyParser.urlencoded({extended: true}))

const hostURL = 'http://localhost'
const server = http.Server(app)
server.listen(port, () => {
    const mockSOAPServer = new MockSOAPServer(server)
    console.log(`Server has started on port ${port}. Open ${hostURL}:${port}/resource to see results`)
})
