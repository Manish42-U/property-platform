// components/OwnerBookings.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import styled, { keyframes } from 'styled-components'
import api from '../services/api'

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaBed,
  FaBath,
  FaEye,
  FaCheck,
  FaTimes,
  FaBell,
  FaChartLine,
  FaUsers,
  FaBuilding,
} from 'react-icons/fa'
import { MdLocationOn, MdDateRange, MdVerified } from 'react-icons/md'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.5s ease-out;

  h1 {
    font-size: 2.5rem;
    color: white;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.6s ease-out;
`

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
  }

  ${(props) =>
    props.active &&
    `
    border: 2px solid #667eea;
    background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
  `}

  .stat-icon {
    font-size: 2rem;
    color: #667eea;
    margin-bottom: 0.5rem;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }

  .stat-label {
    color: #64748b;
    font-size: 0.875rem;
  }

  .badge-count {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ef4444;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: bold;
    animation: ${pulse} 1s infinite;
  }
`

const FilterTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  animation: ${fadeIn} 0.7s ease-out;
`

const FilterTab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  background: ${(props) =>
    props.active ? 'white' : 'rgba(255, 255, 255, 0.2)'};
  color: ${(props) => (props.active ? '#667eea' : 'white')};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: white;
    color: #667eea;
    transform: translateY(-2px);
  }
`

const BookingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${fadeIn} 0.8s ease-out;
`

const BookingCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  animation: ${slideIn} 0.5s ease-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  ${(props) =>
    props.isNew &&
    `
    border-left: 4px solid #f59e0b;
  `}
`

const CardHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  .booking-type {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-weight: 600;

    svg {
      font-size: 1.2rem;
    }
  }

  .booking-date {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(props) => {
    switch (props.status) {
      case 'confirmed':
        return '#d1fae5'
      case 'pending':
        return '#fef3c7'
      case 'cancelled':
        return '#fee2e2'
      case 'completed':
        return '#dbeafe'
      default:
        return '#f1f5f9'
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case 'confirmed':
        return '#059669'
      case 'pending':
        return '#d97706'
      case 'cancelled':
        return '#dc2626'
      case 'completed':
        return '#2563eb'
      default:
        return '#64748b'
    }
  }};
`

const CardBody = styled.div`
  padding: 1.5rem;
`

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const PropertySection = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`

const PropertyImage = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const PropertyInfo = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  .location {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #64748b;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .price {
    font-size: 1.25rem;
    font-weight: 700;
    color: #667eea;
  }
`

const UserSection = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 1rem;

  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .user-detail {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    color: #475569;

    svg {
      color: #667eea;
    }
  }
`

const BookingDetails = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;

  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e2e8f0;

    &:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: 600;
      color: #475569;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .value {
      color: #1e293b;
    }
  }
