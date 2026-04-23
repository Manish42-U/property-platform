// ;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// function PropertyDetails() {
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [showBookingForm, setShowBookingForm] = useState(false);
//   const [bookingData, setBookingData] = useState({
//     type: 'visit',
//     visitDate: '',
//     startDate: '',
//     endDate: '',
//     message: ''
//   });
//   const { id } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProperty();
//   }, [id]);

//   const fetchProperty = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/api/properties/${id}`);
//       setProperty(res.data);
//     } catch (error) {
//       console.error('Error fetching property:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBooking = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:3000/api/bookings', {
//         property: id,
//         ...bookingData
//       });
//       alert('Booking request sent successfully!');
//       setShowBookingForm(false);
//     } catch (error) {
//       console.error('Error booking:', error);
//       alert('Failed to send booking request');
//     }
//   };

//   if (loading) {
//     return (
//       <div style={styles.loadingContainer}>
//         <div style={styles.loader}></div>
//         <p style={styles.loadingText}>Loading property details...</p>
//       </div>
//     );
//   }

//   if (!property) {
//     return (
//       <div style={styles.errorContainer}>
//         <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//           <circle cx="12" cy="12" r="10"/>
//           <line x1="12" y1="8" x2="12" y2="12"/>
//           <line x1="12" y1="16" x2="12.01" y2="16"/>
//         </svg>
//         <h2>Property not found</h2>
//         <button onClick={() => navigate('/properties')} style={styles.errorButton}>
//           Browse Properties
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
          
//           @keyframes slideIn {
//             from { opacity: 0; transform: translateX(-20px); }
//             to { opacity: 1; transform: translateX(0); }
//           }
          
//           @keyframes spin {
//             from { transform: rotate(0deg); }
//             to { transform: rotate(360deg); }
//           }
          
//           @media (max-width: 768px) {
//             .main-image {
//               height: 300px !important;
//             }
//             .thumbnail-image {
//               height: 60px !important;
//             }
//             .property-title {
//               font-size: 24px !important;
//             }
//             .property-price {
//               font-size: 28px !important;
//             }
//           }
          
//           @media (max-width: 480px) {
//             .main-image {
//               height: 250px !important;
//             }
//             .thumbnail-image {
//               height: 50px !important;
//             }
//             .property-title {
//               font-size: 20px !important;
//             }
//             .property-price {
//               font-size: 24px !important;
//             }
//             .specs-grid {
//               grid-template-columns: 1fr !important;
//             }
//             .amenities-grid {
//               grid-template-columns: 1fr !important;
//             }
//             .form-row {
//               grid-template-columns: 1fr !important;
//             }
//           }
//         `}
//       </style>
      
//       <div style={styles.container}>
//         <div style={styles.content}>
//           {/* Gallery Section */}
//           <div style={styles.gallerySection}>
//             <div style={styles.mainImageContainer}>
//               <img 
//                 src={property.images[selectedImage] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'} 
//                 alt={property.title}
//                 style={styles.mainImage}
//                 className="main-image"
//               />
//               {property.status === 'available' && (
//                 <div style={styles.availableBadge}>Available</div>
//               )}
//             </div>
            
