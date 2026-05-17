const mongoose = require('mongoose');
require('dotenv').config();
const Slider = require('./models/Slider');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const sliders = await Slider.find();
    console.log('Sliders in DB:', JSON.stringify(sliders, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
