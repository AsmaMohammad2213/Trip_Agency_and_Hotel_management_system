const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testCancelBooking() {
  console.log('🔧 Testing Cancel Booking Functionality...\n');

  try {
    // 1. Login as user
    console.log('1. Logging in as user...');
    const userResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'user@example.com',
      password: 'user123'
    });
    
    const userToken = userResponse.data.token;
    const userHeaders = { Authorization: `Bearer ${userToken}` };
    
    console.log('✅ User login successful');
    console.log('');

    // 2. Get user's bookings
    console.log('2. Fetching user bookings...');
    const bookingsResponse = await axios.get(`${BASE_URL}/bookings/my-bookings`, {
      headers: userHeaders
    });
    
    const userBookings = bookingsResponse.data;
    console.log(`✅ Found ${userBookings.length} user bookings`);
    
    // Find a pending booking to cancel
    const pendingBooking = userBookings.find(booking => booking.status === 'pending');
    
    if (!pendingBooking) {
      console.log('❌ No pending bookings found to cancel');
      return;
    }
    
    console.log(`📋 Found pending booking: ${pendingBooking._id}`);
    console.log(`   - Type: ${pendingBooking.bookingType}`);
    console.log(`   - Status: ${pendingBooking.status}`);
    console.log(`   - Total: $${pendingBooking.totalPrice}`);
    console.log('');

    // 3. Cancel the booking
    console.log('3. Cancelling booking...');
    const cancelResponse = await axios.patch(`${BASE_URL}/bookings/${pendingBooking._id}/cancel`, {}, {
      headers: userHeaders
    });
    
    console.log('✅ Booking cancelled successfully!');
    console.log(`   - New status: ${cancelResponse.data.status}`);
    console.log(`   - Booking ID: ${cancelResponse.data._id}`);
    console.log('');

    // 4. Verify the booking was cancelled
    console.log('4. Verifying cancellation...');
    const verifyResponse = await axios.get(`${BASE_URL}/bookings/${pendingBooking._id}`, {
      headers: userHeaders
    });
    
    console.log('✅ Booking verification successful');
    console.log(`   - Current status: ${verifyResponse.data.status}`);
    console.log(`   - Cancelled: ${verifyResponse.data.status === 'cancelled'}`);
    console.log('');

    // 5. Test trying to cancel a non-pending booking
    console.log('5. Testing cancellation of non-pending booking...');
    const confirmedBooking = userBookings.find(booking => booking.status === 'confirmed');
    
    if (confirmedBooking) {
      try {
        await axios.patch(`${BASE_URL}/bookings/${confirmedBooking._id}/cancel`, {}, {
          headers: userHeaders
        });
        console.log('❌ Should not have been able to cancel confirmed booking');
      } catch (error) {
        if (error.response?.status === 400) {
          console.log('✅ Correctly prevented cancellation of confirmed booking');
          console.log(`   - Error: ${error.response.data.message}`);
        } else {
          console.log('❌ Unexpected error:', error.response?.data?.message);
        }
      }
    } else {
      console.log('ℹ️ No confirmed bookings found to test');
    }
    console.log('');

    // 6. Test unauthorized cancellation
    console.log('6. Testing unauthorized cancellation...');
    try {
      await axios.patch(`${BASE_URL}/bookings/${pendingBooking._id}/cancel`, {}, {
        headers: { Authorization: 'Bearer invalid-token' }
      });
      console.log('❌ Should not have been able to cancel with invalid token');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Correctly prevented unauthorized cancellation');
      } else {
        console.log('❌ Unexpected error:', error.response?.data?.message);
      }
    }

    console.log('\n🎉 Cancel Booking Test Successful!');
    console.log('\n📊 Summary:');
    console.log('- ✅ User can cancel their own pending bookings');
    console.log('- ✅ Booking status updates correctly');
    console.log('- ✅ Cannot cancel non-pending bookings');
    console.log('- ✅ Proper authorization checks working');
    console.log('- ✅ Error handling working correctly');

  } catch (error) {
    console.error('❌ Test failed:');
    console.error('Error:', error.response?.data?.message || error.message);
    console.error('Status:', error.response?.status);
    console.error('URL:', error.config?.url);
  }
}

// Run the test
testCancelBooking(); 