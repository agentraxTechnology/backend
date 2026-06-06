const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  designation: { type: String, default: '' },
  bio: { type: String, default: '' },
  photo: String,
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String,
    website: String,
  },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
