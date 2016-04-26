import express from 'express'
import Pages from './routes/pages'
import User from './routes/user'
import Auth from './routes/auth'
import Birthday from './routes/birthday'
import Event from './routes/event'
import Meeting from './routes/meeting'

export default () => {
  let router = express.Router()

  Pages(router)
  Auth(router)
  User(router)
  Birthday(router)
  Event(router)
  Meeting(router)

  return router
}
