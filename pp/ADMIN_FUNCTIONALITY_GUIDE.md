# Admin Dashboard - Hotels, Destinations & Bookings Guide

## Overview

Your travel agency admin dashboard now includes comprehensive management for hotels, destinations, and bookings. All functionality is connected to the MongoDB database through the Express.js backend API.

## 🏨 Hotels Management

### Features
- **View All Hotels**: Display all hotels with images, ratings, and details
- **Add New Hotels**: Complete form with amenities, images, and contact info
- **Edit Hotels**: Update hotel information and details
- **Delete Hotels**: Remove hotels from the system
- **Search & Filter**: Find hotels by location, rating, or amenities

### Hotel Data Structure
```javascript
{
  id: string,
  name: string,
  location: string,
  rating: number,
  price: number,
  image: string,
  description: string,
  amenities: string[],
  available: boolean,
  address: {
    street: string,
    city: string,
    state: string,
    country: string,
    zipCode: string
  },
  contactInfo: {
    phone: string,
    email: string
  }
}
```

### API Endpoints
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get specific hotel
- `POST /api/hotels` - Create new hotel (admin only)
- `PATCH /api/hotels/:id` - Update hotel (admin only)
- `DELETE /api/hotels/:id` - Delete hotel (admin only)

## 🌍 Destinations Management

### Features
- **View All Destinations**: Display destinations with images and details
- **Add New Destinations**: Complete form with attractions and activities
- **Edit Destinations**: Update destination information
- **Delete Destinations**: Remove destinations from the system
- **Search Destinations**: Find by name, country, or description
- **Filter by Price**: Filter destinations by price range

### Destination Data Structure
```javascript
{
  id: string,
  name: string,
  country: string,
  description: string,
  image: string,
  rating: number,
  price: number,
  city: string,
  shortDescription: string,
  mainImage: string,
  images: string[],
  currency: string,
  climate: string,
  bestTimeToVisit: string,
  attractions: [{
    name: string,
    description: string,
    image: string
  }],
  activities: string[],
  isPopular: boolean
}
```

### API Endpoints
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get specific destination
- `POST /api/destinations` - Create new destination (admin only)
- `PUT /api/destinations/:id` - Update destination (admin only)
- `DELETE /api/destinations/:id` - Delete destination (admin only)
- `GET /api/destinations/search` - Search destinations

## 📅 Bookings Management

### Features
- **View All Bookings**: Display all bookings with user and hotel details
- **Search Bookings**: Search by customer name or hotel name
- **Filter by Status**: Filter by pending, confirmed, or cancelled
- **Update Status**: Change booking status (confirm/cancel)
- **Export Data**: Export booking data (UI ready)
- **Booking Details**: View complete booking information

### Booking Data Structure
```javascript
{
  id: string,
  userId: string,
  hotelId: string,
  checkIn: string,
  checkOut: string,
  guests: number,
  totalPrice: number,
  status: 'pending' | 'confirmed' | 'cancelled',
  createdAt: string,
  user: {
    firstName: string,
    lastName: string,
    email: string
  },
  hotel: {
    name: string,
    location: string
  }
}
```

### API Endpoints
- `GET /api/bookings/admin/all` - Get all bookings (admin only)
- `GET /api/bookings/my-bookings` - Get user's bookings
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

## 🔧 How to Use

### 1. Accessing the Admin Dashboard
1. Navigate to your travel agency website
2. Click the "Admin Dashboard" toggle button
3. Login with admin credentials (admin@example.com / admin123)

### 2. Managing Hotels
1. Click on the "Hotels" tab
2. To add a hotel:
   - Click "Add Hotel" button
   - Fill in all required fields
   - Add amenities and images
   - Click "Add Hotel" to save
3. To edit a hotel:
   - Click the "Edit" button on any hotel card
   - Modify the information
   - Save changes
4. To delete a hotel:
   - Click the "Delete" button
   - Confirm the deletion

### 3. Managing Destinations
1. Click on the "Destinations" tab
2. To add a destination:
   - Click "Add Destination" button
   - Fill in destination details
   - Add attractions and activities
   - Click "Add Destination" to save
3. To edit a destination:
   - Click the "Edit" button on any destination card
   - Modify the information
   - Save changes
4. To delete a destination:
   - Click the "Delete" button
   - Confirm the deletion

### 4. Managing Bookings
1. Click on the "Bookings" tab
2. Use the search bar to find specific bookings
3. Use the status filter to view bookings by status
4. To update booking status:
   - Click the status dropdown
   - Select new status (confirmed/cancelled)
   - Status will be updated in the database
5. To export bookings:
   - Click the "Export" button (functionality ready)

## 🧪 Testing the Functionality

### Running the Test Script
```bash
cd pp/backend
node test-admin.js
```

This script will test:
- Authentication
- Hotel CRUD operations
- Destination CRUD operations
- User management
- Booking management
- Search and filtering
- Admin authorization

### Manual Testing
1. **Add a Hotel**:
   - Go to Hotels tab
   - Click "Add Hotel"
   - Fill form and submit
   - Verify hotel appears in list

2. **Add a Destination**:
   - Go to Destinations tab
   - Click "Add Destination"
   - Fill form and submit
   - Verify destination appears in list

3. **Test Booking Management**:
   - Create a booking as a user
   - Login as admin
   - Go to Bookings tab
   - Verify booking appears
   - Test status updates

## 🔒 Security Features

- **Admin Authentication**: All admin operations require valid admin token
- **Role-based Access**: Different permissions for users vs admins
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling and user feedback

## 📊 Database Integration

All data is stored in MongoDB with the following collections:
- `hotels` - Hotel information and details
- `destinations` - Destination information and attractions
- `bookings` - Booking records with user and hotel references
- `users` - User accounts and roles

## 🚀 Performance Features

- **Fallback Data**: Mock data used when API is unavailable
- **Loading States**: Visual feedback during API calls
- **Error Recovery**: Graceful handling of network errors
- **Optimistic Updates**: UI updates immediately, syncs with server

## 🔄 Real-time Updates

The admin dashboard automatically:
- Refreshes data when switching tabs
- Updates lists after adding/editing/deleting items
- Shows loading states during operations
- Displays success/error messages

## 📱 Responsive Design

The admin dashboard is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Intuitive Navigation**: Easy-to-use tab system
- **Visual Feedback**: Icons, colors, and status indicators
- **Form Validation**: Real-time validation and error messages
- **Confirmation Dialogs**: Safe deletion with confirmations

## 🔧 Troubleshooting

### Common Issues

1. **Backend Not Running**:
   - Ensure backend server is running on port 5000
   - Check console for error messages

2. **Authentication Issues**:
   - Verify admin credentials
   - Check token expiration
   - Clear localStorage if needed

3. **Data Not Loading**:
   - Check network connection
   - Verify API endpoints
   - Check browser console for errors

4. **Form Submission Fails**:
   - Check required fields
   - Verify data format
   - Check server logs

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Check the backend server logs
3. Verify database connection
4. Test API endpoints directly

## 📈 Future Enhancements

Potential improvements:
- Real-time notifications
- Advanced analytics dashboard
- Bulk operations
- Image upload functionality
- Email notifications
- Advanced search filters
- Data export in multiple formats
- Audit logging

---

Your admin dashboard is now fully functional with comprehensive hotels, destinations, and bookings management! 🎉 