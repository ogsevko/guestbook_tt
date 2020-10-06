const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  message: { type: String, required: true }
})

module.exports = mongoose.model('Message', schema)
