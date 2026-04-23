// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background: white;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  
//   th, td {
//     padding: 1rem;
//     text-align: left;
//     border-bottom: 1px solid #ddd;
//   }
  
//   th {
//     background: #f5f5f5;
//     font-weight: 600;
//   }
  
//   tr:hover {
//     background: #f9f9f9;
//   }
// `;

// const StatusBadge = styled.span`
//   background: ${props => 
//     props.status === 'confirmed' ? '#28a745' : 
//     props.status === 'pending' ? '#ffc107' : 
//     props.status === 'cancelled' ? '#dc3545' : 
//     '#6c757d'
//   };
//   color: white;
//   padding: 4px 8px;
//   border-radius: 4px;
//   font-size: 12px;
//   display: inline-block;
// `;

// const Select = styled.select`
//   padding: 4px 8px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   margin-right: 8px;
// `;

// const Button = styled.button`
//   padding: 4px 12px;
//   background: #dc3545;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
  
//   &:hover {
//     background: #c82333;
//   }
// `;

// function AdminBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(null);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/admin/bookings', {
//         headers: { 'x-auth-token': token }
//       });
//       setBookings(response.data);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//       alert('Failed to fetch bookings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateBookingStatus = async (bookingId, newStatus) => {
//     setUpdating(bookingId);
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(`http://localhost:3000/api/admin/bookings/${bookingId}/status`, 
//         { status: newStatus },
//         { headers: { 'x-auth-token': token } }
//       );
//       alert('Booking status updated successfully!');
//       fetchBookings();
//     } catch (error) {
//       console.error('Error updating booking status:', error);
//       alert('Failed to update booking status');
//     } finally {
//       setUpdating(null);
//     }
//   };

//   const deleteBooking = async (bookingId) => {
//     if (window.confirm('Are you sure you want to delete this booking?')) {
//       try {
//         const token = localStorage.getItem('token');
//         await axios.delete(`http://localhost:3000/api/admin/bookings/${bookingId}`, {
//           headers: { 'x-auth-token': token }
//         });
//         alert('Booking deleted successfully!');
//         fetchBookings();
//       } catch (error) {
//         console.error('Error deleting booking:', error);
//         alert('Failed to delete booking');
//       }
//     }
//   };

//   if (loading) {
//     return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading bookings...</div>;
//   }

//   return (
//     <div>
//       <h1 style={{ marginBottom: '1.5rem' }}>Manage Bookings</h1>
//       <Table>
//         <thead>
//           <tr>
//             <th>Property</th>
//             <th>User</th>
//             <th>Type</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Message</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map(booking => (
//             <tr key={booking._id}>
//               <td>{booking.property?.title || 'Unknown'}</td>
//               <td>{booking.user?.name || 'Unknown'}</td>
//               <td>{booking.type === 'visit' ? 'Site Visit' : 'Rental'}</td>
//               <td>
//                 {booking.type === 'visit' 
//                   ? new Date(booking.visitDate).toLocaleDateString()
//                   : `${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}`
//                 }
//               </td>
//               <td>
//                 <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
//               </td>
//               <td>{booking.message?.substring(0, 50) || '-'}</td>
//               <td>
//                 <Select 
//                   value={booking.status}
//                   onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
//                   disabled={updating === booking._id}
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="confirmed">Confirmed</option>
//                   <option value="cancelled">Cancelled</option>
//                   <option value="completed">Completed</option>
//                 </Select>
//                 <Button onClick={() => deleteBooking(booking._id)} disabled={updating === booking._id}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default AdminBookings;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import api from '../services/api'


const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: #f8fafc;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #1e293b 0%, #2d3a4a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #64748b;
    font-size: 0.95rem;
  }
`;

const TableWrapper = styled.div`
  background: white;
  border-radius: 24px;
  overflow-x: auto;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
  
  th, td {
    padding: 1rem 1rem;
    text-align: left;
    border-bottom: 1px solid #f1f5f9;
  }
  
  th {
    background: #fafcff;
    font-weight: 600;
    color: #475569;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  tr {
    transition: background 0.2s;
    
    &:hover {
      background: #f8fafc;
    }
  }
  
  td {
    color: #334155;
    font-size: 0.9rem;
  }
`;

const StatusBadge = styled.span`
  background: ${props => 
    props.status === 'confirmed' ? '#10b981' : 
    props.status === 'pending' ? '#f59e0b' : 
    props.status === 'cancelled' ? '#ef4444' : 
    props.status === 'completed' ? '#3b82f6' : 
    '#94a3b8'
  };
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
`;

const Select = styled.select`
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102,126,234,0.1);
  }
`;

const DeleteButton = styled.button`
  padding: 6px 12px;
  background: #fee2e2;
  color: #ef4444;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 8px;
  
  &:hover {
    background: #fecaca;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 4rem;
  
  .spinner {
    width: 48px;
    height: 48px;
    border: 3px solid #e2e8f0;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const fetchBookings = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/admin/bookings', {
        headers: { 'x-auth-token': token }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateBookingStatus = async (bookingId, newStatus) => {
    setUpdating(bookingId);
    try {
      const token = localStorage.getItem('token');
      await api.put(`/admin/bookings/${bookingId}/status`, 
        { status: newStatus },
        { headers: { 'x-auth-token': token } }
      );
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status');
    } finally {
      setUpdating(null);
    }
  };

  const deleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/admin/bookings/${bookingId}`, {
          headers: { 'x-auth-token': token }
        });
        fetchBookings();
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Failed to delete booking');
      }
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div className="spinner"></div>
          <p style={{ color: '#64748b' }}>Loading bookings...</p>
        </LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>Manage Bookings</h1>
        <p>View and manage all booking requests</p>
      </Header>
      
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Property</th>
              <th>User</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td style={{ fontWeight: '500' }}>{booking.property?.title || 'Unknown'}</td>
                <td>{booking.user?.name || 'Unknown'}</td>
                <td>
                  {booking.type === 'visit' ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      📍 Site Visit
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      🔑 Rental
                    </span>
                  )}
                </td>
                <td>
                  {booking.type === 'visit' 
                    ? new Date(booking.visitDate).toLocaleDateString()
                    : `${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}`
                  }
                </td>
                <td>
                  <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
                </td>
                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {booking.message || '-'}
                </td>
                <td>
                  <Select 
                    value={booking.status}
                    onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                    disabled={updating === booking._id}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </Select>
                  <DeleteButton onClick={() => deleteBooking(booking._id)} disabled={updating === booking._id}>
                    Delete
                  </DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
}

export default AdminBookings;