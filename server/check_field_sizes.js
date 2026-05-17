const mongoose = require('mongoose');
require('dotenv').config();
const Slider = require('./models/Slider');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const slider = await Slider.findOne({ title: /Kantara/ }).lean();
    for (const key in slider) {
      const val = slider[key];
      const size = typeof val === 'string' ? val.length : JSON.stringify(val).length;
      console.log(`${key}: ${size} chars`);
    }
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
