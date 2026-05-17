const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Page', PageSchema);
