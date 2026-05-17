const mongoose = require('mongoose');

const DashboardStatsSchema = new mongoose.Schema({
  languages: Number,
  genres: Number,
  movies: Number,
  shows: Number,
  sports: Number,
  liveTv: Number,
  users: Number,
  transactions: Number,
  revenue: {
    daily: Number,
    weekly: Number,
    monthly: Number,
    yearly: Number
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DashboardStats', DashboardStatsSchema);
