const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testBookingSystem() {
  console.log('🏨 Testing Complete Booking System...\n');

  try {
    // 1. Login as regular user
    console.log('1. Logging in as regular user...');
    const userLoginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'user@example.com',
      password: 'password123'
    });
    
    const userToken = userLoginResponse.data.token;
    const user = userLoginResponse.data.user;
    console.log('✅ User login successful:', user.email);
    console.log('');

    // 2. Get available hotels
    console.log('2. Fetching available hotels...');
    const hotelsResponse = await axios.get(`${BASE_URL}/hotels`);
    const hotels = hotelsResponse.data;
    console.log(`✅ Found ${hotels.length} hotels`);
    
    if (hotels.length === 0) {
      console.log('❌ No hotels available for booking');
      return;
    }

    const selectedHotel = hotels[0];
    console.log('Selected hotel:', selectedHotel.name);
    console.log('');

    // 3. User books a hotel
    console.log('3. User booking a hotel...');
    const bookingData = {
      hotel: selectedHotel.id,
      checkIn: '2024-12-25',
      checkOut: '2024-12-27',
      guests: 2,
      totalPrice: 598, // 2 nights * $299
      roomType: 'standard',
      specialRequests: 'Early check-in if possible',
      status: 'pending',
      bookingType: 'hotel'
    };

    console.log('Booking data:', bookingData);
    
    const bookingResponse = await axios.post(`${BASE_URL}/bookings`, bookingData, {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      }
    });

    console.log('✅ Hotel booking successful!');
    console.log('Booking ID:', bookingResponse.data._id);
    console.log('Booking status:', bookingResponse.data.status);
    console.log('');

    // 4. User books a destination
    console.log('4. User booking a destination...');
    const destinationsResponse = await axios.get(`${BASE_URL}/destinations`);
    const destinations = destinationsResponse.data;
    
    if (destinations.length > 0) {
      const selectedDestination = destinations[0];
      console.log('Selected destination:', selectedDestination.name);
      
      const destinationBookingData = {
        destination: selectedDestination.id,
        checkIn: '2024-12-30',
        guests: 2,
        totalPrice: 2400, // 2 people * $1200
        packageType: 'basic',
        specialRequests: 'Vegetarian meals preferred',
        status: 'pending',
        bookingType: 'destination'
      };

      console.log('Destination booking data:', destinationBookingData);
      
      const destinationBookingResponse = await axios.post(`${BASE_URL}/bookings`, destinationBookingData, {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      });

      console.log('✅ Destination booking successful!');
      console.log('Booking ID:', destinationBookingResponse.data._id);
      console.log('Booking status:', destinationBookingResponse.data.status);
      console.log('');
    }

    // 5. Login as admin
    console.log('5. Logging in as admin...');
    const adminLoginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    const adminToken = adminLoginResponse.data.token;
    const admin = adminLoginResponse.data.user;
    console.log('✅ Admin login successful:', admin.email);
    console.log('');

    // 6. Admin views all bookings
    console.log('6. Admin viewing all bookings...');
    const allBookingsResponse = await axios.get(`${BASE_URL}/bookings/admin/all`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    const allBookings = allBookingsResponse.data;
    console.log(`✅ Admin can see ${allBookings.length} total bookings`);
    
    allBookings.forEach((booking, index) => {
      console.log(`Booking ${index + 1}:`);
      console.log(`  - ID: ${booking._id}`);
      console.log(`  - Type: ${booking.bookingType}`);
      console.log(`  - Status: ${booking.status}`);
      console.log(`  - User: ${booking.user?.firstName} ${booking.user?.lastName}`);
      console.log(`  - Total: $${booking.totalPrice}`);
      console.log(`  - Guests: ${booking.guests}`);
      if (booking.hotel) {
        console.log(`  - Hotel: ${booking.hotel.name}`);
      }
      if (booking.destination) {
        console.log(`  - Destination: ${booking.destination.name}`);
      }
      console.log('');
    });

    // 7. Admin updates booking status
    if (allBookings.length > 0) {
      console.log('7. Admin updating booking status...');
      const bookingToUpdate = allBookings[0];
      
      const updateResponse = await axios.patch(`${BASE_URL}/bookings/${bookingToUpdate._id}/status`, {
        status: 'confirmed'
      }, {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        }
      });

      console.log('✅ Booking status updated to:', updateResponse.data.status);
      console.log('');
    }

    // 8. Admin views dashboard stats
    console.log('8. Admin viewing dashboard stats...');
    const statsResponse = await axios.get(`${BASE_URL}/users/stats/dashboard`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    const stats = statsResponse.data;
    console.log('✅ Dashboard stats:');
    console.log(`  - Total Users: ${stats.totalUsers}`);
    console.log(`  - Total Hotels: ${stats.totalHotels}`);
    console.log(`  - Total Destinations: ${stats.totalDestinations}`);
    console.log(`  - Total Bookings: ${stats.totalBookings}`);
    console.log(`  - Revenue: $${stats.revenue}`);
    console.log(`  - Pending Bookings: ${stats.pendingBookings}`);
    console.log(`  - Confirmed Bookings: ${stats.confirmedBookings}`);
    console.log(`  - Cancelled Bookings: ${stats.cancelledBookings}`);
    console.log('');

    // 9. User views their own bookings
    console.log('9. User viewing their own bookings...');
    const userBookingsResponse = await axios.get(`${BASE_URL}/bookings/my-bookings`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    
    const userBookings = userBookingsResponse.data;
    console.log(`✅ User can see ${userBookings.length} of their own bookings`);
    
    userBookings.forEach((booking, index) => {
      console.log(`User Booking ${index + 1}:`);
      console.log(`  - Type: ${booking.bookingType}`);
      console.log(`  - Status: ${booking.status}`);
      console.log(`  - Total: $${booking.totalPrice}`);
      console.log(`  - Guests: ${booking.guests}`);
      if (booking.hotel) {
        console.log(`  - Hotel: ${booking.hotel.name}`);
      }
      if (booking.destination) {
        console.log(`  - Destination: ${booking.destination.name}`);
      }
      console.log('');
    });

    console.log('🎉 Complete Booking System Test Successful!');
    console.log('\n📊 Summary:');
    console.log('- ✅ User can book hotels');
    console.log('- ✅ User can book destinations');
    console.log('- ✅ Admin can see all bookings');
    console.log('- ✅ Admin can update booking status');
    console.log('- ✅ Admin can view dashboard stats');
    console.log('- ✅ User can view their own bookings');
    console.log('- ✅ Proper authentication and authorization working');

  } catch (error) {
    console.error('❌ Test failed:');
    console.error('Error:', error.response?.data?.message || error.message);
    console.error('Status:', error.response?.status);
    console.error('URL:', error.config?.url);
  }
}

// Run the test
testBookingSystem(); 