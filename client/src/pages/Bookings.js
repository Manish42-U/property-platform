// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useAuth } from '../context/AuthContext';

// // function Bookings() {
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const { user } = useAuth();

// //   useEffect(() => {
// //     fetchBookings();
// //   }, []);

// //   const fetchBookings = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:3000/api/bookings/my-bookings');
// //       setBookings(res.data);
// //     } catch (error) {
// //       console.error('Error fetching bookings:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     switch(status) {
// //       case 'pending': return 'status-pending';
// //       case 'confirmed': return 'status-confirmed';
// //       case 'cancelled': return 'status-cancelled';
// //       case 'completed': return 'status-completed';
// //       default: return '';
// //     }
// //   };

// //   if (loading) {
// //     return <div className="loading">Loading...</div>;
// //   }

// //   return (
// //     <div className="bookings">
// //       <div className="container">
// //         <h1>My Bookings</h1>
// //         {bookings.length === 0 ? (
// //           <div className="no-bookings">
// //             <p>You haven't made any bookings yet.</p>
// //           </div>
// //         ) : (
// //           <div className="bookings-list">
// //             {bookings.map(booking => (
// //               <div key={booking._id} className="booking-card">
// //                 <div className="booking-property">
// //                   <img
// //                     src={booking.property.images[0] || 'https://via.placeholder.com/100x100'}
// //                     alt={booking.property.title}
// //                   />
// //                   <div className="booking-info">
// //                     <h3>{booking.property.title}</h3>
// //                     <p>{booking.property.location.address}, {booking.property.location.city}</p>
// //                     <p>Price: ₹{booking.property.price.toLocaleString()}</p>
// //                   </div>
// //                 </div>
// //                 <div className="booking-details">
// //                   <p><strong>Type:</strong> {booking.type === 'visit' ? 'Site Visit' : 'Rental'}</p>
// //                   {booking.type === 'visit' ? (
// //                     <p><strong>Visit Date:</strong> {new Date(booking.visitDate).toLocaleDateString()}</p>
// //                   ) : (
// //                     <>
// //                       <p><strong>From:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
// //                       <p><strong>To:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
// //                     </>
// //                   )}
// //                   <p><strong>Status:</strong> <span className={getStatusColor(booking.status)}>{booking.status}</span></p>
// //                   {booking.message && (
// //                     <p><strong>Message:</strong> {booking.message}</p>
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Bookings;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import styled, { keyframes } from 'styled-components';
// import {
//   FaCalendarAlt, FaMapMarkerAlt, FaRupeeSign, FaClock,
//   FaCheckCircle, FaTimesCircle, FaHourglassHalf,
//   FaHome, FaInfoCircle, FaEnvelope, FaPhone,
//   FaStar, FaStarHalf, FaRegStar, FaBed, FaBath
// } from 'react-icons/fa';
// import { MdVerified, MdLocationOn, MdDateRange } from 'react-icons/md';
// import { GiClockwork } from 'react-icons/gi';

// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const slideIn = keyframes`
//   from { opacity: 0; transform: translateX(-20px); }
//   to { opacity: 1; transform: translateX(0); }
// `;

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 2rem;
//   min-height: 100vh;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// `;

// const Header = styled.div`
//   text-align: center;
//   margin-bottom: 3rem;
//   animation: ${fadeIn} 0.5s ease-out;

//   h1 {
//     font-size: 2.5rem;
//     color: white;
//     margin-bottom: 0.5rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 1rem;

//     @media (max-width: 768px) {
//       font-size: 1.8rem;
//     }
//   }

//   p {
//     color: rgba(255, 255, 255, 0.9);
//     font-size: 1rem;
//   }
// `;

// const StatsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 1.5rem;
//   margin-bottom: 3rem;
//   animation: ${fadeIn} 0.6s ease-out;
// `;

// const StatCard = styled.div`
//   background: white;
//   border-radius: 16px;
//   padding: 1.5rem;
//   text-align: center;
//   box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s;

