const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  excerpt: String,
  content: { type: String, default: '' },
  category: { type: String, default: 'Software Development' },
  tags: [String],
  author: { type: String, default: 'Agentrax Team' },
  featuredImage: String,
  readTime: String,
  isPublished: { type: Boolean, default: false },
  publishedAt: Date,
  scheduledAt: Date,
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
  canonicalUrl: String,
}, { timestamps: true });

blogSchema.index({ category: 1, isPublished: 1 });
blogSchema.index({ publishedAt: -1 });

module.exports = mongoose.model('Blog', blogSchema);
