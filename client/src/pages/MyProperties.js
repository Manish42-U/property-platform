// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// function MyProperties() {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchMyProperties();
//   }, []);

//   const fetchMyProperties = async () => {
//     try {
//       const res = await axios.get('http://localhost:3000/api/properties');
//       const myProperties = res.data.filter(p => p.owner._id === user?.id);
//       setProperties(myProperties);
//     } catch (error) {
//       console.error('Error fetching properties:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteProperty = async (id) => {
//     if (window.confirm('Are you sure you want to delete this property?')) {
//       try {
//         await axios.delete(`http://localhost:3000/api/properties/${id}`);
//         setProperties(properties.filter(p => p._id !== id));
//         alert('Property deleted successfully');
//       } catch (error) {
//         console.error('Error deleting property:', error);
//         alert('Failed to delete property');
//       }
//     }
//   };

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <div className="my-properties">
//       <div className="container">
//         <h1>My Properties</h1>
//         {properties.length === 0 ? (
//           <div className="no-properties">
//             <p>You haven't added any properties yet.</p>
//             <Link to="/add-property" className="add-property-btn">Add Your First Property</Link>
//           </div>
//         ) : (
//           <div className="properties-grid">
//             {properties.map(property => (
//               <div key={property._id} className="property-card">
//                 <img 
//                   src={property.images[0] || 'https://via.placeholder.com/300x200'} 
//                   alt={property.title}
//                   className="property-image"
//                 />
//                 <div className="property-info">
//                   <h3>{property.title}</h3>
//                   <p className="price">
//                     ₹{property.price.toLocaleString()} 
//                     {property.type === 'rent' && '/month'}
//                   </p>
//                   <p className="status">
//                     Status: <span className={property.status}>{property.status}</span>
//                   </p>
//                   <div className="property-actions">
//                     <Link to={`/property/${property._id}`} className="view-btn">View</Link>
//                     <button onClick={() => deleteProperty(property._id)} className="delete-btn">
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// // }

// // export default MyProperties;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

// function MyProperties() {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchMyProperties();
//   }, []);

//   // const fetchMyProperties = async () => {
//   //   try {
//   //     const res = await axios.get('http://localhost:3000/api/properties');
//   //     const myProperties = res.data.filter(p => p.owner._id === user?.id);
//   //     setProperties(myProperties);
//   //   } catch (error) {
//   //     console.error('Error fetching properties:', error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchMyProperties = async () => {
//   try {
//     const res = await axios.get('http://localhost:3000/api/properties');
//     console.log('API response:', res.data); // debug
//     const allProperties = Array.isArray(res.data) ? res.data : (res.data.properties || []);
//     console.log('User ID:', user?.id, user?._id);
//     const userId = user?.id || user?._id;
//     const myProperties = allProperties.filter(p => {
//       const ownerId = p.owner?._id || p.owner;
//       return ownerId === userId;
//     });
//     console.log('Filtered properties:', myProperties);
//     setProperties(myProperties);
//   } catch (error) {
//     console.error('Error fetching properties:', error);
//   } finally {
//     setLoading(false);
//   }
// };

//   const deleteProperty = async (id) => {
//     if (window.confirm('Are you sure you want to delete this property?')) {
//       try {
//         await axios.delete(`http://localhost:3000/api/properties/${id}`);
//         setProperties(properties.filter(p => p._id !== id));
//         alert('Property deleted successfully');
//       } catch (error) {
//         console.error('Error deleting property:', error);
//         alert('Failed to delete property');
//       }
//     }
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'available': return '#10b981';
//       case 'pending': return '#f59e0b';
//       case 'sold': return '#ef4444';
//       default: return '#6b7280';
//     }
//   };

//   const formatPrice = (price, type) => {
//     if (price >= 10000000) {
//       return `₹${(price / 10000000).toFixed(1)} Cr${type === 'rent' ? '/month' : ''}`;
//     } else if (price >= 100000) {
//       return `₹${(price / 100000).toFixed(1)} Lac${type === 'rent' ? '/month' : ''}`;
//     }
//     return `₹${price.toLocaleString()}${type === 'rent' ? '/month' : ''}`;
//   };

//   if (loading) {
//     return (
//       <div style={styles.loadingContainer}>
//         <div style={styles.loader}></div>
//         <p style={styles.loadingText}>Loading your properties...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>
//         {`
//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
          
//           @keyframes slideIn {
//             from {
//               opacity: 0;
//               transform: translateX(-20px);
//             }
//             to {
//               opacity: 1;
//               transform: translateX(0);
//             }
//           }
          
//           @keyframes spin {
//             from { transform: rotate(0deg); }
//             to { transform: rotate(360deg); }
//           }
          
