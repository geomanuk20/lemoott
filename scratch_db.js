const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://geomanuk20_db_user:6w2GRqYm7DMfOXiB@video.lukedio.mongodb.net/video';

const PaymentGatewaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  status: { type: String, default: 'Active' },
  settings: {
    publishableKey: { type: String },
    secretKey: { type: String },
    merchantId: { type: String },
    isSandbox: { type: Boolean, default: true }
  }
}, { timestamps: true });

const PaymentGateway = mongoose.model('PaymentGateway', PaymentGatewaySchema);

async function check() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    const gateways = await PaymentGateway.find();
    console.log('GATEWAYS_IN_DB:', JSON.stringify(gateways, null, 2));
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

check();
