const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    maxlength: 200
  },
  images: [{
    type: String
  }],
  mainImage: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  climate: {
    type: String,
    enum: ['tropical', 'temperate', 'cold', 'desert', 'mediterranean']
  },
  bestTimeToVisit: {
    type: String
  },
  attractions: [{
    name: String,
    description: String,
    image: String
  }],
  activities: [{
    type: String
  }],
  isPopular: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  }
}, {
  timestamps: true
});

// Add text index for search functionality
destinationSchema.index({ name: 'text', country: 'text', city: 'text', description: 'text' });

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination; 