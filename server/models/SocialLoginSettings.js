const mongoose = require('mongoose');

const SocialLoginSettingsSchema = new mongoose.Schema({
  googleLogin: { type: String, default: 'ON' },
  googleClientId: { type: String, default: 'Hidden in Demo' },
  googleSecret: { type: String, default: 'Hidden in Demo' },
  
  facebookLogin: { type: String, default: 'OFF' },
  facebookAppId: { type: String, default: 'Hidden in Demo' },
  facebookClientSecret: { type: String, default: 'Hidden in Demo' }
}, { timestamps: true });

module.exports = mongoose.model('SocialLoginSettings', SocialLoginSettingsSchema);