//           .property-card {
//             animation: fadeInUp 0.5s ease-out;
//           }
          
//           .property-card:hover {
//             transform: translateY(-8px);
//             box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
//           }
          
//           .property-card:hover .property-image {
//             transform: scale(1.05);
//           }
          
//           .view-btn:hover, .delete-btn:hover {
//             transform: translateY(-2px);
//           }
//         `}
//       </style>
      
//       <div style={styles.container}>
//         <div style={styles.hero}>
//           <div style={styles.heroOverlay}></div>
//           <div style={styles.heroContent}>
//             <h1 style={styles.heroTitle}>My Properties</h1>
//             <p style={styles.heroSubtitle}>
//               {properties.length} {properties.length === 1 ? 'property' : 'properties'} listed
//             </p>
//           </div>
//         </div>

//         <div style={styles.content}>
//           {properties.length === 0 ? (
//             <div style={styles.emptyState}>
//               <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
//                 <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
//                 <circle cx="8.5" cy="8.5" r="1.5"/>
//                 <polyline points="21 15 16 10 5 21"/>
//               </svg>
//               <h2>No properties yet</h2>
//               <p>You haven't added any properties. Start by listing your first property.</p>
//               <Link to="/add-property" style={styles.addButton}>
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <circle cx="12" cy="12" r="10"/>
//                   <line x1="12" y1="8" x2="12" y2="16"/>
//                   <line x1="8" y1="12" x2="16" y2="12"/>
//                 </svg>
//                 Add Your First Property
//               </Link>
//             </div>
//           ) : (
//             <div style={styles.propertiesGrid}>
//               {properties.map((property, index) => (
//                 <div key={property._id} className="property-card" style={styles.propertyCard}>
//                   <div style={styles.imageContainer}>
//                     <img 
//                       src={property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'} 
//                       alt={property.title}
//                       className="property-image"
//                       style={styles.propertyImage}
//                     />
//                     <div style={styles.typeBadge}>
//                       {property.type === 'sale' ? '🏠 For Sale' : '🔑 For Rent'}
//                     </div>
//                     <div style={{
//                       ...styles.statusBadge,
//                       background: getStatusColor(property.status)
//                     }}>
//                       {property.status === 'available' ? '✓ Available' : 
//                        property.status === 'pending' ? '⏳ Pending' : '✗ Sold'}
//                     </div>
//                   </div>
                  
//                   <div style={styles.propertyInfo}>
//                     <div style={styles.propertyHeader}>
//                       <h3 style={styles.propertyTitle}>{property.title}</h3>
//                       <div style={styles.propertyPrice}>
//                         {formatPrice(property.price, property.type)}
//                       </div>
//                     </div>
                    
//                     <div style={styles.propertyLocation}>
//                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
//                         <circle cx="12" cy="10" r="3"/>
//                       </svg>
//                       <span>{property.location.city}, {property.location.state}</span>
//                     </div>
                    
//                     <div style={styles.propertyDetails}>
//                       <div style={styles.detailItem}>
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                           <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
//                           <line x1="16" y1="21" x2="16" y2="15"/>
//                           <line x1="8" y1="21" x2="8" y2="15"/>
//                         </svg>
//                         <span>{property.bedrooms} Beds</span>
//                       </div>
//                       <div style={styles.detailItem}>
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                           <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
//                           <circle cx="12" cy="12" r="3"/>
//                         </svg>
//                         <span>{property.bathrooms} Baths</span>
//                       </div>
//                       <div style={styles.detailItem}>
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                           <path d="M3 9L12 3L21 9L12 15L3 9Z" />
//                           <path d="M5 12V18L12 21L19 18V12" />
//                         </svg>
//                         <span>{property.area.value} {property.area.unit}</span>
//                       </div>
//                     </div>
                    
