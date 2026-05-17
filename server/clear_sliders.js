const mongoose = require('mongoose');
require('dotenv').config();
const Slider = require('./models/Slider');

const clearSliders = async () => {
  try {
    console.log('Connecting to MongoDB to clear sliders...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');
    
    const count = await Slider.countDocuments();
    console.log(`Found ${count} sliders.`);
    
    if (count > 0) {
      await Slider.deleteMany({});
      console.log('All sliders have been cleared successfully.');
    } else {
      console.log('No sliders to clear.');
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error clearing sliders:', err);
    process.exit(1);
  }
};

clearSliders();
