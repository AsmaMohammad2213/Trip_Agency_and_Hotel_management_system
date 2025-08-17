const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');

const auth = async (req, res, next) => {
  try {
    console.log('Auth middleware - Headers:', req.headers);
    
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Auth middleware - Token:', token ? 'Present' : 'Missing');

    if (!token) {
      console.log('Auth middleware - No token provided');
      return res.status(401).json({ message: 'No authentication token provided.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      console.log('Auth middleware - Decoded token:', decoded);
      
      const user = await User.findOne({ _id: decoded._id });
      console.log('Auth middleware - User found:', user ? {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      } : 'No');

      if (!user) {
        console.log('Auth middleware - User not found in database');
        return res.status(401).json({ message: 'User not found.' });
      }

      req.user = user;
      console.log('Auth middleware - Authentication successful');
      next();
    } catch (jwtError) {
      console.error('Auth middleware - JWT verification error:', jwtError);
      return res.status(401).json({ message: 'Invalid token.' });
    }
  } catch (error) {
    console.error('Auth middleware - General error:', error);
    res.status(401).json({ message: 'Authentication failed.' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      console.log('Admin auth - User role:', req.user?.role);
      
      if (req.user?.role !== 'admin') {
        console.log('Admin auth - Access denied: Not an admin');
        return res.status(403).json({ message: 'Access denied. Admin only.' });
      }
      
      console.log('Admin auth - Access granted');
      next();
    });
  } catch (error) {
    console.error('Admin auth - Error:', error);
    res.status(401).json({ message: 'Authentication failed.' });
  }
};

module.exports = { auth, adminAuth }; 