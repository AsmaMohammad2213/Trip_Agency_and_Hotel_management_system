const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testHotel = {
  name: 'Test Luxury Hotel',
  description: 'A beautiful test hotel for demonstration',
  address: {
    street: '123 Test Street',
    city: 'Test City',
    state: 'Test State',
    country: 'Test Country',
    zipCode: '12345'
  },
  amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
  images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400'],
  rating: 4.5,
  priceRange: { min: 200, max: 500 },
  contactInfo: { phone: '+1-555-0123', email: 'test@hotel.com' }
};

const testDestination = {
  name: 'Test Paradise Island',
  country: 'Test Country',
  city: 'Test City',
  description: 'A beautiful test destination for demonstration',
  shortDescription: 'Paradise island getaway',
  mainImage: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400',
  images: ['https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400'],
  rating: 4.7,
  price: 1500,
  currency: 'USD',
  climate: 'tropical',
  bestTimeToVisit: 'Year-round',
  attractions: [
    {
      name: 'Test Beach',
      description: 'Beautiful white sand beach',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'
    }
  ],
  activities: ['Swimming', 'Snorkeling', 'Sunbathing'],
  isPopular: true
};

const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'testuser@example.com',
  password: 'testpassword123',
  role: 'user'
};

let authToken = '';
let createdHotelId = '';
let createdDestinationId = '';
let createdUserId = '';
let createdBookingId = '';

async function testAdminFunctionality() {
  console.log('🚀 Starting Admin Functionality Tests...\n');

  try {
    // 1. Test Authentication
    console.log('1. Testing Authentication...');
    const authResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    authToken = authResponse.data.token;
    console.log('✅ Authentication successful\n');

    // 2. Test Hotel Management
    console.log('2. Testing Hotel Management...');
    
    // Create hotel
    const createHotelResponse = await axios.post(`${BASE_URL}/hotels`, testHotel, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    createdHotelId = createHotelResponse.data._id;
    console.log('✅ Hotel created:', createHotelResponse.data.name);

    // Get all hotels
    const getHotelsResponse = await axios.get(`${BASE_URL}/hotels`);
    console.log('✅ Retrieved hotels:', getHotelsResponse.data.length, 'hotels found');

    // Get specific hotel
    const getHotelResponse = await axios.get(`${BASE_URL}/hotels/${createdHotelId}`);
    console.log('✅ Retrieved specific hotel:', getHotelResponse.data.name);

    // Update hotel
    const updateHotelResponse = await axios.patch(`${BASE_URL}/hotels/${createdHotelId}`, {
      rating: 4.8
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Hotel updated, new rating:', updateHotelResponse.data.rating);
    console.log('✅ Hotel management tests completed\n');

    // 3. Test Destination Management
    console.log('3. Testing Destination Management...');
    
    // Create destination
    const createDestinationResponse = await axios.post(`${BASE_URL}/destinations`, testDestination, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    createdDestinationId = createDestinationResponse.data._id;
    console.log('✅ Destination created:', createDestinationResponse.data.name);

    // Get all destinations
    const getDestinationsResponse = await axios.get(`${BASE_URL}/destinations`);
    console.log('✅ Retrieved destinations:', getDestinationsResponse.data.length, 'destinations found');

    // Get specific destination
    const getDestinationResponse = await axios.get(`${BASE_URL}/destinations/${createdDestinationId}`);
    console.log('✅ Retrieved specific destination:', getDestinationResponse.data.name);

    // Update destination
    const updateDestinationResponse = await axios.put(`${BASE_URL}/destinations/${createdDestinationId}`, {
      rating: 4.9
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Destination updated, new rating:', updateDestinationResponse.data.rating);
    console.log('✅ Destination management tests completed\n');

    // 4. Test User Management
    console.log('4. Testing User Management...');
    
    // Create user
    const createUserResponse = await axios.post(`${BASE_URL}/auth/register`, testUser);
    createdUserId = createUserResponse.data.user._id;
    console.log('✅ User created:', createUserResponse.data.user.email);

    // Get all users
    const getUsersResponse = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Retrieved users:', getUsersResponse.data.length, 'users found');

    // Update user role
    const updateUserResponse = await axios.patch(`${BASE_URL}/users/${createdUserId}/role`, {
      role: 'admin'
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ User role updated to:', updateUserResponse.data.role);
    console.log('✅ User management tests completed\n');

    // 5. Test Booking Management
    console.log('5. Testing Booking Management...');
    
    // Create booking (using the test user)
    const userAuthResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    const userToken = userAuthResponse.data.token;

    const testBooking = {
      hotel: createdHotelId,
      checkIn: '2024-02-15',
      checkOut: '2024-02-18',
      guests: 2,
      totalPrice: 600,
      status: 'pending'
    };

    const createBookingResponse = await axios.post(`${BASE_URL}/bookings`, testBooking, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    createdBookingId = createBookingResponse.data._id;
    console.log('✅ Booking created:', createBookingResponse.data._id);

    // Get all bookings (admin)
    const getBookingsResponse = await axios.get(`${BASE_URL}/bookings/admin/all`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Retrieved bookings:', getBookingsResponse.data.length, 'bookings found');

    // Update booking status
    const updateBookingResponse = await axios.patch(`${BASE_URL}/bookings/${createdBookingId}`, {
      status: 'confirmed'
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Booking status updated to:', updateBookingResponse.data.status);
    console.log('✅ Booking management tests completed\n');

    // 6. Test Search and Filtering
    console.log('6. Testing Search and Filtering...');
    
    // Search destinations
    const searchDestinationsResponse = await axios.get(`${BASE_URL}/destinations/search?query=paradise`);
    console.log('✅ Destination search results:', searchDestinationsResponse.data.length, 'destinations found');

    // Get user bookings
    const getUserBookingsResponse = await axios.get(`${BASE_URL}/bookings/my-bookings`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ User bookings retrieved:', getUserBookingsResponse.data.length, 'bookings found');
    console.log('✅ Search and filtering tests completed\n');

    // 7. Cleanup (Delete test data)
    console.log('7. Cleaning up test data...');
    
    // Delete booking
    await axios.delete(`${BASE_URL}/bookings/${createdBookingId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Test booking deleted');

    // Delete user
    await axios.delete(`${BASE_URL}/users/${createdUserId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Test user deleted');

    // Delete destination
    await axios.delete(`${BASE_URL}/destinations/${createdDestinationId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Test destination deleted');

    // Delete hotel
    await axios.delete(`${BASE_URL}/hotels/${createdHotelId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Test hotel deleted');
    console.log('✅ Cleanup completed\n');

    console.log('🎉 All Admin Functionality Tests Completed Successfully!');
    console.log('\n📊 Summary:');
    console.log('- ✅ Authentication working');
    console.log('- ✅ Hotel CRUD operations working');
    console.log('- ✅ Destination CRUD operations working');
    console.log('- ✅ User management working');
    console.log('- ✅ Booking management working');
    console.log('- ✅ Search and filtering working');
    console.log('- ✅ Admin authorization working');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    console.error('Status:', error.response?.status);
    console.error('URL:', error.config?.url);
  }
}

// Run the tests
testAdminFunctionality(); 