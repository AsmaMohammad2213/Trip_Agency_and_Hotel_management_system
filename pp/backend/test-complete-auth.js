const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testCompleteAuth() {
  console.log('🔐 Testing Complete Authentication Flow...\n');

  try {
    // 1. Test Admin Login
    console.log('1. Testing Admin Login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.token;
    const user = loginResponse.data.user;
    
    console.log('✅ Login successful');
    console.log('User:', user.email);
    console.log('Role:', user.role);
    console.log('Token received:', token ? 'Yes' : 'No');
    console.log('');

    // 2. Test Token Validation
    console.log('2. Testing Token Validation...');
    const meResponse = await axios.get(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Token validation successful');
    console.log('Current user:', meResponse.data.user.email);
    console.log('');

    // 3. Test Admin Authorization
    console.log('3. Testing Admin Authorization...');
    const usersResponse = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Admin authorization working');
    console.log('Users endpoint accessible');
    console.log('');

    // 4. Test Hotel Creation (Admin Only)
    console.log('4. Testing Hotel Creation...');
    const hotelData = {
      name: 'Test Hotel',
      description: 'A test hotel for authentication',
      address: {
        street: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        country: 'Test Country',
        zipCode: '12345'
      },
      amenities: ['WiFi', 'Pool'],
      images: ['https://example.com/image.jpg'],
      rating: 4.5,
      priceRange: { min: 100, max: 300 },
      contactInfo: { phone: '+1-555-0123', email: 'test@hotel.com' }
    };

    const hotelResponse = await axios.post(`${BASE_URL}/hotels`, hotelData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Hotel creation successful');
    console.log('Hotel ID:', hotelResponse.data._id);
    console.log('');

    // 5. Test Destination Creation (Admin Only)
    console.log('5. Testing Destination Creation...');
    const destinationData = {
      name: 'Test Destination',
      country: 'Test Country',
      city: 'Test City',
      description: 'A test destination',
      shortDescription: 'Test destination',
      mainImage: 'https://example.com/image.jpg',
      images: ['https://example.com/image.jpg'],
      rating: 4.5,
      price: 1000,
      currency: 'USD',
      climate: 'temperate',
      bestTimeToVisit: 'Year-round',
      attractions: [{ name: 'Test Attraction', description: 'Test', image: 'https://example.com/image.jpg' }],
      activities: ['Sightseeing'],
      isPopular: true
    };

    const destinationResponse = await axios.post(`${BASE_URL}/destinations`, destinationData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Destination creation successful');
    console.log('Destination ID:', destinationResponse.data._id);
    console.log('');

    // 6. Test Booking Management
    console.log('6. Testing Booking Management...');
    const bookingsResponse = await axios.get(`${BASE_URL}/bookings/admin/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Booking management accessible');
    console.log('Bookings found:', bookingsResponse.data.length);
    console.log('');

    // 7. Cleanup
    console.log('7. Cleaning up test data...');
    await axios.delete(`${BASE_URL}/hotels/${hotelResponse.data._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Test hotel deleted');

    await axios.delete(`${BASE_URL}/destinations/${destinationResponse.data._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Test destination deleted');
    console.log('');

    console.log('🎉 Complete Authentication Flow Test Successful!');
    console.log('\n📊 Summary:');
    console.log('- ✅ Admin login working');
    console.log('- ✅ Token validation working');
    console.log('- ✅ Admin authorization working');
    console.log('- ✅ Hotel management working');
    console.log('- ✅ Destination management working');
    console.log('- ✅ Booking management working');
    console.log('- ✅ Cleanup working');

  } catch (error) {
    console.error('❌ Test failed:');
    console.error('Error:', error.response?.data?.message || error.message);
    console.error('Status:', error.response?.status);
    console.error('URL:', error.config?.url);
  }
}

// Run the test
testCompleteAuth(); 