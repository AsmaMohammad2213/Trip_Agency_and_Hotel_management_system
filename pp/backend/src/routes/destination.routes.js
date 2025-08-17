const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth.middleware');
const Destination = require('../models/destination.model');

// Helper function to transform MongoDB documents
const transformDestination = (destination) => {
  const doc = destination.toObject ? destination.toObject() : destination;
  return {
    ...doc,
    id: doc._id
  };
};

const transformDestinations = (destinations) => {
  return destinations.map(destination => transformDestination(destination));
};

// Get all destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(transformDestinations(destinations));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destinations' });
  }
});

// Get single destination
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.json(transformDestination(destination));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destination' });
  }
});

// Create destination (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json(transformDestination(destination));
  } catch (error) {
    res.status(400).json({ message: 'Error creating destination' });
  }
});

// Update destination (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.json(transformDestination(destination));
  } catch (error) {
    res.status(400).json({ message: 'Error updating destination' });
  }
});

// Delete destination (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting destination' });
  }
});

// Search destinations
router.get('/search', async (req, res) => {
  try {
    const { query, country, minPrice, maxPrice } = req.query;
    
    const searchQuery = {};
    
    if (query) {
      searchQuery.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (country) {
      searchQuery.country = { $regex: country, $options: 'i' };
    }
    
    if (minPrice || maxPrice) {
      searchQuery.price = {};
      if (minPrice) searchQuery.price.$gte = Number(minPrice);
      if (maxPrice) searchQuery.price.$lte = Number(maxPrice);
    }
    
    const destinations = await Destination.find(searchQuery);
    res.json(transformDestinations(destinations));
  } catch (error) {
    res.status(500).json({ message: 'Error searching destinations' });
  }
});

module.exports = router; 