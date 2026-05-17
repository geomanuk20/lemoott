const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, default: '' },
  contentType: { type: String, enum: ['Image', 'Video'], default: 'Image' },
  videoUrl: { type: String, default: '' },
  section: { type: String, default: 'Main Slider' },
  postType: { type: String, default: '' },
  contentId: { type: String, default: '' },
  displayOn: { type: [String], default: ['Home'] },
  imdbRating: { type: String, default: '' },
  releaseYear: { type: String, default: '' },
  duration: { type: String, default: '' },
  videoQuality: { type: String, default: '8K Ultra HD' },
  ccActive: { type: String, default: 'Yes' },
  status: { type: String, default: 'Active' },
  link: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Slider', sliderSchema);