//             {property.images.length > 1 && (
//               <div style={styles.thumbnailContainer}>
//                 {property.images.map((img, index) => (
//                   <div
//                     key={index}
//                     style={{
//                       ...styles.thumbnail,
//                       ...(selectedImage === index && styles.activeThumbnail)
//                     }}
//                     onClick={() => setSelectedImage(index)}
//                     className="thumbnail"
//                   >
//                     <img src={img} alt={`Thumbnail ${index + 1}`} style={styles.thumbnailImage} className="thumbnail-image" />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Info Section */}
//           <div style={styles.infoSection}>
//             <div style={styles.header}>
//               <div style={styles.headerLeft}>
//                 <div style={styles.propertyType}>
//                   {property.type === 'sale' ? '🏠 For Sale' : '🔑 For Rent'}
//                 </div>
//                 <h1 style={styles.title} className="property-title">{property.title}</h1>
//                 <div style={styles.location}>
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
//                     <circle cx="12" cy="10" r="3"/>
//                   </svg>
//                   <span>{property.location.address}, {property.location.city}, {property.location.state}</span>
//                 </div>
//               </div>
//               <div style={styles.priceContainer}>
//                 <div style={styles.price} className="property-price">
//                   ₹{property.price.toLocaleString()}
//                   {property.type === 'rent' && <span style={styles.priceUnit}>/month</span>}
//                 </div>
//                 {property.type === 'sale' && (
//                   <div style={styles.priceNote}>One-time payment</div>
//                 )}
//               </div>
//             </div>

//             {/* Specifications */}
//             <div style={styles.specsGrid} className="specs-grid">
//               <div style={styles.specCard}>
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="1.5">
//                   <path d="M3 9L12 3L21 9L12 15L3 9Z" />
//                   <path d="M5 12V18L12 21L19 18V12" />
//                   <path d="M12 15V21" />
//                 </svg>
//                 <div>
//                   <div style={styles.specValue}>{property.area.value} {property.area.unit}</div>
//                   <div style={styles.specLabel}>Total Area</div>
//                 </div>
//               </div>
//               <div style={styles.specCard}>
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="1.5">
//                   <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
//                   <line x1="16" y1="21" x2="16" y2="15"/>
//                   <line x1="8" y1="21" x2="8" y2="15"/>
//                 </svg>
//                 <div>
//                   <div style={styles.specValue}>{property.bedrooms}</div>
//                   <div style={styles.specLabel}>Bedrooms</div>
//                 </div>
//               </div>
//               <div style={styles.specCard}>
//                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="1.5">
//                   <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
//                   <circle cx="12" cy="12" r="3"/>
//                 </svg>
//                 <div>
//                   <div style={styles.specValue}>{property.bathrooms}</div>
//                   <div style={styles.specLabel}>Bathrooms</div>
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <div style={styles.section}>
//               <h3 style={styles.sectionTitle}>Description</h3>
//               <p style={styles.description}>{property.description}</p>
//             </div>

//             {/* Amenities */}
//             {property.amenities.length > 0 && (
//               <div style={styles.section}>
//                 <h3 style={styles.sectionTitle}>Amenities & Features</h3>
//                 <div style={styles.amenitiesGrid} className="amenities-grid">
//                   {property.amenities.map((amenity, index) => (
//                     <div key={index} style={styles.amenityItem}>
//                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
//                         <polyline points="20 6 9 17 4 12"/>
//                       </svg>
//                       <span>{amenity}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Location Details */}
//             <div style={styles.section}>
//               <h3 style={styles.sectionTitle}>Location Details</h3>
//               <div style={styles.locationCard}>
//                 <div style={styles.locationInfo}>
//                   <p><strong>Address:</strong> {property.location.address}</p>
//                   <p><strong>City:</strong> {property.location.city}</p>
//                   <p><strong>State:</strong> {property.location.state}</p>
//                   <p><strong>Pincode:</strong> {property.location.pincode}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Owner Info */}
//             <div style={styles.section}>
//               <h3 style={styles.sectionTitle}>Property Owner</h3>
//               <div style={styles.ownerCard}>
//                 <div style={styles.ownerAvatar}>
//                   {property.owner.name.charAt(0).toUpperCase()}
//                 </div>
//                 <div style={styles.ownerInfo}>
//                   <div style={styles.ownerName}>{property.owner.name}</div>
//                   <div style={styles.ownerContact}>
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
//                     </svg>
//                     <span>{property.owner.phone}</span>
//                   </div>
//                   <div style={styles.ownerContact}>
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
//                       <polyline points="22,6 12,13 2,6"/>
//                     </svg>
//                     <span>{property.owner.email}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Booking Button */}
//             {property.status === 'available' && (
//               <div style={styles.bookingSection}>
//                 <button 
//                   onClick={() => setShowBookingForm(!showBookingForm)} 
//                   style={styles.bookButton}
//                 >
//                   {showBookingForm ? 'Cancel Booking' : 'Book This Property'}
//                 </button>

