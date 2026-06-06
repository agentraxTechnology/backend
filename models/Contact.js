const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], lowercase: true },
  phone: { type: String, default: '' },
  company: { type: String, default: '' },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  repliedAt: Date,
}, { timestamps: true });

contactSchema.index({ isRead: 1, isArchived: 1 });
contactSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);
