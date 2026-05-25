const mongoose = require('mongoose');
require('dotenv').config({ path: '/Users/geomanuk/video/server/.env' });

const User = require('/Users/geomanuk/video/server/models/User');

const run = async () => {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected successfully!');

  // Replace this email if you want to promote a different account!
  const targetEmail = 'geomanuk20@gmail.com'; 
  
  const user = await User.findOne({ email: targetEmail });
  if (user) {
    user.role = 'admin';
    await user.save();
    console.log(`\nSUCCESS! 🎉 The account ${targetEmail} is now an Admin!`);
    console.log(`You can now log into the admin panel (http://localhost:5173/admin/login) using this email.\n`);
  } else {
    console.log(`\nERROR: Could not find any account with the email ${targetEmail}`);
    console.log(`Please make sure you have signed up on the frontend first!\n`);
  }

  await mongoose.connection.close();
};

run().catch(err => console.error(err));
