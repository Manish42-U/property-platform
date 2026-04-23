


// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Property = require('../models/Property');
// const Booking = require('../models/Booking');
// const auth = require('../middleware/auth');
// const admin = require('../middleware/admin');

// // Apply auth and admin middleware to all routes
// router.use(auth, admin);

// // Dashboard stats
// router.get('/stats', async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalProperties = await Property.countDocuments();
//     const totalBookings = await Booking.countDocuments();
//     const recentUsers = await User.find().select('-password').sort('-createdAt').limit(5);
//     const recentProperties = await Property.find().sort('-createdAt').limit(5);
    
//     res.json({
//       users: totalUsers,
//       properties: totalProperties,
//       bookings: totalBookings,
//       recentUsers,
//       recentProperties
//     });
//   } catch (error) {
//     console.error('Error fetching admin stats:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get all users
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find().select('-password').sort('-createdAt');
//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update user role
// router.put('/users/:id/role', async (req, res) => {
//   try {
//     const { role } = req.body;
//     if (!['user', 'owner', 'admin'].includes(role)) {
//       return res.status(400).json({ message: 'Invalid role' });
//     }
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { role },
//       { new: true }
//     ).select('-password');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error('Error updating user role:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete user
// router.delete('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     // Also delete all properties owned by this user
//     await Property.deleteMany({ owner: req.params.id });
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get all properties (admin view)
// router.get('/properties', async (req, res) => {
//   try {
//     const properties = await Property.find().populate('owner', 'name email').sort('-createdAt');
//     res.json(properties);
//   } catch (error) {
//     console.error('Error fetching properties:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete property (admin)
// router.delete('/properties/:id', async (req, res) => {
//   try {
//     const property = await Property.findByIdAndDelete(req.params.id);
//     if (!property) {
//       return res.status(404).json({ message: 'Property not found' });
//     }
//     res.json({ message: 'Property deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting property:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get all bookings (admin view)
// router.get('/bookings', async (req, res) => {
//   try {
//     const bookings = await Booking.find()
//       .populate('property', 'title price')
//       .populate('user', 'name email')
//       .sort('-createdAt');
//     res.json(bookings);
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update booking status
// router.put('/bookings/:id/status', async (req, res) => {
//   try {
//     const { status } = req.body;
//     if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
//       return res.status(400).json({ message: 'Invalid status' });
//     }
//     const booking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }
//     res.json(booking);
//   } catch (error) {
//     console.error('Error updating booking:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete booking
// router.delete('/bookings/:id', async (req, res) => {
//   try {
//     const booking = await Booking.findByIdAndDelete(req.params.id);
//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }
//     res.json({ message: 'Booking deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting booking:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Property = require('../models/Property');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const bcrypt = require('bcryptjs');

// Apply auth and admin middleware to all routes
router.use(auth, admin);

// Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProperties = await Property.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const recentUsers = await User.find().select('-password').sort('-createdAt').limit(5);
    const recentProperties = await Property.find().sort('-createdAt').limit(5);
    
    res.json({
      users: totalUsers,
      properties: totalProperties,
      bookings: totalBookings,
      recentUsers,
      recentProperties
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user role
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'owner', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ ADD THIS: Reset user password (Admin only)
router.put('/users/:id/password', async (req, res) => {
  try {
    const { newPassword } = req.body;
    
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update user password
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Also delete all properties owned by this user
    await Property.deleteMany({ owner: req.params.id });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all properties (admin view)
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email').sort('-createdAt');
    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete property (admin)
router.delete('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bookings (admin view)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('property', 'title price')
      .populate('user', 'name email')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status
router.put('/bookings/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete booking
router.delete('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;