const mongoose = require('mongoose');
const { User } = require('../models/user.model');
require('dotenv').config();

async function viewUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-agency');
    console.log('Connected to MongoDB');

    // Find all users
    const users = await User.find({});
    
    // Display users (excluding password)
    console.log('\nUsers in database:');
    console.log('------------------');
    users.forEach(user => {
      console.log({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

// Run the function
viewUsers(); 