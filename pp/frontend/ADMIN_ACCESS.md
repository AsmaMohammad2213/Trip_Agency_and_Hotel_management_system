# 🏢 Admin Dashboard - Web Access Guide

## Quick Access to Admin Dashboard

### 🚀 **Step 1: Start the Development Server**

Open your terminal and run:
```bash
cd pp/proo
npm run dev
```

The server will start on `http://localhost:5173`

### 🔐 **Step 2: Access Admin Dashboard**

#### **Method 1: Direct Admin Login**
1. Go to: `http://localhost:5173/admin/login`
2. Enter credentials:
   - **Email:** `admin@example.com`
   - **Password:** `admin123`
3. Click "Sign in to Admin Panel"
4. You'll be redirected to the admin dashboard

#### **Method 2: Test Component**
1. Go to: `http://localhost:5173/admin-test`
2. Click "Test Admin Login & Dashboard"
3. Instant access to admin dashboard

#### **Method 3: Main Website**
1. Go to: `http://localhost:5173/`
2. Click the "🔧 Admin Login" button in the purple banner
3. Complete the login process

### 📊 **Admin Dashboard Features**

Once logged in, you'll have access to:

#### **Overview Tab**
- 📈 Dashboard statistics
- 💰 Revenue tracking ($125,430)
- 📅 Booking status overview
- 👥 Recent activity feed

#### **Hotels Management**
- 🏨 View all hotels with images
- ➕ Add new hotels
- ✏️ Edit hotel details
- 🗑️ Delete hotels
- 📍 Location and pricing management

#### **Destinations Management**
- 🗺️ View all destinations
- ➕ Add new destinations
- ✏️ Edit destination details
- 🗑️ Delete destinations
- 🌍 Country and package management

#### **Bookings Management**
- 📋 View all bookings in table format
- 🔍 Search by customer or hotel
- 🏷️ Filter by status (Pending/Confirmed/Cancelled)
- ✅ Update booking status
- 📊 Export booking data

#### **Users Management**
- 👥 User statistics
- 📈 User activity tracking
- 🔧 User management tools

#### **Settings**
- ⚙️ System configuration
- 🔧 Admin preferences

### 🎨 **Dashboard Interface**

```
┌─────────────────────────────────────────────────────────┐
│ 🏢 Admin Dashboard                    Welcome, Admin    │
│                                    ← Back | Logout      │
├─────────────┬───────────────────────────────────────────┤
│ 📊 Overview │ Dashboard Overview                        │
│ 🏨 Hotels   │ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐          │
│ 🗺️ Destinations│ │Users│ │Hotels│ │Dest.│ │Book.│          │
│ 📅 Bookings │ └─────┘ └─────┘ └─────┘ └─────┘          │
│ 👥 Users    │                                         │
│ ⚙️ Settings │ Revenue: $125,430                       │
│             │ Booking Status: Confirmed | Pending     │
│             │ Recent Bookings Table                   │
└─────────────┴───────────────────────────────────────────┘
```

### 🔧 **Navigation**

- **Sidebar:** Click on any tab to switch sections
- **Header:** Back to main site or logout
- **Search:** Available in bookings section
- **Filters:** Status filtering in bookings
- **Actions:** Edit, delete, and manage buttons

### 📱 **Responsive Design**

The dashboard works on:
- 💻 Desktop computers
- 📱 Mobile phones
- 📱 Tablets
- 🖥️ Different screen sizes

### 🛡️ **Security Features**

- 🔐 Protected routes (only admins can access)
- 🎫 Session management
- 🔄 Automatic logout on session expiry
- 🚫 Unauthorized access prevention

### 🚨 **Troubleshooting**

#### **If dashboard doesn't load:**
1. Check if server is running: `http://localhost:5173`
2. Clear browser cache and localStorage
3. Try the test component: `http://localhost:5173/admin-test`

#### **If login fails:**
1. Verify credentials: `admin@example.com` / `admin123`
2. Check browser console for errors
3. Ensure backend server is running (if using real API)

#### **If page is blank:**
1. Check if all files are present
2. Verify React development server is running
3. Check browser console for JavaScript errors

### 🎯 **Quick Test**

To quickly test the admin dashboard:

1. **Start server:** `npm run dev`
2. **Open browser:** `http://localhost:5173/admin-test`
3. **Click:** "Test Admin Login & Dashboard"
4. **Verify:** Dashboard loads with all features

### 📞 **Support**

If you encounter any issues:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure the development server is running
4. Try accessing the test component first

---

**🎉 You're now ready to manage your travel agency through the admin dashboard!** 