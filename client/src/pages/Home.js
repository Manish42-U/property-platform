

// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// // Remove Footer import from here
// // import Footer from '../components/Footer';

// // Fix for default markers
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// function LocationMarker({ setLocation }) {
//   const map = useMapEvents({
//     click(e) {
//       setLocation({
//         lat: e.latlng.lat,
//         lng: e.latlng.lng
//       });
//       map.flyTo(e.latlng, map.getZoom());
//     },
//   });
//   return null;
// }

// function Home() {
//   const [searchParams, setSearchParams] = useState({
//     location: '',
//     type: 'all',
//     propertyType: 'all',
//     minPrice: '',
//     maxPrice: '',
//     radius: 5
//   });
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [featuredProperties, setFeaturedProperties] = useState([]);
//   const [loadingFeatured, setLoadingFeatured] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchFeaturedProperties();
//   }, []);

//   const fetchFeaturedProperties = async () => {
//     try {
//       const res = await axios.get('http://localhost:3000/api/properties');
//       let properties = [];
//       if (Array.isArray(res.data)) {
//         properties = res.data;
//       } else if (res.data.properties && Array.isArray(res.data.properties)) {
//         properties = res.data.properties;
//       }
//       setFeaturedProperties(properties.slice(0, 6));
//     } catch (error) {
//       console.error('Error fetching featured properties:', error);
//     } finally {
//       setLoadingFeatured(false);
//     }
//   };

//   const handleSearch = () => {
//     const params = new URLSearchParams();
    
//     if (searchParams.location) params.append('location', searchParams.location);
//     if (searchParams.type !== 'all') params.append('type', searchParams.type);
//     if (searchParams.propertyType !== 'all') params.append('propertyType', searchParams.propertyType);
//     if (searchParams.minPrice) params.append('minPrice', searchParams.minPrice);
//     if (searchParams.maxPrice) params.append('maxPrice', searchParams.maxPrice);
//     if (selectedLocation) {
//       params.append('lat', selectedLocation.lat);
//       params.append('lng', selectedLocation.lng);
//       params.append('radius', searchParams.radius);
//     }
    
//     navigate(`/properties?${params.toString()}`);
//   };

//   const formatPrice = (price, type) => {
//     if (price >= 10000000) {
//       return `₹${(price / 10000000).toFixed(1)} Cr${type === 'rent' ? '/month' : ''}`;
//     } else if (price >= 100000) {
//       return `₹${(price / 100000).toFixed(1)} Lac${type === 'rent' ? '/month' : ''}`;
//     }
//     return `₹${price.toLocaleString()}${type === 'rent' ? '/month' : ''}`;
//   };

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
          
//           @keyframes slideInLeft {
//             from {
//               opacity: 0;
//               transform: translateX(-50px);
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
          
//           .leaflet-popup-content-wrapper {
//             border-radius: 12px;
//             font-family: inherit;
//           }
//           .leaflet-popup-content {
//             margin: 8px 12px;
//           }
//           input:focus, select:focus {
//             border-color: #667eea !important;
//             box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
//           }
//           button:hover {
//             transform: translateY(-2px);
//             box-shadow: 0 10px 20px -10px rgba(102, 126, 234, 0.5);
//           }
//           .featured-card:hover {
//             transform: translateY(-8px);
//             box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
//           }
//           .featured-card:hover .card-image-img {
//             transform: scale(1.05);
//           }
//           .card-button:hover {
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             color: white;
//             border-color: transparent;
//           }
//           .view-all-button:hover {
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             color: white;
//             border-color: transparent;
//           }
//           .cta-button:hover {
//             transform: translateY(-2px);
//             box-shadow: 0 10px 20px -10px rgba(0,0,0,0.2);
//           }
//           .range-input::-webkit-slider-thumb {
//             -webkit-appearance: none;
//             width: 16px;
//             height: 16px;
//             border-radius: 50%;
//             background: #667eea;
//             cursor: pointer;
//           }
//         `}
//       </style>
      
