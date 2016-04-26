//estrutura da tabela da base de dados
import mongoose from 'mongoose'

const VideoSchema = new mongoose.Schema({
  name: { type: String, required: true},
  url: String,
  created_at: Date,
  updated_at: Date
})

export default mongoose.model('Video', VideoSchema)
