const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Service name is required'], trim: true },
  icon: { type: String, default: 'Code2' },
  description: { type: String, required: true },
  features: [String],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