//       <div style={styles.container}>
//         {/* Hero Section */}
//         <div style={styles.hero}>
//           <div style={styles.heroOverlay}></div>
//           <div style={styles.heroContent}>
//             <h1 style={styles.heroTitle}>
//               Find Your <span style={styles.gradientText}>Dream Property</span>
//             </h1>
//             <p style={styles.heroSubtitle}>
//               Discover the perfect place to call home with our curated collection of properties
//             </p>
            
//             {/* Stats */}
//             <div style={styles.stats}>
//               <div style={styles.statItem}>
//                 <div style={styles.statNumber}>500+</div>
//                 <div style={styles.statLabel}>Properties</div>
//               </div>
//               <div style={styles.statDivider}></div>
//               <div style={styles.statItem}>
//                 <div style={styles.statNumber}>50+</div>
//                 <div style={styles.statLabel}>Cities</div>
//               </div>
//               <div style={styles.statDivider}></div>
//               <div style={styles.statItem}>
//                 <div style={styles.statNumber}>1000+</div>
//                 <div style={styles.statLabel}>Happy Clients</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search Section */}
//         <div style={styles.searchSection}>
//           <div style={styles.searchCard}>
//             <div style={styles.searchHeader}>
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
//                 <circle cx="11" cy="11" r="8"/>
//                 <line x1="21" y1="21" x2="16.65" y2="16.65"/>
//               </svg>
//               <h3 style={styles.searchTitle}>Find Your Perfect Property</h3>
//             </div>
            
//             <div style={styles.searchForm}>
//               <div style={styles.inputGroup}>
//                 <svg style={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
//                   <circle cx="12" cy="10" r="3"/>
//                 </svg>
//                 <input
//                   type="text"
//                   placeholder="Enter location or click on map"
//                   value={searchParams.location}
//                   onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
//                   style={styles.input}
//                 />
//               </div>
              
//               <div style={styles.inputGroup}>
//                 <svg style={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
//                   <line x1="16" y1="21" x2="16" y2="15"/>
//                   <line x1="8" y1="21" x2="8" y2="15"/>
//                   <line x1="2" y1="11" x2="22" y2="11"/>
//                 </svg>
//                 <select
//                   value={searchParams.type}
//                   onChange={(e) => setSearchParams({...searchParams, type: e.target.value})}
//                   style={styles.select}
//                 >
//                   <option value="all">All Types</option>
//                   <option value="sale">🏠 For Sale</option>
//                   <option value="rent">🔑 For Rent</option>
//                 </select>
//               </div>
              
//               <div style={styles.inputGroup}>
//                 <svg style={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
//                   <line x1="9" y1="9" x2="15" y2="15"/>
//                   <line x1="15" y1="9" x2="9" y2="15"/>
//                 </svg>
//                 <select
//                   value={searchParams.propertyType}
//                   onChange={(e) => setSearchParams({...searchParams, propertyType: e.target.value})}
//                   style={styles.select}
//                 >
//                   <option value="all">All Properties</option>
//                   <option value="house">🏘️ House</option>
//                   <option value="apartment">🏢 Apartment</option>
//                   <option value="condo">🏙️ Condo</option>
//                   <option value="land">🌳 Land</option>
//                   <option value="commercial">🏭 Commercial</option>
//                 </select>
//               </div>
              
