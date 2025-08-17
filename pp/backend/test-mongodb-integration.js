const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testMongoDBIntegration() {
  console.log('🔧 Testing MongoDB Integration with Admin Dashboard...\n');

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
    console.log('');

    // 2. Test admin stats endpoint
    console.log('2. Testing admin stats endpoint...');
    const statsResponse = await axios.get(`${BASE_URL}/admin/stats`, { headers });
    console.log('✅ Admin stats loaded from MongoDB:');
    console.log('   - Total Users:', statsResponse.data.totalUsers);
    console.log('   - Total Hotels:', statsResponse.data.totalHotels);
    console.log('   - Total Destinations:', statsResponse.data.totalDestinations);
    console.log('   - Total Bookings:', statsResponse.data.totalBookings);
    console.log('   - Revenue: $', statsResponse.data.revenue);
    console.log('   - Pending Bookings:', statsResponse.data.pendingBookings);
    console.log('   - Confirmed Bookings:', statsResponse.data.confirmedBookings);
    console.log('   - Cancelled Bookings:', statsResponse.data.cancelledBookings);
    console.log('');

    // 3. Test admin bookings endpoint
    console.log('3. Testing admin bookings endpoint...');
    const bookingsResponse = await axios.get(`${BASE_URL}/admin/bookings`, { headers });
    console.log('✅ Admin bookings loaded from MongoDB:');
    console.log('   - Total bookings:', bookingsResponse.data.total || bookingsResponse.data.bookings?.length || 0);
    console.log('   - Current page:', bookingsResponse.data.currentPage || 'N/A');
    console.log('   - Total pages:', bookingsResponse.data.totalPages || 'N/A');
    console.log('');

    // 4. Test hotels endpoint
    console.log('4. Testing hotels endpoint...');
    const hotelsResponse = await axios.get(`${BASE_URL}/hotels`, { headers });
    console.log('✅ Hotels loaded from MongoDB:', hotelsResponse.data.length);
    if (hotelsResponse.data.length > 0) {
      console.log('   - Sample hotel:', hotelsResponse.data[0].name);
    }
    console.log('');

    // 5. Test destinations endpoint
    console.log('5. Testing destinations endpoint...');
    const destinationsResponse = await axios.get(`${BASE_URL}/destinations`, { headers });
    console.log('✅ Destinations loaded from MongoDB:', destinationsResponse.data.length);
    if (destinationsResponse.data.length > 0) {
      console.log('   - Sample destination:', destinationsResponse.data[0].name);
    }
    console.log('');

    // 6. Test users endpoint
    console.log('6. Testing users endpoint...');
    const usersResponse = await axios.get(`${BASE_URL}/users`, { headers });
    console.log('✅ Users loaded from MongoDB:', destinationsResponse.data.length);
    if (usersResponse.data.length > 0) {
      console.log('   - Sample user:', usersResponse.data[0].firstName, usersResponse.data[0].lastName);
    }
    console.log('');

    console.log('🎉 MongoDB Integration Test Successful!');
    console.log('\n📊 Summary:');
    console.log('- ✅ Admin authentication working');
    console.log('- ✅ Admin stats endpoint working');
    console.log('- ✅ Admin bookings endpoint working');
    console.log('- ✅ Hotels endpoint working');
    console.log('- ✅ Destinations endpoint working');
    console.log('- ✅ Users endpoint working');
    console.log('\n🌐 Frontend Dashboard URLs:');
    console.log('- Admin Dashboard: http://localhost:5173/admin/dashboard');
    console.log('- Direct Access: http://localhost:5173/admin-dashboard.html');

  } catch (error) {
    console.error('❌ Test failed:');
    console.error('Error:', error.response?.data?.message || error.message);
    console.error('Status:', error.response?.status);
    console.error('URL:', error.config?.url);
  }
}

// Run the test
testMongoDBIntegration(); 