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

import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import styled, { keyframes } from 'styled-components'
import {
  FaBed,
  FaBath,
  FaRuler,
  FaMapMarkerAlt,
  FaTrash,
  FaEye,
} from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`

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
`

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`

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
`

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
`

const PropertyBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${(props) => (props.type === 'sale' ? '#f59e0b' : '#10b981')};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
`

const PropertyInfo = styled.div`
  padding: 1.5rem;
`

const PropertyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`

const PropertyPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`

const PropertyLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`

const PropertyDetails = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1rem;
`

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #475569;
`

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(props) =>
    props.status === 'available'
      ? '#d1fae5'
      : props.status === 'sold'
        ? '#fee2e2'
        : '#fef3c7'};
  color: ${(props) =>
    props.status === 'available'
      ? '#059669'
      : props.status === 'sold'
        ? '#dc2626'
        : '#d97706'};
  margin-bottom: 1rem;
  display: inline-block;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`

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
`

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
`

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
    to {
      transform: rotate(360deg);
    }
  }
`

function MyProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      fetchProperties()
    }
  }, [user])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')

      if (!token) {
        setError('Please login to view your properties')
        return
      }

      // Get user ID from auth context (handle both _id and id)
      const userId = user?._id || user?.id

      console.log('Current user object:', user)
      console.log('User ID (from context):', userId)

      const response = await api.get('/properties', {
        headers: { 'x-auth-token': token },
      })

      console.log('All properties:', response.data)

      // Filter properties owned by current user
      const userProperties = response.data.filter((property) => {
        // Handle different possible structures of owner field
        let ownerId = null

        if (typeof property.owner === 'object' && property.owner !== null) {
          // Owner is populated object
          ownerId = property.owner._id || property.owner.id
        } else if (typeof property.owner === 'string') {
          // Owner is just an ID string
          ownerId = property.owner
        }

        console.log(
          `Property: ${property.title}, Owner ID: ${ownerId}, Current User ID: ${userId}`,
        )

        // Compare as strings to avoid type mismatches
        return ownerId && ownerId.toString() === userId?.toString()
      })

      console.log('Filtered user properties:', userProperties)
      setProperties(userProperties)
      setError('')
    } catch (error) {
      console.error('Error fetching properties:', error)
      setError('Failed to load properties. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const deleteProperty = async (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this property? This action cannot be undone.',
      )
    ) {
      try {
        const token = localStorage.getItem('token')
        await api.delete(`/properties/${id}`, {
          headers: { 'x-auth-token': token },
        })
        alert('Property deleted successfully!')
        // Refresh the list
        fetchProperties()
      } catch (error) {
        console.error('Error deleting property:', error)
        alert(error.response?.data?.message || 'Failed to delete property')
      }
    }
  }

  const formatPrice = (price, type) => {
    if (!price) return 'Price on request'

    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr${type === 'rent' ? '/month' : ''}`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lac${type === 'rent' ? '/month' : ''}`
    }
    return `₹${price.toLocaleString()}${type === 'rent' ? '/month' : ''}`
  }

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
    )
  }

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div className="spinner"></div>
          <p>Loading your properties...</p>
        </LoadingSpinner>
      </Container>
    )
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
    )
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
          <p>
            You haven't listed any properties. Click below to add your first
            property.
          </p>
          <Link to="/add-property">
            <Button className="view" style={{ padding: '0.75rem 1.5rem' }}>
              + Add Your First Property
            </Button>
          </Link>
        </EmptyState>
      ) : (
        <PropertiesGrid>
          {properties.map((property) => (
            <PropertyCard key={property._id}>
              <PropertyImage>
                <img
                  src={
                    property.images?.[0] ||
                    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'
                  }
                  alt={property.title}
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'
                  }}
                />
                <PropertyBadge type={property.type}>
                  {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                </PropertyBadge>
              </PropertyImage>

              <PropertyInfo>
                <PropertyTitle>{property.title}</PropertyTitle>
                <PropertyPrice>
                  {formatPrice(property.price, property.type)}
                </PropertyPrice>
                <PropertyLocation>
                  <MdLocationOn /> {property.location?.city},{' '}
                  {property.location?.state}
                </PropertyLocation>
                <StatusBadge status={property.status}>
                  {property.status?.toUpperCase() || 'AVAILABLE'}
                </StatusBadge>
                <PropertyDetails>
                  <DetailItem>
                    <FaBed /> {property.bedrooms || 0} beds
                  </DetailItem>
                  <DetailItem>
                    <FaBath /> {property.bathrooms || 0} baths
                  </DetailItem>
                  <DetailItem>
                    <FaRuler /> {property.area?.value || 0}{' '}
                    {property.area?.unit || 'sqft'}
                  </DetailItem>
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
  )
}

export default MyProperties
