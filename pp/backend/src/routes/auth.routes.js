const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const { auth } = require('../middleware/auth.middleware');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    console.log('Registration attempt:', req.body);
    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName,
    });

    console.log('Saving new user:', { email, firstName, lastName });
    await user.save();
    console.log('User saved successfully:', user._id);

    // Generate token
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ 
      message: 'Error creating user',
      error: error.message 
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    console.log('User found:', user ? {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    } : 'No');
    
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    console.log('Comparing passwords...');
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch ? 'Yes' : 'No');
    
    if (!isMatch) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Login successful for user:', {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });

    // Generate token
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Send response
    const response = {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
    };
    console.log('Sending response:', response);
    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ 
      message: 'Error logging in',
      error: error.message 
    });
  }
});

// Logout
router.post('/logout', auth, async (req, res) => {
  try {
    // Since we're using JWT, we don't need to do anything on the server
    // The client should remove the token
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      message: 'Error during logout',
      error: error.message 
    });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = req.user;
    console.log('Fetching user data:', {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });
    res.json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(400).json({ 
      message: 'Error fetching user data',
      error: error.message 
    });
  }
});

module.exports = router; 