//               <div style={styles.priceRange}>
//                 <div style={styles.inputGroup}>
//                   <svg style={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <line x1="12" y1="1" x2="12" y2="23"/>
//                     <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
//                   </svg>
//                   <input
//                     type="number"
//                     placeholder="Min Price"
//                     value={searchParams.minPrice}
//                     onChange={(e) => setSearchParams({...searchParams, minPrice: e.target.value})}
//                     style={styles.input}
//                   />
//                 </div>
//                 <span style={styles.priceSeparator}>-</span>
//                 <div style={styles.inputGroup}>
//                   <svg style={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <line x1="12" y1="1" x2="12" y2="23"/>
//                     <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
//                   </svg>
//                   <input
//                     type="number"
//                     placeholder="Max Price"
//                     value={searchParams.maxPrice}
//                     onChange={(e) => setSearchParams({...searchParams, maxPrice: e.target.value})}
//                     style={styles.input}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Map Section */}
//           <div style={styles.mapCard}>
//             <div style={styles.mapHeader}>
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
//                 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
//                 <circle cx="12" cy="10" r="3"/>
//               </svg>
//               <span>Click on map to select location</span>
//             </div>
//             <div style={styles.mapWrapper}>
//               <MapContainer
//                 center={[20.5937, 78.9629]}
//                 zoom={5}
//                 style={{ height: '400px', width: '100%', borderRadius: '16px' }}
//               >
//                 <TileLayer
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 <LocationMarker setLocation={setSelectedLocation} />
//                 {selectedLocation && (
//                   <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
//                     <Popup>
//                       <strong>Selected Location</strong><br />
//                       Lat: {selectedLocation.lat.toFixed(4)}<br />
//                       Lng: {selectedLocation.lng.toFixed(4)}
//                     </Popup>
//                   </Marker>
//                 )}
//               </MapContainer>
//             </div>
//             {selectedLocation && (
//               <div style={styles.radiusControl}>
//                 <div style={styles.radiusHeader}>
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <circle cx="12" cy="12" r="10"/>
//                     <line x1="12" y1="8" x2="12" y2="16"/>
//                     <line x1="8" y1="12" x2="16" y2="12"/>
//                   </svg>
//                   <span>Search Radius: {searchParams.radius} km</span>
//                 </div>
//                 <input
//                   type="range"
//                   min="1"
//                   max="50"
//                   value={searchParams.radius}
//                   onChange={(e) => setSearchParams({...searchParams, radius: e.target.value})}
//                   style={styles.rangeInput}
//                 />
//               </div>
//             )}
//             <button onClick={handleSearch} style={styles.searchButton}>
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <circle cx="11" cy="11" r="8"/>
//                 <line x1="21" y1="21" x2="16.65" y2="16.65"/>
//               </svg>
//               Search Properties
//             </button>
//           </div>
//         </div>

//         {/* Featured Properties Section */}
//         <div style={styles.featuredSection}>
//           <div style={styles.sectionHeader}>
//             <h2 style={styles.sectionTitle}>Featured Properties</h2>
//             <p style={styles.sectionSubtitle}>Hand-picked properties just for you</p>
//           </div>
          
//           {loadingFeatured ? (
//             <div style={styles.loadingContainer}>
//               <div style={styles.loader}></div>
//               <p>Loading properties...</p>
//             </div>
//           ) : featuredProperties.length === 0 ? (
//             <div style={styles.emptyFeatured}>
//               <p>No properties available at the moment.</p>
//             </div>
//           ) : (
//             <div style={styles.featuredGrid}>
//               {featuredProperties.map(property => (
//                 <Link to={`/property/${property._id}`} key={property._id} style={styles.featuredCard} className="featured-card">
//                   <div style={styles.cardImage}>
//                     <img 
//                       src={property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'} 
//                       alt={property.title}
//                       style={styles.cardImageImg}
//                       className="card-image-img"
//                     />
//                     <div style={styles.cardBadge}>Featured</div>
//                     <div style={styles.cardTypeBadge}>
//                       {property.type === 'sale' ? 'For Sale' : 'For Rent'}
//                     </div>
//                   </div>
//                   <div style={styles.cardContent}>
//                     <h3 style={styles.cardTitle}>{property.title}</h3>
//                     <p style={styles.cardLocation}>
//                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
//                         <circle cx="12" cy="10" r="3"/>
//                       </svg>
//                       {property.location.city}, {property.location.state}
//                     </p>
//                     <div style={styles.cardDetails}>
//                       <span>{property.bedrooms} Beds</span>
//                       <span>{property.bathrooms} Baths</span>
//                       <span>{property.area.value} {property.area.unit}</span>
//                     </div>
//                     <div style={styles.cardPrice}>
//                       {formatPrice(property.price, property.type)}
//                     </div>
//                     <div style={styles.cardButton} className="card-button">View Details</div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//           <div style={styles.viewAllContainer}>
//             <Link to="/properties" style={styles.viewAllButton} className="view-all-button">View All Properties</Link>
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div style={styles.ctaSection}>
//           <div style={styles.ctaContent}>
//             <h2 style={styles.ctaTitle}>Ready to find your dream property?</h2>
//             <p style={styles.ctaText}>Join thousands of happy homeowners who found their perfect place with us</p>
//             <button onClick={() => navigate('/register')} style={styles.ctaButton} className="cta-button">Get Started</button>
//           </div>
//         </div>
        
