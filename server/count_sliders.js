const mongoose = require('mongoose');
require('dotenv').config();
const Slider = require('./models/Slider');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Counting sliders...');
    const count = await Slider.countDocuments();
    console.log('Sliders count:', count);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
