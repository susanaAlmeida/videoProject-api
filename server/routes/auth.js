import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config'

export default (router) => {
  router.post('/authenticate', (req, res) => {
    console.log(req.body)
    User.findOne({
      name: req.body.name
    }, (err, user) => {
      if (err) throw err;
      console.log(user);
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        })
      } else if (user) {
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (err) return next(err)
          if(!isMatch){
            res.json({
              success: false, message:
              'Authentication failed. Wrong password.'
            })
          } else {
            let token = jwt.sign(user, config.secret, {
              expiresInMinutes: 1440
            })

            res.set('Authorization', token)
              .json({
                success: true,
                message: 'Authentication successful. You can now use the endpoints',
                token: token
              })
          }
        })
      }
    })
  })
}