//                 {showBookingForm && (
//                   <form onSubmit={handleBooking} style={styles.bookingForm}>
//                     <h3 style={styles.bookingTitle}>
//                       {property.type === 'sale' ? 'Schedule a Visit' : 'Book This Property'}
//                     </h3>
                    
//                     <div style={styles.formGroup}>
//                       <label style={styles.formLabel}>Booking Type</label>
//                       <select
//                         value={bookingData.type}
//                         onChange={(e) => setBookingData({...bookingData, type: e.target.value})}
//                         style={styles.formSelect}
//                       >
//                         <option value="visit">Schedule a Visit</option>
//                         {property.type === 'rent' && (
//                           <option value="rent">Rent Property</option>
//                         )}
//                       </select>
//                     </div>

//                     {bookingData.type === 'visit' ? (
//                       <div style={styles.formGroup}>
//                         <label style={styles.formLabel}>Preferred Visit Date</label>
//                         <input
//                           type="date"
//                           value={bookingData.visitDate}
//                           onChange={(e) => setBookingData({...bookingData, visitDate: e.target.value})}
//                           style={styles.formInput}
//                           required
//                         />
//                       </div>
//                     ) : (
//                       <>
//                         <div style={styles.formRow} className="form-row">
//                           <div style={styles.formGroup}>
//                             <label style={styles.formLabel}>Start Date</label>
//                             <input
//                               type="date"
//                               value={bookingData.startDate}
//                               onChange={(e) => setBookingData({...bookingData, startDate: e.target.value})}
//                               style={styles.formInput}
//                               required
//                             />
//                           </div>
//                           <div style={styles.formGroup}>
//                             <label style={styles.formLabel}>End Date</label>
//                             <input
//                               type="date"
//                               value={bookingData.endDate}
//                               onChange={(e) => setBookingData({...bookingData, endDate: e.target.value})}
//                               style={styles.formInput}
//                               required
//                             />
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     <div style={styles.formGroup}>
//                       <label style={styles.formLabel}>Message (Optional)</label>
//                       <textarea
//                         value={bookingData.message}
//                         onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
//                         rows="3"
//                         style={styles.formTextarea}
//                         placeholder="Any special requests or questions?"
//                       />
//                     </div>

