const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth.middleware');
const { User } = require('../models/user.model');
const Hotel = require('../models/hotel.model');
const Destination = require('../models/destination.model');
const Booking = require('../models/booking.model');

// Get admin dashboard stats
router.get('/stats', adminAuth, async (req, res) => {
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
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings for admin dashboard
router.get('/bookings', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { 'user.firstName': { $regex: search, $options: 'i' } },
        { 'user.lastName': { $regex: search, $options: 'i' } },
        { 'hotel.name': { $regex: search, $options: 'i' } }
      ];
    }

    const bookings = await Booking.find(query)
      .populate('user', 'firstName lastName email')
      .populate('hotel', 'name address')
      .populate('destination', 'name country')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(query);

    const transformedBookings = bookings.map(booking => ({
      _id: booking._id,
      user: {
        firstName: booking.user?.firstName || 'Unknown',
        lastName: booking.user?.lastName || 'User',
        email: booking.user?.email || 'unknown@example.com'
      },
      hotel: booking.hotel ? {
        name: booking.hotel.name,
        location: `${booking.hotel.address?.city}, ${booking.hotel.address?.country}`
      } : null,
      destination: booking.destination ? {
        name: booking.destination.name,
        country: booking.destination.country
      } : null,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      startDate: booking.startDate,
      guests: booking.guests,
      totalPrice: booking.totalPrice,
      status: booking.status,
      bookingType: booking.bookingType,
      createdAt: booking.createdAt
    }));

    res.json({
      bookings: transformedBookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching admin bookings:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update booking status
router.patch('/bookings/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('user', 'firstName lastName email')
     .populate('hotel', 'name address')
     .populate('destination', 'name country');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const transformedBooking = {
      _id: booking._id,
      user: {
        firstName: booking.user?.firstName || 'Unknown',
        lastName: booking.user?.lastName || 'User',
        email: booking.user?.email || 'unknown@example.com'
      },
      hotel: booking.hotel ? {
        name: booking.hotel.name,
        location: `${booking.hotel.address?.city}, ${booking.hotel.address?.country}`
      } : null,
      destination: booking.destination ? {
        name: booking.destination.name,
        country: booking.destination.country
      } : null,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      startDate: booking.startDate,
      guests: booking.guests,
      totalPrice: booking.totalPrice,
      status: booking.status,
      bookingType: booking.bookingType,
      createdAt: booking.createdAt
    };

    res.json(transformedBooking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get recent activity for admin dashboard
router.get('/activity', adminAuth, async (req, res) => {
  try {
    const recentBookings = await Booking.find()
      .populate('user', 'firstName lastName email')
      .populate('hotel', 'name')
      .populate('destination', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentUsers = await User.find()
      .select('firstName lastName email createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      recentBookings: recentBookings.map(booking => ({
        id: booking._id,
        type: 'booking',
        user: `${booking.user?.firstName} ${booking.user?.lastName}`,
        action: `Booked ${booking.hotel?.name || booking.destination?.name}`,
        status: booking.status,
        date: booking.createdAt
      })),
      recentUsers: recentUsers.map(user => ({
        id: user._id,
        type: 'user',
        user: `${user.firstName} ${user.lastName}`,
        action: 'Registered',
        date: user.createdAt
      }))
    });
  } catch (error) {
    console.error('Error fetching admin activity:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 