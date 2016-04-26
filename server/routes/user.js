import User from '../models/user'
import auth from '../middleware/isAuthenticated'

export default (router) => {
  router.get('/users', auth, (req, res) => {
    User.find({}, (err, users) => {
      res.json(users);
    })
  })

  router.get('/users/seed', (req, res) => {
    let results = {}

    let gen = new User({
      name: 'gen',
      password: 'baderous',
      admin: true
    })

    User.findOne({name: 'gen'}, (err, doc) => {
      if (err) throw err;
      if (doc == null) {
        gen.save()
        results.user = 'User gen saved successfully'
        console.log('User saved successfully')
      }

    })

    let tek = new User({
      name: 'tekzenit',
      password: 'Tekgenpt1234',
      admin: true
    })

    User.findOne({name: 'tekzenit'}, (err, doc) => {
      if (err) throw err;
      if (doc == null) {
        tek.save()
        results.user = 'User tek saved successfully'
        console.log('User saved successfully')
      }

      return res.json(results)
    })
  })
}
