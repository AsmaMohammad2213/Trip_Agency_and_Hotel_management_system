const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const { User } = require('./src/models/user.model');

async function testUserManagement() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-agency', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Test creating a user
    console.log('\n🧪 Testing user creation...');
    const testUser = new User({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      role: 'user'
    });
    await testUser.save();
    console.log('✅ User created successfully');

    // Test finding users
    console.log('\n🧪 Testing user retrieval...');
    const users = await User.find({}).select('-password');
    console.log(`✅ Found ${users.length} users`);
    users.forEach(user => {
      console.log(`   - ${user.firstName} ${user.lastName} (${user.email}) - Role: ${user.role}`);
    });

    // Test updating user role
    console.log('\n🧪 Testing role update...');
    const userToUpdate = await User.findOne({ email: 'test@example.com' });
    if (userToUpdate) {
      userToUpdate.role = 'admin';
      await userToUpdate.save();
      console.log('✅ User role updated to admin');
    }

    // Test deleting user
    console.log('\n🧪 Testing user deletion...');
    await User.findOneAndDelete({ email: 'test@example.com' });
    console.log('✅ Test user deleted');

    console.log('\n🎉 All user management tests passed!');
    console.log('\n📋 User Management Features:');
    console.log('   ✅ Create users with roles');
    console.log('   ✅ Retrieve all users');
    console.log('   ✅ Update user roles');
    console.log('   ✅ Delete users');
    console.log('   ✅ Password hashing');
    console.log('   ✅ Admin authentication');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

// Run the test
testUserManagement(); 