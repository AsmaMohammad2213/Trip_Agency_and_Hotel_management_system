const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const { User } = require('./src/models/user.model');
const Hotel = require('./src/models/hotel.model');
const Destination = require('./src/models/destination.model');
const Booking = require('./src/models/booking.model');

async function createSampleData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-agency', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing data...');
    await Hotel.deleteMany({});
    await Destination.deleteMany({});
    await Booking.deleteMany({});
    console.log('✅ Data cleared');

    // Create sample hotels
    console.log('Creating sample hotels...');
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
        amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service'],
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
        ],
        rating: 4.8,
        priceRange: { min: 299, max: 899 },
        contactInfo: {
          phone: '+1-555-0123',
          email: 'info@grandhotel.com'
        },
        isActive: true
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
        amenities: ['WiFi', 'Pool', 'Beach', 'Marina', 'Restaurant', 'Bar'],
        images: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
        ],
        rating: 4.6,
        priceRange: { min: 450, max: 1200 },
        contactInfo: {
          phone: '+1-555-0456',
          email: 'info@seasideresort.com'
        },
        isActive: true
      },
      {
        name: 'Mountain View Lodge',
        description: 'Cozy mountain lodge with stunning alpine views',
        address: {
          street: '789 Alpine Road',
          city: 'Aspen',
          state: 'CO',
          country: 'USA',
          zipCode: '81611'
        },
        amenities: ['WiFi', 'Skiing', 'Restaurant', 'Bar', 'Spa', 'Fireplace'],
        images: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
        ],
        rating: 4.7,
        priceRange: { min: 350, max: 750 },
        contactInfo: {
          phone: '+1-555-0789',
          email: 'info@mountainlodge.com'
        },
        isActive: true
      }
    ];

    for (const hotelData of hotels) {
      const hotel = new Hotel(hotelData);
      await hotel.save();
      console.log(`✅ Created hotel: ${hotel.name}`);
    }

    // Create sample destinations
    console.log('Creating sample destinations...');
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
        isPopular: true,
        isActive: true
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
        isPopular: true,
        isActive: true
      }
    ];

    for (const destinationData of destinations) {
      const destination = new Destination(destinationData);
      await destination.save();
      console.log(`✅ Created destination: ${destination.name}`);
    }

    // Create a regular user for testing
    console.log('Creating test user...');
    const existingUser = await User.findOne({ email: 'user@example.com' });
    if (!existingUser) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('password123', 10);
      const testUser = new User({
        firstName: 'Test',
        lastName: 'User',
        email: 'user@example.com',
        password: hashedPassword,
        role: 'user'
      });
      await testUser.save();
      console.log('✅ Created test user: user@example.com / password123');
    } else {
      console.log('✅ Test user already exists: user@example.com / password123');
    }

    console.log('\n🎉 Sample data created successfully!');
    console.log('\n📋 Available accounts:');
    console.log('Admin: admin@example.com / admin123');
    console.log('User: user@example.com / password123');
    console.log('\n🏨 Hotels created:', hotels.length);
    console.log('🌍 Destinations created:', destinations.length);

  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the script
createSampleData(); 