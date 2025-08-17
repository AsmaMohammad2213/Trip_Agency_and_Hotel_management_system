const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testBooking() {
  console.log('🔍 Testing Booking System...\n');

  try {
    // 1. Login first
    console.log('1. Logging in...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Login successful');
    console.log('');

    // 2. Get destinations
    console.log('2. Fetching destinations...');
    const destinationsResponse = await axios.get(`${BASE_URL}/destinations`);
    const destinations = destinationsResponse.data;
    console.log(`✅ Found ${destinations.length} destinations`);
    
    if (destinations.length === 0) {
      console.log('❌ No destinations found. Creating a test destination...');
      // Create a test destination
      const createDestResponse = await axios.post(`${BASE_URL}/destinations`, {
        name: 'Test Destination',
        country: 'Test Country',
        city: 'Test City',
        description: 'A test destination for booking',
        mainImage: 'https://example.com/image.jpg',
        price: 100,
        climate: 'temperate',
        activities: ['Sightseeing', 'Shopping']
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Test destination created');
      destinations.push(createDestResponse.data);
    }

    const destination = destinations[0];
    console.log('Using destination:', destination.name);
    console.log('Destination ID:', destination._id);
    console.log('');

    // 3. Test destination booking
    console.log('3. Testing destination booking...');
    const bookingData = {
      destination: destination._id,
      checkIn: '2024-12-25',
      guests: 2,
      totalPrice: 200,
      packageType: 'basic',
      specialRequests: 'Test booking',
      status: 'pending',
      bookingType: 'destination'
    };

    console.log('Booking data:', bookingData);
    
    const bookingResponse = await axios.post(`${BASE_URL}/bookings`, bookingData, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    console.log('✅ Destination booking successful!');
    console.log('Booking ID:', bookingResponse.data._id);
    console.log('Booking type:', bookingResponse.data.bookingType);
    console.log('');

    // 4. Test hotel booking (if hotels exist)
    console.log('4. Testing hotel booking...');
    const hotelsResponse = await axios.get(`${BASE_URL}/hotels`);
    const hotels = hotelsResponse.data;
    
    if (hotels.length > 0) {
      const hotel = hotels[0];
      console.log('Using hotel:', hotel.name);
      console.log('Hotel ID:', hotel._id);
      
      const hotelBookingData = {
        hotel: hotel._id,
        checkIn: '2024-12-25',
        checkOut: '2024-12-27',
        guests: 2,
        totalPrice: 300,
        roomType: 'standard',
        specialRequests: 'Test hotel booking',
        status: 'pending',
        bookingType: 'hotel'
      };

      console.log('Hotel booking data:', hotelBookingData);
      
      const hotelBookingResponse = await axios.post(`${BASE_URL}/bookings`, hotelBookingData, {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      console.log('✅ Hotel booking successful!');
      console.log('Booking ID:', hotelBookingResponse.data._id);
      console.log('Booking type:', hotelBookingResponse.data.bookingType);
    } else {
      console.log('❌ No hotels found for testing');
    }

    console.log('\n🎉 Booking system test completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:');
    console.error('Error:', error.response?.data?.message || error.message);
    console.error('Status:', error.response?.status);
    console.error('URL:', error.config?.url);
    
    if (error.response?.data) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testBooking(); 