const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  couponCode: { type: String, required: true, unique: true },
  couponPercentage: { type: Number, required: true },
  usersAllow: { type: Number, required: true },
  couponUsed: { type: Number, default: 0 },
  expiryDate: { type: String, required: true },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', CouponSchema);
