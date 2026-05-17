const mongoose = require('mongoose');
require('dotenv').config();
const Slider = require('./models/Slider');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Fetching slider titles only...');
    const sliders = await Slider.find({}, 'title status');
    console.log('Sliders:', sliders);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
