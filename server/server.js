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

// ─────────────────────────────────────────────────────────────────
//  CORS Configuration – allow only your Vercel frontend + localhost
// ─────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'https://property-platform-3kar.vercel.app',  // your active Vercel app
  'https://property-platform.vercel.app',      // alternative domain
  'http://localhost:3000',                     // local React dev server
  'http://localhost:3001'                      // alternative local port
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('❌ Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,          // allow cookies / auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token']
}));

// Handle preflight requests explicitly (optional but safe)
app.options('*', cors());

// ─────────────────────────────────────────────────────────────────
//  Middleware
// ─────────────────────────────────────────────────────────────────
app.use(express.json());

// ─────────────────────────────────────────────────────────────────
//  Database connection
// ─────────────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/property-platform')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// ─────────────────────────────────────────────────────────────────
//  Routes
// ─────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/admin', require('./routes/admin'));

// ─────────────────────────────────────────────────────────────────
//  Start server
// ─────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));