const mongoose = require('mongoose');

const PlayerSettingsSchema = new mongoose.Schema({
  playerStyle: { type: String, default: 'Clasic Dark' },
  vectorIcons: { type: String, default: 'NO' },
  autoplay: { type: String, default: 'NO' },
  rewindForward: { type: String, default: 'YES' },
  watermark: { type: String, default: 'YES' },
  watermarkLogo: { type: String, default: 'upload/player_logo.png' },
  watermarkPosition: { type: String, default: 'Top Right' },
  watermarkUrl: { type: String, default: '#' },
  theoplayerLicense: { type: String, default: '' },
  theoplayerLibrary: { type: String, default: 'https://cdn.jsdelivr.net/npm/theoplayer@6.0.0/' }
}, { timestamps: true });

module.exports = mongoose.model('PlayerSettings', PlayerSettingsSchema);
