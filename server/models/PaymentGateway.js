const mongoose = require('mongoose');

const PaymentGatewaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String }, // URL to logo
  status: { type: String, default: 'Active' },
  // These would be stored encrypted in a real app, but for now we store the structure
  settings: {
    publishableKey: { type: String },
    secretKey: { type: String },
    merchantId: { type: String },
    isSandbox: { type: Boolean, default: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('PaymentGateway', PaymentGatewaySchema);
