const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { User } = require('./models/user.model');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB with better error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB Atlas');
  console.log('Database:', mongoose.connection.name);
  console.log('Host:', mongoose.connection.host);
  console.log('Port:', mongoose.connection.port);
  console.log('Full connection string:', process.env.MONGODB_URI);
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit if cannot connect to database
});

// Add connection error handler
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Add disconnection handler
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Temporary route to view users (remove in production)
app.get('/api/view-users', async (req, res) => {
  try {
    console.log('Attempting to fetch users from database:', mongoose.connection.name);
    const users = await User.find({});
    console.log('Found users:', users.length);
    console.log('First user (if any):', users[0]);
    
    const sanitizedUsers = users.map(user => ({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
    res.json(sanitizedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Routes
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/hotels', require('./routes/hotel.routes.js'));
app.use('/api/rooms', require('./routes/room.routes.js'));
app.use('/api/bookings', require('./routes/booking.routes.js'));
app.use('/api/destinations', require('./routes/destination.routes.js'));
app.use('/api/users', require('./routes/user.routes.js'));
app.use('/api/admin', require('./routes/admin.routes.js'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 