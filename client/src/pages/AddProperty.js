// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import styled, { keyframes } from 'styled-components';

// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const spin = keyframes`
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// `;

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 2rem;
//   background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//   min-height: 100vh;
// `;

// const FormCard = styled.div`
//   background: white;
//   border-radius: 24px;
//   box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
//   animation: ${fadeIn} 0.5s ease-out;
// `;

// const FormHeader = styled.div`
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   padding: 2rem;
//   color: white;
//   text-align: center;

//   h1 {
//     font-size: 2rem;
//     margin-bottom: 0.5rem;
//     font-weight: 700;
//   }

//   p {
//     opacity: 0.9;
//     font-size: 0.95rem;
//   }
// `;

// const FormBody = styled.div`
//   padding: 2rem;
// `;

// const Section = styled.div`
//   margin-bottom: 2rem;
//   padding-bottom: 2rem;
//   border-bottom: 1px solid #e2e8f0;

//   &:last-child {
//     border-bottom: none;
//     margin-bottom: 0;
//     padding-bottom: 0;
//   }
// `;

// const SectionTitle = styled.h3`
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: #1e293b;
//   margin-bottom: 1.5rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   &::before {
//     content: '';
//     width: 4px;
//     height: 20px;
//     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//     border-radius: 2px;
//   }
// `;

// const FormGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: 1.5rem;
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;

//   label {
//     font-weight: 600;
//     color: #475569;
//     font-size: 0.875rem;
//     text-transform: uppercase;
//     letter-spacing: 0.5px;
//   }

//   input, select, textarea {
//     padding: 0.75rem 1rem;
//     border: 2px solid #e2e8f0;
//     border-radius: 12px;
//     font-size: 0.95rem;
//     transition: all 0.3s;
//     font-family: inherit;

//     &:focus {
//       outline: none;
//       border-color: #667eea;
//       box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//     }

//     &:hover {
//       border-color: #cbd5e1;
//     }
//   }

//   textarea {
//     resize: vertical;
//     min-height: 100px;
//   }
// `;

// const Button = styled.button`
//   padding: 0.75rem 1.5rem;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   color: white;
//   border: none;
//   border-radius: 12px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s;
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
//   }

//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//     transform: none;
//   }
// `;

// const LocationButton = styled.button`
//   padding: 0.75rem 1.5rem;
//   background: linear-gradient(135deg, #10b981 0%, #059669 100%);
//   color: white;
//   border: none;
//   border-radius: 12px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s;
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;
//   margin-bottom: 1rem;
//   width: 100%;
//   justify-content: center;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
//   }

//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }
// `;

// const AmenitiesContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
//   margin-top: 0.5rem;
// `;

// const AmenityTag = styled.div`
//   background: #eef2ff;
//   color: #667eea;
//   padding: 0.5rem 1rem;
//   border-radius: 20px;
//   font-size: 0.875rem;
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;

//   button {
//     background: none;
//     border: none;
//     cursor: pointer;
//     color: #667eea;
//     font-size: 1rem;
//     padding: 0;

//     &:hover {
//       color: #dc2626;
//     }
//   }
// `;

// const ImagesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
//   gap: 1rem;
//   margin-top: 1rem;
// `;

// const ImageCard = styled.div`
//   position: relative;
//   border-radius: 12px;
//   overflow: hidden;
//   border: 2px solid #e2e8f0;
//   transition: all 0.3s;

//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
//   }

//   img {
//     width: 100%;
//     height: 150px;
//     object-fit: cover;
//   }

//   button {
//     position: absolute;
//     top: 0.5rem;
//     right: 0.5rem;
//     background: rgba(220, 38, 38, 0.9);
//     color: white;
//     border: none;
//     border-radius: 50%;
//     width: 28px;
//     height: 28px;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 1rem;

//     &:hover {
//       background: #dc2626;
//       transform: scale(1.1);
//     }
//   }
// `;

// const FileInput = styled.div`
//   border: 2px dashed #e2e8f0;
//   border-radius: 12px;
//   padding: 1.5rem;
//   text-align: center;
//   cursor: pointer;
//   transition: all 0.3s;
//   margin-top: 0.5rem;

//   &:hover {
//     border-color: #667eea;
//     background: #f8fafc;
//   }

//   input {
//     display: none;
//   }

//   label {
//     cursor: pointer;
//     display: inline-flex;
//     align-items: center;
//     gap: 0.5rem;
//     color: #667eea;
//     font-weight: 500;
//   }
// `;

// const LoadingSpinner = styled.div`
//   width: 20px;
//   height: 20px;
//   border: 2px solid rgba(255, 255, 255, 0.3);
//   border-top-color: white;
//   border-radius: 50%;
//   animation: ${spin} 0.8s linear infinite;
//   display: inline-block;
// `;

// const ErrorMessage = styled.div`
//   background: #fee2e2;
//   color: #dc2626;
//   padding: 1rem;
//   border-radius: 12px;
//   margin-bottom: 1.5rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   font-size: 0.875rem;
// `;

// const SuccessMessage = styled.div`
//   background: #d1fae5;
//   color: #059669;
//   padding: 1rem;
//   border-radius: 12px;
//   margin-bottom: 1.5rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   font-size: 0.875rem;
// `;

// const Row = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 1rem;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// function AddProperty() {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     type: 'sale',
//     propertyType: 'house',
//     price: '',
//     location: {
//       address: '',
//       city: '',
//       state: '',
//       pincode: '',
//       coordinates: { lat: '', lng: '' }
//     },
//     bedrooms: '',
//     bathrooms: '',
//     area: { value: '', unit: 'sqft' },
//     amenities: [],
//     images: []
//   });
//   const [amenity, setAmenity] = useState('');
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingLocation, setFetchingLocation] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const OPENCAGE_API_KEY = '66e1967e92a54de8b712cd7ebd84db50';

//   // Geocode using OpenCage API (address -> coordinates)
//   const geocodeAddress = useCallback(async (address, city, state, pincode) => {
//     const fullAddress = `${address}, ${city}, ${state} ${pincode}`.trim();
//     if (!fullAddress || fullAddress === ', , ') return null;

//     try {
//       const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
//         params: {
//           q: fullAddress,
//           key: OPENCAGE_API_KEY,
//           language: 'en',
//           pretty: 1,
//           countrycode: 'in',
//           limit: 1
//         }
//       });

//       if (response.data.results && response.data.results.length > 0) {
//         const result = response.data.results[0];
//         const components = result.components;
//         return {
//           lat: result.geometry.lat,
//           lng: result.geometry.lng,
//           formatted: result.formatted,
//           city: components.city || components.town || components.village || '',
//           state: components.state || '',
//           pincode: components.postcode || ''
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error('Geocoding error:', error);
//       return null;
//     }
//   }, []);

//   // Auto-fetch coordinates when address fields change (debounced)
//   useEffect(() => {
//     const timer = setTimeout(async () => {
//       const { address, city, state, pincode } = formData.location;
//       if (address && city && state && pincode) {
//         setFetchingLocation(true);
//         const coords = await geocodeAddress(address, city, state, pincode);
//         if (coords) {
//           setFormData(prev => ({
//             ...prev,
//             location: {
//               ...prev.location,
//               coordinates: { lat: coords.lat, lng: coords.lng },
//               city: coords.city || prev.location.city,
//               state: coords.state || prev.location.state,
//               pincode: coords.pincode || prev.location.pincode
//             }
//           }));
//           setSuccess('Coordinates fetched automatically!');
//           setTimeout(() => setSuccess(''), 2000);
//         } else {
//           setError('Could not find coordinates for this address. Please check the address.');
//           setTimeout(() => setError(''), 3000);
//         }
//         setFetchingLocation(false);
//       }
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, [formData.location.address, formData.location.city, formData.location.state, formData.location.pincode, geocodeAddress]);