//         {/* REMOVED: <Footer></Footer> - Footer is now in App.js */}
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
//     padding: '80px 24px 120px',
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
//     maxWidth: '800px',
//     margin: '0 auto',
//   },
//   heroTitle: {
//     fontSize: '56px',
//     fontWeight: '800',
//     color: 'white',
//     marginBottom: '20px',
//     animation: 'fadeInUp 0.8s ease-out',
//   },
//   gradientText: {
//     background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     backgroundClip: 'text',
//   },
//   heroSubtitle: {
//     fontSize: '18px',
//     color: 'rgba(255,255,255,0.9)',
//     marginBottom: '40px',
//     animation: 'fadeInUp 0.8s ease-out 0.2s backwards',
//   },
//   stats: {
//     display: 'flex',
//     justifyContent: 'center',
//     gap: '40px',
//     animation: 'fadeInUp 0.8s ease-out 0.4s backwards',
//   },
//   statItem: {
//     textAlign: 'center',
//   },
//   statNumber: {
//     fontSize: '32px',
//     fontWeight: '800',
//     color: 'white',
//     marginBottom: '8px',
//   },
//   statLabel: {
//     fontSize: '14px',
//     color: 'rgba(255,255,255,0.8)',
//   },
//   statDivider: {
//     width: '1px',
//     height: '40px',
//     background: 'rgba(255,255,255,0.3)',
//   },
//   searchSection: {
//     maxWidth: '1200px',
//     margin: '-60px auto 60px',
//     padding: '0 24px',
//   },
//   searchCard: {
//     background: 'white',
//     borderRadius: '20px',
//     padding: '24px',
//     marginBottom: '24px',
//     boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
//     animation: 'slideInLeft 0.6s ease-out',
//   },
//   searchHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     marginBottom: '24px',
//     paddingBottom: '16px',
//     borderBottom: '2px solid #f1f5f9',
//   },
//   searchTitle: {
//     fontSize: '20px',
//     fontWeight: '600',
//     color: '#1e293b',
//     margin: 0,
//   },
//   searchForm: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//     gap: '16px',
//   },
//   inputGroup: {
//     position: 'relative',
//   },
//   inputIcon: {
//     position: 'absolute',
//     left: '12px',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     color: '#94a3b8',
//     pointerEvents: 'none',
//   },
//   input: {
//     width: '100%',
//     padding: '12px 12px 12px 40px',
//     border: '1px solid #e2e8f0',
//     borderRadius: '12px',
//     fontSize: '14px',
//     transition: 'all 0.2s',
//     outline: 'none',
//     fontFamily: 'inherit',
//     boxSizing: 'border-box',
//   },
//   select: {
//     width: '100%',
//     padding: '12px 12px 12px 40px',
//     border: '1px solid #e2e8f0',
//     borderRadius: '12px',
//     fontSize: '14px',
//     background: 'white',
//     cursor: 'pointer',
//     fontFamily: 'inherit',
//     outline: 'none',
//   },
//   priceRange: {
//     display: 'flex',
//     gap: '12px',
//     alignItems: 'center',
//   },
//   priceSeparator: {
//     color: '#94a3b8',
//     fontWeight: '500',
//   },
//   mapCard: {
//     background: 'white',
//     borderRadius: '20px',
//     padding: '24px',
//     boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
//   },
//   mapHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//     marginBottom: '16px',
//     padding: '8px 12px',
//     background: '#f8fafc',
//     borderRadius: '12px',
//     fontSize: '14px',
//     color: '#475569',
//   },
//   mapWrapper: {
//     borderRadius: '16px',
//     overflow: 'hidden',
//     marginBottom: '16px',
//   },
//   radiusControl: {
//     marginTop: '16px',
//     padding: '16px',
//     background: '#f8fafc',
//     borderRadius: '12px',
//   },
//   radiusHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '8px',
//     marginBottom: '12px',
//     fontSize: '14px',
//     fontWeight: '500',
//     color: '#1e293b',
//   },
//   rangeInput: {
//     width: '100%',
//     height: '6px',
//     borderRadius: '3px',
//     background: '#e2e8f0',
//     outline: 'none',
//     WebkitAppearance: 'none',
//   },
//   searchButton: {
//     width: '100%',
//     marginTop: '20px',
//     padding: '14px',
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '12px',
//     fontSize: '16px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '8px',
//     transition: 'all 0.3s',
//   },
//   featuredSection: {
//     maxWidth: '1200px',
//     margin: '0 auto 80px',
//     padding: '0 24px',
//   },
//   sectionHeader: {
//     textAlign: 'center',
//     marginBottom: '48px',
//   },
//   sectionTitle: {
//     fontSize: '36px',
//     fontWeight: '800',
//     color: '#1e293b',
//     marginBottom: '12px',
//   },
//   sectionSubtitle: {
//     fontSize: '16px',
//     color: '#64748b',
//   },
//   featuredGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
//     gap: '32px',
//   },
//   featuredCard: {
//     background: 'white',
//     borderRadius: '20px',
//     overflow: 'hidden',
//     boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
//     transition: 'all 0.3s',
//     textDecoration: 'none',
//     color: 'inherit',
//     display: 'block',
//   },
//   cardImage: {
//     height: '240px',
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   cardImageImg: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     transition: 'transform 0.3s',
//   },
//   cardBadge: {
//     position: 'absolute',
//     top: '16px',
//     right: '16px',
//     background: '#f59e0b',
//     color: 'white',
//     padding: '4px 12px',
//     borderRadius: '20px',
//     fontSize: '12px',
//     fontWeight: '600',
//   },
//   cardTypeBadge: {
//     position: 'absolute',
//     top: '16px',
//     left: '16px',
//     background: 'rgba(0,0,0,0.7)',
//     backdropFilter: 'blur(4px)',
//     color: 'white',
//     padding: '4px 12px',
//     borderRadius: '20px',
//     fontSize: '12px',
//     fontWeight: '600',
//   },
//   cardContent: {
//     padding: '20px',
//   },
//   cardTitle: {
//     fontSize: '18px',
//     fontWeight: '700',
//     color: '#1e293b',
//     marginBottom: '8px',
//   },
//   cardLocation: {
//     fontSize: '14px',
//     color: '#64748b',
//     marginBottom: '12px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '4px',
//   },
//   cardDetails: {
//     display: 'flex',
//     gap: '16px',
//     fontSize: '13px',
//     color: '#475569',
//     marginBottom: '16px',
//   },
//   cardPrice: {
//     fontSize: '24px',
//     fontWeight: '700',
//     color: '#667eea',
//     marginBottom: '16px',
//   },
//   cardButton: {
//     width: '100%',
//     padding: '10px',
//     background: 'white',
//     border: '2px solid #667eea',
//     borderRadius: '10px',
//     color: '#667eea',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s',
//     textAlign: 'center',
//   },
//   viewAllContainer: {
//     textAlign: 'center',
//     marginTop: '48px',
//   },
//   viewAllButton: {
//     display: 'inline-block',
//     padding: '12px 32px',
//     background: 'white',
//     border: '2px solid #667eea',
//     borderRadius: '12px',
//     color: '#667eea',
//     fontWeight: '600',
//     textDecoration: 'none',
//     transition: 'all 0.3s',
//   },
//   ctaSection: {
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     padding: '80px 24px',
//     textAlign: 'center',
//   },
//   ctaContent: {
//     maxWidth: '600px',
//     margin: '0 auto',
//   },
//   ctaTitle: {
//     fontSize: '32px',
//     fontWeight: '800',
//     color: 'white',
//     marginBottom: '16px',
//   },
//   ctaText: {
//     fontSize: '16px',
//     color: 'rgba(255,255,255,0.9)',
//     marginBottom: '32px',
//   },
//   ctaButton: {
//     padding: '14px 32px',
//     background: 'white',
//     color: '#667eea',
//     border: 'none',
//     borderRadius: '12px',
//     fontSize: '16px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s',
//   },
//   loadingContainer: {
//     textAlign: 'center',
//     padding: '40px',
//   },
//   loader: {
//     width: '40px',
//     height: '40px',
//     border: '3px solid #e2e8f0',
//     borderTopColor: '#667eea',
//     borderRadius: '50%',
//     animation: 'spin 1s linear infinite',
//     margin: '0 auto 16px',
//   },
//   emptyFeatured: {
//     textAlign: 'center',
//     padding: '40px',
//     background: 'white',
//     borderRadius: '20px',
//     color: '#64748b',
//   },
// };

