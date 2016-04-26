import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  room: { type: String, required: true },
  date: String,
  time_start: String,
  time_end: String,
  time_other: String,
  icon: String,
  created_at: Date,
  updated_at: Date
})

export default mongoose.model('Event', EventSchema)