//   // Get current location via browser geolocation
//   const getCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       setError('Geolocation is not supported by your browser.');
//       return;
//     }

//     setFetchingLocation(true);
//     setError('');

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         // Update coordinates immediately
//         setFormData(prev => ({
//           ...prev,
//           location: {
//             ...prev.location,
//             coordinates: { lat: latitude, lng: longitude }
//           }
//         }));

//         // Reverse geocode to get address
//         try {
//           const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
//             params: {
//               q: `${latitude},${longitude}`,
//               key: OPENCAGE_API_KEY,
//               language: 'en',
//               pretty: 1,
//               countrycode: 'in'
//             }
//           });

//           if (response.data.results && response.data.results.length > 0) {
//             const result = response.data.results[0];
//             const components = result.components;
//             let address = '';
//             if (components.house_number) address += components.house_number;
//             if (components.road) address += address ? `, ${components.road}` : components.road;
//             const city = components.city || components.town || components.village || '';
//             const state = components.state || '';
//             const pincode = components.postcode || '';

//             setFormData(prev => ({
//               ...prev,
//               location: {
//                 ...prev.location,
//                 address: address || result.formatted,
//                 city: city,
//                 state: state,
//                 pincode: pincode,
//                 coordinates: { lat: latitude, lng: longitude }
//               }
//             }));
//             setSuccess('Location detected! Address filled.');
//           } else {
//             setSuccess('Coordinates captured. Please fill address manually.');
//           }
//         } catch (err) {
//           console.error('Reverse geocode error:', err);
//           setSuccess('Coordinates captured. Please fill address manually.');
//         }
//         setFetchingLocation(false);
//       },
//       (error) => {
//         console.error('Geolocation error:', error);
//         let msg = 'Unable to get your location. ';
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             msg += 'Please allow location access in your browser.';
//             break;
//           case error.POSITION_UNAVAILABLE:
//             msg += 'Location information unavailable. Please enter address manually.';
//             break;
//           case error.TIMEOUT:
//             msg += 'Location request timed out. Please try again.';
//             break;
//           default:
//             msg += 'Please enter address manually.';
//         }
//         setError(msg);
//         setFetchingLocation(false);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
//     );
//   };

//   // Handle file selection
//   const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter(f => f.size <= 5 * 1024 * 1024);
//     if (validFiles.length !== files.length) {
//       setError('Some files exceed 5MB limit.');
//       setTimeout(() => setError(''), 3000);
//     }
//     setSelectedFiles(prev => [...prev, ...validFiles]);
//     const previews = validFiles.map(f => URL.createObjectURL(f));
//     setImagePreviews(prev => [...prev, ...previews]);
//   };

//   const addImageUrl = () => {
//     if (imageUrl && !formData.images.includes(imageUrl)) {
//       setFormData(prev => ({ ...prev, images: [...prev.images, imageUrl] }));
//       setImageUrl('');
//       setSuccess('Image URL added!');
//       setTimeout(() => setSuccess(''), 2000);
//     }
//   };

//   const removeImage = (index, isUrl = true) => {
//     if (isUrl) {
//       setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
//     } else {
//       setImagePreviews(prev => prev.filter((_, i) => i !== index));
//       setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('Please login first');

//       if (!formData.location.coordinates.lat || !formData.location.coordinates.lng) {
//         throw new Error('Please provide address or use location to get coordinates.');
//       }

//       const submitData = new FormData();
//       submitData.append('title', formData.title);
//       submitData.append('description', formData.description);
//       submitData.append('type', formData.type);
//       submitData.append('propertyType', formData.propertyType);
//       submitData.append('price', formData.price);
//       submitData.append('bedrooms', formData.bedrooms || '0');
//       submitData.append('bathrooms', formData.bathrooms || '0');
//       submitData.append('location', JSON.stringify(formData.location));
//       submitData.append('area', JSON.stringify(formData.area));
//       submitData.append('amenities', JSON.stringify(formData.amenities));
//       submitData.append('images', JSON.stringify(formData.images));

//       selectedFiles.forEach(file => {
//         submitData.append('images', file);
//       });

//       await axios.post('http://localhost:3000/api/properties', submitData, {
//         headers: {
//           'x-auth-token': token,
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setSuccess('Property added successfully! Redirecting...');
//       setTimeout(() => navigate('/my-properties'), 1500);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || err.message || 'Failed to add property');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: { ...prev[parent], [child]: value }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleLocationChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       location: { ...prev.location, [name]: value }
//     }));
//   };

//   const handleCoordinatesChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       location: {
//         ...prev.location,
//         coordinates: { ...prev.location.coordinates, [name]: parseFloat(value) }
//       }
//     }));
//   };

//   const addAmenity = () => {
//     if (amenity && !formData.amenities.includes(amenity)) {
//       setFormData(prev => ({ ...prev, amenities: [...prev.amenities, amenity] }));
//       setAmenity('');
//     }
//   };

//   const removeAmenity = (idx) => {
//     setFormData(prev => ({ ...prev, amenities: prev.amenities.filter((_, i) => i !== idx) }));
//   };

//   if (!user) {
//     return (
//       <Container>
//         <FormCard>
//           <FormBody style={{ textAlign: 'center', padding: '3rem' }}>
//             <h2>Please Login</h2>
//             <Button onClick={() => navigate('/login')}>Go to Login</Button>
//           </FormBody>
//         </FormCard>
//       </Container>
//     );
//   }

//   if (user.role !== 'owner') {
//     return (
//       <Container>
//         <FormCard>
//           <FormBody style={{ textAlign: 'center', padding: '3rem' }}>
//             <h2>Access Denied</h2>
//             <p>Only property owners can add properties.</p>
//             <p>Your role: <strong>{user.role}</strong></p>
//             <Button onClick={() => navigate('/login')}>Login as Owner</Button>
//           </FormBody>
//         </FormCard>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <FormCard>
//         <FormHeader>
//           <h1>🏠 Add New Property</h1>
//           <p>List your property for sale or rent</p>
//         </FormHeader>
//         <FormBody>
//           {error && <ErrorMessage>⚠️ {error}</ErrorMessage>}
//           {success && <SuccessMessage>✅ {success}</SuccessMessage>}

//           <form onSubmit={handleSubmit}>
//             <Section>
//               <SectionTitle>Basic Information</SectionTitle>
//               <FormGrid>
//                 <FormGroup>
//                   <label>Title *</label>
//                   <input type="text" name="title" value={formData.title} onChange={handleChange} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Price (₹) *</label>
//                   <input type="number" name="price" value={formData.price} onChange={handleChange} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Type</label>
//                   <select name="type" value={formData.type} onChange={handleChange}>
//                     <option value="sale">For Sale</option>
//                     <option value="rent">For Rent</option>
//                   </select>
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Property Type</label>
//                   <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
//                     <option value="house">House</option>
//                     <option value="apartment">Apartment</option>
//                     <option value="condo">Condo</option>
//                     <option value="land">Land</option>
//                     <option value="commercial">Commercial</option>
//                   </select>
//                 </FormGroup>
//               </FormGrid>
//             </Section>

//             <Section>
//               <SectionTitle>Description</SectionTitle>
//               <FormGroup>
//                 <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
//               </FormGroup>
//             </Section>

