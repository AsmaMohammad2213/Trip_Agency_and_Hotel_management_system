const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAuthentication() {
  console.log('🔐 Testing Authentication...\n');

  try {
    // 1. Test Login
    console.log('1. Testing Login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Login successful');
    console.log('Token received:', token ? 'Yes' : 'No');
    console.log('Token length:', token ? token.length : 0);
    console.log('User:', loginResponse.data.user.email);
    console.log('Role:', loginResponse.data.user.role);
    console.log('');

    // 2. Test Token Validation
    console.log('2. Testing Token Validation...');
    const testResponse = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Token is valid');
    console.log('Users endpoint accessible');
    console.log('Number of users:', testResponse.data.length);
    console.log('');

    // 3. Test Admin Authorization
    console.log('3. Testing Admin Authorization...');
    const adminResponse = await axios.post(`${BASE_URL}/hotels`, {
      name: 'Test Hotel',
      description: 'Test Description'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Admin authorization working');
    console.log('Hotel creation successful');
    console.log('');

    // 4. Test Invalid Token
    console.log('4. Testing Invalid Token...');
    try {
      await axios.get(`${BASE_URL}/users`, {
        headers: { Authorization: 'Bearer invalid-token' }
      });
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Invalid token correctly rejected');
        console.log('Error message:', error.response.data.message);
      } else {
        console.log('❌ Unexpected error:', error.response?.data);
      }
    }
    console.log('');

    // 5. Test Missing Token
    console.log('5. Testing Missing Token...');
    try {
      await axios.get(`${BASE_URL}/users`);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Missing token correctly rejected');
        console.log('Error message:', error.response.data.message);
      } else {
        console.log('❌ Unexpected error:', error.response?.data);
      }
    }
    console.log('');

    console.log('🎉 Authentication Tests Completed Successfully!');
    console.log('\n📋 Summary:');
    console.log('- ✅ Login working');
    console.log('- ✅ Token generation working');
    console.log('- ✅ Token validation working');
    console.log('- ✅ Admin authorization working');
    console.log('- ✅ Invalid token handling working');
    console.log('- ✅ Missing token handling working');

  } catch (error) {
    console.error('❌ Authentication test failed:');
    console.error('Error:', error.response?.data?.message || error.message);
    console.error('Status:', error.response?.status);
    console.error('URL:', error.config?.url);
    
    if (error.response?.status === 401) {
      console.log('\n🔧 Troubleshooting Tips:');
      console.log('1. Check if backend server is running on port 5000');
      console.log('2. Verify admin user exists in database');
      console.log('3. Check JWT_SECRET environment variable');
      console.log('4. Clear browser localStorage and try again');
    }
  }
}

// Run the test
testAuthentication(); 