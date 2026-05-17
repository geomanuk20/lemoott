const mongoose = require('mongoose');

const SMTPSettingsSchema = new mongoose.Schema({
  host: { type: String, default: 'Hidden in Demo' },
  port: { type: String, default: 'Hidden in Demo' },
  email: { type: String, default: 'Hidden in Demo' },
  password: { type: String, default: '************' },
  encryption: { type: String, default: 'SSL' }
}, { timestamps: true });

module.exports = mongoose.model('SMTPSettings', SMTPSettingsSchema);
