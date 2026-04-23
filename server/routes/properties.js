

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;
// const Property = require('../models/Property');
// const auth = require('../middleware/auth');

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Configure Cloudinary storage for multer
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'property-platform',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
//     transformation: [{ width: 800, height: 600, crop: 'limit' }]
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB limit
//   }
// });

// // Get all properties with filters
// router.get('/', async (req, res) => {
//   try {
//     const { type, propertyType, minPrice, maxPrice, bedrooms, location, lat, lng, radius } = req.query;
    
//     let query = {};
    
//     if (type) query.type = type;
//     if (propertyType) query.propertyType = propertyType;
//     if (bedrooms) query.bedrooms = { $gte: parseInt(bedrooms) };
//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = parseInt(minPrice);
//       if (maxPrice) query.price.$lte = parseInt(maxPrice);
//     }
//     if (location) query['location.city'] = { $regex: location, $options: 'i' };
    
//     // Find nearest properties by coordinates
//     if (lat && lng && radius) {
//       query['location.coordinates'] = {
//         $near: {
//           $geometry: {
//             type: 'Point',
//             coordinates: [parseFloat(lng), parseFloat(lat)]
//           },
//           $maxDistance: parseInt(radius) * 1000
//         }
//       };
//     }
    
//     const properties = await Property.find(query)
//       .populate('owner', 'name email phone')
//       .sort('-createdAt');
    
//     res.json(properties);
//   } catch (error) {
//     console.error('Error fetching properties:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get single property
// router.get('/:id', async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id).populate('owner', 'name email phone');
//     if (!property) {
//       return res.status(404).json({ message: 'Property not found' });
//     }
//     res.json(property);
//   } catch (error) {
//     console.error('Error fetching property:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Create property with Cloudinary image upload
// router.post('/', auth, upload.array('images', 10), async (req, res) => {
//   try {
//     console.log('Files uploaded:', req.files);
//     console.log('Body received:', req.body);
    
//     // Parse JSON fields
//     let locationData = req.body.location;
//     let areaData = req.body.area;
//     let amenitiesData = req.body.amenities;
//     let imagesData = req.body.images;
    
//     if (typeof locationData === 'string') {
//       locationData = JSON.parse(locationData);
//     }
//     if (typeof areaData === 'string') {
//       areaData = JSON.parse(areaData);
//     }
//     if (typeof amenitiesData === 'string') {
//       amenitiesData = JSON.parse(amenitiesData);
//     }
//     if (typeof imagesData === 'string') {
//       imagesData = JSON.parse(imagesData);
//     }
    
//     // Process Cloudinary uploaded images
//     const cloudinaryImages = [];
//     if (req.files && req.files.length > 0) {
//       req.files.forEach(file => {
//         cloudinaryImages.push(file.path); // Cloudinary returns secure URL in path
//       });
//     }
    
//     // Combine Cloudinary uploads with URL images
//     const allImages = [...cloudinaryImages, ...(imagesData || [])];
    
//     const propertyData = {
//       title: req.body.title,
//       description: req.body.description,
//       type: req.body.type,
//       propertyType: req.body.propertyType,
//       price: parseFloat(req.body.price),
//       location: locationData,
//       bedrooms: parseInt(req.body.bedrooms) || 0,
//       bathrooms: parseInt(req.body.bathrooms) || 0,
//       area: areaData,
//       amenities: amenitiesData || [],
//       images: allImages,
//       owner: req.userId,
//       status: 'available'
//     };
    
//     const property = new Property(propertyData);
//     await property.save();
    
//     res.status(201).json({ 
//       success: true, 
//       property,
//       message: 'Property added successfully' 
//     });
//   } catch (error) {
//     console.error('Error creating property:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Update property with Cloudinary
// router.put('/:id', auth, upload.array('images', 10), async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id);
//     if (!property) {
//       return res.status(404).json({ message: 'Property not found' });
//     }
    
//     if (property.owner.toString() !== req.userId) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }
    
//     // Parse JSON fields
//     let updates = { ...req.body };
//     if (updates.location && typeof updates.location === 'string') {
//       updates.location = JSON.parse(updates.location);
//     }
//     if (updates.area && typeof updates.area === 'string') {
//       updates.area = JSON.parse(updates.area);
//     }
//     if (updates.amenities && typeof updates.amenities === 'string') {
//       updates.amenities = JSON.parse(updates.amenities);
//     }
//     if (updates.images && typeof updates.images === 'string') {
//       updates.images = JSON.parse(updates.images);
//     }
    
//     // Process new Cloudinary images
//     const cloudinaryImages = [];
//     if (req.files && req.files.length > 0) {
//       req.files.forEach(file => {
//         cloudinaryImages.push(file.path);
//       });
//     }
    
//     // Combine images
//     updates.images = [...cloudinaryImages, ...(updates.images || [])];
    
//     Object.assign(property, updates);
//     await property.save();
//     res.json(property);
//   } catch (error) {
//     console.error('Error updating property:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete property and its images from Cloudinary
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id);
//     if (!property) {
//       return res.status(404).json({ message: 'Property not found' });
//     }
    