//             <Section>
//               <SectionTitle>Location Details</SectionTitle>
//               <LocationButton type="button" onClick={getCurrentLocation} disabled={fetchingLocation}>
//                 {fetchingLocation ? <LoadingSpinner /> : '📍'} {fetchingLocation ? 'Fetching...' : 'Use My Current Location'}
//               </LocationButton>
//               <p style={{ fontSize: '12px', color: '#666', marginBottom: '1rem' }}>
//                 ℹ️ Click button above to get your real location, or fill address manually (coordinates will auto-fetch).
//               </p>
//               <FormGrid>
//                 <FormGroup>
//                   <label>Address *</label>
//                   <input type="text" name="address" value={formData.location.address} onChange={handleLocationChange} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>City *</label>
//                   <input type="text" name="city" value={formData.location.city} onChange={handleLocationChange} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>State</label>
//                   <input type="text" name="state" value={formData.location.state} onChange={handleLocationChange} />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Pincode</label>
//                   <input type="text" name="pincode" value={formData.location.pincode} onChange={handleLocationChange} />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Latitude {fetchingLocation && <small>(Fetching...)</small>}</label>
//                   <input type="number" step="any" name="lat" value={formData.location.coordinates.lat} onChange={handleCoordinatesChange} placeholder="Auto-filled" />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Longitude {fetchingLocation && <small>(Fetching...)</small>}</label>
//                   <input type="number" step="any" name="lng" value={formData.location.coordinates.lng} onChange={handleCoordinatesChange} placeholder="Auto-filled" />
//                 </FormGroup>
//               </FormGrid>
//             </Section>

//             <Section>
//               <SectionTitle>Property Details</SectionTitle>
//               <Row>
//                 <FormGroup>
//                   <label>Bedrooms</label>
//                   <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Bathrooms</label>
//                   <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Area Value</label>
//                   <input type="number" name="area.value" value={formData.area.value} onChange={handleChange} />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Area Unit</label>
//                   <select name="area.unit" value={formData.area.unit} onChange={handleChange}>
//                     <option value="sqft">Square Feet</option>
//                     <option value="sqm">Square Meters</option>
//                     <option value="acre">Acre</option>
//                   </select>
//                 </FormGroup>
//               </Row>
//             </Section>

//             <Section>
//               <SectionTitle>Amenities</SectionTitle>
//               <Row>
//                 <input type="text" value={amenity} onChange={(e) => setAmenity(e.target.value)} placeholder="Add amenity (e.g., Parking, Garden)" />
//                 <Button type="button" onClick={addAmenity}>+ Add</Button>
//               </Row>
//               <AmenitiesContainer>
//                 {formData.amenities.map((item, idx) => (
//                   <AmenityTag key={idx}>
//                     {item}
//                     <button type="button" onClick={() => removeAmenity(idx)}>×</button>
//                   </AmenityTag>
//                 ))}
//               </AmenitiesContainer>
//             </Section>

//             <Section>
//               <SectionTitle>Property Images</SectionTitle>
//               <FileInput>
//                 <input type="file" id="file-upload" multiple accept="image/*" onChange={handleFileSelect} />
//                 <label htmlFor="file-upload">📸 Click to select images (Max 5MB each)</label>
//               </FileInput>
//               {imagePreviews.length > 0 && (
//                 <ImagesGrid>
//                   {imagePreviews.map((preview, idx) => (
//                     <ImageCard key={idx}>
//                       <img src={preview} alt={`Preview ${idx + 1}`} />
//                       <button type="button" onClick={() => removeImage(idx, false)}>✕</button>
//                     </ImageCard>
//                   ))}
//                 </ImagesGrid>
//               )}
//               <div style={{ marginTop: '1rem' }}>
//                 <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Or Add Image URLs</label>
//                 <Row>
//                   <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />
//                   <Button type="button" onClick={addImageUrl}>Add URL</Button>
//                 </Row>
//               </div>
//               {formData.images.length > 0 && (
//                 <ImagesGrid>
//                   {formData.images.map((url, idx) => (
//                     <ImageCard key={idx}>
//                       <img src={url} alt={`Property ${idx + 1}`} onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL'; }} />
//                       <button type="button" onClick={() => removeImage(idx, true)}>✕</button>
//                     </ImageCard>
//                   ))}
//                 </ImagesGrid>
//               )}
//             </Section>

//             <Button type="submit" disabled={loading || fetchingLocation} style={{ width: '100%', justifyContent: 'center' }}>
//               {loading ? <LoadingSpinner /> : '🏠'} {loading ? 'Adding Property...' : 'Add Property'}
//             </Button>
//           </form>
//         </FormBody>
//       </FormCard>
//     </Container>
//   );
// }

// export default AddProperty;

// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import styled, { keyframes } from 'styled-components';
// import {
//   FaHome, FaMapMarkerAlt, FaImage, FaPlus, FaTimes,
//   FaCheck, FaInfoCircle, FaSpinner, FaExclamationTriangle,
//   FaCheckCircle, FaCamera, FaLink, FaBuilding, FaBed,
//   FaBath, FaRuler, FaParking, FaTree, FaWifi, FaSnowflake,
//   FaFire, FaLock, FaDog, FaDumbbell, FaSwimmer, FaTshirt
// } from 'react-icons/fa';
// import { MdLogin, MdLocationOn, MdAddHome, MdError, MdAddLink } from 'react-icons/md';
// import { GiHomeGarage, GiGarden, GiPoolCircle } from 'react-icons/gi';

// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const spin = keyframes`
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// `;

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 1rem;
//   background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//   min-height: 100vh;

//   @media (min-width: 768px) {
//     padding: 2rem;
//   }
// `;

// const FormCard = styled.div`
//   background: white;
//   border-radius: 20px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   overflow: hidden;
//   animation: ${fadeIn} 0.5s ease-out;

//   @media (min-width: 768px) {
//     border-radius: 24px;
//   }
// `;

// const FormHeader = styled.div`
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   padding: 1.5rem;
//   color: white;
//   text-align: center;

//   h1 {
//     font-size: 1.5rem;
//     margin-bottom: 0.5rem;
//     font-weight: 700;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 8px;

//     @media (min-width: 768px) {
//       font-size: 2rem;
//       gap: 10px;
//     }
//   }

//   p {
//     opacity: 0.9;
//     font-size: 0.85rem;

//     @media (min-width: 768px) {
//       font-size: 0.95rem;
//     }
//   }
// `;

// const FormBody = styled.div`
//   padding: 1.25rem;

//   @media (min-width: 768px) {
//     padding: 2rem;
//   }
// `;

// const Section = styled.div`
//   margin-bottom: 1.5rem;
//   padding-bottom: 1.5rem;
//   border-bottom: 1px solid #e2e8f0;

//   @media (min-width: 768px) {
//     margin-bottom: 2rem;
//     padding-bottom: 2rem;
//   }

//   &:last-child {
//     border-bottom: none;
//     margin-bottom: 0;
//     padding-bottom: 0;
//   }
// `;

// const SectionTitle = styled.h3`
//   font-size: 1.1rem;
//   font-weight: 600;
//   color: #1e293b;
//   margin-bottom: 1rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   @media (min-width: 768px) {
//     font-size: 1.25rem;
//     margin-bottom: 1.5rem;
//   }

//   &::before {
//     content: '';
//     width: 3px;
//     height: 16px;
//     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//     border-radius: 2px;

//     @media (min-width: 768px) {
//       width: 4px;
//       height: 20px;
//     }
//   }
// `;

// const FormGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 1rem;

//   @media (min-width: 640px) {
//     grid-template-columns: repeat(2, 1fr);
//     gap: 1.25rem;
//   }

