const mongoose = require('mongoose');

const sportsVideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'SportsCategory', required: true },
  poster: { type: String },
  landscapePoster: { type: String },
  description: { type: String },
  access: { type: String, default: 'Paid' },
  date: { type: String },
  duration: { type: String },
  status: { type: String, default: 'Active' },
  videoType: { type: String, default: 'Local' },
  videoQuality: { type: String, default: 'Active' },
  videoFile: { type: String },
  videoFile480: { type: String },
  videoFile720: { type: String },
  videoFile1080: { type: String },
  downloadable: { type: String, default: 'Inactive' },
  downloadUrl: { type: String },
  subtitlesActive: { type: String, default: 'Inactive' },
  seoTitle: { type: String },
  metaDescription: { type: String },
  keywords: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SportsVideo', sportsVideoSchema);
