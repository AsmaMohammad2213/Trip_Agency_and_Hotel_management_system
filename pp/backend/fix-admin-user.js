const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import User model
const { User } = require('./src/models/user.model');

async function fixAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Find and delete existing admin user
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Deleting existing admin user...');
      await User.findByIdAndDelete(existingAdmin._id);
      console.log('✅ Existing admin user deleted');
    }

    // Create new admin user (this will trigger the pre-save hook)
    console.log('Creating new admin user...');
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'admin123', // This will be hashed by the pre-save hook
      role: 'admin',
      isActive: true
    });

    await adminUser.save();
    console.log('✅ New admin user created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('Role: admin');
    console.log('User ID:', adminUser._id);

    // Test password comparison
    console.log('\nTesting password comparison...');
    const isMatch = await adminUser.comparePassword('admin123');
    console.log('Password match:', isMatch ? '✅ Yes' : '❌ No');

    if (isMatch) {
      console.log('✅ Admin user is ready for login!');
    } else {
      console.log('❌ Password comparison still failing');
    }

  } catch (error) {
    console.error('❌ Error fixing admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
fixAdminUser(); 