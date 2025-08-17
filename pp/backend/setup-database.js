#!/usr/bin/env node

/**
 * Database Setup Script for Travel Agency
 * This script helps you set up the database with sample data
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const { User } = require('./src/models/user.model');
const Hotel = require('./src/models/hotel.model');
const Destination = require('./src/models/destination.model');
const Room = require('./src/models/room.model');
const Booking = require('./src/models/booking.model');

console.log('🚀 Travel Agency Database Setup');
console.log('================================');

async function setupDatabase() {
  try {
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-agency', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB successfully!');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Hotel.deleteMany({});
    await Destination.deleteMany({});
    await Room.deleteMany({});
    await Booking.deleteMany({});
    console.log('✅ Database cleared');

    // Create admin user
    console.log('👤 Creating admin user...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      email: 'admin@travelagency.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin'
    });
    await adminUser.save();
    console.log('✅ Admin user created: admin@travelagency.com / admin123');

    // Create regular user
    console.log('👤 Creating regular user...');
    const userPassword = await bcrypt.hash('password123', 10);
    const regularUser = new User({
      email: 'user@example.com',
      password: userPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'user'
    });
    await regularUser.save();
    console.log('✅ Regular user created: user@example.com / password123');

    // Create sample hotels
    console.log('🏨 Creating sample hotels...');
    const hotels = [
      {
        name: 'Grand Hotel & Spa',
        description: 'Luxury 5-star hotel in Manhattan with world-class amenities',
        address: {
          street: '123 Park Avenue',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          zipCode: '10022'
        },
        amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
        ],
        rating: 4.8,
        priceRange: { min: 299, max: 899 },
        contactInfo: {
          phone: '+1-555-0123',
          email: 'info@grandhotel.com'
        }
      },
      {
        name: 'Seaside Resort',
        description: 'Beachfront resort with private marina and infinity pools',
        address: {
          street: '456 Ocean Drive',
          city: 'Miami',
          state: 'FL',
          country: 'USA',
          zipCode: '33139'
        },
        amenities: ['WiFi', 'Pool', 'Beach', 'Marina', 'Restaurant'],
        images: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
        ],
        rating: 4.6,
        priceRange: { min: 450, max: 1200 },
        contactInfo: {
          phone: '+1-555-0456',
          email: 'info@seasideresort.com'
        }
      }
    ];

    const createdHotels = [];
    for (const hotelData of hotels) {
      const hotel = new Hotel(hotelData);
      await hotel.save();
      createdHotels.push(hotel);
      console.log(`✅ Created hotel: ${hotel.name}`);
    }

    // Create sample destinations
    console.log('🌍 Creating sample destinations...');
    const destinations = [
      {
        name: 'Paris',
        country: 'France',
        city: 'Paris',
        description: 'The City of Light, known for its iconic Eiffel Tower',
        shortDescription: 'Romantic capital of France',
        mainImage: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800',
        images: [
          'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800',
          'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800'
        ],
        rating: 4.8,
        price: 1200,
        currency: 'USD',
        climate: 'temperate',
        bestTimeToVisit: 'Spring and Fall',
        attractions: [
          {
            name: 'Eiffel Tower',
            description: 'Iconic iron lattice tower',
            image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600'
          }
        ],
        activities: ['Sightseeing', 'Shopping', 'Dining'],
        isPopular: true
      },
      {
        name: 'Tokyo',
        country: 'Japan',
        city: 'Tokyo',
        description: 'Ultramodern metropolis with rich cultural heritage',
        shortDescription: 'Futuristic city with ancient traditions',
        mainImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
        images: [
          'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
          'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800'
        ],
        rating: 4.7,
        price: 1500,
        currency: 'USD',
        climate: 'temperate',
        bestTimeToVisit: 'Spring for cherry blossoms',
        attractions: [
          {
            name: 'Shibuya Crossing',
            description: 'World\'s busiest pedestrian crossing',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600'
          }
        ],
        activities: ['Shopping', 'Temple Visits', 'Food Tours'],
        isPopular: true
      }
    ];

    const createdDestinations = [];
    for (const destinationData of destinations) {
      const destination = new Destination(destinationData);
      await destination.save();
      createdDestinations.push(destination);
      console.log(`✅ Created destination: ${destination.name}`);
    }

    // Create rooms for hotels
    console.log('🛏️ Creating sample rooms...');
    const createdRooms = [];
    for (const hotel of createdHotels) {
      const roomTypes = ['Standard', 'Deluxe', 'Suite'];
      for (let i = 1; i <= 3; i++) {
        const room = new Room({
          hotelId: hotel._id,
          roomNumber: `${hotel.name.split(' ')[0]}-${i}01`,
          type: roomTypes[i - 1],
          capacity: i * 2,
          price: hotel.priceRange.min + (i * 100),
          amenities: ['WiFi', 'TV', 'Air Conditioning'],
          images: [hotel.images[0]],
          isAvailable: true
        });
        await room.save();
        createdRooms.push(room);
        console.log(`✅ Created room: ${room.roomNumber} for ${hotel.name}`);
      }
    }

    // Create sample bookings
    console.log('📅 Creating sample bookings...');
    const bookingStatuses = ['pending', 'confirmed', 'cancelled'];
    for (let i = 0; i < 3; i++) {
      const hotel = createdHotels[Math.floor(Math.random() * createdHotels.length)];
      const room = createdRooms.find(r => r.hotelId.toString() === hotel._id.toString());
      
      if (hotel && room) {
        const checkIn = new Date();
        checkIn.setDate(checkIn.getDate() + Math.floor(Math.random() * 30) + 7);
        
        const checkOut = new Date(checkIn);
        checkOut.setDate(checkOut.getDate() + Math.floor(Math.random() * 7) + 1);
        
        const booking = new Booking({
          userId: regularUser._id,
          hotelId: hotel._id,
          roomId: room._id,
          checkIn: checkIn,
          checkOut: checkOut,
          guests: Math.floor(Math.random() * 4) + 1,
          totalPrice: room.price * (checkOut.getDate() - checkIn.getDate()),
          status: bookingStatuses[Math.floor(Math.random() * bookingStatuses.length)],
          specialRequests: Math.random() > 0.7 ? 'Late check-in requested' : ''
        });
        await booking.save();
        console.log(`✅ Created booking for ${regularUser.firstName} at ${hotel.name}`);
      }
    }

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   👥 Users: 2 (1 admin, 1 regular)`);
    console.log(`   🏨 Hotels: ${createdHotels.length}`);
    console.log(`   🌍 Destinations: ${createdDestinations.length}`);
    console.log(`   🛏️ Rooms: ${createdRooms.length}`);
    console.log(`   📅 Bookings: 3`);
    
    console.log('\n🔑 Login Credentials:');
    console.log(`   Admin: admin@travelagency.com / admin123`);
    console.log(`   User: user@example.com / password123`);
    
    console.log('\n🚀 Next steps:');
    console.log('   1. Start the backend server: npm run dev');
    console.log('   2. Start the frontend: cd ../proo && npm run dev');
    console.log('   3. Access the admin dashboard with admin credentials');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

// Run the setup
setupDatabase(); 