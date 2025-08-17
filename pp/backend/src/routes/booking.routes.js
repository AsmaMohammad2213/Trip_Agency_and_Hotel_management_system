const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth.middleware');
const Booking = require('../models/booking.model');

// Helper function to transform populated booking documents
const transformBooking = (booking) => {
  const doc = booking.toObject ? booking.toObject() : booking;
  const transformed = {
    ...doc,
    id: doc._id
  };
  
  // Transform populated hotel if present
  if (transformed.hotel && typeof transformed.hotel === 'object') {
    transformed.hotel = {
      ...transformed.hotel,
      id: transformed.hotel._id
    };
  }
  
  // Transform populated destination if present
  if (transformed.destination && typeof transformed.destination === 'object') {
    transformed.destination = {
      ...transformed.destination,
      id: transformed.destination._id
    };
  }
  
  // Transform populated user if present
  if (transformed.user && typeof transformed.user === 'object') {
    transformed.user = {
      ...transformed.user,
      id: transformed.user._id
    };
  }
  
  return transformed;
};

const transformBookings = (bookings) => {
  return bookings.map(booking => transformBooking(booking));
};

// Get all bookings (admin only)
router.get('/admin/all', adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'firstName lastName email')
      .populate('hotel', 'name location')
      .populate('destination', 'name country')
      .sort({ createdAt: -1 });
    res.json(transformBookings(bookings));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new booking
router.post('/', auth, async (req, res) => {
  try {
    const { hotel, destination, ...bookingData } = req.body;
    
    console.log('Received booking request:', req.body);
    console.log('Hotel:', hotel);
    console.log('Destination:', destination);
    console.log('Booking data:', bookingData);
    
    // Determine booking type
    let bookingType = 'hotel';
    if (destination) {
      bookingType = 'destination';
    }
    
    console.log('Booking type:', bookingType);
    
    const booking = new Booking({
      ...bookingData,
      hotel: hotel || null,
      destination: destination || null,
      bookingType,
      user: req.user._id
    });
    
    console.log('Booking object before save:', booking);
    
    await booking.save();
    
    // Populate the booking with related data before sending response
    const populatedBooking = await Booking.findById(booking._id)
      .populate('user', 'firstName lastName email')
      .populate('hotel', 'name location')
      .populate('destination', 'name country');
    
    res.status(201).json(transformBooking(populatedBooking));
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get all bookings for the current user
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('hotel', 'name location image')
      .populate('destination', 'name country image')
      .sort({ createdAt: -1 });
    res.json(transformBookings(bookings));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific booking
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'firstName lastName email')
      .populate('hotel', 'name location image')
      .populate('destination', 'name country image');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(transformBooking(booking));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status (admin only)
router.patch('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('user', 'firstName lastName email')
     .populate('hotel', 'name location')
     .populate('destination', 'name country');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(transformBooking(booking));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a booking
router.patch('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    Object.assign(booking, req.body);
    await booking.save();
    
    const updatedBooking = await Booking.findById(booking._id)
      .populate('user', 'firstName lastName email')
      .populate('hotel', 'name location image')
      .populate('destination', 'name country image');
    
    res.json(transformBooking(updatedBooking));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a booking
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await booking.remove();
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel a booking (user can only cancel their own pending bookings)
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user owns the booking or is admin
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    
    // Only allow cancellation of pending bookings
    if (booking.status !== 'pending') {
      return res.status(400).json({ 
        message: `Cannot cancel booking with status: ${booking.status}. Only pending bookings can be cancelled.` 
      });
    }
    
    booking.status = 'cancelled';
    await booking.save();
    
    const updatedBooking = await Booking.findById(req.params.id)
      .populate('user', 'firstName lastName email')
      .populate('hotel', 'name location image')
      .populate('destination', 'name country image');
    
    res.json(transformBooking(updatedBooking));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 