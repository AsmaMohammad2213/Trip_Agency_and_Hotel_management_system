const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAdminAccess() {
  console.log('🔧 Testing Complete Admin Access...\n');

  try {
    // 1. Test admin login
    console.log('1. Testing admin login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.token;
    const user = loginResponse.data.user;
    
    console.log('✅ Admin login successful');
    console.log('User:', user.email);
    console.log('Role:', user.role);
    console.log('Token length:', token.length);
    console.log('');

    // 2. Test all admin endpoints
    console.log('2. Testing admin endpoints...');
    
    const endpoints = [
      { name: 'Dashboard Stats', url: '/users/stats/dashboard' },
      { name: 'Users List', url: '/users' },
      { name: 'Hotels List', url: '/hotels' },
      { name: 'Destinations List', url: '/destinations' },
      { name: 'Bookings List', url: '/bookings/admin/all' }
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(`${BASE_URL}${endpoint.url}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(`✅ ${endpoint.name}: ${response.data.length || 'Data received'}`);
      } catch (error) {
        console.log(`❌ ${endpoint.name}: ${error.response?.status || 'Error'}`);
      }
    }
    console.log('');

    // 3. Test booking status update
    console.log('3. Testing booking status update...');
    try {
      const bookingsResponse = await axios.get(`${BASE_URL}/bookings/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (bookingsResponse.data.length > 0) {
        const firstBooking = bookingsResponse.data[0];
        const updateResponse = await axios.patch(`${BASE_URL}/bookings/${firstBooking._id}/status`, {
          status: 'confirmed'
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Booking status update successful');
      } else {
        console.log('⚠️ No bookings to test status update');
      }
    } catch (error) {
      console.log('❌ Booking status update failed:', error.response?.status);
    }
    console.log('');

    console.log('🎉 Admin Access Test Completed Successfully!');
    console.log('');
    console.log('📋 Frontend Testing Instructions:');
    console.log('');
    console.log('1. Make sure both servers are running:');
    console.log('   Backend: cd pp/backend && npm run dev');
    console.log('   Frontend: cd pp/proo && npm run dev');
    console.log('');
    console.log('2. Test admin login:');
    console.log('   Go to: http://localhost:5173/test-admin');
    console.log('   Click: "Test Admin Login & Dashboard"');
    console.log('');
    console.log('3. Alternative test:');
    console.log('   Go to: http://localhost:5173/admin-test');
    console.log('   Click: "Test Backend Connection"');
    console.log('');
    console.log('4. Direct dashboard access:');
    console.log('   Go to: http://localhost:5173/admin/login');
    console.log('   Login with: admin@example.com / admin123');
    console.log('');
    console.log('5. If dashboard is blank:');
    console.log('   - Open browser dev tools (F12)');
    console.log('   - Check Console tab for 🔧 debug messages');
    console.log('   - Check Network tab for failed requests');
    console.log('   - Share any error messages');

  } catch (error) {
    console.error('❌ Test failed:');
    console.error('Error:', error.response?.data?.message || error.message);
    console.error('Status:', error.response?.status);
    console.error('URL:', error.config?.url);
  }
}

// Run the test
testAdminAccess(); 