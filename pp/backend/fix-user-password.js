const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import User model
const { User } = require('./src/models/user.model');

async function fixUserPassword() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-agency', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Find the user
    const user = await User.findOne({ email: 'user@example.com' });
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }

    console.log('✅ User found:', user.email);
    console.log('Current password hash:', user.password.substring(0, 20) + '...');

    // Hash the password correctly
    const hashedPassword = await bcrypt.hash('password123', 10);
    console.log('New password hash:', hashedPassword.substring(0, 20) + '...');

    // Update the user's password using findOneAndUpdate to bypass pre-save hook
    await User.findOneAndUpdate(
      { email: 'user@example.com' },
      { password: hashedPassword },
      { new: true }
    );

    console.log('✅ Password updated successfully');

    // Test the new password
    console.log('\nTesting new password...');
    const updatedUser = await User.findOne({ email: 'user@example.com' });
    const isMatch = await updatedUser.comparePassword('password123');
    console.log('Password match:', isMatch ? '✅ Yes' : '❌ No');

    if (isMatch) {
      console.log('\n🎉 User login should now work with:');
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

// Run the script
fixUserPassword(); 