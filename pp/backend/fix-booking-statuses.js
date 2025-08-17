const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Booking = require('./src/models/booking.model');

// Load environment variables
dotenv.config();

async function fixBookingStatuses() {
  console.log('🔧 Fixing Booking Statuses...\n');

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Get all bookings
    const bookings = await Booking.find({});
    console.log(`📊 Found ${bookings.length} bookings`);

    // Update booking statuses
    let updatedCount = 0;
    for (const booking of bookings) {
      if (booking.status === 'pending') {
        // Randomly assign status: 70% confirmed, 20% pending, 10% cancelled
        const random = Math.random();
        let newStatus;
        
        if (random < 0.7) {
          newStatus = 'confirmed';
        } else if (random < 0.9) {
          newStatus = 'pending';
        } else {
          newStatus = 'cancelled';
        }

        booking.status = newStatus;
        await booking.save();
        updatedCount++;
        
        console.log(`✅ Updated booking ${booking._id}: ${newStatus}`);
      }
    }

    console.log(`\n🎉 Updated ${updatedCount} bookings`);
    
    // Show final status distribution
    const statusCounts = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    console.log('\n📊 Final Status Distribution:');
    statusCounts.forEach(status => {
      console.log(`   ${status._id}: ${status.count} bookings`);
    });

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Error fixing booking statuses:', error);
    process.exit(1);
  }
}

// Run the fix
fixBookingStatuses(); 