const mongoose = require('mongoose');
require('dotenv').config();
const Movie = require('./models/Movie');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const count = await Movie.countDocuments();
    console.log('Movies count:', count);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