//                     <div style={styles.propertyActions}>
//                       <Link to={`/property/${property._id}`} style={styles.viewBtn}>
//                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                           <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                           <circle cx="12" cy="12" r="3"/>
//                         </svg>
//                         View Details
//                       </Link>
//                       <button onClick={() => deleteProperty(property._id)} style={styles.deleteBtn}>
//                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                           <polyline points="3 6 5 6 21 6"/>
//                           <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
//                           <line x1="10" y1="11" x2="10" y2="17"/>
//                           <line x1="14" y1="11" x2="14" y2="17"/>
//                         </svg>
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
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
//   },
//   hero: {
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     position: 'relative',
//     padding: '60px 24px',
//     textAlign: 'center',
//     overflow: 'hidden',
//   },
//   heroOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath fill=\'rgba(255,255,255,0.05)\' d=\'M0 0 L100 0 L100 100 L0 100 Z\'/%3E%3C/svg%3E")',
//     opacity: 0.1,
//   },
//   heroContent: {
//     position: 'relative',
//     zIndex: 1,
//   },
//   heroTitle: {
//     fontSize: '48px',
//     fontWeight: '800',
//     color: 'white',
//     marginBottom: '16px',
//   },
//   heroSubtitle: {
//     fontSize: '18px',
//     color: 'rgba(255,255,255,0.9)',
//   },
//   content: {
//     maxWidth: '1280px',
//     margin: '-40px auto 0',
//     padding: '0 24px 60px',
//     position: 'relative',
//     zIndex: 2,
//   },
//   emptyState: {
//     textAlign: 'center',
//     padding: '80px 24px',
//     background: 'white',
//     borderRadius: '24px',
//     boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
//   },
//   addButton: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: '8px',
//     marginTop: '24px',
//     padding: '12px 24px',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     color: 'white',
//     textDecoration: 'none',
//     borderRadius: '12px',
//     fontWeight: '600',
//     transition: 'transform 0.2s',
//   },
//   propertiesGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
//     gap: '32px',
//   },
//   propertyCard: {
//     background: 'white',
//     borderRadius: '20px',
//     overflow: 'hidden',
//     transition: 'all 0.3s',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//   },
//   imageContainer: {
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   propertyImage: {
//     width: '100%',
//     height: '220px',
//     objectFit: 'cover',
//     transition: 'transform 0.3s',
//   },
//   typeBadge: {
//     position: 'absolute',
//     top: '16px',
//     left: '16px',
//     background: 'rgba(0,0,0,0.75)',
//     backdropFilter: 'blur(10px)',
//     color: 'white',
//     padding: '6px 12px',
//     borderRadius: '20px',
//     fontSize: '12px',
//     fontWeight: '600',
//   },
//   statusBadge: {
//     position: 'absolute',
//     top: '16px',
//     right: '16px',
//     padding: '6px 12px',
//     borderRadius: '20px',
//     fontSize: '12px',
//     fontWeight: '600',
//     color: 'white',
//   },
//   propertyInfo: {
//     padding: '20px',
//   },
//   propertyHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: '12px',
//     gap: '12px',
//   },
//   propertyTitle: {
//     fontSize: '18px',
//     fontWeight: '700',
//     color: '#1e293b',
//     margin: 0,
//     flex: 1,
//   },
//   propertyPrice: {
//     fontSize: '20px',
//     fontWeight: '800',
//     color: '#667eea',
//     whiteSpace: 'nowrap',
//   },
//   propertyLocation: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '6px',
//     color: '#64748b',
//     fontSize: '14px',
//     marginBottom: '16px',
//   },
//   propertyDetails: {
//     display: 'flex',
//     gap: '16px',
//     padding: '16px 0',
//     borderTop: '1px solid #e2e8f0',
//     borderBottom: '1px solid #e2e8f0',
//     marginBottom: '20px',
//   },
//   detailItem: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '6px',
//     fontSize: '13px',
//     color: '#475569',
//   },
//   propertyActions: {
//     display: 'flex',
//     gap: '12px',
//   },
//   viewBtn: {
//     flex: 1,
//     display: 'inline-flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '6px',
//     padding: '10px',
//     background: 'white',
//     border: '1px solid #e2e8f0',
//     borderRadius: '12px',
//     color: '#667eea',
//     textDecoration: 'none',
//     fontWeight: '600',
//     fontSize: '14px',
//     transition: 'all 0.2s',
//   },
//   deleteBtn: {
//     flex: 1,
//     display: 'inline-flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '6px',
//     padding: '10px',
//     background: '#fee2e2',
//     border: 'none',
//     borderRadius: '12px',
//     color: '#ef4444',
//     fontWeight: '600',
//     fontSize: '14px',
//     cursor: 'pointer',
//     transition: 'all 0.2s',
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
// };

// export default MyProperties;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styled, { keyframes } from 'styled-components';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaTrash, FaEye } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #64748b;
  }
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const PropertyCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const PropertyImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const PropertyBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.type === 'sale' ? '#f59e0b' : '#10b981'};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const PropertyInfo = styled.div`
  padding: 1.5rem;
`;

const PropertyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const PropertyPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const PropertyLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const PropertyDetails = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #475569;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => 
    props.status === 'available' ? '#d1fae5' : 
    props.status === 'sold' ? '#fee2e2' : 
    '#fef3c7'
  };
  color: ${props => 
    props.status === 'available' ? '#059669' : 
    props.status === 'sold' ? '#dc2626' : 
    '#d97706'
  };
  margin-bottom: 1rem;
  display: inline-block;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &.view {
    background: #667eea;
    color: white;
    
    &:hover {
      background: #5a67d8;
      transform: translateY(-2px);
    }
  }
  
  &.delete {
    background: #fee2e2;
    color: #dc2626;
    
    &:hover {
      background: #fecaca;
      transform: translateY(-2px);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 16px;
  
  h3 {
    font-size: 1.5rem;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #64748b;
    margin-bottom: 1.5rem;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 3rem;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e2e8f0;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchProperties();
    }
  }, [user]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login to view your properties');
        return;
      }

      // Get user ID from auth context (handle both _id and id)
      const userId = user?._id || user?.id;
      
      console.log('Current user object:', user);
      console.log('User ID (from context):', userId);
      
      const response = await axios.get('http://localhost:3000/api/properties', {
        headers: { 'x-auth-token': token }
      });
      
      console.log('All properties:', response.data);
      
      // Filter properties owned by current user
      const userProperties = response.data.filter(property => {
        // Handle different possible structures of owner field
        let ownerId = null;
        
        if (typeof property.owner === 'object' && property.owner !== null) {
          // Owner is populated object
          ownerId = property.owner._id || property.owner.id;
        } else if (typeof property.owner === 'string') {
          // Owner is just an ID string
          ownerId = property.owner;
        }
        
        console.log(`Property: ${property.title}, Owner ID: ${ownerId}, Current User ID: ${userId}`);
        
        // Compare as strings to avoid type mismatches
        return ownerId && ownerId.toString() === userId?.toString();
      });
      
      console.log('Filtered user properties:', userProperties);
      setProperties(userProperties);
      setError('');
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to load properties. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    if (window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/api/properties/${id}`, {
          headers: { 'x-auth-token': token }
        });
        alert('Property deleted successfully!');
        // Refresh the list
        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
        alert(error.response?.data?.message || 'Failed to delete property');
      }
    }
  };

  const formatPrice = (price, type) => {
    if (!price) return 'Price on request';
    
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr${type === 'rent' ? '/month' : ''}`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lac${type === 'rent' ? '/month' : ''}`;
    }
    return `₹${price.toLocaleString()}${type === 'rent' ? '/month' : ''}`;
  };

  if (!user) {
    return (
      <Container>
        <EmptyState>
          <h3>Please Login</h3>
          <p>You need to be logged in to view your properties.</p>
          <Link to="/login">
            <Button className="view" style={{ padding: '0.75rem 1.5rem' }}>
              Go to Login
            </Button>
          </Link>
        </EmptyState>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div className="spinner"></div>
          <p>Loading your properties...</p>
        </LoadingSpinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <EmptyState>
          <h3>Error</h3>
          <p>{error}</p>
          <Button className="view" onClick={fetchProperties}>
            Try Again
          </Button>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>My Properties</h1>
        <p>Manage your property listings ({properties.length} properties)</p>
      </Header>
      
      {properties.length === 0 ? (
        <EmptyState>
          <h3>No properties yet</h3>
          <p>You haven't listed any properties. Click below to add your first property.</p>
          <Link to="/add-property">
            <Button className="view" style={{ padding: '0.75rem 1.5rem' }}>
              + Add Your First Property
            </Button>
          </Link>
        </EmptyState>
      ) : (
        <PropertiesGrid>
          {properties.map(property => (
            <PropertyCard key={property._id}>
              <PropertyImage>
                <img 
                  src={property.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'} 
                  alt={property.title}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400';
                  }}
                />
                <PropertyBadge type={property.type}>
                  {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                </PropertyBadge>
              </PropertyImage>
              
              <PropertyInfo>
                <PropertyTitle>{property.title}</PropertyTitle>
                <PropertyPrice>{formatPrice(property.price, property.type)}</PropertyPrice>
                <PropertyLocation>
                  <MdLocationOn /> {property.location?.city}, {property.location?.state}
                </PropertyLocation>
                <StatusBadge status={property.status}>
                  {property.status?.toUpperCase() || 'AVAILABLE'}
                </StatusBadge>
                <PropertyDetails>
                  <DetailItem><FaBed /> {property.bedrooms || 0} beds</DetailItem>
                  <DetailItem><FaBath /> {property.bathrooms || 0} baths</DetailItem>
                  <DetailItem><FaRuler /> {property.area?.value || 0} {property.area?.unit || 'sqft'}</DetailItem>
                </PropertyDetails>
                <ButtonGroup>
                  <Button 
                    className="view"
                    onClick={() => navigate(`/property/${property._id}`)}
                  >
                    <FaEye /> View Details
                  </Button>
                  <Button 
                    className="delete"
                    onClick={() => deleteProperty(property._id)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </ButtonGroup>
              </PropertyInfo>
            </PropertyCard>
          ))}
        </PropertiesGrid>
      )}
    </Container>
  );
}

export default MyProperties;