`

const MessageBox = styled.div`
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;

  .message-label {
    font-weight: 600;
    color: #92400e;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .message-text {
    color: #78350f;
    font-size: 0.875rem;
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  button {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
      transform: translateY(-2px);
    }

    &.accept {
      background: #d1fae5;
      color: #059669;

      &:hover {
        background: #a7f3d0;
      }
    }

    &.reject {
      background: #fee2e2;
      color: #dc2626;

      &:hover {
        background: #fecaca;
      }
    }

    &.contact {
      background: #e0e7ff;
      color: #4f46e5;

      &:hover {
        background: #c7d2fe;
      }
    }
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  .empty-icon {
    font-size: 5rem;
    color: #cbd5e1;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  p {
    color: #64748b;
  }
`

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 3rem;

  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  p {
    color: white;
  }
`

function OwnerBookings() {
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
  })
  const { user } = useAuth()

  useEffect(() => {
    if (user && user.role === 'owner') {
      fetchOwnerBookings()
    }
  }, [user])

  useEffect(() => {
    filterBookings()
  }, [activeFilter, bookings])

  const fetchOwnerBookings = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await api.get('/bookings/owner-bookings', {
        headers: { 'x-auth-token': token },
      })
      setBookings(res.data)

      // Calculate statistics
      const statsData = {
        total: res.data.length,
        pending: res.data.filter((b) => b.status === 'pending').length,
        confirmed: res.data.filter((b) => b.status === 'confirmed').length,
        cancelled: res.data.filter((b) => b.status === 'cancelled').length,
        completed: res.data.filter((b) => b.status === 'completed').length,
      }
      setStats(statsData)
    } catch (error) {
      console.error('Error fetching owner bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterBookings = () => {
    if (activeFilter === 'all') {
      setFilteredBookings(bookings)
    } else {
      setFilteredBookings(
        bookings.filter((booking) => booking.status === activeFilter),
      )
    }
  }

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const token = localStorage.getItem('token')
      await api.put(
        `/bookings/${bookingId}/status`,
        { status },
        { headers: { 'x-auth-token': token } },
      )
      alert(`Booking ${status} successfully!`)
      fetchOwnerBookings()
    } catch (error) {
      console.error('Error updating booking status:', error)
      alert('Failed to update booking status')
    }
  }

  const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle />
      case 'pending':
        return <FaHourglassHalf />
      case 'cancelled':
        return <FaTimesCircle />
      case 'completed':
        return <FaCheckCircle />
      default:
        return <FaClock />
    }
  }

  if (!user || user.role !== 'owner') {
    return (
      <Container>
        <EmptyState>
          <div className="empty-icon">
            <FaBuilding />
          </div>
          <h3>Access Denied</h3>
          <p>Only property owners can view this page.</p>
        </EmptyState>
      </Container>
    )
  }

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div className="spinner"></div>
          <p>Loading booking requests...</p>
        </LoadingSpinner>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <h1>
          <FaBell />
          Booking Requests
        </h1>
        <p>Manage booking requests for your properties</p>
      </Header>

      <StatsGrid>
        <StatCard
          onClick={() => setActiveFilter('all')}
          active={activeFilter === 'all'}
        >
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Requests</div>
        </StatCard>
        <StatCard
          onClick={() => setActiveFilter('pending')}
          active={activeFilter === 'pending'}
        >
          <div className="stat-icon">
            <FaHourglassHalf />
          </div>
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
          {stats.pending > 0 && (
            <div className="badge-count">{stats.pending}</div>
          )}
        </StatCard>
        <StatCard
          onClick={() => setActiveFilter('confirmed')}
          active={activeFilter === 'confirmed'}
        >
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-number">{stats.confirmed}</div>
          <div className="stat-label">Confirmed</div>
        </StatCard>
        <StatCard
          onClick={() => setActiveFilter('completed')}
          active={activeFilter === 'completed'}
        >
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </StatCard>
      </StatsGrid>

      <FilterTabs>
        <FilterTab
          onClick={() => setActiveFilter('all')}
          active={activeFilter === 'all'}
        >
          <FaHome /> All Bookings
        </FilterTab>
        <FilterTab
          onClick={() => setActiveFilter('pending')}
          active={activeFilter === 'pending'}
        >
          <FaHourglassHalf /> Pending
          {stats.pending > 0 && (
            <span
              style={{
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
              }}
            >
              {stats.pending}
            </span>
          )}
        </FilterTab>
        <FilterTab
          onClick={() => setActiveFilter('confirmed')}
          active={activeFilter === 'confirmed'}
        >
          <FaCheckCircle /> Confirmed
        </FilterTab>
        <FilterTab
          onClick={() => setActiveFilter('cancelled')}
          active={activeFilter === 'cancelled'}
        >
          <FaTimesCircle /> Cancelled
        </FilterTab>
      </FilterTabs>

      {filteredBookings.length === 0 ? (
        <EmptyState>
          <div className="empty-icon">
            <FaBell />
          </div>
          <h3>No Booking Requests</h3>
          <p>You don't have any booking requests for your properties yet.</p>
        </EmptyState>
      ) : (
        <BookingsList>
          {filteredBookings.map((booking) => (
            <BookingCard key={booking._id} isNew={booking.status === 'pending'}>
              <CardHeader>
                <div className="booking-type">
                  {booking.type === 'visit' ? <FaClock /> : <FaHome />}
                  <span>
                    {booking.type === 'visit'
                      ? 'Site Visit Request'
                      : 'Rental Request'}
                  </span>
                </div>
                <div className="booking-date">
                  <MdDateRange />
                  <span>Requested on: {formatDate(booking.createdAt)}</span>
                </div>
                <StatusBadge status={booking.status}>
                  {getStatusIcon(booking.status)}
                  {booking.status.toUpperCase()}
                </StatusBadge>
              </CardHeader>

              <CardBody>
                <TwoColumnGrid>
                  <PropertySection>
                    <PropertyImage>
                      <img
                        src={
                          booking.property?.images?.[0] ||
                          'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'
                        }
                        alt={booking.property?.title}
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'
                        }}
                      />
                    </PropertyImage>
                    <PropertyInfo>
                      <h3>{booking.property?.title}</h3>
                      <div className="location">
                        <MdLocationOn />
                        <span>
                          {booking.property?.location?.address},{' '}
                          {booking.property?.location?.city}
                        </span>
                      </div>
                      <div className="price">
                        <FaRupeeSign />{' '}
                        {booking.property?.price?.toLocaleString()}
                        {booking.type === 'rent' && '/month'}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '1rem',
                          marginTop: '0.5rem',
                        }}
                      >
                        <span>
                          <FaBed /> {booking.property?.bedrooms} beds
                        </span>
                        <span>
                          <FaBath /> {booking.property?.bathrooms} baths
                        </span>
                      </div>
                    </PropertyInfo>
                  </PropertySection>

                  <div>
                    <UserSection>
                      <h4>
                        <FaUser />
                        Customer Details
                      </h4>
                      <div className="user-detail">
                        <FaUser />
                        <strong>{booking.user?.name}</strong>
                      </div>
                      <div className="user-detail">
                        <FaEnvelope />
                        <a
                          href={`mailto:${booking.user?.email}`}
                          style={{ color: '#475569', textDecoration: 'none' }}
                        >
                          {booking.user?.email}
                        </a>
                      </div>
                      <div className="user-detail">
                        <FaPhone />
                        <a
                          href={`tel:${booking.user?.phone}`}
                          style={{ color: '#475569', textDecoration: 'none' }}
                        >
                          {booking.user?.phone || 'Not provided'}
                        </a>
                      </div>
                    </UserSection>

                    <BookingDetails>
                      <div className="detail-row">
                        <div className="label">
                          {booking.type === 'visit' ? (
                            <FaClock />
                          ) : (
                            <FaCalendarAlt />
                          )}
                          <span>
                            {booking.type === 'visit'
                              ? 'Visit Date'
                              : 'Booking Period'}
                          </span>
                        </div>
                        <div className="value">
                          {booking.type === 'visit'
                            ? formatDate(booking.visitDate)
                            : `${formatDate(booking.startDate)} - ${formatDate(booking.endDate)}`}
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="label">
                          <FaInfoCircle />
                          <span>Request ID</span>
                        </div>
                        <div className="value">
                          #{booking._id.slice(-8).toUpperCase()}
                        </div>
                      </div>
                    </BookingDetails>

                    {booking.message && (
                      <MessageBox>
                        <div className="message-label">
                          <FaEnvelope />
                          <span>Customer Message</span>
                        </div>
                        <div className="message-text">{booking.message}</div>
                      </MessageBox>
                    )}
                  </div>
                </TwoColumnGrid>

                {booking.status === 'pending' && (
                  <ActionButtons>
                    <button
                      className="accept"
                      onClick={() =>
                        updateBookingStatus(booking._id, 'confirmed')
                      }
                    >
                      <FaCheck /> Accept Request
                    </button>
                    <button
                      className="reject"
                      onClick={() =>
                        updateBookingStatus(booking._id, 'cancelled')
                      }
                    >
                      <FaTimes /> Reject Request
                    </button>
                    <button
                      className="contact"
                      onClick={() =>
                        (window.location.href = `tel:${booking.user?.phone}`)
                      }
                    >
                      <FaPhone /> Contact Customer
                    </button>
                  </ActionButtons>
                )}

                {booking.status === 'confirmed' && booking.type === 'visit' && (
                  <ActionButtons>
                    <button
                      className="contact"
                      onClick={() =>
                        (window.location.href = `tel:${booking.user?.phone}`)
                      }
                    >
                      <FaPhone /> Call Customer
                    </button>
                    <button
                      className="contact"
                      onClick={() =>
                        window.open(
                          `https://maps.google.com?q=${booking.property?.location?.coordinates?.lat},${booking.property?.location?.coordinates?.lng}`,
                          '_blank',
                        )
                      }
                    >
                      <MdLocationOn /> Share Directions
                    </button>
                  </ActionButtons>
                )}
              </CardBody>
            </BookingCard>
          ))}
        </BookingsList>
      )}
    </Container>
  )
}

export default OwnerBookings
