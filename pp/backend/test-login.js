const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import User model
const { User } = require('./src/models/user.model');

async function testLogin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Find admin user
    const adminUser = await User.findOne({ email: 'admin@example.com' });
    
    if (!adminUser) {
      console.log('❌ Admin user not found');
      return;
    }

    console.log('✅ Admin user found:');
    console.log('Email:', adminUser.email);
    console.log('Role:', adminUser.role);
    console.log('ID:', adminUser._id);
    console.log('');

    // Test password comparison
    console.log('Testing password comparison...');
    const isMatch = await adminUser.comparePassword('admin123');
    console.log('Password match:', isMatch ? '✅ Yes' : '❌ No');
    console.log('');

    if (isMatch) {
      // Generate token
      const token = jwt.sign(
        { _id: adminUser._id.toString() },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );
      
      console.log('✅ Token generated successfully');
      console.log('Token length:', token.length);
      console.log('Token preview:', token.substring(0, 50) + '...');
      console.log('');

      // Verify token
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        console.log('✅ Token verification successful');
        console.log('Decoded user ID:', decoded._id);
        console.log('Decoded user ID matches:', decoded._id === adminUser._id.toString());
      } catch (jwtError) {
        console.log('❌ Token verification failed:', jwtError.message);
      }
    } else {
      console.log('❌ Cannot generate token - password mismatch');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the test
testLogin(); 