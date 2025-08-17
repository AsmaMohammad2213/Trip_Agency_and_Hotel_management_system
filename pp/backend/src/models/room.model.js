const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['single', 'double', 'suite', 'deluxe']
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  capacity: {
    adults: {
      type: Number,
      required: true,
      min: 1
    },
    children: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  amenities: [{
    type: String
  }],
  images: [{
    type: String
  }],
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add compound index for hotel and roomNumber to ensure uniqueness
roomSchema.index({ hotel: 1, roomNumber: 1 }, { unique: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room; 