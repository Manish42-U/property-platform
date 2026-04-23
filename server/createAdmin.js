const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

// Import User model
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/property-platform')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Check if admin already exists
      const existingAdmin = await User.findOne({ role: 'admin' });
      if (existingAdmin) {
        console.log('Admin already exists:', existingAdmin.email);
        console.log('Admin details:');
        console.log('Email:', existingAdmin.email);
        console.log('Role:', existingAdmin.role);
        process.exit();
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      // Create admin user
      const admin = new User({
        name: 'Super Admin',
        email: 'admin@propertyplatform.com',
        password: hashedPassword,
        phone: '9999999999',
        role: 'admin'
      });
      
      await admin.save();
      
      console.log('✅ Admin created successfully!');
      console.log('=========================');
      console.log('Email: admin@propertyplatform.com');
      console.log('Password: admin123');
      console.log('=========================');
      
    } catch (error) {
      console.error('Error creating admin:', error);
    } finally {
      process.exit();
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });