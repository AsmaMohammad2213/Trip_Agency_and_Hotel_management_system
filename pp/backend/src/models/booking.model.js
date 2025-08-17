const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel'
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date
  },
  startDate: {
    type: Date
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  guests: {
    type: Number,
    required: true,
    min: 1
  },
  roomType: {
    type: String,
    enum: ['standard', 'deluxe', 'suite', 'presidential']
  },
  packageType: {
    type: String,
    enum: ['basic', 'premium', 'luxury']
  },
  specialRequests: {
    type: String
  },
  bookingType: {
    type: String,
    enum: ['hotel', 'destination'],
    required: true
  }
}, {
  timestamps: true
});

// Add validation to ensure checkOut is after checkIn for hotel bookings
bookingSchema.pre('save', function(next) {
  if (this.bookingType === 'hotel' && this.checkOut && this.checkIn && this.checkOut <= this.checkIn) {
    next(new Error('Check-out date must be after check-in date'));
  }
  next();
});

// Add validation to ensure either hotel or destination is provided
bookingSchema.pre('save', function(next) {
  if (!this.hotel && !this.destination) {
    next(new Error('Either hotel or destination must be provided'));
  }
  if (this.hotel && this.destination) {
    next(new Error('Cannot book both hotel and destination in the same booking'));
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking; 