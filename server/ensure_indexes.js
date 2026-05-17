const mongoose = require('mongoose');
require('dotenv').config();

const models = [
  'Slider', 'Movie', 'Asset', 'Experience', 'Show', 
  'NewRelease', 'SportsVideo', 'TVChannel', 'SportsCategory'
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Ensuring indexes for better performance...');
    
    const modelMap = {
      'Slider': require('./models/Slider'),
      'Movie': require('./models/Movie'),
      'Asset': require('./models/Asset'),
      'Experience': require('./models/Experience'),
      'Show': require('./models/Show'),
      'NewRelease': require('./models/NewRelease'),
      'SportsVideo': require('./models/SportsVideo'),
      'TVChannel': require('./models/TVChannel'),
      'SportsCategory': require('./models/SportsCategory')
    };
    
    for (const [name, Model] of Object.entries(modelMap)) {
      try {
        await Model.collection.createIndex({ status: 1 });
        await Model.collection.createIndex({ createdAt: -1 });
        console.log(`Indexes ensured for ${name}`);
      } catch (err) {
        console.warn(`Could not set index for ${name}: ${err.message}`);
      }
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
