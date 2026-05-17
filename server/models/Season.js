const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema({
  showId: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  showName: String,
  title: { type: String, required: true },
  status: { type: String, default: 'Active' },
  poster: String,
  thumbnail: String,
}, { timestamps: true });

module.exports = mongoose.model('Season', seasonSchema);
