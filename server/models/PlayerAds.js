const mongoose = require('mongoose');

const PlayerAdsSchema = new mongoose.Schema({
  defaultAds: { type: String, default: 'VAST, VMAP and IMA' },
  sourceType: { type: String, default: 'URL' },
  sourceUrl: { type: String, default: 'https://cdn.theplayer.com/demos/ads/vast/vast.xml' },
  
  // Ad slots
  ad1Source: { type: String, default: 'https://cdn.theplayer.com/demos/ads/vast/vast.xml' },
  ad1Timestart: { type: String, default: '00:00:10' },
  ad1TargetLink: { type: String, default: '#' },
  
  ad2Source: { type: String, default: '' },
  ad2Timestart: { type: String, default: '00:30:00' },
  ad2TargetLink: { type: String, default: '#' },
  
  ad3Source: { type: String, default: '' },
  ad3Timestart: { type: String, default: '01:30:00' },
  ad3TargetLink: { type: String, default: '#' }
}, { timestamps: true });

module.exports = mongoose.model('PlayerAds', PlayerAdsSchema);
