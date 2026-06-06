const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true, trim: true },
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
  openGraphTitle: String,
  openGraphDescription: String,
  openGraphImage: String,
  canonicalUrl: String,
  schemaMarkup: mongoose.Schema.Types.Mixed,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('SEO', seoSchema);
