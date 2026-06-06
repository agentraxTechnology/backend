const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], lowercase: true },
  phone: { type: String, default: '' },
  company: { type: String, default: '' },
  projectType: { type: String, default: '' },
  budget: { type: String, default: '' },
  message: { type: String, default: '' },
  meetingDate: Date,
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'completed'], default: 'pending' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Booking', bookingSchema);
