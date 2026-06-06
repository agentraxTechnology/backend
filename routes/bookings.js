const express = require('express');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');
const { sendBookingNotification } = require('../utils/email');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const bookings = await Booking.find(filter).populate('assignedTo', 'name email').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    sendBookingNotification(booking).catch(() => {});
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/export/csv', protect, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    const header = 'Name,Email,Phone,Company,Project Type,Budget,Status,Date\n';
    const rows = bookings.map(b =>
      `"${b.name}","${b.email}","${b.phone || ''}","${b.company || ''}","${b.projectType || ''}","${b.budget || ''}","${b.status}","${b.createdAt.toISOString()}"`
    ).join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=bookings.csv');
    res.send(header + rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