// export default Home;



import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled, { keyframes, css } from 'styled-components';

// ---------- FIX LEAFLET MARKER ICONS ----------
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// ---------- ANIMATIONS ----------
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// ---------- STYLED COMPONENTS ----------
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9edf2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

// Hero Section
const HeroSection = styled.section`
  position: relative;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%);
  padding: 120px 24px 160px;
  text-align: center;
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='rgba(255,255,255,0.03)' d='M0 0 L100 0 L100 100 L0 100 Z'/%3E%3C/svg%3E");
    opacity: 0.4;
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 80px 16px 120px;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  animation: ${fadeInUp} 0.9s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  span {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StatsGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const StatItem = styled.div`
  text-align: center;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  border-radius: 40px;
  min-width: 140px;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.5px;
`;

// Search & Map Section
const SearchSection = styled.div`
  max-width: 1280px;
  margin: -80px auto 80px;
  padding: 0 24px;
  position: relative;
  z-index: 10;
`;

const SearchCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 32px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SearchHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
`;

const SearchTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
`;

const SearchForm = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  font-size: 0.95rem;
  transition: all 0.2s;
  background: white;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  font-size: 0.95rem;
  background: white;
  cursor: pointer;
  font-family: inherit;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1.25rem;

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

const PriceRangeWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  grid-column: span 2;

  @media (max-width: 768px) {
    grid-column: span 1;
    flex-direction: column;
    align-items: stretch;
  }
`;