//                     <button type="submit" style={styles.submitButton}>
//                       Send Request
//                     </button>
//                   </form>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// const styles = {
//   container: {
//     minHeight: '100vh',
//     background: '#f8fafc',
//     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//     padding: '40px 24px',
//     '@media (max-width: 768px)': {
//       padding: '20px 16px',
//     },
//   },
//   content: {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: '32px',
//     '@media (max-width: 968px)': {
//       gridTemplateColumns: '1fr',
//       gap: '24px',
//     },
//   },
//   gallerySection: {
//     animation: 'fadeIn 0.6s ease-out',
//   },
//   mainImageContainer: {
//     position: 'relative',
//     borderRadius: '24px',
//     overflow: 'hidden',
//     marginBottom: '16px',
//     boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
//     '@media (max-width: 768px)': {
//       borderRadius: '16px',
//     },
//   },
//   mainImage: {
//     width: '100%',
//     height: '500px',
//     objectFit: 'cover',
//     transition: 'transform 0.3s',
//     '@media (max-width: 768px)': {
//       height: '350px',
//     },
//     '@media (max-width: 480px)': {
//       height: '250px',
//     },
//   },
//   availableBadge: {
//     position: 'absolute',
//     top: '20px',
//     right: '20px',
//     background: '#10b981',
//     color: 'white',
//     padding: '8px 16px',
//     borderRadius: '20px',
//     fontSize: '14px',
//     fontWeight: '600',
//     boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//     '@media (max-width: 480px)': {
//       top: '12px',
//       right: '12px',
//       padding: '6px 12px',
//       fontSize: '12px',
//     },
//   },
//   thumbnailContainer: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
//     gap: '12px',
//     '@media (max-width: 480px)': {
//       gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
//       gap: '8px',
//     },
//   },
//   thumbnail: {
//     borderRadius: '12px',
//     overflow: 'hidden',
//     cursor: 'pointer',
//     border: '2px solid transparent',
//     transition: 'all 0.2s',
//     '@media (max-width: 480px)': {
//       borderRadius: '8px',
//     },
//   },
//   activeThumbnail: {
//     borderColor: '#667eea',
//     transform: 'scale(1.05)',
//   },
//   thumbnailImage: {
//     width: '100%',
//     height: '80px',
//     objectFit: 'cover',
//     '@media (max-width: 768px)': {
//       height: '70px',
//     },
//     '@media (max-width: 480px)': {
//       height: '60px',
//     },
//   },
//   infoSection: {
//     animation: 'slideIn 0.6s ease-out',
//   },
//   header: {
//     background: 'white',
//     borderRadius: '24px',
//     padding: '24px',
//     marginBottom: '24px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     flexWrap: 'wrap',
//     gap: '16px',
//     '@media (max-width: 768px)': {
//       padding: '20px',
//       flexDirection: 'column',
//     },
//   },
//   headerLeft: {
//     flex: 1,
//   },
//   propertyType: {
//     display: 'inline-block',
//     padding: '4px 12px',
//     background: '#eef2ff',
//     color: '#667eea',
//     borderRadius: '20px',
//     fontSize: '12px',
//     fontWeight: '600',
//     marginBottom: '12px',
//   },
//   title: {
//     fontSize: '28px',
//     fontWeight: '700',
//     color: '#1e293b',
//     marginBottom: '12px',
//     '@media (max-width: 768px)': {
//       fontSize: '24px',
//     },
//     '@media (max-width: 480px)': {
//       fontSize: '20px',
//     },
//   },
//   location: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//     color: '#64748b',
//     fontSize: '14px',
//     flexWrap: 'wrap',
//     '@media (max-width: 480px)': {
//       fontSize: '12px',
//     },
//   },
//   priceContainer: {
//     textAlign: 'right',
//     '@media (max-width: 768px)': {
//       textAlign: 'left',
//       width: '100%',
//     },
//   },
//   price: {
//     fontSize: '32px',
//     fontWeight: '800',
//     color: '#667eea',
//     '@media (max-width: 768px)': {
//       fontSize: '28px',
//     },
//     '@media (max-width: 480px)': {
//       fontSize: '24px',
//     },
//   },
//   priceUnit: {
//     fontSize: '16px',
//     fontWeight: '500',
//     color: '#94a3b8',
//     '@media (max-width: 480px)': {
//       fontSize: '14px',
//     },
//   },
//   priceNote: {
//     fontSize: '12px',
//     color: '#94a3b8',
//     marginTop: '4px',
//   },
//   specsGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 1fr)',
//     gap: '16px',
//     marginBottom: '24px',
//     '@media (max-width: 768px)': {
//       gap: '12px',
//     },
//   },
//   specCard: {
//     background: 'white',
//     borderRadius: '20px',
//     padding: '20px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//     '@media (max-width: 768px)': {
//       padding: '16px',
//     },
//     '@media (max-width: 480px)': {
//       padding: '12px',
//     },
//   },
//   specValue: {
//     fontSize: '20px',
//     fontWeight: '700',
//     color: '#1e293b',
//     '@media (max-width: 480px)': {
//       fontSize: '16px',
//     },
//   },
//   specLabel: {
//     fontSize: '12px',
//     color: '#64748b',
//     marginTop: '4px',
//     '@media (max-width: 480px)': {
//       fontSize: '10px',
//     },
//   },
//   section: {
//     background: 'white',
//     borderRadius: '24px',
//     padding: '24px',
//     marginBottom: '24px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//     '@media (max-width: 768px)': {
//       padding: '20px',
//     },
//     '@media (max-width: 480px)': {
//       padding: '16px',
//     },
//   },
//   sectionTitle: {
//     fontSize: '20px',
//     fontWeight: '600',
//     color: '#1e293b',
//     marginBottom: '16px',
//     '@media (max-width: 480px)': {
//       fontSize: '18px',
//     },
//   },
//   description: {
//     color: '#475569',
//     lineHeight: '1.6',
//     fontSize: '15px',
//     '@media (max-width: 480px)': {
//       fontSize: '14px',
//     },
//   },
//   amenitiesGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//     gap: '12px',
//     '@media (max-width: 480px)': {
//       gridTemplateColumns: '1fr',
//     },
//   },
//   amenityItem: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//     color: '#475569',
//     fontSize: '14px',
//     '@media (max-width: 480px)': {
//       fontSize: '13px',
//     },
//   },
//   locationCard: {
//     background: '#f8fafc',
//     borderRadius: '16px',
//     padding: '16px',
//     '@media (max-width: 480px)': {
//       padding: '12px',
//     },
//   },
//   locationInfo: {
//     lineHeight: '1.8',
//     color: '#475569',
//     fontSize: '14px',
//     '@media (max-width: 480px)': {
//       fontSize: '13px',
//     },
//   },
//   ownerCard: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '16px',
//     padding: '16px',
//     background: '#f8fafc',
//     borderRadius: '16px',
//     '@media (max-width: 480px)': {
//       flexDirection: 'column',
//       textAlign: 'center',
//       gap: '12px',
//     },
//   },
//   ownerAvatar: {
//     width: '60px',
//     height: '60px',
//     borderRadius: '50%',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: 'white',
//     fontSize: '24px',
//     fontWeight: '600',
//     '@media (max-width: 480px)': {
//       width: '50px',
//       height: '50px',
//       fontSize: '20px',
//     },
//   },
//   ownerInfo: {
//     flex: 1,
//   },
//   ownerName: {
//     fontSize: '18px',
//     fontWeight: '600',
//     color: '#1e293b',
//     marginBottom: '8px',
//     '@media (max-width: 480px)': {
//       fontSize: '16px',
//     },
//   },
//   ownerContact: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//     fontSize: '14px',
//     color: '#475569',
//     marginTop: '6px',
//     '@media (max-width: 480px)': {
//       justifyContent: 'center',
//       fontSize: '12px',
//     },
//   },
//   bookingSection: {
//     background: 'white',
//     borderRadius: '24px',
//     padding: '24px',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//     '@media (max-width: 480px)': {
//       padding: '16px',
//     },
//   },
//   bookButton: {
//     width: '100%',
//     padding: '16px',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '16px',
//     fontSize: '16px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s',
//     '@media (max-width: 480px)': {
//       padding: '12px',
//       fontSize: '14px',
//     },
//   },
//   bookingForm: {
//     marginTop: '24px',
//     paddingTop: '24px',
//     borderTop: '1px solid #e2e8f0',
//   },
//   bookingTitle: {
//     fontSize: '18px',
//     fontWeight: '600',
//     color: '#1e293b',
//     marginBottom: '20px',
//     '@media (max-width: 480px)': {
//       fontSize: '16px',
//     },
//   },
//   formGroup: {
//     marginBottom: '16px',
//   },
//   formRow: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     gap: '16px',
//     marginBottom: '16px',
//     '@media (max-width: 480px)': {
//       gridTemplateColumns: '1fr',
//       gap: '12px',
//     },
//   },
//   formLabel: {
//     display: 'block',
//     fontSize: '14px',
//     fontWeight: '500',
//     color: '#475569',
//     marginBottom: '8px',
//     '@media (max-width: 480px)': {
//       fontSize: '13px',
//     },
//   },
//   formInput: {
//     width: '100%',
//     padding: '10px 12px',
//     border: '1px solid #e2e8f0',
//     borderRadius: '12px',
//     fontSize: '14px',
//     transition: 'all 0.2s',
//     outline: 'none',
//     fontFamily: 'inherit',
//     '@media (max-width: 480px)': {
//       padding: '8px 10px',
//       fontSize: '13px',
//     },
//   },
//   formSelect: {
//     width: '100%',
//     padding: '10px 12px',
//     border: '1px solid #e2e8f0',
//     borderRadius: '12px',
//     fontSize: '14px',
//     background: 'white',
//     cursor: 'pointer',
//     fontFamily: 'inherit',
//     outline: 'none',
//     '@media (max-width: 480px)': {
//       padding: '8px 10px',
//       fontSize: '13px',
//     },
//   },
//   formTextarea: {
//     width: '100%',
//     padding: '10px 12px',
//     border: '1px solid #e2e8f0',
//     borderRadius: '12px',
//     fontSize: '14px',
//     fontFamily: 'inherit',
//     resize: 'vertical',
//     outline: 'none',
//     '@media (max-width: 480px)': {
//       padding: '8px 10px',
//       fontSize: '13px',
//     },
//   },
//   submitButton: {
//     width: '100%',
//     padding: '12px',
//     background: '#10b981',
//     color: 'white',
//     border: 'none',
//     borderRadius: '12px',
//     fontSize: '14px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s',
//     '@media (max-width: 480px)': {
//       padding: '10px',
//     },
//   },
//   loadingContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: '100vh',
//     background: '#f8fafc',
//   },
//   loader: {
//     width: '48px',
//     height: '48px',
//     border: '3px solid #e2e8f0',
//     borderTopColor: '#667eea',
//     borderRadius: '50%',
//     animation: 'spin 1s linear infinite',
//   },
//   loadingText: {
//     marginTop: '16px',
//     color: '#64748b',
//   },
//   errorContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: '100vh',
//     background: '#f8fafc',
//     textAlign: 'center',
//     padding: '24px',
//   },
//   errorButton: {
//     marginTop: '20px',
//     padding: '12px 24px',
//     background: '#667eea',
//     color: 'white',
//     border: 'none',
//     borderRadius: '12px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     fontWeight: '600',
//   },
// };

