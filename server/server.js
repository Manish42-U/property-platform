// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3001',
//   credentials: true
// }));
// app.use(express.json());

// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/properties', require('./routes/properties'));
// app.use('/api/bookings', require('./routes/bookings'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token']
}));
app.use(express.json());

// MongoDB Connection - Remove deprecated options
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/property-platform')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));