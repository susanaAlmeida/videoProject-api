import express from 'express'
import Pages from './routes/pages'
import User from './routes/user'
import Auth from './routes/auth'
import Video from './routes/video'

export default () => {
  let router = express.Router()

  Pages(router)
  Auth(router)
  User(router)
  Video(router)

  return router
}
