


const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  try {
    console.log('Registration request received:', {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role
    });
    
    const { name, email, password, phone, role } = req.body;
    
    // Validate required fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: name, email, password, phone' 
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Hash password manually
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user with hashed password
    const user = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      phone, 
      role: role || 'user' 
    });
    
    // Save user
    await user.save();
    console.log('User saved successfully, ID:', user._id);
    
    // Create token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'secretkey', 
      { expiresIn: '7d' }
    );
    
    // Return success response
    res.status(201).json({ 
      success: true,
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        phone: user.phone,
        role: user.role 
      } 
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error stack:', error.stack);
    
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration', 
      error: error.message
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'secretkey', 
      { expiresIn: '7d' }
    );
    
    res.json({ 
      success: true,
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        phone: user.phone,
        role: user.role 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Add to your auth routes file (e.g., auth.js or separate userRoutes.js)
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Please provide current and new password' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }
    
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    user.password = hashedPassword;
    await user.save();
    
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
// router.put('/users/profile', auth, async (req, res) => {
//   try {
//     const { name, phone } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.userId,
//       { name, phone },
//       { new: true }
//     ).select('-password');
    
//     res.json({ success: true, user });
//   } catch (error) {
//     console.error('Profile update error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Update user profile - ADD THIS ROUTE
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, phone } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, phone },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ success: true, user });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's bookings
router.get('/bookings/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId })
      .populate('property', 'title images location price')
      .sort('-createdAt');
    res.json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;