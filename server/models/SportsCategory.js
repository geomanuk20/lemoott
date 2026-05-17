const mongoose = require('mongoose');

const sportsCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('SportsCategory', sportsCategorySchema);
