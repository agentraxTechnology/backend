const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Client name is required'], trim: true },
  company: { type: String, default: '' },
  designation: { type: String, default: '' },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  photo: String,
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
