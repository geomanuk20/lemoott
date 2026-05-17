const mongoose = require('mongoose');
require('dotenv').config();
const Slider = require('./models/Slider');

const seedSliders = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB. Seeding sample sliders...');

    const sampleSliders = [
      {
        title: 'Stranger Things',
        section: 'Main Slider',
        status: 'Active',
        displayOn: ['Home'],
        image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop',
        type: 'movie',
        movieId: null,
      },
      {
        title: 'Action Movies',
        section: 'Main Slider',
        status: 'Active',
        displayOn: ['Home', 'Movies'],
        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop',
        type: 'movie',
        movieId: null,
      }
    ];

    await Slider.insertMany(sampleSliders);
    console.log('Sample sliders seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedSliders();
