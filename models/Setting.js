const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

const defaultSettings = {
  companyName: 'Agentrax',
  companyLogo: '',
  favicon: '',
  contactEmail: 'hello@agentrax.com',
  contactPhone: '+1 (234) 567-890',
  whatsappNumber: '1234567890',
  address: 'Global Delivery',
  socialLinks: {
    twitter: 'https://twitter.com/agentrax',
    linkedin: 'https://linkedin.com/company/agentrax',
    github: 'https://github.com/agentrax',
    instagram: 'https://instagram.com/agentrax',
  },
  smtp: {
    host: 'smtp.gmail.com',
    port: 587,
    user: '',
    pass: '',
  },
  googleAnalytics: '',
  metaPixel: '',
};

settingSchema.statics.getDefaults = function () {
  return defaultSettings;
};

module.exports = mongoose.model('Setting', settingSchema);
