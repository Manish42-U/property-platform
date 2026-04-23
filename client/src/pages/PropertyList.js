import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

import api from '../services/api'

function PropertyList() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('newest')
  const [error, setError] = useState('')
  const location = useLocation()

  useEffect(() => {
    fetchProperties()
  }, [location.search, sortBy])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const res = await api.get(`/properties${location.search}`)
      let sortedProperties = res.data

      if (sortBy === 'price-low') {
        sortedProperties.sort((a, b) => a.price - b.price)
      } else if (sortBy === 'price-high') {
        sortedProperties.sort((a, b) => b.price - a.price)
      } else if (sortBy === 'newest') {
        sortedProperties.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        )
      }

      setProperties(sortedProperties)
    } catch (error) {
      console.error('Error fetching properties:', error)
      if (error.response) {
        setError(
          `Server error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`,
        )
      } else if (error.request) {
        setError(
          'No response from server. Make sure backend is running on port 3000',
        )
      } else {
        setError(`Error: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  const getPropertyTypeIcon = (type) => {
    return type === 'sale' ? '🏠' : '🔑'
  }

  const formatPrice = (price, type) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr${type === 'rent' ? '/mo' : ''}`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} Lac${type === 'rent' ? '/mo' : ''}`
    }
    return `₹${price.toLocaleString()}${type === 'rent' ? '/mo' : ''}`
  }

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loader}></div>
        <p style={styles.loadingText}>Finding the best properties for you...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorIcon}>⚠️</div>
        <h3>Connection Error</h3>
        <p>{error}</p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Make sure backend is running:{' '}
          <code>cd backend && node server.js</code>
        </p>
        <button onClick={fetchProperties} style={styles.retryButton}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            .properties-grid {
              grid-template-columns: 1fr !important;
            }
            .toolbar {
              flex-direction: column !important;
              align-items: stretch !important;
            }
            .controls {
              justify-content: space-between !important;
            }
          }
          
          @media (max-width: 480px) {
            .property-title {
              font-size: 16px !important;
            }
            .property-price {
              font-size: 18px !important;
            }
            .property-image {
              height: 200px !important;
            }
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.heroOverlay}></div>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Find Your <span style={styles.gradientText}>Dream Property</span>
            </h1>
            <p style={styles.heroSubtitle}>
              {properties.length} properties available
            </p>
          </div>
        </div>

        <div style={styles.content}>
          <div className="toolbar" style={styles.toolbar}>
            <div style={styles.results}>
              📊 <span>{properties.length} properties found</span>
            </div>

            <div className="controls" style={styles.controls}>
              <div style={styles.sortControl}>
                🔽
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={styles.sortSelect}
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              <div style={styles.viewToggle}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    ...styles.viewButton,
                    ...(viewMode === 'grid' && styles.activeViewButton),
                  }}
                >
                  📱 Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    ...styles.viewButton,
                    ...(viewMode === 'list' && styles.activeViewButton),
                  }}
                >
                  📋 List
                </button>
              </div>
            </div>
          </div>

          {properties.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🏠</div>
              <h3>No properties found</h3>
              <p>Try adjusting your search filters</p>
              <Link to="/" style={styles.resetButton}>
                Reset Filters
              </Link>
            </div>
          ) : (
            <div
              className="properties-grid"
              style={{
                ...styles.propertiesGrid,
                ...(viewMode === 'list' && styles.propertiesList),
              }}
            >
              {properties.map((property) => (
                <Link
                  to={`/property/${property._id}`}
                  key={property._id}
                  style={{
                    ...styles.propertyCard,
                    ...(viewMode === 'list' && styles.propertyCardList),
                  }}
                  className="property-card"
                >
                  <div style={styles.imageContainer}>
                    <img
                      src={
                        property.images?.[0] ||
                        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'
                      }
                      alt={property.title}
                      style={styles.propertyImage}
                      className="property-image"
                    />
                    <div style={styles.badge}>
                      {property.type === 'sale' ? '🏠 For Sale' : '🔑 For Rent'}
                    </div>
                    {property.status === 'available' && (
                      <div style={styles.availableBadge}>✓ Available</div>
                    )}
                  </div>

                  <div style={styles.propertyInfo}>
                    <div style={styles.propertyHeader}>
                      <h3
                        className="property-title"
                        style={styles.propertyTitle}
                      >
                        {property.title}
                      </h3>
                      <div
                        className="property-price"
                        style={styles.propertyPrice}
                      >
                        {formatPrice(property.price, property.type)}
                      </div>
                    </div>

                    <div style={styles.propertyLocation}>
                      📍 {property.location?.city}, {property.location?.state}
                    </div>

                    <div style={styles.propertyDetails}>
                      <span>🛏️ {property.bedrooms} Beds</span>
                      <span>🛁 {property.bathrooms} Baths</span>
                      <span>
                        📐 {property.area?.value} {property.area?.unit}
                      </span>
                    </div>

                    <div style={styles.viewDetails}>View Details →</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f7fa',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    position: 'relative',
    padding: 'clamp(50px, 10vw, 80px) 20px',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='rgba(255,255,255,0.05)' d='M0 0 L100 0 L100 100 L0 100 Z'/%3E%3C/svg%3E\")",
    opacity: 0.1,
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: 'clamp(28px, 6vw, 48px)',
    fontWeight: '800',
    color: 'white',
    marginBottom: '12px',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: 'clamp(14px, 4vw, 18px)',
    color: 'rgba(255,255,255,0.9)',
  },
  content: {
    maxWidth: '1280px',
    margin: '-30px auto 0',
    padding: '0 16px 60px',
    position: 'relative',
    zIndex: 2,
  },
  toolbar: {
    background: 'white',
    borderRadius: '16px',
    padding: 'clamp(12px, 3vw, 16px)',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  results: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#475569',
    fontWeight: '500',
    fontSize: 'clamp(12px, 3vw, 14px)',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  sortControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    background: '#f8fafc',
    borderRadius: '10px',
  },
  sortSelect: {
    border: 'none',
    background: 'transparent',
    fontSize: 'clamp(12px, 3vw, 13px)',
    fontWeight: '500',
    color: '#1e293b',
    cursor: 'pointer',
    outline: 'none',
  },
  viewToggle: {
    display: 'flex',
    gap: '8px',
    background: '#f8fafc',
    padding: '4px',
    borderRadius: '10px',
  },
  viewButton: {
    padding: '6px 12px',
    border: 'none',
    background: 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: 'clamp(12px, 3vw, 13px)',
    transition: 'all 0.2s',
  },
  activeViewButton: {
    background: 'white',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    color: '#667eea',
  },
  propertiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 'clamp(16px, 4vw, 24px)',
  },
  propertiesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  propertyCard: {
    background: 'white',
    borderRadius: 'clamp(12px, 4vw, 16px)',
    overflow: 'hidden',
    textDecoration: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    cursor: 'pointer',
  },
  propertyCardList: {
    display: 'flex',
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  propertyImage: {
    width: '100%',
    height: 'clamp(200px, 30vw, 220px)',
    objectFit: 'cover',
    transition: 'transform 0.3s',
  },
  badge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: 'clamp(10px, 2.5vw, 12px)',
    fontWeight: '600',
  },
  availableBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: '#10b981',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: 'clamp(10px, 2.5vw, 12px)',
    fontWeight: '600',
  },
  propertyInfo: {
    padding: 'clamp(12px, 3vw, 16px)',
  },
  propertyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px',
    gap: '10px',
  },
  propertyTitle: {
    fontSize: 'clamp(14px, 3.5vw, 16px)',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
    flex: 1,
  },
  propertyPrice: {
    fontSize: 'clamp(16px, 4vw, 18px)',
    fontWeight: '800',
    color: '#667eea',
    whiteSpace: 'nowrap',
  },
  propertyLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: '#64748b',
    fontSize: 'clamp(11px, 2.5vw, 13px)',
    marginBottom: '12px',
  },
  propertyDetails: {
    display: 'flex',
    gap: '12px',
    padding: '12px 0',
    borderTop: '1px solid #e2e8f0',
    borderBottom: '1px solid #e2e8f0',
    marginBottom: '12px',
    fontSize: 'clamp(11px, 2.5vw, 13px)',
    color: '#475569',
    flexWrap: 'wrap',
  },
  viewDetails: {
    color: '#667eea',
    fontWeight: '600',
    fontSize: 'clamp(11px, 2.5vw, 13px)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  },
  emptyState: {
    textAlign: 'center',
    padding: 'clamp(40px, 10vw, 60px) 20px',
    background: 'white',
    borderRadius: '20px',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  resetButton: {
    display: 'inline-block',
    marginTop: '16px',
    padding: '10px 24px',
    background: '#667eea',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: 'clamp(12px, 3vw, 14px)',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#f5f7fa',
  },
  loader: {
    width: 'clamp(40px, 8vw, 48px)',
    height: 'clamp(40px, 8vw, 48px)',
    border: '3px solid #e2e8f0',
    borderTopColor: '#667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '16px',
    color: '#64748b',
    fontSize: 'clamp(12px, 3vw, 14px)',
  },
  errorContainer: {
    textAlign: 'center',
    padding: 'clamp(40px, 10vw, 60px) 20px',
    background: 'white',
    borderRadius: '20px',
    margin: '20px',
  },
  errorIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  retryButton: {
    marginTop: '16px',
    padding: '10px 24px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  },
}

export default PropertyList
