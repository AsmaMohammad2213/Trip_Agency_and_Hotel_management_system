const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth.middleware');
const { User } = require('../models/user.model');
const Hotel = require('../models/hotel.model');
const Destination = require('../models/destination.model');
const Booking = require('../models/booking.model');

// Helper function to transform MongoDB documents
const transformUser = (user) => {
  const doc = user.toObject ? user.toObject() : user;
  return {
    ...doc,
    id: doc._id
  };
};

const transformUsers = (users) => {
  return users.map(user => transformUser(user));
};

// Get dashboard stats (admin only)
router.get('/stats/dashboard', adminAuth, async (req, res) => {
  try {
    const [
      totalUsers,
      totalHotels,
      totalDestinations,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
      revenueData
    ] = await Promise.all([
      User.countDocuments(),
      Hotel.countDocuments({ isActive: true }),
      Destination.countDocuments({ isActive: true }),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'confirmed' }),
      Booking.countDocuments({ status: 'cancelled' }),
      Booking.aggregate([
        { $match: { status: 'confirmed' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
      ])
    ]);

    const revenue = revenueData.length > 0 ? revenueData[0].total : 0;

    res.json({
      totalUsers,
      totalHotels,
      totalDestinations,
      totalBookings,
      revenue,
      pendingBookings,
      confirmedBookings,
      cancelledBookings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(transformUsers(users));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID (admin only)
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(transformUser(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user role (admin only)
router.patch('/:id/role', adminAuth, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;
    res.json(transformUser(userResponse));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 