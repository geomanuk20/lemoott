const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });
const Transaction = require('./server/models/Transaction');
const User = require('./server/models/User');

const checkDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://geomanuk20:wJqNlI17q5H2sHn3@cluster0.a8m8y.mongodb.net/LemoOTT?retryWrites=true&w=majority');
    const txs = await Transaction.find().sort({ _id: -1 }).limit(5);
    console.log("Recent Transactions:");
    txs.forEach(tx => console.log(`ID: ${tx.paymentId}, Status: ${tx.status}, User: ${tx.userId}`));
    
    if (txs.length > 0) {
      const user = await User.findById(txs[0].userId);
      console.log("\nLatest User Status:", user ? user.status : 'Not found');
      console.log("Latest User Plan:", user ? user.subscriptionPlan : 'Not found');
    }
  } catch (err) {
    console.log("Error:", err);
  } finally {
    mongoose.disconnect();
  }
};
checkDb();
