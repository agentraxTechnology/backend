const express = require('express');
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filter = { isPublished: true, publishedAt: { $lte: new Date() } };
    if (req.query.category) filter.category = req.query.category;
    const blogs = await Blog.find(filter).sort({ publishedAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/admin/all', protect, async (req, res) => {
  try {
    const filter = {};
    if (req.query.status === 'published') filter.isPublished = true;
    if (req.query.status === 'draft') filter.isPublished = false;
    if (req.query.category) filter.category = req.query.category;
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.isPublished && !data.publishedAt) data.publishedAt = new Date();
    const blog = await Blog.create(data);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.isPublished && !data.publishedAt) data.publishedAt = new Date();
    const blog = await Blog.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
