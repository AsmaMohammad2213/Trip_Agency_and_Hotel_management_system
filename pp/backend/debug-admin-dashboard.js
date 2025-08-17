const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
const FRONTEND_URL = 'http://localhost:5173';

async function debugAdminDashboard() {
  console.log('🔧 Debugging Admin Dashboard Issue...\n');

  try {
    // 1. Check backend status
    console.log('1. Checking backend status...');
    try {
      const response = await axios.get(`${BASE_URL}/auth/me`, { timeout: 5000 });
      console.log('✅ Backend is running');
    } catch (error) {
      console.log('❌ Backend is not responding');
      console.log('   Make sure to run: cd pp/backend && npm run dev');
      return;
    }

    // 2. Test admin login
    console.log('\n2. Testing admin login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.token;
    const user = loginResponse.data.user;
    
    console.log('✅ Admin login successful');
    console.log('   User:', user.email);
    console.log('   Role:', user.role);
    console.log('   Token:', token.substring(0, 20) + '...');

    // 3. Test dashboard stats endpoint
    console.log('\n3. Testing dashboard stats...');
    try {
      const statsResponse = await axios.get(`${BASE_URL}/users/stats/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Dashboard stats working');
      console.log('   Stats:', statsResponse.data);
    } catch (error) {
      console.log('❌ Dashboard stats failed:', error.response?.status);
    }

    // 4. Test frontend accessibility
    console.log('\n4. Testing frontend...');
    try {
      const frontendResponse = await axios.get(`${FRONTEND_URL}`, { timeout: 5000 });
      console.log('✅ Frontend is accessible');
    } catch (error) {
      console.log('❌ Frontend is not accessible');
      console.log('   Make sure to run: cd pp/proo && npm run dev');
      console.log('   Or use PowerShell: cd pp/proo; npm run dev');
      return;
    }

    // 5. Test admin pages
    console.log('\n5. Testing admin pages...');
    const pages = [
      '/admin/login',
      '/admin/dashboard', 
      '/test-admin',
      '/admin-test'
    ];

    for (const page of pages) {
      try {
        const response = await axios.get(`${FRONTEND_URL}${page}`, { 
          timeout: 5000,
          maxRedirects: 0,
          validateStatus: function (status) {
            return status >= 200 && status < 400;
          }
        });
        console.log(`✅ ${page}: ${response.status}`);
      } catch (error) {
        if (error.response && error.response.status === 302) {
          console.log(`✅ ${page}: Redirects (${error.response.status})`);
        } else {
          console.log(`❌ ${page}: ${error.message}`);
        }
      }
    }

    console.log('\n🎯 DIAGNOSIS COMPLETE');
    console.log('\n📋 TROUBLESHOOTING STEPS:');
    console.log('');
    console.log('1. START BOTH SERVERS:');
    console.log('   Terminal 1 (Backend):');
    console.log('     cd pp/backend');
    console.log('     npm run dev');
    console.log('');
    console.log('   Terminal 2 (Frontend):');
    console.log('     cd pp/proo');
    console.log('     npm run dev');
    console.log('');
    console.log('2. TEST ADMIN ACCESS:');
    console.log('   Go to: http://localhost:5173/test-admin');
    console.log('   Click: "Test Admin Login & Dashboard"');
    console.log('');
    console.log('3. IF DASHBOARD IS BLANK:');
    console.log('   - Open browser dev tools (F12)');
    console.log('   - Go to Console tab');
    console.log('   - Look for 🔧 debug messages');
    console.log('   - Check for any red error messages');
    console.log('   - Share the error messages with me');
    console.log('');
    console.log('4. ALTERNATIVE TEST:');
    console.log('   Go to: http://localhost:5173/admin-test');
    console.log('   This is a simplified dashboard test');
    console.log('');
    console.log('5. DIRECT LOGIN:');
    console.log('   Go to: http://localhost:5173/admin/login');
    console.log('   Login: admin@example.com / admin123');

  } catch (error) {
    console.error('\n❌ Debug failed:');
    console.error('Error:', error.response?.data?.message || error.message);
    console.error('Status:', error.response?.status);
    console.error('URL:', error.config?.url);
  }
}

// Run the debug
debugAdminDashboard(); 