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

    console.log('🎉 Complete Authentication Flow Test Successful!');
    console.log('\n📊 Summary:');
    console.log('- ✅ Admin login working');
    console.log('- ✅ Token validation working');
    console.log('- ✅ Admin authorization working');

  } catch (error) {
    console.error('❌ Test failed:');
    console.error('Error:', error.response?.data?.message || error.message);
    console.error('Status:', error.response?.status);
    console.error('URL:', error.config?.url);
  }
}

// Run the test
testCompleteAuth(); 