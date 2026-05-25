const mongoose = require('mongoose');

async function checkGateway() {
  await mongoose.connect('mongodb+srv://geomanuk20_db_user:6w2GRqYm7DMfOXiB@video.lukedio.mongodb.net/video');
  const PaymentGateway = require('./server/models/PaymentGateway');
  const gw = await PaymentGateway.findOne({ name: 'PhonePe' });
  console.log('PhonePe Gateway from DB:', gw);
  mongoose.connection.close();
}
checkGateway();