//   &:hover {
//     transform: translateY(-5px);
//   }

//   .stat-icon {
//     font-size: 2rem;
//     color: #667eea;
//     margin-bottom: 0.5rem;
//   }

//   .stat-number {
//     font-size: 2rem;
//     font-weight: 700;
//     color: #1e293b;
//     margin-bottom: 0.25rem;
//   }

//   .stat-label {
//     color: #64748b;
//     font-size: 0.875rem;
//   }
// `;

// const BookingsList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   animation: ${fadeIn} 0.7s ease-out;
// `;

// const BookingCard = styled.div`
//   background: white;
//   border-radius: 20px;
//   overflow: hidden;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s;
//   animation: ${slideIn} 0.5s ease-out;

//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
//   }
// `;

// const CardHeader = styled.div`
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   padding: 1rem 1.5rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   flex-wrap: wrap;
//   gap: 1rem;

//   .booking-type {
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     color: white;
//     font-weight: 600;

//     svg {
//       font-size: 1.2rem;
//     }
//   }

//   .booking-date {
//     color: rgba(255, 255, 255, 0.9);
//     font-size: 0.875rem;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//   }
// `;

// const StatusBadge = styled.span`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.25rem 1rem;
//   border-radius: 20px;
//   font-size: 0.75rem;
//   font-weight: 600;
//   background: ${props => {
//     switch(props.status) {
//       case 'confirmed': return '#d1fae5';
//       case 'pending': return '#fef3c7';
//       case 'cancelled': return '#fee2e2';
//       case 'completed': return '#dbeafe';
//       default: return '#f1f5f9';
//     }
//   }};
//   color: ${props => {
//     switch(props.status) {
//       case 'confirmed': return '#059669';
//       case 'pending': return '#d97706';
//       case 'cancelled': return '#dc2626';
//       case 'completed': return '#2563eb';
//       default: return '#64748b';
//     }
//   }};
// `;

// const CardBody = styled.div`
//   padding: 1.5rem;
// `;

// const PropertyInfo = styled.div`
//   display: flex;
//   gap: 1.5rem;
//   margin-bottom: 1.5rem;
//   flex-wrap: wrap;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const PropertyImage = styled.div`
//   width: 200px;
//   height: 150px;
//   border-radius: 12px;
//   overflow: hidden;
//   flex-shrink: 0;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const PropertyDetails = styled.div`
//   flex: 1;

//   h3 {
//     font-size: 1.25rem;
//     font-weight: 600;
//     color: #1e293b;
//     margin-bottom: 0.5rem;
//   }

//   .location {
//     display: flex;
//     align-items: center;
//     gap: 0.25rem;
//     color: #64748b;
//     font-size: 0.875rem;
//     margin-bottom: 0.5rem;
//   }

//   .price {
//     font-size: 1.5rem;
//     font-weight: 700;
//     color: #667eea;
//     margin-bottom: 0.5rem;
//   }

//   .features {
//     display: flex;
//     gap: 1rem;
//     margin-top: 0.5rem;

//     span {
//       display: flex;
//       align-items: center;
//       gap: 0.25rem;
//       font-size: 0.875rem;
//       color: #475569;
//     }
//   }
// `;

// const BookingDetails = styled.div`
//   background: #f8fafc;
//   border-radius: 12px;
//   padding: 1rem;
//   margin-top: 1rem;

//   .detail-row {
//     display: flex;
//     justify-content: space-between;
//     padding: 0.5rem 0;
//     border-bottom: 1px solid #e2e8f0;

//     &:last-child {
//       border-bottom: none;
//     }

//     .label {
//       font-weight: 600;
//       color: #475569;
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//     }

//     .value {
//       color: #1e293b;
//     }
//   }
// `;

// const MessageBox = styled.div`
//   background: #fef3c7;
//   border-left: 4px solid #f59e0b;
//   padding: 1rem;
//   border-radius: 8px;
//   margin-top: 1rem;

