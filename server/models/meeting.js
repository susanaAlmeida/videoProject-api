import mongoose from 'mongoose'

const MeetingSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  role: String,
  room_name: String,
  company_name: String,
  meeting_logo: String,
  date: String,
  time_start: String,
  created_at: Date,
  updated_at: Date
})

export default mongoose.model('Meeting', MeetingSchema)