//   @media (min-width: 1024px) {
//     gap: 1.5rem;
//   }
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.4rem;

//   @media (min-width: 768px) {
//     gap: 0.5rem;
//   }

//   label {
//     font-weight: 600;
//     color: #475569;
//     font-size: 0.75rem;
//     text-transform: uppercase;
//     letter-spacing: 0.5px;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;

//     @media (min-width: 768px) {
//       font-size: 0.875rem;
//     }
//   }

//   input, select, textarea {
//     padding: 0.6rem 0.75rem;
//     border: 2px solid #e2e8f0;
//     border-radius: 10px;
//     font-size: 0.875rem;
//     transition: all 0.3s;
//     font-family: inherit;
//     -webkit-appearance: none;

//     @media (min-width: 768px) {
//       padding: 0.75rem 1rem;
//       font-size: 0.95rem;
//       border-radius: 12px;
//     }

//     &:focus {
//       outline: none;
//       border-color: #667eea;
//       box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//     }

//     &:hover {
//       border-color: #cbd5e1;
//     }
//   }

//   textarea {
//     resize: vertical;
//     min-height: 80px;

//     @media (min-width: 768px) {
//       min-height: 100px;
//     }
//   }
// `;

// const Button = styled.button`
//   padding: 0.6rem 1rem;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   color: white;
//   border: none;
//   border-radius: 10px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
//   font-size: 0.875rem;
//   width: 100%;

//   @media (min-width: 640px) {
//     width: auto;
//     padding: 0.75rem 1.5rem;
//     font-size: 0.95rem;
//     border-radius: 12px;
//   }

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
//   }

//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//     transform: none;
//   }
// `;

// const LocationButton = styled.button`
//   padding: 0.6rem 1rem;
//   background: linear-gradient(135deg, #10b981 0%, #059669 100%);
//   color: white;
//   border: none;
//   border-radius: 10px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
//   margin-bottom: 1rem;
//   width: 100%;
//   font-size: 0.875rem;

//   @media (min-width: 640px) {
//     padding: 0.75rem 1.5rem;
//     font-size: 0.95rem;
//     border-radius: 12px;
//   }

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
//   }

//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }
// `;

// const AmenitiesContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
//   margin-top: 0.5rem;
// `;

// const AmenityTag = styled.div`
//   background: #eef2ff;
//   color: #667eea;
//   padding: 0.4rem 0.75rem;
//   border-radius: 20px;
//   font-size: 0.75rem;
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;

//   @media (min-width: 768px) {
//     padding: 0.5rem 1rem;
//     font-size: 0.875rem;
//   }

//   button {
//     background: none;
//     border: none;
//     cursor: pointer;
//     color: #667eea;
//     font-size: 0.875rem;
//     padding: 0;
//     display: flex;
//     align-items: center;

//     &:hover {
//       color: #dc2626;
//     }
//   }
// `;

// const ImagesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
//   gap: 0.75rem;
//   margin-top: 1rem;

//   @media (min-width: 768px) {
//     grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
//     gap: 1rem;
//   }
// `;

// const ImageCard = styled.div`
//   position: relative;
//   border-radius: 10px;
//   overflow: hidden;
//   border: 2px solid #e2e8f0;
//   transition: all 0.3s;
//   aspect-ratio: 1;

//   @media (min-width: 768px) {
//     border-radius: 12px;
//   }

//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
//   }

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }

//   button {
//     position: absolute;
//     top: 0.25rem;
//     right: 0.25rem;
//     background: rgba(220, 38, 38, 0.9);
//     color: white;
//     border: none;
//     border-radius: 50%;
//     width: 24px;
//     height: 24px;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 0.75rem;

//     @media (min-width: 768px) {
//       top: 0.5rem;
//       right: 0.5rem;
//       width: 28px;
//       height: 28px;
//       font-size: 0.875rem;
//     }

//     &:hover {
//       background: #dc2626;
//       transform: scale(1.1);
//     }
//   }
// `;

// const FileInput = styled.div`
//   border: 2px dashed #e2e8f0;
//   border-radius: 10px;
//   padding: 1rem;
//   text-align: center;
//   cursor: pointer;
//   transition: all 0.3s;
//   margin-top: 0.5rem;

//   @media (min-width: 768px) {
//     border-radius: 12px;
//     padding: 1.5rem;
//   }

//   &:hover {
//     border-color: #667eea;
//     background: #f8fafc;
//   }

//   input {
//     display: none;
//   }

//   label {
//     cursor: pointer;
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     gap: 0.5rem;
//     color: #667eea;
//     font-weight: 500;
//     font-size: 0.875rem;
//     width: 100%;

//     @media (min-width: 768px) {
//       font-size: 1rem;
//     }
//   }
// `;

// const LoadingSpinner = styled.div`
//   width: 16px;
//   height: 16px;
//   border: 2px solid rgba(255, 255, 255, 0.3);
//   border-top-color: white;
//   border-radius: 50%;
//   animation: ${spin} 0.8s linear infinite;
//   display: inline-block;

//   @media (min-width: 768px) {
//     width: 20px;
//     height: 20px;
//   }
// `;

// const ErrorMessage = styled.div`
//   background: #fee2e2;
//   color: #dc2626;
//   padding: 0.75rem;
//   border-radius: 10px;
//   margin-bottom: 1rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   font-size: 0.8rem;

//   @media (min-width: 768px) {
//     padding: 1rem;
//     border-radius: 12px;
//     font-size: 0.875rem;
//   }
// `;

// const SuccessMessage = styled.div`
//   background: #d1fae5;
//   color: #059669;
//   padding: 0.75rem;
//   border-radius: 10px;
//   margin-bottom: 1rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   font-size: 0.8rem;

//   @media (min-width: 768px) {
//     padding: 1rem;
//     border-radius: 12px;
//     font-size: 0.875rem;
//   }
// `;

// const Row = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 0.75rem;

//   @media (min-width: 640px) {
//     grid-template-columns: 1fr auto;
//     gap: 1rem;
//   }
// `;

// const InfoText = styled.p`
//   font-size: 0.7rem;
//   color: #666;
//   margin-bottom: 1rem;
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;

//   @media (min-width: 768px) {
//     font-size: 0.75rem;
//   }
// `;

// function AddProperty() {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     type: 'sale',
//     propertyType: 'house',
//     price: '',
//     location: {
//       address: '',
//       city: '',
//       state: '',
//       pincode: '',
//       coordinates: { lat: '', lng: '' }
//     },
//     bedrooms: '',
//     bathrooms: '',
//     area: { value: '', unit: 'sqft' },
//     amenities: [],
//     images: []
//   });
//   const [amenity, setAmenity] = useState('');
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingLocation, setFetchingLocation] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const OPENCAGE_API_KEY = '66e1967e92a54de8b712cd7ebd84db50';

//   const geocodeAddress = useCallback(async (address, city, state, pincode) => {
//     const fullAddress = `${address}, ${city}, ${state} ${pincode}`.trim();
//     if (!fullAddress || fullAddress === ', , ') return null;

//     try {
//       const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
//         params: {
//           q: fullAddress,
//           key: OPENCAGE_API_KEY,
//           language: 'en',
//           pretty: 1,
//           countrycode: 'in',
//           limit: 1
//         }
//       });

