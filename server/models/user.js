import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  created_at: Date,
  updated_at: Date
})

// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre('save', function (next) {
  var user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {

      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err)
        }
        user.password = hash
        next()
      });
    });
  } else {
    return next()
  }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
      if (err) {
        return callback(err)
      }
      callback(null, isMatch)
    });
}

export default mongoose.model('User', UserSchema)
