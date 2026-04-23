
// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background: white;
//   border-radius: 10px;
//   overflow-x: auto;
//   display: block;
  
//   th, td {
//     padding: 12px;
//     text-align: left;
//     border-bottom: 1px solid #ddd;
//   }
  
//   th {
//     background: #f5f5f5;
//     font-weight: 600;
//   }
  
//   @media (max-width: 768px) {
//     th, td {
//       padding: 8px;
//       font-size: 12px;
//     }
//   }
// `;

// const RoleBadge = styled.span`
//   background: ${props => 
//     props.role === 'admin' ? '#dc3545' : 
//     props.role === 'owner' ? '#28a745' : 
//     '#007bff'
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
  
//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// function AdminUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(null);
//   const [error, setError] = useState('');

//   const fetchUsers = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('No token found. Please login again.');
//         setLoading(false);
//         return;
//       }
      
//       const response = await axios.get('http://localhost:3000/api/admin/users', {
//         headers: { 'x-auth-token': token }
//       });
//       setUsers(response.data);
//       setError('');
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       if (error.response?.status === 403) {
//         setError('Access denied. Admin only.');
//       } else if (error.response?.status === 401) {
//         setError('Please login again.');
//       } else {
//         setError('Failed to fetch users: ' + (error.response?.data?.message || error.message));
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   const updateUserRole = async (userId, newRole) => {
//     setUpdating(userId);
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(`http://localhost:3000/api/admin/users/${userId}/role`, 
//         { role: newRole },
//         { headers: { 'x-auth-token': token } }
//       );
//       alert('User role updated successfully!');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error updating user role:', error);
//       alert('Failed to update user role: ' + (error.response?.data?.message || error.message));
//     } finally {
//       setUpdating(null);
//     }
//   };

//   const deleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user? This will also delete all their properties.')) {
//       try {
//         const token = localStorage.getItem('token');
//         await axios.delete(`http://localhost:3000/api/admin/users/${userId}`, {
//           headers: { 'x-auth-token': token }
//         });
//         alert('User deleted successfully!');
//         fetchUsers();
//       } catch (error) {
//         console.error('Error deleting user:', error);
//         alert('Failed to delete user: ' + (error.response?.data?.message || error.message));
//       }
//     }
//   };

//   if (loading) {
//     return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading users...</div>;
//   }

//   if (error) {
//     return (
//       <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
//         <h3>Error</h3>
//         <p>{error}</p>
//         <button onClick={fetchUsers} style={{ marginTop: '1rem', padding: '8px 16px', cursor: 'pointer' }}>
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1 style={{ marginBottom: '1.5rem' }}>Manage Users</h1>
//       <div style={{ overflowX: 'auto' }}>
//         <Table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Role</th>
//               <th>Joined</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user._id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.phone}</td>
//                 <td>
//                   <RoleBadge role={user.role}>{user.role}</RoleBadge>
//                 </td>
//                 <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                 <td>
//                   <Select 
//                     value={user.role}
//                     onChange={(e) => updateUserRole(user._id, e.target.value)}
//                     disabled={updating === user._id}
//                   >
//                     <option value="user">User</option>
//                     <option value="owner">Owner</option>
//                     <option value="admin">Admin</option>
//                   </Select>
//                   <Button onClick={() => deleteUser(user._id)} disabled={updating === user._id}>
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// export default AdminUsers;

// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';

// const Container = styled.div`
//   max-width: 1400px;
//   margin: 0 auto;
//   padding: 2rem;
//   background: #f8fafc;
//   min-height: 100vh;
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
// `;

// const Header = styled.div`
//   margin-bottom: 2rem;
  
//   h1 {
//     font-size: 2rem;
//     font-weight: 700;
//     background: linear-gradient(135deg, #1e293b 0%, #2d3a4a 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     margin-bottom: 0.5rem;
//   }
  
//   p {
//     color: #64748b;
//     font-size: 0.95rem;
//   }
// `;

// const StatsBar = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 2rem;
//   flex-wrap: wrap;
// `;

// const StatChip = styled.div`
//   background: white;
//   padding: 0.75rem 1.5rem;
//   border-radius: 40px;
//   box-shadow: 0 1px 3px rgba(0,0,0,0.05);
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
  
//   .stat-label {
//     font-size: 0.85rem;
//     color: #64748b;
//   }
  
//   .stat-number {
//     font-size: 1.25rem;
//     font-weight: 700;
//     color: #1e293b;
//   }
// `;

// const TableWrapper = styled.div`
//   background: white;
//   border-radius: 24px;
//   overflow-x: auto;
//   box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   min-width: 800px;
  
//   th, td {
//     padding: 1rem 1.25rem;
//     text-align: left;
//     border-bottom: 1px solid #f1f5f9;
//   }
  
//   th {
//     background: #fafcff;
//     font-weight: 600;
//     color: #475569;
//     font-size: 0.85rem;
//     text-transform: uppercase;
//     letter-spacing: 0.5px;
//   }
  
//   tr {
//     transition: background 0.2s;
    
//     &:hover {
//       background: #f8fafc;
//     }
//   }
  
//   td {
//     color: #334155;
//     font-size: 0.9rem;
//   }
// `;

// const RoleBadge = styled.span`
//   background: ${props => {
//     switch(props.$role) {
//       case 'admin': return '#ef4444';
//       case 'owner': return '#10b981';
//       default: return '#3b82f6';
//     }
//   }};
//   color: white;
//   padding: 4px 12px;
//   border-radius: 20px;
//   font-size: 12px;
//   font-weight: 600;
//   display: inline-block;
// `;

// const Select = styled.select`
//   padding: 6px 12px;
//   border: 1px solid #e2e8f0;
//   border-radius: 10px;
//   font-size: 13px;
//   background: white;
//   cursor: pointer;
//   transition: all 0.2s;
  
//   &:focus {
//     outline: none;
//     border-color: #667eea;
//     box-shadow: 0 0 0 2px rgba(102,126,234,0.1);
//   }
  
//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// const DeleteButton = styled.button`
//   padding: 6px 12px;
//   background: #fee2e2;
//   color: #ef4444;
//   border: none;
//   border-radius: 10px;
//   font-size: 12px;
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 0.2s;
//   margin-left: 8px;
  
//   &:hover {
//     background: #fecaca;
//     transform: translateY(-1px);
//   }
  
//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//     transform: none;
//   }
// `;

// const LoadingSpinner = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 4rem;
  
//   .spinner {
//     width: 48px;
//     height: 48px;
//     border: 3px solid #e2e8f0;
//     border-top-color: #667eea;
//     border-radius: 50%;
//     animation: spin 1s linear infinite;
//     margin-bottom: 1rem;
//   }
  
//   p {
//     color: #64748b;
//   }
  
//   @keyframes spin {
//     to { transform: rotate(360deg); }
//   }
// `;

// const ErrorContainer = styled.div`
//   text-align: center;
//   padding: 4rem;
//   background: white;
//   border-radius: 24px;
//   box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  
//   .error-icon {
//     font-size: 3rem;
//     margin-bottom: 1rem;
//   }
  
//   h3 {
//     color: #ef4444;
//     margin-bottom: 0.5rem;
//     font-size: 1.25rem;
//   }
  
//   p {
//     color: #64748b;
//     margin-bottom: 1.5rem;
//   }
  
//   button {
//     padding: 10px 24px;
//     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//     color: white;
//     border: none;
//     border-radius: 12px;
//     cursor: pointer;
//     font-weight: 500;
//     transition: all 0.2s;
    
//     &:hover {
//       transform: translateY(-2px);
//       box-shadow: 0 4px 12px rgba(102,126,234,0.3);
//     }
//   }
// `;

// const EmptyState = styled.div`
//   text-align: center;
//   padding: 4rem;
//   color: #94a3b8;
  
//   .empty-icon {
//     font-size: 4rem;
//     margin-bottom: 1rem;
//     opacity: 0.5;
//   }
  
//   p {
//     font-size: 0.9rem;
//   }
// `;

// function AdminUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(null);
//   const [error, setError] = useState('');

//   const fetchUsers = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         setError('No authentication token found. Please login again.');
//         setLoading(false);
//         return;
//       }
      
//       const response = await axios.get('http://localhost:3000/api/admin/users', {
//         headers: { 
//           'x-auth-token': token,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       // Handle different response structures
//       const usersData = response.data.users || response.data || [];
//       setUsers(usersData);
      
//     } catch (error) {
//       console.error('Error fetching users:', error);
      
//       if (error.response?.status === 403) {
//         setError('Access denied. Admin privileges required.');
//       } else if (error.response?.status === 401) {
//         setError('Session expired. Please login again.');
//         localStorage.removeItem('token');
//       } else if (error.response?.data?.message) {
//         setError(error.response.data.message);
//       } else if (error.message === 'Network Error') {
//         setError('Network error. Please check your connection.');
//       } else {
//         setError('Failed to fetch users. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   const updateUserRole = async (userId, newRole) => {
//     setUpdating(userId);
//     try {
//       const token = localStorage.getItem('token');
      
//       await axios.put(`http://localhost:3000/api/admin/users/${userId}/role`, 
//         { role: newRole },
//         { 
//           headers: { 
//             'x-auth-token': token,
//             'Content-Type': 'application/json'
//           } 
//         }
//       );
      
//       // Update local state
//       setUsers(prevUsers => 
//         prevUsers.map(user => 
//           user._id === userId ? { ...user, role: newRole } : user
//         )
//       );
      
//     } catch (error) {
//       console.error('Error updating user role:', error);
//       alert(error.response?.data?.message || 'Failed to update user role');
//     } finally {
//       setUpdating(null);
//     }
//   };

//   const deleteUser = async (userId) => {
//     if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone and will also delete all their properties and bookings.')) {
//       return;
//     }
    
//     try {
//       const token = localStorage.getItem('token');
      
//       await axios.delete(`http://localhost:3000/api/admin/users/${userId}`, {
//         headers: { 'x-auth-token': token }
//       });
      
//       // Remove user from local state
//       setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       alert(error.response?.data?.message || 'Failed to delete user');
//     }
//   };

//   // Calculate stats
//   const stats = {
//     total: users.length,
//     owners: users.filter(u => u.role === 'owner').length,
//     admins: users.filter(u => u.role === 'admin').length,
//     users: users.filter(u => u.role === 'user').length
//   };

//   if (loading) {
//     return (
//       <Container>
//         <LoadingSpinner>
//           <div className="spinner"></div>
//           <p>Loading users...</p>
//         </LoadingSpinner>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container>
//         <ErrorContainer>
//           <div className="error-icon">⚠️</div>
//           <h3>{error}</h3>
//           <p>Please make sure you have admin privileges and are logged in correctly.</p>
//           <button onClick={fetchUsers}>Try Again</button>
//         </ErrorContainer>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Header>
//         <h1>Manage Users</h1>
//         <p>View and manage all platform users</p>
//       </Header>
      
//       <StatsBar>
//         <StatChip>
//           <span className="stat-label">Total Users</span>
//           <span className="stat-number">{stats.total}</span>
//         </StatChip>
//         <StatChip>
//           <span className="stat-label">👤 Users</span>
//           <span className="stat-number">{stats.users}</span>
//         </StatChip>
//         <StatChip>
//           <span className="stat-label">🏠 Owners</span>
//           <span className="stat-number">{stats.owners}</span>
//         </StatChip>
//         <StatChip>
//           <span className="stat-label">⚡ Admins</span>
//           <span className="stat-number">{stats.admins}</span>
//         </StatChip>
//       </StatsBar>
      
//       <TableWrapper>
//         {users.length === 0 ? (
//           <EmptyState>
//             <div className="empty-icon">👥</div>
//             <p>No users found</p>
//           </EmptyState>
//         ) : (
//           <Table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Role</th>
//                 <th>Joined</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map(user => (
//                 <tr key={user._id}>
//                   <td style={{ fontWeight: '500' }}>{user.name || 'N/A'}</td>
//                   <td>{user.email || 'N/A'}</td>
//                   <td>{user.phone || 'N/A'}</td>
//                   <td>
//                     <RoleBadge $role={user.role}>
//                       {user.role === 'admin' ? '⚡ Admin' : user.role === 'owner' ? '🏠 Owner' : '👤 User'}
//                     </RoleBadge>
//                   </td>
//                   <td>
//                     {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//                   </td>
//                   <td>
//                     <Select 
//                       value={user.role}
//                       onChange={(e) => updateUserRole(user._id, e.target.value)}
//                       disabled={updating === user._id}
//                     >
//                       <option value="user">User</option>
//                       <option value="owner">Owner</option>
//                       <option value="admin">Admin</option>
//                     </Select>
//                     <DeleteButton 
//                       onClick={() => deleteUser(user._id)} 
//                       disabled={updating === user._id}
//                     >
//                       Delete
//                     </DeleteButton>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </TableWrapper>
      
//       <style>{`
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </Container>
//   );
// }

// export default AdminUsers;


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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

const StatsBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const StatChip = styled.div`
  background: white;
  padding: 0.75rem 1.5rem;
  border-radius: 40px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  .stat-label {
    font-size: 0.85rem;
    color: #64748b;
  }
  
  .stat-number {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
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
    padding: 1rem 1.25rem;
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

const RoleBadge = styled.span`
  background: ${props => {
    switch(props.$role) {
      case 'admin': return '#ef4444';
      case 'owner': return '#10b981';
      default: return '#3b82f6';
    }
  }};
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
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
    transform: none;
  }
`;

// New styled button for password reset
const ResetPasswordButton = styled.button`
  padding: 6px 12px;
  background: #dbeafe;
  color: #2563eb;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 8px;
  
  &:hover {
    background: #bfdbfe;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  
  .spinner {
    width: 48px;
    height: 48px;
    border: 3px solid #e2e8f0;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  p {
    color: #64748b;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 24px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  
  .error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #ef4444;
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
  }
  
  p {
    color: #64748b;
    margin-bottom: 1.5rem;
  }
  
  button {
    padding: 10px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102,126,234,0.3);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: #94a3b8;
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  p {
    font-size: 0.9rem;
  }
`;

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 24px;
  padding: 2rem;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
  
  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #1e293b;
  }
  
  input {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-size: 0.9rem;
    
    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 2px rgba(102,126,234,0.1);
    }
  }
  
  .buttons {
    display: flex;
    gap: 12px;
    margin-top: 20px;
    justify-content: flex-end;
  }
  
  button {
    padding: 8px 20px;
    border-radius: 40px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
  }
  
  .cancel-btn {
    background: #f1f5f9;
    color: #475569;
    
    &:hover {
      background: #e2e8f0;
    }
  }
  
  .reset-btn {
    background: #ef4444;
    color: white;
    
    &:hover {
      background: #dc2626;
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  
  .error-msg {
    color: #ef4444;
    font-size: 0.8rem;
    margin-top: 8px;
  }
`;

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [error, setError] = useState('');
  
  // Password reset modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found. Please login again.');
        setLoading(false);
        return;
      }
      
      const response = await api.get('/admin/users', {
        headers: { 
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });
      
      // Handle different response structures
      const usersData = response.data.users || response.data || [];
      setUsers(usersData);
      
    } catch (error) {
      console.error('Error fetching users:', error);
      
      if (error.response?.status === 403) {
        setError('Access denied. Admin privileges required.');
      } else if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message === 'Network Error') {
        setError('Network error. Please check your connection.');
      } else {
        setError('Failed to fetch users. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateUserRole = async (userId, newRole) => {
    setUpdating(userId);
    try {
      const token = localStorage.getItem('token');
      
      await api.put(`/admin/users/${userId}/role`, 
        { role: newRole },
        { 
          headers: { 
            'x-auth-token': token,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      
    } catch (error) {
      console.error('Error updating user role:', error);
      alert(error.response?.data?.message || 'Failed to update user role');
    } finally {
      setUpdating(null);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone and will also delete all their properties and bookings.')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      
      await api.delete(`/admin/users/${userId}`, {
        headers: { 'x-auth-token': token }
      });
      
      // Remove user from local state
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(error.response?.data?.message || 'Failed to delete user');
    }
  };

  // Password reset handler
  const openPasswordModal = (userId) => {
    setSelectedUserId(userId);
    setNewPassword('');
    setConfirmPassword('');
    setResetError('');
    setShowPasswordModal(true);
  };

  const handlePasswordReset = async () => {
    if (!newPassword || newPassword.length < 6) {
      setResetError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match');
      return;
    }

    setResetLoading(true);
    setResetError('');
    try {
      const token = localStorage.getItem('token');
      await api.put(
        `/admin/users/${selectedUserId}/password`,
        { newPassword },
        { headers: { 'x-auth-token': token, 'Content-Type': 'application/json' } }
      );
      alert('Password reset successfully!');
      setShowPasswordModal(false);
    } catch (err) {
      console.error('Password reset error:', err);
      setResetError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setResetLoading(false);
    }
  };

  // Calculate stats
  const stats = {
    total: users.length,
    owners: users.filter(u => u.role === 'owner').length,
    admins: users.filter(u => u.role === 'admin').length,
    users: users.filter(u => u.role === 'user').length
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div className="spinner"></div>
          <p>Loading users...</p>
        </LoadingSpinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer>
          <div className="error-icon">⚠️</div>
          <h3>{error}</h3>
          <p>Please make sure you have admin privileges and are logged in correctly.</p>
          <button onClick={fetchUsers}>Try Again</button>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>Manage Users</h1>
        <p>View and manage all platform users</p>
      </Header>
      
      <StatsBar>
        <StatChip>
          <span className="stat-label">Total Users</span>
          <span className="stat-number">{stats.total}</span>
        </StatChip>
        <StatChip>
          <span className="stat-label">👤 Users</span>
          <span className="stat-number">{stats.users}</span>
        </StatChip>
        <StatChip>
          <span className="stat-label">🏠 Owners</span>
          <span className="stat-number">{stats.owners}</span>
        </StatChip>
        <StatChip>
          <span className="stat-label">⚡ Admins</span>
          <span className="stat-number">{stats.admins}</span>
        </StatChip>
      </StatsBar>
      
      <TableWrapper>
        {users.length === 0 ? (
          <EmptyState>
            <div className="empty-icon">👥</div>
            <p>No users found</p>
          </EmptyState>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td style={{ fontWeight: '500' }}>{user.name || 'N/A'}</td>
                  <td>{user.email || 'N/A'}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>
                    <RoleBadge $role={user.role}>
                      {user.role === 'admin' ? '⚡ Admin' : user.role === 'owner' ? '🏠 Owner' : '👤 User'}
                    </RoleBadge>
                  </td>
                  <td>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    <Select 
                      value={user.role}
                      onChange={(e) => updateUserRole(user._id, e.target.value)}
                      disabled={updating === user._id}
                    >
                      <option value="user">User</option>
                      <option value="owner">Owner</option>
                      <option value="admin">Admin</option>
                    </Select>
                    <DeleteButton 
                      onClick={() => deleteUser(user._id)} 
                      disabled={updating === user._id}
                    >
                      Delete
                    </DeleteButton>
                    <ResetPasswordButton 
                      onClick={() => openPasswordModal(user._id)} 
                      disabled={updating === user._id}
                    >
                      🔑 Reset Pwd
                    </ResetPasswordButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableWrapper>

      {/* Password Reset Modal */}
      {showPasswordModal && (
        <ModalOverlay onClick={() => setShowPasswordModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <h3>Reset Password</h3>
            <input
              type="password"
              placeholder="New password (min 6 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoFocus
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {resetError && <div className="error-msg">{resetError}</div>}
            <div className="buttons">
              <button className="cancel-btn" onClick={() => setShowPasswordModal(false)}>Cancel</button>
              <button className="reset-btn" onClick={handlePasswordReset} disabled={resetLoading}>
                {resetLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </Modal>
        </ModalOverlay>
      )}
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  );
}

export default AdminUsers;