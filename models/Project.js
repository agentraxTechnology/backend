const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Project name is required'], trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  clientName: { type: String, default: '' },
  category: { type: String, enum: ['Web Apps', 'Mobile Apps', 'SaaS', 'AI Solutions', 'E-commerce', 'Education', 'Marketplace'], default: 'Web Apps' },
  technologies: [String],
  description: String,
  overview: String,
  challenge: String,
  problem: String,
  solution: String,
  results: String,
  businessImpact: String,
  features: [String],
  projectUrl: String,
  githubUrl: String,
  featuredImage: String,
  galleryImages: [String],
  completionDate: Date,
  isFeatured: { type: Boolean, default: false },
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
}, { timestamps: true });

projectSchema.index({ category: 1, status: 1 });
projectSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('Project', projectSchema);
