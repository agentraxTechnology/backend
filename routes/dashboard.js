const express = require('express');
const Dashboard = require('../models/Contact'); // reuse for counts
const Contact = require('../models/Contact');
const Booking = require('../models/Booking');
const Lead = require('../models/Lead');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const [totalContacts, unreadContacts, totalBookings, pendingBookings,
      totalLeads, newLeads, wonLeads, totalProjects, publishedBlogs] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'new' }),
      Lead.countDocuments({ status: 'won' }),
      Project.countDocuments(),
      Blog.countDocuments({ isPublished: true }),
    ]);

    // Monthly chart data (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyLeads = await Lead.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const monthlyBookings = await Booking.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      stats: {
        totalContacts, unreadContacts, totalBookings, pendingBookings,
        totalLeads, newLeads, wonLeads, totalProjects, publishedBlogs,
      },
      charts: { monthlyLeads, monthlyBookings },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
