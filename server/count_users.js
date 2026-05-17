const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const count = await User.countDocuments();
    console.log('Users count:', count);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
