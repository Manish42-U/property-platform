



import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled, { keyframes, css } from 'styled-components';
import api from '../services/api'


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
      const res = await api.get('/properties');
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