//   .message-label {
//     font-weight: 600;
//     color: #92400e;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     margin-bottom: 0.5rem;
//   }

//   .message-text {
//     color: #78350f;
//     font-size: 0.875rem;
//   }
// `;

// const ActionButtons = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-top: 1.5rem;

//   button {
//     flex: 1;
//     padding: 0.5rem 1rem;
//     border: none;
//     border-radius: 8px;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all 0.3s;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 0.5rem;

//     &:hover {
//       transform: translateY(-2px);
//     }

//     &.cancel {
//       background: #fee2e2;
//       color: #dc2626;

//       &:hover {
//         background: #fecaca;
//       }
//     }

//     &.contact {
//       background: #e0e7ff;
//       color: #4f46e5;

//       &:hover {
//         background: #c7d2fe;
//       }
//     }
//   }
// `;

// const EmptyState = styled.div`
//   text-align: center;
//   padding: 4rem;
//   background: white;
//   border-radius: 24px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   animation: ${fadeIn} 0.5s ease-out;

//   .empty-icon {
//     font-size: 5rem;
//     color: #cbd5e1;
//     margin-bottom: 1rem;
//   }

//   h3 {
//     font-size: 1.5rem;
//     color: #1e293b;
//     margin-bottom: 0.5rem;
//   }

//   p {
//     color: #64748b;
//     margin-bottom: 1.5rem;
//   }

//   .explore-btn {
//     display: inline-flex;
//     align-items: center;
//     gap: 0.5rem;
//     padding: 0.75rem 1.5rem;
//     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//     color: white;
//     border: none;
//     border-radius: 12px;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all 0.3s;

//     &:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
//     }
//   }
// `;

// const LoadingSpinner = styled.div`
//   text-align: center;
//   padding: 3rem;

//   .spinner {
//     width: 50px;
//     height: 50px;
//     border: 3px solid rgba(255, 255, 255, 0.3);
//     border-top-color: white;
//     border-radius: 50%;
//     animation: spin 1s linear infinite;
//     margin: 0 auto 1rem;
//   }

//   @keyframes spin {
//     to { transform: rotate(360deg); }
//   }

//   p {
//     color: white;
//     font-size: 1rem;
//   }
// `;