const PriceSeparator = styled.span`
  color: #94a3b8;
  font-weight: 500;
`;

const MapCard = styled.div`
  background: white;
  border-radius: 32px;
  box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s;
`;

const MapHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8fafc;
  padding: 0.75rem 1rem;
  border-radius: 20px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #334155;
`;

const MapWrapper = styled.div`
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
`;

const RadiusControl = styled.div`
  background: #f8fafc;
  padding: 1rem;
  border-radius: 20px;
  margin: 1rem 0;
`;

const RadiusHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
  color: #0f172a;
`;

const RangeInput = styled.input`
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  background: #e2e8f0;
  border-radius: 3px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #8b5cf6;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
`;

const SearchButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
  color: white;
  border: none;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px -10px rgba(107, 70, 193, 0.4);
  }
`;

// Featured Properties
const FeaturedSection = styled.section`
  max-width: 1280px;
  margin: 0 auto 100px;
  padding: 0 24px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: #475569;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`;

const PropertyCard = styled(Link)`
  background: white;
  border-radius: 28px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.2);
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  height: 260px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;

  ${PropertyCard}:hover & {
    transform: scale(1.05);
  }
`;

const CardBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f59e0b;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 40px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const CardTypeBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 40px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
`;

const CardLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 1rem;
`;

const CardDetails = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #475569;
  margin-bottom: 1rem;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.75rem 0;
`;

const CardPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #8b5cf6;
  margin-bottom: 1rem;
`;

const CardButton = styled.div`
  width: 100%;
  text-align: center;
  padding: 0.75rem;
  background: #f1f5f9;
  border-radius: 40px;
  font-weight: 600;
  color: #334155;
  transition: all 0.2s;

  ${PropertyCard}:hover & {
    background: linear-gradient(135deg, #8b5cf6, #6d28d9);
    color: white;
  }
`;

const ViewAllContainer = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

const ViewAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: white;
  border: 2px solid #8b5cf6;
  border-radius: 60px;
  font-weight: 600;
  color: #8b5cf6;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background: #8b5cf6;
    color: white;
    transform: translateY(-2px);
  }
