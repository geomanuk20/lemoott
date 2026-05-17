const mongoose = require('mongoose');

const PlayerSettingsSchema = new mongoose.Schema({
  playerStyle: { type: String, default: 'Clasic Dark' },
  vectorIcons: { type: String, default: 'NO' },
  autoplay: { type: String, default: 'NO' },
  rewindForward: { type: String, default: 'YES' },
  watermark: { type: String, default: 'YES' },
  watermarkLogo: { type: String, default: 'upload/player_logo.png' },
  watermarkPosition: { type: String, default: 'Top Right' },
  watermarkUrl: { type: String, default: '#' }
}, { timestamps: true });

module.exports = mongoose.model('PlayerSettings', PlayerSettingsSchema);
