import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'

import config from './config'
import router from './router'

let app = express()

let port = process.env.PORT || 8080

mongoose.connect(config.database)
app.set('superSecret', config.secret)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let corsOptions = {
  'origin': 'http://localhost:3000',
  'methods': [
    'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'
  ],
  'credentials': true,
  'allowedHeaders': [
    'Accept', 'Content-Type', 'Origin',
    'Authorization', 'X-Requested-With', 'Cache-Control', 'x-access-token'
  ],
  'exposedHeaders': [
    'Accept', 'Content-Type', 'Origin', 'Authorization', 'X-Requested-With'
  ]
}

app.use(cors(corsOptions))


app.use(morgan('dev'))

app.use('/', router())

app.listen(port)
console.log('Magic happens at http://localhost:' + port)

export default app