`;

// CTA Section
const CtaSection = styled.section`
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  padding: 80px 24px;
  text-align: center;
  margin-top: 60px;
`;

const CtaContent = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

const CtaTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
`;

const CtaText = styled.p`
  font-size: 1.125rem;
  color: #cbd5e1;
  margin-bottom: 2rem;
`;

const CtaButton = styled.button`
  padding: 1rem 2rem;
  background: white;
  color: #0f172a;
  border: none;
  border-radius: 60px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.3);
  }
`;

// Loading & Empty States
const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem;
`;

const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 3px solid #e2e8f0;
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto 1rem;
`;

const EmptyFeatured = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 32px;
  color: #64748b;
`;

// LocationMarker component for map
function LocationMarker({ setLocation }) {
  const map = useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return null;
}

// ---------- MAIN COMPONENT ----------
function Home() {
  const [searchParams, setSearchParams] = useState({
    location: '',
    type: 'all',
    propertyType: 'all',
    minPrice: '',
    maxPrice: '',
    radius: 5,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/properties');
      let properties = [];
      if (Array.isArray(res.data)) properties = res.data;
      else if (res.data.properties && Array.isArray(res.data.properties))
        properties = res.data.properties;
      setFeaturedProperties(properties.slice(0, 6));
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoadingFeatured(false);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchParams.location) params.append('location', searchParams.location);
    if (searchParams.type !== 'all') params.append('type', searchParams.type);
    if (searchParams.propertyType !== 'all')
      params.append('propertyType', searchParams.propertyType);
    if (searchParams.minPrice) params.append('minPrice', searchParams.minPrice);
    if (searchParams.maxPrice) params.append('maxPrice', searchParams.maxPrice);
    if (selectedLocation) {
      params.append('lat', selectedLocation.lat);
      params.append('lng', selectedLocation.lng);
      params.append('radius', searchParams.radius);
    }
    navigate(`/properties?${params.toString()}`);
  };

  const formatPrice = (price, type) => {
    if (price >= 1e7)
      return `₹${(price / 1e7).toFixed(1)} Cr${type === 'rent' ? '/mo' : ''}`;
    if (price >= 1e5)
      return `₹${(price / 1e5).toFixed(1)} Lac${type === 'rent' ? '/mo' : ''}`;
    return `₹${price.toLocaleString()}${type === 'rent' ? '/mo' : ''}`;
  };

  return (
    <Container>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Find Your <span>Dream Property</span>
          </HeroTitle>
          <HeroSubtitle>
            Discover the perfect place to call home with our curated collection of premium properties.
          </HeroSubtitle>
          <StatsGrid>
            <StatItem>
              <StatNumber>500+</StatNumber>
              <StatLabel>Properties</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>50+</StatNumber>
              <StatLabel>Cities</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>1000+</StatNumber>
              <StatLabel>Happy Clients</StatLabel>
            </StatItem>
          </StatsGrid>
        </HeroContent>
      </HeroSection>

      {/* Search & Map */}
      <SearchSection>
        <SearchCard>
          <SearchHeader>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <SearchTitle>Find Your Perfect Property</SearchTitle>
          </SearchHeader>
          <SearchForm>
            <InputGroup>
              <InputIcon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </InputIcon>
              <StyledInput
                type="text"
                placeholder="Enter city or area"
                value={searchParams.location}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, location: e.target.value })
                }
              />
            </InputGroup>
            <InputGroup>
              <InputIcon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <line x1="16" y1="21" x2="16" y2="15" />
                  <line x1="8" y1="21" x2="8" y2="15" />
                </svg>
              </InputIcon>
              <StyledSelect
                value={searchParams.type}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, type: e.target.value })
                }
              >
                <option value="all">All Types</option>
                <option value="sale">🏠 For Sale</option>
                <option value="rent">🔑 For Rent</option>
              </StyledSelect>
            </InputGroup>
            <InputGroup>
              <InputIcon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                </svg>
              </InputIcon>
              <StyledSelect
                value={searchParams.propertyType}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, propertyType: e.target.value })
                }
              >
                <option value="all">All Properties</option>
                <option value="house">🏘️ House</option>
                <option value="apartment">🏢 Apartment</option>
                <option value="condo">🏙️ Condo</option>
                <option value="land">🌳 Land</option>
                <option value="commercial">🏭 Commercial</option>
              </StyledSelect>
            </InputGroup>
            <PriceRangeWrapper>
              <InputGroup style={{ flex: 1 }}>
                <InputIcon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </InputIcon>
                <StyledInput
                  type="number"
                  placeholder="Min Price"
                  value={searchParams.minPrice}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, minPrice: e.target.value })
                  }
                />
              </InputGroup>
              <PriceSeparator>—</PriceSeparator>
              <InputGroup style={{ flex: 1 }}>
                <InputIcon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </InputIcon>
                <StyledInput
                  type="number"
                  placeholder="Max Price"
                  value={searchParams.maxPrice}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, maxPrice: e.target.value })
                  }
                />
              </InputGroup>
            </PriceRangeWrapper>
          </SearchForm>
        </SearchCard>

        <MapCard>
          <MapHeader>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Click on the map to select a location</span>
          </MapHeader>
          <MapWrapper>
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              style={{ height: '400px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <LocationMarker setLocation={setSelectedLocation} />
              {selectedLocation && (
                <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
                  <Popup>
                    <strong>Selected location</strong>
                    <br />
                    Lat: {selectedLocation.lat.toFixed(4)}
                    <br />
                    Lng: {selectedLocation.lng.toFixed(4)}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </MapWrapper>
          {selectedLocation && (
            <RadiusControl>
              <RadiusHeader>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <span>Search radius: {searchParams.radius} km</span>
              </RadiusHeader>
              <RangeInput
                type="range"
                min="1"
                max="50"
                value={searchParams.radius}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, radius: e.target.value })
                }
              />
            </RadiusControl>
          )}
          <SearchButton onClick={handleSearch}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Search Properties
          </SearchButton>
        </MapCard>
      </SearchSection>

      {/* Featured Properties */}
      <FeaturedSection>
        <SectionHeader>
          <SectionTitle>Featured Properties</SectionTitle>
          <SectionSubtitle>Hand-picked properties just for you</SectionSubtitle>
        </SectionHeader>

        {loadingFeatured ? (
          <LoadingContainer>
            <Loader />
            <p>Loading properties...</p>
          </LoadingContainer>
        ) : featuredProperties.length === 0 ? (
          <EmptyFeatured>
            <p>No properties available at the moment.</p>
          </EmptyFeatured>
        ) : (
          <>
            <FeaturedGrid>
              {featuredProperties.map((property) => (
                <PropertyCard to={`/property/${property._id}`} key={property._id}>
                  <CardImageWrapper>
                    <CardImage
                      src={
                        property.images?.[0] ||
                        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600'
                      }
                      alt={property.title}
                    />
                    <CardBadge>Featured</CardBadge>
                    <CardTypeBadge>
                      {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                    </CardTypeBadge>
                  </CardImageWrapper>
                  <CardContent>
                    <CardTitle>{property.title}</CardTitle>
                    <CardLocation>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {property.location.city}, {property.location.state}
                    </CardLocation>
                    <CardDetails>
                      <span>{property.bedrooms} Beds</span>
                      <span>{property.bathrooms} Baths</span>
                      <span>
                        {property.area.value} {property.area.unit}
                      </span>
                    </CardDetails>
                    <CardPrice>{formatPrice(property.price, property.type)}</CardPrice>
                    <CardButton>View Details</CardButton>
                  </CardContent>
                </PropertyCard>
              ))}
            </FeaturedGrid>
            <ViewAllContainer>
              <ViewAllButton to="/properties">
                View All Properties
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </ViewAllButton>
            </ViewAllContainer>
          </>
        )}
      </FeaturedSection>

      {/* CTA */}
      <CtaSection>
        <CtaContent>
          <CtaTitle>Ready to find your dream property?</CtaTitle>
          <CtaText>
            Join thousands of happy homeowners who found their perfect place with us.
          </CtaText>
          <CtaButton onClick={() => navigate('/register')}>Get Started →</CtaButton>
        </CtaContent>
      </CtaSection>
    </Container>
  );
}

export default Home;