//       if (response.data.results && response.data.results.length > 0) {
//         const result = response.data.results[0];
//         const components = result.components;
//         return {
//           lat: result.geometry.lat,
//           lng: result.geometry.lng,
//           formatted: result.formatted,
//           city: components.city || components.town || components.village || '',
//           state: components.state || '',
//           pincode: components.postcode || ''
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error('Geocoding error:', error);
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(async () => {
//       const { address, city, state, pincode } = formData.location;
//       if (address && city && state && pincode) {
//         setFetchingLocation(true);
//         const coords = await geocodeAddress(address, city, state, pincode);
//         if (coords) {
//           setFormData(prev => ({
//             ...prev,
//             location: {
//               ...prev.location,
//               coordinates: { lat: coords.lat, lng: coords.lng },
//               city: coords.city || prev.location.city,
//               state: coords.state || prev.location.state,
//               pincode: coords.pincode || prev.location.pincode
//             }
//           }));
//           setSuccess('Coordinates fetched automatically!');
//           setTimeout(() => setSuccess(''), 2000);
//         } else {
//           setError('Could not find coordinates for this address. Please check the address.');
//           setTimeout(() => setError(''), 3000);
//         }
//         setFetchingLocation(false);
//       }
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, [formData.location.address, formData.location.city, formData.location.state, formData.location.pincode, geocodeAddress]);

//   const getCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       setError('Geolocation is not supported by your browser.');
//       return;
//     }

//     setFetchingLocation(true);
//     setError('');

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         setFormData(prev => ({
//           ...prev,
//           location: {
//             ...prev.location,
//             coordinates: { lat: latitude, lng: longitude }
//           }
//         }));

//         try {
//           const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
//             params: {
//               q: `${latitude},${longitude}`,
//               key: OPENCAGE_API_KEY,
//               language: 'en',
//               pretty: 1,
//               countrycode: 'in'
//             }
//           });

//           if (response.data.results && response.data.results.length > 0) {
//             const result = response.data.results[0];
//             const components = result.components;
//             let address = '';
//             if (components.house_number) address += components.house_number;
//             if (components.road) address += address ? `, ${components.road}` : components.road;
//             const city = components.city || components.town || components.village || '';
//             const state = components.state || '';
//             const pincode = components.postcode || '';

//             setFormData(prev => ({
//               ...prev,
//               location: {
//                 ...prev.location,
//                 address: address || result.formatted,
//                 city: city,
//                 state: state,
//                 pincode: pincode,
//                 coordinates: { lat: latitude, lng: longitude }
//               }
//             }));
//             setSuccess('Location detected! Address filled.');
//           } else {
//             setSuccess('Coordinates captured. Please fill address manually.');
//           }
//         } catch (err) {
//           console.error('Reverse geocode error:', err);
//           setSuccess('Coordinates captured. Please fill address manually.');
//         }
//         setFetchingLocation(false);
//       },
//       (error) => {
//         console.error('Geolocation error:', error);
//         let msg = 'Unable to get your location. ';
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             msg += 'Please allow location access in your browser.';
//             break;
//           case error.POSITION_UNAVAILABLE:
//             msg += 'Location information unavailable. Please enter address manually.';
//             break;
//           case error.TIMEOUT:
//             msg += 'Location request timed out. Please try again.';
//             break;
//           default:
//             msg += 'Please enter address manually.';
//         }
//         setError(msg);
//         setFetchingLocation(false);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
//     );
//   };

//   const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter(f => f.size <= 5 * 1024 * 1024);
//     if (validFiles.length !== files.length) {
//       setError('Some files exceed 5MB limit.');
//       setTimeout(() => setError(''), 3000);
//     }
//     setSelectedFiles(prev => [...prev, ...validFiles]);
//     const previews = validFiles.map(f => URL.createObjectURL(f));
//     setImagePreviews(prev => [...prev, ...previews]);
//   };

//   const addImageUrl = () => {
//     if (imageUrl && !formData.images.includes(imageUrl)) {
//       setFormData(prev => ({ ...prev, images: [...prev.images, imageUrl] }));
//       setImageUrl('');
//       setSuccess('Image URL added!');
//       setTimeout(() => setSuccess(''), 2000);
//     }
//   };

//   const removeImage = (index, isUrl = true) => {
//     if (isUrl) {
//       setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
//     } else {
//       setImagePreviews(prev => prev.filter((_, i) => i !== index));
//       setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('Please login first');

//       if (!formData.location.coordinates.lat || !formData.location.coordinates.lng) {
//         throw new Error('Please provide address or use location to get coordinates.');
//       }

//       const submitData = new FormData();
//       submitData.append('title', formData.title);
//       submitData.append('description', formData.description);
//       submitData.append('type', formData.type);
//       submitData.append('propertyType', formData.propertyType);
//       submitData.append('price', formData.price);
//       submitData.append('bedrooms', formData.bedrooms || '0');
//       submitData.append('bathrooms', formData.bathrooms || '0');
//       submitData.append('location', JSON.stringify(formData.location));
//       submitData.append('area', JSON.stringify(formData.area));
//       submitData.append('amenities', JSON.stringify(formData.amenities));
//       submitData.append('images', JSON.stringify(formData.images));

//       selectedFiles.forEach(file => {
//         submitData.append('images', file);
//       });

//       await axios.post('http://localhost:3000/api/properties', submitData, {
//         headers: {
//           'x-auth-token': token,
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setSuccess('Property added successfully! Redirecting...');
//       setTimeout(() => navigate('/my-properties'), 1500);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || err.message || 'Failed to add property');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: { ...prev[parent], [child]: value }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleLocationChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       location: { ...prev.location, [name]: value }
//     }));
//   };

//   const handleCoordinatesChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       location: {
//         ...prev.location,
//         coordinates: { ...prev.location.coordinates, [name]: parseFloat(value) }
//       }
//     }));
//   };

//   const addAmenity = () => {
//     if (amenity && !formData.amenities.includes(amenity)) {
//       setFormData(prev => ({ ...prev, amenities: [...prev.amenities, amenity] }));
//       setAmenity('');
//     }
//   };

//   const removeAmenity = (idx) => {
//     setFormData(prev => ({ ...prev, amenities: prev.amenities.filter((_, i) => i !== idx) }));
//   };

//   if (!user) {
//     return (
//       <Container>
//         <FormCard>
//           <FormBody style={{ textAlign: 'center', padding: '2rem' }}>
//             <h2>Please Login</h2>
//             <Button onClick={() => navigate('/login')}>
//               <MdLogin size={20} /> Go to Login
//             </Button>
//           </FormBody>
//         </FormCard>
//       </Container>
//     );
//   }

//   if (user.role !== 'owner') {
//     return (
//       <Container>
//         <FormCard>
//           <FormBody style={{ textAlign: 'center', padding: '2rem' }}>
//             <h2>Access Denied</h2>
//             <p>Only property owners can add properties.</p>
//             <p>Your role: <strong>{user.role}</strong></p>
//             <Button onClick={() => navigate('/login')}>
//               <MdLogin size={20} /> Login as Owner
//             </Button>
//           </FormBody>
//         </FormCard>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <FormCard>
//         <FormHeader>
//           <h1>
//             <FaHome />
//             Add New Property
//           </h1>
//           <p>List your property for sale or rent</p>
//         </FormHeader>
//         <FormBody>
//           {error && (
//             <ErrorMessage>
//               <MdError size={18} /> {error}
//             </ErrorMessage>
//           )}
//           {success && (
//             <SuccessMessage>
//               <FaCheckCircle size={18} /> {success}
//             </SuccessMessage>
//           )}

//           <form onSubmit={handleSubmit}>
//             <Section>
//               <SectionTitle>Basic Information</SectionTitle>
//               <FormGrid>
//                 <FormGroup>
//                   <label><FaBuilding /> Title *</label>
//                   <input type="text" name="title" value={formData.title} onChange={handleChange} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Price (₹) *</label>
//                   <input type="number" name="price" value={formData.price} onChange={handleChange} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Type</label>
//                   <select name="type" value={formData.type} onChange={handleChange}>
//                     <option value="sale">For Sale</option>
//                     <option value="rent">For Rent</option>
//                   </select>
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Property Type</label>
//                   <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
//                     <option value="house">House</option>
//                     <option value="apartment">Apartment</option>
//                     <option value="condo">Condo</option>
//                     <option value="land">Land</option>
//                     <option value="commercial">Commercial</option>
//                   </select>
//                 </FormGroup>
//               </FormGrid>
//             </Section>

//             <Section>
//               <SectionTitle>Description</SectionTitle>
//               <FormGroup>
//                 <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
//               </FormGroup>
//             </Section>

//             <Section>
//               <SectionTitle>Location Details</SectionTitle>
//               <LocationButton type="button" onClick={getCurrentLocation} disabled={fetchingLocation}>
//                 {fetchingLocation ? <LoadingSpinner /> : <MdLocationOn size={18} />}
//                 {fetchingLocation ? 'Fetching...' : 'Use My Current Location'}
//               </LocationButton>
//               <InfoText>
//                 <FaInfoCircle size={12} /> Click button above to get your real location, or fill address manually (coordinates will auto-fetch).
//               </InfoText>
//               <FormGrid>
//                 <FormGroup>
//                   <label><FaMapMarkerAlt /> Address *</label>
//                   <input type="text" name="address" value={formData.location.address} onChange={handleLocationChange} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>City *</label>
//                   <input type="text" name="city" value={formData.location.city} onChange={handleLocationChange} required />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>State</label>
//                   <input type="text" name="state" value={formData.location.state} onChange={handleLocationChange} />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Pincode</label>
//                   <input type="text" name="pincode" value={formData.location.pincode} onChange={handleLocationChange} />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Latitude {fetchingLocation && <small>(Fetching...)</small>}</label>
//                   <input type="number" step="any" name="lat" value={formData.location.coordinates.lat} onChange={handleCoordinatesChange} placeholder="Auto-filled" />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Longitude {fetchingLocation && <small>(Fetching...)</small>}</label>
//                   <input type="number" step="any" name="lng" value={formData.location.coordinates.lng} onChange={handleCoordinatesChange} placeholder="Auto-filled" />
//                 </FormGroup>
//               </FormGrid>
//             </Section>

//             <Section>
//               <SectionTitle>Property Details</SectionTitle>
//               <FormGrid>
//                 <FormGroup>
//                   <label><FaBed /> Bedrooms</label>
//                   <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
//                 </FormGroup>
//                 <FormGroup>
//                   <label><FaBath /> Bathrooms</label>
//                   <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
//                 </FormGroup>
//                 <FormGroup>
//                   <label><FaRuler /> Area Value</label>
//                   <input type="number" name="area.value" value={formData.area.value} onChange={handleChange} />
//                 </FormGroup>
//                 <FormGroup>
//                   <label>Area Unit</label>
//                   <select name="area.unit" value={formData.area.unit} onChange={handleChange}>
//                     <option value="sqft">Square Feet</option>
//                     <option value="sqm">Square Meters</option>
//                     <option value="acre">Acre</option>
//                   </select>
//                 </FormGroup>
//               </FormGrid>
//             </Section>

//             <Section>
//               <SectionTitle>Amenities</SectionTitle>
//               <Row>
//                 <input type="text" value={amenity} onChange={(e) => setAmenity(e.target.value)} placeholder="Add amenity (e.g., Parking, Garden)" />
//                 <Button type="button" onClick={addAmenity}>
//                   <FaPlus /> Add
//                 </Button>
//               </Row>
//               <AmenitiesContainer>
//                 {formData.amenities.map((item, idx) => (
//                   <AmenityTag key={idx}>
//                     <FaCheck /> {item}
//                     <button type="button" onClick={() => removeAmenity(idx)}>
//                       <FaTimes />
//                     </button>
//                   </AmenityTag>
//                 ))}
//               </AmenitiesContainer>
//             </Section>

//             <Section>
//               <SectionTitle>Property Images</SectionTitle>
//               <FileInput>
//                 <input type="file" id="file-upload" multiple accept="image/*" onChange={handleFileSelect} />
//                 <label htmlFor="file-upload">
//                   <FaCamera size={16} /> Click to select images (Max 5MB each)
//                 </label>
//               </FileInput>
//               {imagePreviews.length > 0 && (
//                 <ImagesGrid>
//                   {imagePreviews.map((preview, idx) => (
//                     <ImageCard key={idx}>
//                       <img src={preview} alt={`Preview ${idx + 1}`} />
//                       <button type="button" onClick={() => removeImage(idx, false)}>
//                         <FaTimes />
//                       </button>
//                     </ImageCard>
//                   ))}
//                 </ImagesGrid>
//               )}
//               <div style={{ marginTop: '1rem' }}>
//                 <label style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
//                   <FaLink /> Or Add Image URLs
//                 </label>
//                 <Row>
//                   <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />
//                   <Button type="button" onClick={addImageUrl}>
//                     <MdAddLink size={16} /> Add URL
//                   </Button>
//                 </Row>
//               </div>
//               {formData.images.length > 0 && (
//                 <ImagesGrid>
//                   {formData.images.map((url, idx) => (
//                     <ImageCard key={idx}>
//                       <img src={url} alt={`Property ${idx + 1}`} onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL'; }} />
//                       <button type="button" onClick={() => removeImage(idx, true)}>
//                         <FaTimes />
//                       </button>
//                     </ImageCard>
//                   ))}
//                 </ImagesGrid>
//               )}
//             </Section>

//             <Button type="submit" disabled={loading || fetchingLocation} style={{ width: '100%', justifyContent: 'center' }}>
//               {loading ? <LoadingSpinner /> : <MdAddHome size={18} />}
//               {loading ? 'Adding Property...' : 'Add Property'}
//             </Button>
//           </form>
//         </FormBody>
//       </FormCard>
//     </Container>
//   );
// }

// export default AddProperty;

import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import styled, { keyframes } from 'styled-components'
import {
  FaHome,
  FaMapMarkerAlt,
  FaPlus,
  FaTimes,
  FaCheck,
  FaInfoCircle,
  FaCheckCircle,
  FaCamera,
  FaLink,
  FaBuilding,
  FaBed,
  FaBath,
  FaRuler,
} from 'react-icons/fa'
import {
  MdLogin,
  MdLocationOn,
  MdAddHome,
  MdError,
  MdAddLink,
} from 'react-icons/md'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`

const FormCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;

  @media (min-width: 768px) {
    border-radius: 24px;
  }
`

const FormHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1.5rem;
  color: white;
  text-align: center;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    @media (min-width: 768px) {
      font-size: 2rem;
      gap: 10px;
    }
  }

  p {
    opacity: 0.9;
    font-size: 0.85rem;

    @media (min-width: 768px) {
      font-size: 0.95rem;
    }
  }
`

const FormBody = styled.div`
  padding: 1.25rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`

const Section = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }

  &::before {
    content: '';
    width: 3px;
    height: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;

    @media (min-width: 768px) {
      width: 4px;
      height: 20px;
    }
  }
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  @media (min-width: 1024px) {
    gap: 1.5rem;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  @media (min-width: 768px) {
    gap: 0.5rem;
  }

  label {
    font-weight: 600;
    color: #475569;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  }

  input,
  select,
  textarea {
    padding: 0.6rem 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-size: 0.875rem;
    transition: all 0.3s;
    font-family: inherit;

    @media (min-width: 768px) {
      padding: 0.75rem 1rem;
      font-size: 0.95rem;
      border-radius: 12px;
    }

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;

    @media (min-width: 768px) {
      min-height: 100px;
    }
  }
`

const Button = styled.button`
  padding: 0.6rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;

  @media (min-width: 640px) {
    width: auto;
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    border-radius: 12px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const LocationButton = styled.button`
  padding: 0.6rem 1rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 0.875rem;

  @media (min-width: 640px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    border-radius: 12px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const AmenitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const AmenityTag = styled.div`
  background: #eef2ff;
  color: #667eea;
  padding: 0.4rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #667eea;
    font-size: 0.875rem;
    padding: 0;
    display: flex;
    align-items: center;

    &:hover {
      color: #dc2626;
    }
  }
`

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
  }
`

const ImageCard = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #e2e8f0;
  transition: all 0.3s;
  aspect-ratio: 1;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    background: rgba(220, 38, 38, 0.9);
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #dc2626;
      transform: scale(1.1);
    }
  }
`

const FileInput = styled.div`
  border: 2px dashed #e2e8f0;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;

  &:hover {
    border-color: #667eea;
    background: #f8fafc;
  }

  input {
    display: none;
  }

  label {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: #667eea;
    font-weight: 500;
    font-size: 0.875rem;
    width: 100%;

    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }
`

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  display: inline-block;
`

const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    padding: 1rem;
    border-radius: 12px;
    font-size: 0.875rem;
  }
`

const SuccessMessage = styled.div`
  background: #d1fae5;
  color: #059669;
  padding: 0.75rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    padding: 1rem;
    border-radius: 12px;
    font-size: 0.875rem;
  }
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr auto;
    gap: 1rem;
  }
`

const InfoText = styled.p`
  font-size: 0.7rem;
  color: #666;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media (min-width: 768px) {
    font-size: 0.75rem;
  }
`

function AddProperty() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'sale',
    propertyType: 'house',
    price: '',
    location: {
      address: '',
      city: '',
      state: '',
      pincode: '',
      coordinates: { lat: '', lng: '' },
    },
    bedrooms: '',
    bathrooms: '',
    area: { value: '', unit: 'sqft' },
    amenities: [],
    images: [],
  })
  const [amenity, setAmenity] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchingLocation, setFetchingLocation] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const navigate = useNavigate()
  const { user } = useAuth()

  const OPENCAGE_API_KEY = '66e1967e92a54de8b712cd7ebd84db50'

  const geocodeAddress = useCallback(async (address, city, state, pincode) => {
    const fullAddress = `${address}, ${city}, ${state} ${pincode}`.trim()
    if (!fullAddress || fullAddress === ', , ') return null

    try {
      const response = await axios.get(
        'https://api.opencagedata.com/geocode/v1/json',
        {
          params: {
            q: fullAddress,
            key: OPENCAGE_API_KEY,
            language: 'en',
            pretty: 1,
            countrycode: 'in',
            limit: 1,
          },
        },
      )

      if (response.data.results && response.data.results.length > 0) {
        const result = response.data.results[0]
        return {
          lat: result.geometry.lat,
          lng: result.geometry.lng,
        }
      }
      return null
    } catch (error) {
      console.error('Geocoding error:', error)
      return null
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { address, city, state, pincode } = formData.location
      if (address && city) {
        setFetchingLocation(true)
        const coords = await geocodeAddress(address, city, state, pincode)
        if (coords) {
          setFormData((prev) => ({
            ...prev,
            location: {
              ...prev.location,
              coordinates: { lat: coords.lat, lng: coords.lng },
            },
          }))
          setSuccess('📍 Coordinates fetched!')
          setTimeout(() => setSuccess(''), 2000)
        }
        setFetchingLocation(false)
      }
    }, 1500)
    return () => clearTimeout(timer)
  }, [
    formData.location.address,
    formData.location.city,
    formData.location.state,
    formData.location.pincode,
    geocodeAddress,
  ])

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }

    setFetchingLocation(true)
    setError('')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        setFormData((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            coordinates: { lat: latitude, lng: longitude },
          },
        }))

        try {
          const response = await axios.get(
            'https://api.opencagedata.com/geocode/v1/json',
            {
              params: {
                q: `${latitude},${longitude}`,
                key: OPENCAGE_API_KEY,
                language: 'en',
                pretty: 1,
                countrycode: 'in',
              },
            },
          )

          if (response.data.results && response.data.results.length > 0) {
            const result = response.data.results[0]
            const components = result.components
            let address = ''
            if (components.road) address = components.road
            const city =
              components.city || components.town || components.village || ''
            const state = components.state || ''
            const pincode = components.postcode || ''

            setFormData((prev) => ({
              ...prev,
              location: {
                ...prev.location,
                address: address || result.formatted.split(',')[0] || '',
                city: city,
                state: state,
                pincode: pincode,
              },
            }))
            setSuccess('📍 Location detected!')
          } else {
            setSuccess('📍 Coordinates captured!')
          }
        } catch (err) {
          console.error('Reverse geocode error:', err)
          setSuccess('📍 Coordinates captured!')
        }
        setTimeout(() => setSuccess(''), 2000)
        setFetchingLocation(false)
      },
      (error) => {
        console.error('Geolocation error:', error)
        setError('❌ Could not get location. Please enter manually.')
        setFetchingLocation(false)
        setTimeout(() => setError(''), 3000)
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = files.filter((f) => f.size <= 5 * 1024 * 1024)
    if (validFiles.length !== files.length) {
      setError('Some files exceed 5MB limit.')
      setTimeout(() => setError(''), 3000)
    }
    setSelectedFiles((prev) => [...prev, ...validFiles])
    const previews = validFiles.map((f) => URL.createObjectURL(f))
    setImagePreviews((prev) => [...prev, ...previews])
  }

  const addImageUrl = () => {
    if (imageUrl && imageUrl.trim()) {
      if (!formData.images.includes(imageUrl)) {
        setFormData((prev) => ({ ...prev, images: [...prev.images, imageUrl] }))
        setImageUrl('')
        setSuccess('Image URL added!')
        setTimeout(() => setSuccess(''), 2000)
      } else {
        setError('Image URL already added')
        setTimeout(() => setError(''), 2000)
      }
    }
  }

  const removeImage = (index, isUrl = true) => {
    if (isUrl) {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }))
    } else {
      setImagePreviews((prev) => prev.filter((_, i) => i !== index))
      setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Please login first')

      if (selectedFiles.length === 0 && formData.images.length === 0) {
        throw new Error('Please add at least one image')
      }

      // Prepare location data for backend
      const locationData = {
        address: formData.location.address,
        city: formData.location.city,
        state: formData.location.state,
        pincode: formData.location.pincode,
        coordinates: {
          lat: parseFloat(formData.location.coordinates.lat) || 0,
          lng: parseFloat(formData.location.coordinates.lng) || 0,
        },
      }

      const submitData = new FormData()
      submitData.append('title', formData.title)
      submitData.append('description', formData.description)
      submitData.append('type', formData.type)
      submitData.append('propertyType', formData.propertyType)
      submitData.append('price', formData.price)
      submitData.append('bedrooms', formData.bedrooms || '0')
      submitData.append('bathrooms', formData.bathrooms || '0')
      submitData.append('location', JSON.stringify(locationData))
      submitData.append('area', JSON.stringify(formData.area))
      submitData.append('amenities', JSON.stringify(formData.amenities))
      submitData.append('images', JSON.stringify(formData.images))

      selectedFiles.forEach((file) => {
        submitData.append('images', file)
      })

      await api.post('/properties', submitData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      })

      setSuccess('✅ Property added successfully! Redirecting...')
      setTimeout(() => navigate('/my-properties'), 1500)
    } catch (err) {
      console.error('Error:', err)
      setError(
        err.response?.data?.message || err.message || 'Failed to add property',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleLocationChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: value },
    }))
  }

  const handleCoordinatesChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: {
          ...prev.location.coordinates,
          [name]: parseFloat(value) || '',
        },
      },
    }))
  }

  const addAmenity = () => {
    if (
      amenity &&
      amenity.trim() &&
      !formData.amenities.includes(amenity.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenity.trim()],
      }))
      setAmenity('')
    }
  }

  const removeAmenity = (idx) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== idx),
    }))
  }

  if (!user) {
    return (
      <Container>
        <FormCard>
          <FormBody style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Please Login</h2>
            <Button onClick={() => navigate('/login')}>
              <MdLogin size={20} /> Go to Login
            </Button>
          </FormBody>
        </FormCard>
      </Container>
    )
  }

  if (user.role !== 'owner') {
    return (
      <Container>
        <FormCard>
          <FormBody style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Access Denied</h2>
            <p>Only property owners can add properties.</p>
            <p>
              Your role: <strong>{user.role}</strong>
            </p>
            <Button onClick={() => navigate('/login')}>
              <MdLogin size={20} /> Login as Owner
            </Button>
          </FormBody>
        </FormCard>
      </Container>
    )
  }

  return (
    <Container>
      <FormCard>
        <FormHeader>
          <h1>
            <FaHome />
            Add New Property
          </h1>
          <p>List your property for sale or rent</p>
        </FormHeader>
        <FormBody>
          {error && (
            <ErrorMessage>
              <MdError size={18} /> {error}
            </ErrorMessage>
          )}
          {success && (
            <SuccessMessage>
              <FaCheckCircle size={18} /> {success}
            </SuccessMessage>
          )}

          <form onSubmit={handleSubmit}>
            <Section>
              <SectionTitle>Basic Information</SectionTitle>
              <FormGrid>
                <FormGroup>
                  <label>
                    <FaBuilding /> Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <label>Property Type</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                  >
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </FormGroup>
              </FormGrid>
            </Section>

            <Section>
              <SectionTitle>Description</SectionTitle>
              <FormGroup>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                  placeholder="Describe your property..."
                />
              </FormGroup>
            </Section>

            <Section>
              <SectionTitle>📍 Location Details</SectionTitle>
              <LocationButton
                type="button"
                onClick={getCurrentLocation}
                disabled={fetchingLocation}
              >
                {fetchingLocation ? (
                  <LoadingSpinner />
                ) : (
                  <MdLocationOn size={18} />
                )}
                {fetchingLocation
                  ? 'Fetching...'
                  : '📍 Use My Current Location'}
              </LocationButton>
              <InfoText>
                <FaInfoCircle size={12} /> Click button above to auto-fill
                location, or fill manually
              </InfoText>
              <FormGrid>
                <FormGroup>
                  <label>
                    <FaMapMarkerAlt /> Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.location.address}
                    onChange={handleLocationChange}
                    required
                    placeholder="e.g., MG Road"
                  />
                </FormGroup>
                <FormGroup>
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.location.city}
                    onChange={handleLocationChange}
                    required
                    placeholder="e.g., Mumbai"
                  />
                </FormGroup>
                <FormGroup>
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.location.state}
                    onChange={handleLocationChange}
                    placeholder="e.g., Maharashtra"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.location.pincode}
                    onChange={handleLocationChange}
                    placeholder="e.g., 400001"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Latitude</label>
                  <input
                    type="number"
                    step="any"
                    name="lat"
                    value={formData.location.coordinates.lat}
                    onChange={handleCoordinatesChange}
                    placeholder="Auto-filled"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Longitude</label>
                  <input
                    type="number"
                    step="any"
                    name="lng"
                    value={formData.location.coordinates.lng}
                    onChange={handleCoordinatesChange}
                    placeholder="Auto-filled"
                  />
                </FormGroup>
              </FormGrid>
            </Section>

            <Section>
              <SectionTitle>Property Details</SectionTitle>
              <FormGrid>
                <FormGroup>
                  <label>
                    <FaBed /> Bedrooms
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    min="0"
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    <FaBath /> Bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    min="0"
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    <FaRuler /> Area Value
                  </label>
                  <input
                    type="number"
                    name="area.value"
                    value={formData.area.value}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Area Unit</label>
                  <select
                    name="area.unit"
                    value={formData.area.unit}
                    onChange={handleChange}
                  >
                    <option value="sqft">Square Feet</option>
                    <option value="sqm">Square Meters</option>
                    <option value="acre">Acre</option>
                  </select>
                </FormGroup>
              </FormGrid>
            </Section>

            <Section>
              <SectionTitle>Amenities</SectionTitle>
              <Row>
                <input
                  type="text"
                  value={amenity}
                  onChange={(e) => setAmenity(e.target.value)}
                  placeholder="Add amenity (e.g., Parking, Garden, WiFi)"
                  onKeyPress={(e) =>
                    e.key === 'Enter' && (e.preventDefault(), addAmenity())
                  }
                />
                <Button type="button" onClick={addAmenity}>
                  <FaPlus /> Add
                </Button>
              </Row>
              <AmenitiesContainer>
                {formData.amenities.map((item, idx) => (
                  <AmenityTag key={idx}>
                    <FaCheck /> {item}
                    <button type="button" onClick={() => removeAmenity(idx)}>
                      <FaTimes />
                    </button>
                  </AmenityTag>
                ))}
              </AmenitiesContainer>
            </Section>

            <Section>
              <SectionTitle>Property Images</SectionTitle>
              <FileInput>
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                <label htmlFor="file-upload">
                  <FaCamera size={16} /> Click to upload images (Max 5MB each)
                </label>
              </FileInput>

              {imagePreviews.length > 0 && (
                <ImagesGrid>
                  {imagePreviews.map((preview, idx) => (
                    <ImageCard key={`preview-${idx}`}>
                      <img src={preview} alt={`Preview ${idx + 1}`} />
                      <button
                        type="button"
                        onClick={() => removeImage(idx, false)}
                      >
                        <FaTimes />
                      </button>
                    </ImageCard>
                  ))}
                </ImagesGrid>
              )}

              <div style={{ marginTop: '1rem' }}>
                <label
                  style={{
                    fontWeight: '600',
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                  }}
                >
                  <FaLink /> Or Add Image URLs
                </label>
                <Row>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <Button type="button" onClick={addImageUrl}>
                    <MdAddLink size={16} /> Add URL
                  </Button>
                </Row>
              </div>

              {formData.images.length > 0 && (
                <ImagesGrid>
                  {formData.images.map((url, idx) => (
                    <ImageCard key={`url-${idx}`}>
                      <img
                        src={url}
                        alt={`Property ${idx + 1}`}
                        onError={(e) => {
                          e.target.src =
                            'https://via.placeholder.com/150?text=Invalid+URL'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx, true)}
                      >
                        <FaTimes />
                      </button>
                    </ImageCard>
                  ))}
                </ImagesGrid>
              )}
            </Section>

            <Button
              type="submit"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {loading ? <LoadingSpinner /> : <MdAddHome size={18} />}
              {loading ? 'Adding Property...' : '✅ Add Property'}
            </Button>
          </form>
        </FormBody>
      </FormCard>
    </Container>
  )
}

export default AddProperty
