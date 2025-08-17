# Admin Authentication System

This document explains how the admin authentication system works in the travel agency project.

## Overview

The admin system provides secure access to the administration dashboard where admins can manage hotels, destinations, bookings, users, and system settings.

## Admin Login Credentials

**Development Credentials:**
- **Email:** `admin@example.com`
- **Password:** `admin123`

These credentials work even when the backend server is not running (development mode).

## How to Access Admin Dashboard

### Method 1: Via Admin Login Button
1. Visit the main website
2. Click the "🔧 Admin Login" button in the purple banner at the top
3. Enter admin credentials
4. You'll be redirected to the admin dashboard

### Method 2: Direct URL Access
1. Navigate to `/admin/login` directly
2. Enter admin credentials
3. You'll be redirected to the admin dashboard

### Method 3: Direct Dashboard Access
- Navigate to `/admin` or `/admin/dashboard`
- If not logged in, you'll be automatically redirected to the login page

## Authentication Flow

1. **Login Process:**
   - User enters credentials on `/admin/login`
   - System first tries to connect to backend API
   - If backend is unavailable, uses development credentials
   - Stores authentication tokens in localStorage
   - Redirects to `/admin/dashboard`

2. **Protected Routes:**
   - All admin routes are protected by `ProtectedAdminRoute` component
   - Checks for valid admin token and user role
   - Redirects to login if not authenticated

3. **Session Management:**
   - Admin session persists across browser refreshes
   - Logout clears all authentication data
   - Automatic redirect to login on session expiry

## Admin Dashboard Features

### Overview Tab
- Dashboard statistics
- Revenue metrics
- Booking status overview
- Quick actions

### Hotels Management
- View all hotels
- Add new hotels
- Edit hotel details
- Delete hotels
- Manage availability

### Destinations Management
- View all destinations
- Add new destinations
- Edit destination details
- Delete destinations

### Bookings Management
- View all bookings
- Filter by status (pending, confirmed, cancelled)
- Search bookings
- Update booking status
- View booking details

### Users Management
- View all users
- User statistics
- User management tools

### Settings
- System configuration
- Admin preferences

## Security Features

1. **Protected Routes:** All admin routes require authentication
2. **Role-based Access:** Only users with `role: 'admin'` can access
3. **Session Validation:** Automatic session checking on route changes
4. **Secure Logout:** Proper cleanup of all authentication data

## Development vs Production

### Development Mode
- Uses mock credentials when backend is unavailable
- Provides fallback data for testing
- Shows helpful error messages

### Production Mode
- Connects to real backend API
- Uses actual database credentials
- Implements proper security measures

## File Structure

```
src/
├── components/
│   └── ProtectedAdminRoute.tsx    # Route protection component
├── contexts/
│   └── AdminAuthContext.tsx       # Admin authentication context
├── pages/
│   ├── AdminLoginPage.tsx         # Admin login page
│   └── AdminDashboard.tsx         # Main admin dashboard
├── services/
│   └── api.ts                     # API service with admin methods
└── App.tsx                        # Main app with routing
```

## API Endpoints

The system expects these backend endpoints:

- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/me` - Get current user
- `GET /api/hotels` - Get all hotels
- `POST /api/hotels` - Create hotel
- `PUT /api/hotels/:id` - Update hotel
- `DELETE /api/hotels/:id` - Delete hotel
- Similar endpoints for destinations and bookings

## Troubleshooting

### Common Issues

1. **"Cannot connect to server" error:**
   - Backend server is not running
   - Use development credentials: `admin@example.com` / `admin123`

2. **Redirected to login repeatedly:**
   - Clear browser localStorage
   - Check if admin token is properly set

3. **Dashboard not loading:**
   - Check browser console for errors
   - Verify all required files are present

### Development Setup

1. Start the backend server:
   ```bash
   cd pp/backend
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd pp/proo
   npm run dev
   ```

3. Access admin at: `http://localhost:5173/admin/login`

## Future Enhancements

- Multi-factor authentication
- Role-based permissions
- Audit logging
- Session timeout
- Password reset functionality
- Admin user management 