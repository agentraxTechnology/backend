const express = require('express');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('super_admin', 'admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password -refreshToken');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, authorize('super_admin'), async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', protect, authorize('super_admin'), async (req, res) => {
  try {
    if (req.body.password) {
      const user = await User.findById(req.params.id);
      user.password = req.body.password;
      await user.save();
      return res.json({ message: 'User updated' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protect, authorize('super_admin'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
