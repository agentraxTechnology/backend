const express = require('express');
const SEO = require('../models/SEO');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const seo = await SEO.find({ isActive: true });
    res.json(seo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:page', async (req, res) => {
  try {
    const seo = await SEO.findOne({ page: req.params.page });
    if (!seo) return res.status(404).json({ message: 'SEO data not found' });
    res.json(seo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:page', protect, async (req, res) => {
  try {
    const seo = await SEO.findOneAndUpdate({ page: req.params.page }, req.body, { new: true, upsert: true, runValidators: true });
    res.json(seo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
