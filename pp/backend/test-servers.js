const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
const FRONTEND_URL = 'http://localhost:5173';

async function testServers() {
  console.log('🔧 Testing Both Servers...\n');

  // Test Backend
  console.log('1. Testing Backend Server...');
  try {
    const response = await axios.get(`${BASE_URL}/auth/me`, { timeout: 3000 });
    console.log('❌ Backend should not respond without token');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('✅ Backend is running (authentication required)');
    } else {
      console.log('❌ Backend is not running');
      console.log('   Start it with: cd pp/backend && node server.js');
      return;
    }
  }

  // Test Frontend
  console.log('\n2. Testing Frontend Server...');
  try {
    const response = await axios.get(`${FRONTEND_URL}`, { timeout: 3000 });
    console.log('✅ Frontend is running');
  } catch (error) {
    console.log('❌ Frontend is not running');
    console.log('   Start it with: cd pp/proo && npm run dev');
    return;
  }

  // Test Admin Login
  console.log('\n3. Testing Admin Login...');
  try {
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    console.log('✅ Admin login successful');
    console.log('   User:', loginResponse.data.user.email);
    console.log('   Role:', loginResponse.data.user.role);
  } catch (error) {
    console.log('❌ Admin login failed:', error.response?.data?.message || error.message);
    return;
  }

  console.log('\n🎉 Both servers are working!');
  console.log('\n📋 ACCESS ADMIN DASHBOARD:');
  console.log('');
  console.log('Method 1 (Recommended):');
  console.log('1. Open browser');
  console.log('2. Go to: http://localhost:5173/test-admin');
  console.log('3. Click: "Test Admin Login & Dashboard"');
  console.log('');
  console.log('Method 2 (Direct):');
  console.log('1. Go to: http://localhost:5173/admin/login');
  console.log('2. Login: admin@example.com / admin123');
  console.log('');
  console.log('Method 3 (Simple Test):');
  console.log('1. Go to: http://localhost:5173/admin-test');
  console.log('2. Click: "Test Backend Connection"');
  console.log('');
  console.log('🔧 If you see a blank page:');
  console.log('1. Open browser dev tools (F12)');
  console.log('2. Check Console tab for errors');
  console.log('3. Check Network tab for failed requests');
  console.log('4. Try hard refresh: Ctrl + Shift + R');
}

testServers(); 