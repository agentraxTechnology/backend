const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  company: { type: String, default: '' },
  email: { type: String, required: [true, 'Email is required'], lowercase: true },
  phone: { type: String, default: '' },
  projectType: { type: String, default: '' },
  budget: { type: String, default: '' },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['new', 'contacted', 'proposal_sent', 'negotiation', 'won', 'lost'], default: 'new' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  source: { type: String, default: 'website' },
}, { timestamps: true });

leadSchema.index({ status: 1 });
leadSchema.index({ email: 1 });
leadSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Lead', leadSchema);
