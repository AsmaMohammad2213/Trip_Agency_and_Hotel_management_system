const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAdminDashboard() {
  console.log('🔧 Testing Admin Dashboard Endpoints...\n');

  try {
    // 1. Login as admin
    console.log('1. Logging in as admin...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Login successful');
    console.log('');

    // 2. Test dashboard stats
    console.log('2. Testing dashboard stats...');
    const statsResponse = await axios.get(`${BASE_URL}/users/stats/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Dashboard stats retrieved:');
    console.log('Total Users:', statsResponse.data.totalUsers);
    console.log('Total Hotels:', statsResponse.data.totalHotels);
    console.log('Total Destinations:', statsResponse.data.totalDestinations);
    console.log('Total Bookings:', statsResponse.data.totalBookings);
    console.log('Revenue:', statsResponse.data.revenue);
    console.log('Pending Bookings:', statsResponse.data.pendingBookings);
    console.log('Confirmed Bookings:', statsResponse.data.confirmedBookings);
    console.log('Cancelled Bookings:', statsResponse.data.cancelledBookings);
    console.log('');

    // 3. Test users endpoint
    console.log('3. Testing users endpoint...');
    const usersResponse = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Users retrieved:', usersResponse.data.length);
    console.log('First user:', usersResponse.data[0]?.email);
    console.log('');

    // 4. Test hotels endpoint
    console.log('4. Testing hotels endpoint...');
    const hotelsResponse = await axios.get(`${BASE_URL}/hotels`);
    console.log('✅ Hotels retrieved:', hotelsResponse.data.length);
    console.log('First hotel:', hotelsResponse.data[0]?.name);
    console.log('');

    // 5. Test destinations endpoint
    console.log('5. Testing destinations endpoint...');
    const destinationsResponse = await axios.get(`${BASE_URL}/destinations`);
    console.log('✅ Destinations retrieved:', destinationsResponse.data.length);
    console.log('First destination:', destinationsResponse.data[0]?.name);
    console.log('');

    // 6. Test bookings endpoint
    console.log('6. Testing bookings endpoint...');
    const bookingsResponse = await axios.get(`${BASE_URL}/bookings/admin/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Bookings retrieved:', bookingsResponse.data.length);
    if (bookingsResponse.data.length > 0) {
      console.log('First booking:', {
        id: bookingsResponse.data[0]._id,
        type: bookingsResponse.data[0].bookingType,
        status: bookingsResponse.data[0].status
      });
    }
    console.log('');

    console.log('🎉 Admin Dashboard Test Completed Successfully!');
    console.log('\n📊 Summary:');
    console.log('- ✅ Dashboard stats working');
    console.log('- ✅ Users endpoint working');
    console.log('- ✅ Hotels endpoint working');
    console.log('- ✅ Destinations endpoint working');
    console.log('- ✅ Bookings endpoint working');

  } catch (error) {
    console.error('❌ Test failed:');
    console.error('Error:', error.response?.data?.message || error.message);
    console.error('Status:', error.response?.status);
    console.error('URL:', error.config?.url);
  }
}

// Run the test
testAdminDashboard(); 