// export default PropertyDetails;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function PropertyDetails() {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    type: 'visit',
    visitDate: '',
    startDate: '',
    endDate: '',
    message: ''
  });
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperty();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/properties/${id}`);
      setProperty(res.data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/bookings', {
        property: id,
        ...bookingData
      });
      alert('Booking request sent successfully!');
      setShowBookingForm(false);
    } catch (error) {
      console.error('Error booking:', error);
      alert('Failed to send booking request');
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loader}></div>
        <p style={styles.loadingText}>Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div style={styles.errorContainer}>
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h2>Property not found</h2>
        <button onClick={() => navigate('/properties')} style={styles.errorButton}>
          Browse Properties
        </button>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            .main-image {
              height: 300px !important;
            }
            .thumbnail-image {
              height: 70px !important;
            }
          }
          
          @media (max-width: 480px) {
            .main-image {
              height: 250px !important;
            }
            .thumbnail-image {
              height: 60px !important;
            }
          }
        `}
      </style>
      
      <div style={styles.container}>
        <div style={styles.content}>
          {/* Gallery Section */}
          <div style={styles.gallerySection}>
            <div style={styles.mainImageContainer}>
              <img 
                src={property.images?.[selectedImage] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'} 
                alt={property.title}
                style={styles.mainImage}
                className="main-image"
              />
              {property.status === 'available' && (
                <div style={styles.availableBadge}>Available</div>
              )}
            </div>
            
            {property.images?.length > 1 && (
              <div style={styles.thumbnailContainer}>
                {property.images.map((img, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.thumbnail,
                      ...(selectedImage === index && styles.activeThumbnail)
                    }}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} style={styles.thumbnailImage} className="thumbnail-image" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div style={styles.infoSection}>
            <div style={styles.header}>
              <div>
                <div style={styles.propertyType}>
                  {property.type === 'sale' ? '🏠 For Sale' : '🔑 For Rent'}
                </div>
                <h1 style={styles.title}>{property.title}</h1>
                <div style={styles.location}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{property.location?.address}, {property.location?.city}, {property.location?.state}</span>
                </div>
              </div>
              <div style={styles.priceContainer}>
                <div style={styles.price}>
                  ₹{property.price?.toLocaleString()}
                  {property.type === 'rent' && <span style={styles.priceUnit}>/mo</span>}
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div style={styles.specsGrid}>
              <div style={styles.specCard}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="1.5">
                  <path d="M3 9L12 3L21 9L12 15L3 9Z" />
                  <path d="M5 12V18L12 21L19 18V12" />
                </svg>
                <div>
                  <div style={styles.specValue}>{property.area?.value} {property.area?.unit}</div>
                  <div style={styles.specLabel}>Area</div>
                </div>
              </div>
              <div style={styles.specCard}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="1.5">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <line x1="16" y1="21" x2="16" y2="15"/>
                  <line x1="8" y1="21" x2="8" y2="15"/>
                </svg>
                <div>
                  <div style={styles.specValue}>{property.bedrooms}</div>
                  <div style={styles.specLabel}>Beds</div>
                </div>
              </div>
              <div style={styles.specCard}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <div>
                  <div style={styles.specValue}>{property.bathrooms}</div>
                  <div style={styles.specLabel}>Baths</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Description</h3>
              <p style={styles.description}>{property.description}</p>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Amenities</h3>
                <div style={styles.amenitiesGrid}>
                  {property.amenities.map((amenity, index) => (
                    <div key={index} style={styles.amenityItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Owner Info */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Owner</h3>
              <div style={styles.ownerCard}>
                <div style={styles.ownerAvatar}>
                  {property.owner?.name?.charAt(0).toUpperCase()}
                </div>
                <div style={styles.ownerInfo}>
                  <div style={styles.ownerName}>{property.owner?.name}</div>
                  <div style={styles.ownerContact}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span>{property.owner?.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Button */}
            {property.status === 'available' && (
              <div style={styles.bookingSection}>
                <button 
                  onClick={() => setShowBookingForm(!showBookingForm)} 
                  style={styles.bookButton}
                >
                  {showBookingForm ? 'Cancel' : 'Book This Property'}
                </button>

                {showBookingForm && (
                  <form onSubmit={handleBooking} style={styles.bookingForm}>
                    <h3 style={styles.bookingTitle}>
                      {property.type === 'sale' ? 'Schedule a Visit' : 'Book This Property'}
                    </h3>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Booking Type</label>
                      <select
                        value={bookingData.type}
                        onChange={(e) => setBookingData({...bookingData, type: e.target.value})}
                        style={styles.formSelect}
                      >
                        <option value="visit">Schedule a Visit</option>
                        {property.type === 'rent' && (
                          <option value="rent">Rent Property</option>
                        )}
                      </select>
                    </div>

                    {bookingData.type === 'visit' ? (
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Visit Date</label>
                        <input
                          type="date"
                          value={bookingData.visitDate}
                          onChange={(e) => setBookingData({...bookingData, visitDate: e.target.value})}
                          style={styles.formInput}
                          required
                        />
                      </div>
                    ) : (
                      <>
                        <div style={styles.formRow}>
                          <div style={styles.formGroup}>
                            <label style={styles.formLabel}>Start Date</label>
                            <input
                              type="date"
                              value={bookingData.startDate}
                              onChange={(e) => setBookingData({...bookingData, startDate: e.target.value})}
                              style={styles.formInput}
                              required
                            />
                          </div>
                          <div style={styles.formGroup}>
                            <label style={styles.formLabel}>End Date</label>
                            <input
                              type="date"
                              value={bookingData.endDate}
                              onChange={(e) => setBookingData({...bookingData, endDate: e.target.value})}
                              style={styles.formInput}
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Message</label>
                      <textarea
                        value={bookingData.message}
                        onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                        rows="3"
                        style={styles.formTextarea}
                        placeholder="Any special requests?"
                      />
                    </div>

                    <button type="submit" style={styles.submitButton}>
                      Send Request
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px 16px',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  gallerySection: {
    animation: 'fadeIn 0.6s ease-out',
  },
  mainImageContainer: {
    position: 'relative',
    borderRadius: '20px',
    overflow: 'hidden',
    marginBottom: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  mainImage: {
    width: '100%',
    height: '350px',
    objectFit: 'cover',
    transition: 'transform 0.3s',
  },
  availableBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: '#10b981',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  thumbnailContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    gap: '8px',
  },
  thumbnail: {
    borderRadius: '10px',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'all 0.2s',
  },
  activeThumbnail: {
    borderColor: '#667eea',
  },
  thumbnailImage: {
    width: '100%',
    height: '70px',
    objectFit: 'cover',
  },
  infoSection: {
    animation: 'slideIn 0.6s ease-out',
  },
  header: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  propertyType: {
    display: 'inline-block',
    padding: '4px 10px',
    background: '#eef2ff',
    color: '#667eea',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  title: {
    fontSize: 'clamp(20px, 5vw, 28px)',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px',
  },
  location: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '6px',
    color: '#64748b',
    fontSize: '13px',
    flexWrap: 'wrap',
  },
  priceContainer: {
    marginTop: '12px',
  },
  price: {
    fontSize: 'clamp(24px, 6vw, 32px)',
    fontWeight: '800',
    color: '#667eea',
  },
  priceUnit: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#94a3b8',
  },
  specsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '20px',
  },
  specCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  specValue: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1e293b',
  },
  specLabel: {
    fontSize: '11px',
    color: '#64748b',
    marginTop: '2px',
  },
  section: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '12px',
  },
  description: {
    color: '#475569',
    lineHeight: '1.6',
    fontSize: '14px',
  },
  amenitiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: '10px',
  },
  amenityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#475569',
    fontSize: '13px',
  },
  ownerCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px',
    background: '#f8fafc',
    borderRadius: '16px',
  },
  ownerAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '20px',
    fontWeight: '600',
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '6px',
  },
  ownerContact: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#475569',
  },
  bookingSection: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  bookButton: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  bookingForm: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #e2e8f0',
  },
  bookingTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '16px',
  },
  formGroup: {
    marginBottom: '14px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '14px',
  },
  formLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    color: '#475569',
    marginBottom: '6px',
  },
  formInput: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    fontFamily: 'inherit',
    outline: 'none',
  },
  formSelect: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    background: 'white',
    cursor: 'pointer',
    fontFamily: 'inherit',
    outline: 'none',
  },
  formTextarea: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    outline: 'none',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#f8fafc',
  },
  loader: {
    width: '40px',
    height: '40px',
    border: '3px solid #e2e8f0',
    borderTopColor: '#667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '12px',
    color: '#64748b',
    fontSize: '14px',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#f8fafc',
    textAlign: 'center',
    padding: '20px',
  },
  errorButton: {
    marginTop: '16px',
    padding: '10px 20px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
};

export default PropertyDetails;