//     if (property.owner.toString() !== req.userId) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }
    
//     // Delete images from Cloudinary
//     for (const imageUrl of property.images) {
//       if (imageUrl.includes('cloudinary.com')) {
//         try {
//           // Extract public ID from Cloudinary URL
//           const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
//           await cloudinary.uploader.destroy(`property-platform/${publicId}`);
//           console.log(`Deleted image: ${publicId}`);
//         } catch (err) {
//           console.error('Error deleting image from Cloudinary:', err);
//         }
//       }
//     }
    
//     await Property.deleteOne({ _id: req.params.id });
//     res.json({ message: 'Property deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting property:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const Property = require('../models/Property');
const auth = require('../middleware/auth');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'property-platform',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }]
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all properties with filters
router.get('/', async (req, res) => {
  try {
    const { type, propertyType, minPrice, maxPrice, bedrooms, location, lat, lng, radius } = req.query;
    
    let query = {};
    
    if (type) query.type = type;
    if (propertyType) query.propertyType = propertyType;
    if (bedrooms) query.bedrooms = { $gte: parseInt(bedrooms) };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }
    if (location) query['location.city'] = { $regex: location, $options: 'i' };
    
    // ✅ GeoJSON query for coordinates
    if (lat && lng && radius) {
      query['location.coordinates'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius) * 1000
        }
      };
    }
    
    const properties = await Property.find(query)
      .populate('owner', 'name email phone')
      .sort('-createdAt');
    
    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email phone');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create property with Cloudinary image upload
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  try {
    console.log('Files uploaded:', req.files);
    console.log('Body received:', req.body);
    
    // Parse JSON fields
    let locationData = req.body.location;
    let areaData = req.body.area;
    let amenitiesData = req.body.amenities;
    let imagesData = req.body.images;
    
    if (typeof locationData === 'string') {
      locationData = JSON.parse(locationData);
    }
    if (typeof areaData === 'string') {
      areaData = JSON.parse(areaData);
    }
    if (typeof amenitiesData === 'string') {
      amenitiesData = JSON.parse(amenitiesData);
    }
    if (typeof imagesData === 'string') {
      imagesData = JSON.parse(imagesData);
    }
    
    // ✅ Convert lat/lng to GeoJSON format
    const formattedLocation = {
      address: locationData.address || '',
      city: locationData.city || '',
      state: locationData.state || '',
      pincode: locationData.pincode || '',
      coordinates: {
        type: 'Point',
        coordinates: [
          parseFloat(locationData.coordinates?.lng) || 0,
          parseFloat(locationData.coordinates?.lat) || 0
        ]
      }
    };
    
    // Process Cloudinary uploaded images
    const cloudinaryImages = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        cloudinaryImages.push(file.path);
      });
    }
    
    // Combine Cloudinary uploads with URL images
    const allImages = [...cloudinaryImages, ...(imagesData || [])];
    
    const propertyData = {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      propertyType: req.body.propertyType,
      price: parseFloat(req.body.price),
      location: formattedLocation,
      bedrooms: parseInt(req.body.bedrooms) || 0,
      bathrooms: parseInt(req.body.bathrooms) || 0,
      area: areaData,
      amenities: amenitiesData || [],
      images: allImages,
      owner: req.userId,
      status: 'available'
    };
    
    const property = new Property(propertyData);
    await property.save();
    
    res.status(201).json({ 
      success: true, 
      property,
      message: 'Property added successfully' 
    });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update property with Cloudinary
router.put('/:id', auth, upload.array('images', 10), async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    if (property.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Parse JSON fields
    let updates = { ...req.body };
    if (updates.location && typeof updates.location === 'string') {
      updates.location = JSON.parse(updates.location);
    }
    if (updates.area && typeof updates.area === 'string') {
      updates.area = JSON.parse(updates.area);
    }
    if (updates.amenities && typeof updates.amenities === 'string') {
      updates.amenities = JSON.parse(updates.amenities);
    }
    if (updates.images && typeof updates.images === 'string') {
      updates.images = JSON.parse(updates.images);
    }
    
    // Process new Cloudinary images
    const cloudinaryImages = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        cloudinaryImages.push(file.path);
      });
    }
    
    // Combine images
    updates.images = [...cloudinaryImages, ...(updates.images || [])];
    
    Object.assign(property, updates);
    await property.save();
    res.json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete property and its images from Cloudinary
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    if (property.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Delete images from Cloudinary
    for (const imageUrl of property.images) {
      if (imageUrl.includes('cloudinary.com')) {
        try {
          const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
          await cloudinary.uploader.destroy(`property-platform/${publicId}`);
          console.log(`Deleted image: ${publicId}`);
        } catch (err) {
          console.error('Error deleting image from Cloudinary:', err);
        }
      }
    }
    
    await Property.deleteOne({ _id: req.params.id });
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;