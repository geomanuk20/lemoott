const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });
const User = require('./server/models/User');

const fixUsers = async () => {
  try {
    await mongoose.connect('mongodb+srv://geomanuk20:wJqNlI17q5H2sHn3@cluster0.a8m8y.mongodb.net/LemoOTT?retryWrites=true&w=majority');
    const result = await User.updateMany({ status: 'Subscriber' }, { $set: { status: 'Active', role: 'subscriber' } });
    console.log("Fixed users:", result.modifiedCount);
  } catch (err) {
    console.log("Error:", err);
  } finally {
    mongoose.disconnect();
  }
};
fixUsers();
