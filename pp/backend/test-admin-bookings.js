const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAdminBookings() {
  console.log('🔧 Testing Admin Bookings Endpoint...\n');

  try {
    // 1. Login as admin
    console.log('1. Logging in as admin...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.token;
    const headers = { Authorization: `Bearer ${token}` };
    
    console.log('✅ Admin login successful');
    console.log('Token:', token.substring(0, 20) + '...');
    console.log('');

    // 2. Test admin bookings endpoint
    console.log('2. Testing admin bookings endpoint...');
    const bookingsResponse = await axios.get(`${BASE_URL}/admin/bookings`, { headers });
    
    console.log('✅ Admin bookings response:');
    console.log('Response structure:', Object.keys(bookingsResponse.data));
    console.log('Total bookings:', bookingsResponse.data.total || 'N/A');
    console.log('Current page:', bookingsResponse.data.currentPage || 'N/A');
    console.log('Total pages:', bookingsResponse.data.totalPages || 'N/A');
    
    const bookings = bookingsResponse.data.bookings || bookingsResponse.data;
    console.log('Bookings array length:', bookings.length);
    
    if (bookings.length > 0) {
      console.log('\n📋 Sample booking data:');
      console.log(JSON.stringify(bookings[0], null, 2));
    } else {
      console.log('\n❌ No bookings found in response');
    }
    
    console.log('\n🔍 Full response structure:');
    console.log(JSON.stringify(bookingsResponse.data, null, 2));

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
testAdminBookings(); 