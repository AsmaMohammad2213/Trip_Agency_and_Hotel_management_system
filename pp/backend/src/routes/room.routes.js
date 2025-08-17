const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth.middleware');
const Room = require('../models/room.model');
const Hotel = require('../models/hotel.model');

// Get all rooms for a hotel
router.get('/hotel/:hotelId', async (req, res) => {
  try {
    const rooms = await Room.find({ 
      hotel: req.params.hotelId,
      isAvailable: true
    });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific room
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new room (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.body.hotel);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a room (admin only)
router.patch('/:id', adminAuth, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    Object.assign(room, req.body);
    await room.save();
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a room (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    room.isAvailable = false;
    await room.save();
    res.json({ message: 'Room deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 