const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import User model
const { User } = require('./src/models/user.model');

async function testUserLogin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-agency', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Check if user exists
    const user = await User.findOne({ email: 'user@example.com' });
    
    if (!user) {
      console.log('❌ User not found, creating one...');
      const hashedPassword = await bcrypt.hash('password123', 10);
      const newUser = new User({
        firstName: 'Test',
        lastName: 'User',
        email: 'user@example.com',
        password: hashedPassword,
        role: 'user'
      });
      await newUser.save();
      console.log('✅ User created successfully');
    } else {
      console.log('✅ User found:', user.email);
      console.log('User role:', user.role);
      console.log('User ID:', user._id);
    }

    // Test password comparison
    console.log('\nTesting password comparison...');
    const testUser = await User.findOne({ email: 'user@example.com' });
    const isMatch = await testUser.comparePassword('password123');
    console.log('Password match:', isMatch ? '✅ Yes' : '❌ No');

    if (isMatch) {
      console.log('\n✅ User login should work with:');
      console.log('Email: user@example.com');
      console.log('Password: password123');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the test
testUserLogin(); 