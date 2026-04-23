const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Property = require('../models/Property');
const auth = require('../middleware/auth');

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      user: req.userId
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId })
      .populate('property')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status (owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('property');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (booking.property.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    booking.status = req.body.status;
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add these to your existing bookings route file

// Get bookings for owner's properties
router.get('/owner-bookings', auth, async (req, res) => {
  try {
    // First get all properties owned by this user
    const properties = await Property.find({ owner: req.userId });
    const propertyIds = properties.map(p => p._id);
    
    // Get bookings for these properties
    const bookings = await Booking.find({ 
      property: { $in: propertyIds } 
    })
    .populate('property', 'title images location price propertyType')
    .populate('user', 'name email phone')
    .sort('-createdAt');
    
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching owner bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status (for owner)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Verify the property belongs to this owner
    const property = await Property.findById(booking.property);
    if (property.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    booking.status = status;
    await booking.save();
    
    res.json({ message: `Booking ${status} successfully`, booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;