// function Bookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     total: 0,
//     confirmed: 0,
//     pending: 0,
//     completed: 0
//   });
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('http://localhost:3000/api/bookings/my-bookings', {
//         headers: { 'x-auth-token': token }
//       });
//       setBookings(res.data);

//       // Calculate statistics
//       const statsData = {
//         total: res.data.length,
//         confirmed: res.data.filter(b => b.status === 'confirmed').length,
//         pending: res.data.filter(b => b.status === 'pending').length,
//         completed: res.data.filter(b => b.status === 'completed').length
//       };
//       setStats(statsData);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cancelBooking = async (bookingId) => {
//     if (window.confirm('Are you sure you want to cancel this booking?')) {
//       try {
//         const token = localStorage.getItem('token');
//         await axios.put(`http://localhost:3000/api/bookings/${bookingId}/cancel`, {}, {
//           headers: { 'x-auth-token': token }
//         });
//         alert('Booking cancelled successfully');
//         fetchBookings();
//       } catch (error) {
//         console.error('Error cancelling booking:', error);
//         alert('Failed to cancel booking');
//       }
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch(status) {
//       case 'confirmed': return <FaCheckCircle />;
//       case 'pending': return <FaHourglassHalf />;
//       case 'cancelled': return <FaTimesCircle />;
//       case 'completed': return <FaCheckCircle />;
//       default: return <FaClock />;
//     }
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <Container>
//         <LoadingSpinner>
//           <div className="spinner"></div>
//           <p>Loading your bookings...</p>
//         </LoadingSpinner>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Header>
//         <h1>
//           <FaCalendarAlt />
//           My Bookings
//         </h1>
//         <p>Track and manage all your property bookings</p>
//       </Header>

//       {bookings.length > 0 && (
//         <StatsGrid>
//           <StatCard>
//             <div className="stat-icon">
//               <FaHome />
//             </div>
//             <div className="stat-number">{stats.total}</div>
//             <div className="stat-label">Total Bookings</div>
//           </StatCard>
//           <StatCard>
//             <div className="stat-icon">
//               <FaCheckCircle />
//             </div>
//             <div className="stat-number">{stats.confirmed}</div>
//             <div className="stat-label">Confirmed</div>
//           </StatCard>
//           <StatCard>
//             <div className="stat-icon">
//               <FaHourglassHalf />
//             </div>
//             <div className="stat-number">{stats.pending}</div>
//             <div className="stat-label">Pending</div>
//           </StatCard>
//           <StatCard>
//             <div className="stat-icon">
//               <GiClockwork />
//             </div>
//             <div className="stat-number">{stats.completed}</div>
//             <div className="stat-label">Completed</div>
//           </StatCard>
//         </StatsGrid>
//       )}

//       {bookings.length === 0 ? (
//         <EmptyState>
//           <div className="empty-icon">
//             <FaCalendarAlt />
//           </div>
//           <h3>No Bookings Yet</h3>
//           <p>You haven't made any property bookings. Start exploring properties to book your dream home!</p>
//           <button className="explore-btn" onClick={() => window.location.href = '/properties'}>
//             <FaHome /> Explore Properties
//           </button>
//         </EmptyState>
//       ) : (
//         <BookingsList>
//           {bookings.map(booking => (
//             <BookingCard key={booking._id}>
//               <CardHeader>
//                 <div className="booking-type">
//                   {booking.type === 'visit' ? <FaClock /> : <FaHome />}
//                   <span>{booking.type === 'visit' ? 'Site Visit Booking' : 'Rental Booking'}</span>
//                 </div>
//                 <div className="booking-date">
//                   <MdDateRange />
//                   <span>Booked on: {formatDate(booking.createdAt || booking.bookedAt)}</span>
//                 </div>
//                 <StatusBadge status={booking.status}>
//                   {getStatusIcon(booking.status)}
//                   {booking.status.toUpperCase()}
//                 </StatusBadge>
//               </CardHeader>

//               <CardBody>
//                 <PropertyInfo>
//                   <PropertyImage>
//                     <img
//                       src={booking.property?.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'}
//                       alt={booking.property?.title}
//                       onError={(e) => {
//                         e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400';
//                       }}
//                     />
//                   </PropertyImage>
//                   <PropertyDetails>
//                     <h3>{booking.property?.title || 'Property'}</h3>
//                     <div className="location">
//                       <MdLocationOn />
//                       <span>{booking.property?.location?.address}, {booking.property?.location?.city}, {booking.property?.location?.state}</span>
//                     </div>
//                     <div className="price">
//                       <FaRupeeSign />
//                       {booking.property?.price?.toLocaleString()}
//                       {booking.type === 'rent' && '/month'}
//                     </div>
//                     <div className="features">
//                       <span><FaBed /> {booking.property?.bedrooms || 0} beds</span>
//                       <span><FaBath /> {booking.property?.bathrooms || 0} baths</span>
//                     </div>
//                   </PropertyDetails>
//                 </PropertyInfo>

//                 <BookingDetails>
//                   <div className="detail-row">
//                     <div className="label">
//                       {booking.type === 'visit' ? <FaClock /> : <FaCalendarAlt />}
//                       <span>{booking.type === 'visit' ? 'Visit Date' : 'Booking Period'}</span>
//                     </div>
//                     <div className="value">
//                       {booking.type === 'visit' ? (
//                         formatDate(booking.visitDate)
//                       ) : (
//                         `${formatDate(booking.startDate)} - ${formatDate(booking.endDate)}`
//                       )}
//                     </div>
//                   </div>
//                   <div className="detail-row">
//                     <div className="label">
//                       <FaInfoCircle />
//                       <span>Booking ID</span>
//                     </div>
//                     <div className="value">
//                       #{booking._id.slice(-8).toUpperCase()}
//                     </div>
//                   </div>
//                 </BookingDetails>

//                 {booking.message && (
//                   <MessageBox>
//                     <div className="message-label">
//                       <FaEnvelope />
//                       <span>Additional Message</span>
//                     </div>
//                     <div className="message-text">{booking.message}</div>
//                   </MessageBox>
//                 )}

//                 {booking.status === 'pending' && (
//                   <ActionButtons>
//                     <button className="cancel" onClick={() => cancelBooking(booking._id)}>
//                       <FaTimesCircle /> Cancel Booking
//                     </button>
//                     <button className="contact" onClick={() => window.location.href = `mailto:${booking.property?.owner?.email}`}>
//                       <FaEnvelope /> Contact Owner
//                     </button>
//                   </ActionButtons>
//                 )}

//                 {booking.status === 'confirmed' && booking.type === 'visit' && (
//                   <ActionButtons>
//                     <button className="contact" onClick={() => window.location.href = `tel:${booking.property?.owner?.phone}`}>
//                       <FaPhone /> Call Owner
//                     </button>
//                     <button className="contact" onClick={() => window.open(`https://maps.google.com?q=${booking.property?.location?.coordinates?.lat},${booking.property?.location?.coordinates?.lng}`, '_blank')}>
//                       <MdLocationOn /> Get Directions
//                     </button>
//                   </ActionButtons>
//                 )}
//               </CardBody>
//             </BookingCard>
//           ))}
//         </BookingsList>
//       )}
//     </Container>
//   );
// }

// export default Bookings;

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
  FaStar,
  FaStarHalf,
  FaRegStar,
  FaBed,
  FaBath,
  FaUser,
  FaBuilding,
  FaBell,
  FaCheck,
  FaTimes,
} from 'react-icons/fa'
import { MdVerified, MdLocationOn, MdDateRange } from 'react-icons/md'
import { GiClockwork } from 'react-icons/gi'

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
  max-width: 1200px;
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

const RoleSwitch = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  button {
    padding: 0.75rem 2rem;
    border: 2px solid white;
    background: ${(props) => (props.active ? 'white' : 'transparent')};
    color: ${(props) => (props.active ? '#667eea' : 'white')};
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      transform: translateY(-2px);
      background: white;
      color: #667eea;
    }
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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

  &:hover {
    transform: translateY(-5px);
  }

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
`

const FilterTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`

const FilterTab = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  background: ${(props) =>
    props.active ? 'white' : 'rgba(255, 255, 255, 0.2)'};
  color: ${(props) => (props.active ? '#667eea' : 'white')};

  &:hover {
    background: white;
    color: #667eea;
  }
`

const BookingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${fadeIn} 0.7s ease-out;
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

const PropertyInfo = styled.div`
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

const PropertyDetails = styled.div`
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

  .features {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;

    span {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      color: #475569;
    }
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

    &.cancel {
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
  animation: ${fadeIn} 0.5s ease-out;

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
    margin-bottom: 1.5rem;
  }

  .explore-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }
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
    font-size: 1rem;
  }
`

function Bookings() {
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  })
  const { user } = useAuth()
  const isOwner = user?.role === 'owner'

  useEffect(() => {
    if (user) {
      fetchBookings()
    }
  }, [user])

  useEffect(() => {
    filterBookings()
  }, [activeFilter, bookings])

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token')
      let endpoint

      if (isOwner) {
        // Owner fetches booking requests for their properties
        endpoint = '/bookings/owner-bookings'
      } else {
        // User fetches their own bookings
        endpoint = '/bookings/my-bookings'
      }

      const res = await api.get(endpoint, {
        headers: { 'x-auth-token': token },
      })
      setBookings(res.data)

      // Calculate statistics
      const statsData = {
        total: res.data.length,
        confirmed: res.data.filter((b) => b.status === 'confirmed').length,
        pending: res.data.filter((b) => b.status === 'pending').length,
        completed: res.data.filter((b) => b.status === 'completed').length,
        cancelled: res.data.filter((b) => b.status === 'cancelled').length,
      }
      setStats(statsData)
    } catch (error) {
      console.error('Error fetching bookings:', error)
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
    if (window.confirm(`Are you sure you want to ${status} this booking?`)) {
      try {
        const token = localStorage.getItem('token')
        await axios.put(
          `http://localhost:3000/api/bookings/${bookingId}/status`,
          { status },
          { headers: { 'x-auth-token': token } },
        )
        alert(`Booking ${status} successfully!`)
        fetchBookings()
      } catch (error) {
        console.error('Error updating booking status:', error)
        alert('Failed to update booking status')
      }
    }
  }

  const cancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const token = localStorage.getItem('token')
        await axios.put(
          `http://localhost:3000/api/bookings/${bookingId}/cancel`,
          {},
          {
            headers: { 'x-auth-token': token },
          },
        )
        alert('Booking cancelled successfully')
        fetchBookings()
      } catch (error) {
        console.error('Error cancelling booking:', error)
        alert('Failed to cancel booking')
      }
    }
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

  const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div className="spinner"></div>
          <p>Loading {isOwner ? 'booking requests' : 'your bookings'}...</p>
        </LoadingSpinner>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <h1>
          {isOwner ? <FaBell /> : <FaCalendarAlt />}
          {isOwner ? 'Booking Requests' : 'My Bookings'}
        </h1>
        <p>
          {isOwner
            ? 'Manage booking requests for your properties'
            : 'Track and manage all your property bookings'}
        </p>
      </Header>

      {bookings.length > 0 && (
        <>
          <StatsGrid>
            <StatCard onClick={() => setActiveFilter('all')}>
              <div className="stat-icon">
                <FaHome />
              </div>
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">
                Total {isOwner ? 'Requests' : 'Bookings'}
              </div>
            </StatCard>
            <StatCard onClick={() => setActiveFilter('confirmed')}>
              <div className="stat-icon">
                <FaCheckCircle />
              </div>
              <div className="stat-number">{stats.confirmed}</div>
              <div className="stat-label">Confirmed</div>
            </StatCard>
            <StatCard onClick={() => setActiveFilter('pending')}>
              <div className="stat-icon">
                <FaHourglassHalf />
              </div>
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">Pending</div>
            </StatCard>
            <StatCard onClick={() => setActiveFilter('completed')}>
              <div className="stat-icon">
                <GiClockwork />
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
              All
            </FilterTab>
            <FilterTab
              onClick={() => setActiveFilter('pending')}
              active={activeFilter === 'pending'}
            >
              Pending {stats.pending > 0 && `(${stats.pending})`}
            </FilterTab>
            <FilterTab
              onClick={() => setActiveFilter('confirmed')}
              active={activeFilter === 'confirmed'}
            >
              Confirmed
            </FilterTab>
            <FilterTab
              onClick={() => setActiveFilter('completed')}
              active={activeFilter === 'completed'}
            >
              Completed
            </FilterTab>
            <FilterTab
              onClick={() => setActiveFilter('cancelled')}
              active={activeFilter === 'cancelled'}
            >
              Cancelled
            </FilterTab>
          </FilterTabs>
        </>
      )}

      {filteredBookings.length === 0 ? (
        <EmptyState>
          <div className="empty-icon">
            {isOwner ? <FaBell /> : <FaCalendarAlt />}
          </div>
          <h3>{isOwner ? 'No Booking Requests' : 'No Bookings Yet'}</h3>
          <p>
            {isOwner
              ? "You don't have any booking requests for your properties yet."
              : "You haven't made any property bookings. Start exploring properties to book your dream home!"}
          </p>
          <button
            className="explore-btn"
            onClick={() => (window.location.href = '/properties')}
          >
            <FaHome /> Explore Properties
          </button>
        </EmptyState>
      ) : (
        <BookingsList>
          {filteredBookings.map((booking) => (
            <BookingCard key={booking._id}>
              <CardHeader>
                <div className="booking-type">
                  {booking.type === 'visit' ? <FaClock /> : <FaHome />}
                  <span>
                    {booking.type === 'visit' ? 'Site Visit' : 'Rental'}{' '}
                    {isOwner ? 'Request' : 'Booking'}
                  </span>
                </div>
                <div className="booking-date">
                  <MdDateRange />
                  <span>
                    {isOwner ? 'Requested' : 'Booked'} on:{' '}
                    {formatDate(booking.createdAt)}
                  </span>
                </div>
                <StatusBadge status={booking.status}>
                  {getStatusIcon(booking.status)}
                  {booking.status.toUpperCase()}
                </StatusBadge>
              </CardHeader>

              <CardBody>
                <TwoColumnGrid>
                  <PropertyInfo>
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
                    <PropertyDetails>
                      <h3>{booking.property?.title || 'Property'}</h3>
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
                      <div className="features">
                        <span>
                          <FaBed /> {booking.property?.bedrooms || 0} beds
                        </span>
                        <span>
                          <FaBath /> {booking.property?.bathrooms || 0} baths
                        </span>
                      </div>
                    </PropertyDetails>
                  </PropertyInfo>

                  <div>
                    {/* Show customer details for owner, property owner details for user */}
                    {isOwner ? (
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
                    ) : (
                      <UserSection>
                        <h4>
                          <FaBuilding />
                          Property Owner Details
                        </h4>
                        <div className="user-detail">
                          <FaUser />
                          <strong>
                            {booking.property?.owner?.name || 'Property Owner'}
                          </strong>
                        </div>
                        <div className="user-detail">
                          <FaEnvelope />
                          <a
                            href={`mailto:${booking.property?.owner?.email}`}
                            style={{ color: '#475569', textDecoration: 'none' }}
                          >
                            {booking.property?.owner?.email || 'Not available'}
                          </a>
                        </div>
                        <div className="user-detail">
                          <FaPhone />
                          <a
                            href={`tel:${booking.property?.owner?.phone}`}
                            style={{ color: '#475569', textDecoration: 'none' }}
                          >
                            {booking.property?.owner?.phone || 'Not available'}
                          </a>
                        </div>
                      </UserSection>
                    )}

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
                          <span>Booking ID</span>
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
                          <span>
                            {isOwner
                              ? 'Customer Message'
                              : 'Additional Message'}
                          </span>
                        </div>
                        <div className="message-text">{booking.message}</div>
                      </MessageBox>
                    )}
                  </div>
                </TwoColumnGrid>

                {/* Action buttons based on role and status */}
                {isOwner && booking.status === 'pending' && (
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

                {!isOwner && booking.status === 'pending' && (
                  <ActionButtons>
                    <button
                      className="cancel"
                      onClick={() => cancelBooking(booking._id)}
                    >
                      <FaTimesCircle /> Cancel Booking
                    </button>
                    <button
                      className="contact"
                      onClick={() =>
                        (window.location.href = `mailto:${booking.property?.owner?.email}`)
                      }
                    >
                      <FaEnvelope /> Contact Owner
                    </button>
                  </ActionButtons>
                )}

                {booking.status === 'confirmed' && booking.type === 'visit' && (
                  <ActionButtons>
                    <button
                      className="contact"
                      onClick={() =>
                        (window.location.href = `tel:${isOwner ? booking.user?.phone : booking.property?.owner?.phone}`)
                      }
                    >
                      <FaPhone /> Call {isOwner ? 'Customer' : 'Owner'}
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
                      <MdLocationOn /> Get Directions
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

export default Bookings
