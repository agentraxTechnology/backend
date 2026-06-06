const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: String,
  mimeType: String,
  size: Number,
  url: { type: String, required: true },
  publicId: String,
  folder: { type: String, default: '/' },
  type: { type: String, enum: ['image', 'video', 'pdf', 'other'], default: 'image' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

mediaSchema.index({ folder: 1 });
mediaSchema.index({ type: 1 });

module.exports = mongoose.model('Media', mediaSchema);
