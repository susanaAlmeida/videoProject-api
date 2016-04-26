import mongoose from 'mongoose'

const BirthdaySchema = new mongoose.Schema({
  first_name: { type: String, required: true},
  last_name: String,
  role: String,
  employee_since: String,
  cake_time: String,
  birthday: String,
  created_at: Date,
  updated_at: Date
})

export default mongoose.model('Birthday', BirthdaySchema)
