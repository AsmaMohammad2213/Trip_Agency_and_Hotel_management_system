const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth.middleware');
const Hotel = require('../models/hotel.model');

// Helper function to transform MongoDB documents
const transformHotel = (hotel) => {
  const doc = hotel.toObject ? hotel.toObject() : hotel;
  return {
    ...doc,
    id: doc._id
  };
};

const transformHotels = (hotels) => {
  return hotels.map(hotel => transformHotel(hotel));
};

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find({ isActive: true });
    res.json(transformHotels(hotels));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific hotel
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(transformHotel(hotel));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new hotel (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json(transformHotel(hotel));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a hotel (admin only)
router.patch('/:id', adminAuth, async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    Object.assign(hotel, req.body);
    await hotel.save();
    res.json(transformHotel(hotel));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a hotel (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    hotel.isActive = false;
    await hotel.save();
    res.json({ message: 'Hotel deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 