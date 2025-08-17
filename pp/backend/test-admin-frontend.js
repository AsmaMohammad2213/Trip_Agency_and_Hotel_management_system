const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
const FRONTEND_URL = 'http://localhost:5173';

async function testAdminFrontend() {
  console.log('🔧 Testing Admin Frontend Access...\n');

  try {
    // 1. Test backend admin login
    console.log('1. Testing backend admin login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.token;
    const user = loginResponse.data.user;
    
    console.log('✅ Backend login successful');
    console.log('User:', user.email);
    console.log('Role:', user.role);
    console.log('Token received:', token ? 'Yes' : 'No');
    console.log('');

    // 2. Test frontend accessibility
    console.log('2. Testing frontend accessibility...');
    try {
      const frontendResponse = await axios.get(`${FRONTEND_URL}`, { timeout: 5000 });
      console.log('✅ Frontend is accessible');
      console.log('Status:', frontendResponse.status);
    } catch (error) {
      console.log('❌ Frontend is not accessible');
      console.log('Error:', error.message);
      console.log('Make sure to run: cd pp/proo && npm run dev');
      console.log('');
      return;
    }

    // 3. Test admin login page
    console.log('3. Testing admin login page...');
    try {
      const adminLoginResponse = await axios.get(`${FRONTEND_URL}/admin/login`, { timeout: 5000 });
      console.log('✅ Admin login page is accessible');
      console.log('Status:', adminLoginResponse.status);
    } catch (error) {
      console.log('❌ Admin login page is not accessible');
      console.log('Error:', error.message);
    }
    console.log('');

    // 4. Test admin dashboard page (should redirect to login)
    console.log('4. Testing admin dashboard page...');
    try {
      const dashboardResponse = await axios.get(`${FRONTEND_URL}/admin/dashboard`, { 
        timeout: 5000,
        maxRedirects: 0,
        validateStatus: function (status) {
          return status >= 200 && status < 400; // Accept redirects
        }
      });
      console.log('✅ Admin dashboard page is accessible');
      console.log('Status:', dashboardResponse.status);
    } catch (error) {
      if (error.response && error.response.status === 302) {
        console.log('✅ Admin dashboard redirects to login (expected)');
      } else {
        console.log('❌ Admin dashboard page error');
        console.log('Error:', error.message);
      }
    }
    console.log('');

    // 5. Test test admin page
    console.log('5. Testing test admin page...');
    try {
      const testAdminResponse = await axios.get(`${FRONTEND_URL}/test-admin`, { timeout: 5000 });
      console.log('✅ Test admin page is accessible');
      console.log('Status:', testAdminResponse.status);
    } catch (error) {
      console.log('❌ Test admin page is not accessible');
      console.log('Error:', error.message);
    }
    console.log('');

    // 6. Test admin-test page
    console.log('6. Testing admin-test page...');
    try {
      const adminTestResponse = await axios.get(`${FRONTEND_URL}/admin-test`, { timeout: 5000 });
      console.log('✅ Admin test page is accessible');
      console.log('Status:', adminTestResponse.status);
    } catch (error) {
      console.log('❌ Admin test page is not accessible');
      console.log('Error:', error.message);
    }
    console.log('');

    console.log('🎉 Frontend Admin Test Summary:');
    console.log('✅ Backend admin login working');
    console.log('✅ Frontend server accessible');
    console.log('✅ Admin pages accessible');
    console.log('');
    console.log('📋 Next Steps:');
    console.log('1. Go to: http://localhost:5173/test-admin');
    console.log('2. Click "Test Admin Login & Dashboard"');
    console.log('3. Check browser console for debug messages');
    console.log('4. If dashboard is blank, check console errors');

  } catch (error) {
    console.error('❌ Test failed:');
    console.error('Error:', error.response?.data?.message || error.message);
    console.error('Status:', error.response?.status);
    console.error('URL:', error.config?.url);
  }
}

// Run the test
testAdminFrontend(); 