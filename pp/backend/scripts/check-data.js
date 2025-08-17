const mongoose = require('mongoose');
const Destination = require('../src/models/destination.model');
const Hotel = require('../src/models/hotel.model');
const User = require('../src/models/user.model');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travelease', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function checkData() {
  try {
    console.log('Checking database data...\n');

    // Check destinations
    const destinations = await Destination.find({});
    console.log(`Found ${destinations.length} destinations:`);
    destinations.forEach(dest => {
      console.log(`- ${dest.name} (ID: ${dest._id}) - Active: ${dest.isActive}`);
    });

    console.log('\n');

    // Check hotels
    const hotels = await Hotel.find({});
    console.log(`Found ${hotels.length} hotels:`);
    hotels.forEach(hotel => {
      console.log(`- ${hotel.name} (ID: ${hotel._id}) - Active: ${hotel.isActive}`);
    });

    console.log('\n');

    // Check users
    const users = await User.find({});
    console.log(`Found ${users.length} users:`);
    users.forEach(user => {
      console.log(`- ${user.firstName} ${user.lastName} (ID: ${user._id}) - Role: ${user.role}`);
    });

    console.log('\nDatabase check complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error checking data:', error);
    process.exit(1);
  }
}

checkData(); 