const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  plan: { type: String, required: true },
  amount: { type: String, required: true },
  gateway: { type: String, required: true },
  paymentId: { type: String, required: true, unique: true },
  paymentDate: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
