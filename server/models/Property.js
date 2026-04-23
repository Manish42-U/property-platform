// const mongoose = require('mongoose');

// const PropertySchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ['sale', 'rent'],
//     required: true
//   },
//   propertyType: {
//     type: String,
//     enum: ['house', 'apartment', 'condo', 'land', 'commercial'],
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   location: {
//     address: String,
//     city: String,
//     state: String,
//     pincode: String,
//     coordinates: {
//       lat: Number,
//       lng: Number
//     }
//   },
//   bedrooms: Number,
//   bathrooms: Number,
//   area: {
//     value: Number,
//     unit: {
//       type: String,
//       enum: ['sqft', 'sqm', 'acre'],
//       default: 'sqft'
//     }
//   },
//   amenities: [String],
//   images: [String],
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['available', 'sold', 'rented', 'pending'],
//     default: 'available'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Index for geospatial queries
// PropertySchema.index({ 'location.coordinates': '2dsphere' });

// module.exports = mongoose.model('Property', PropertySchema);


const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['sale', 'rent'],
    required: true
  },
  propertyType: {
    type: String,
    enum: ['house', 'apartment', 'condo', 'land', 'commercial'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    // ✅ GeoJSON format for coordinates
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0]
      }
    }
  },
  bedrooms: {
    type: Number,
    default: 0
  },
  bathrooms: {
    type: Number,
    default: 0
  },
  area: {
    value: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      enum: ['sqft', 'sqm', 'acre'],
      default: 'sqft'
    }
  },
  amenities: [String],
  images: [String],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'rented', 'pending'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ 2dsphere index for geospatial queries
PropertySchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Property', PropertySchema);