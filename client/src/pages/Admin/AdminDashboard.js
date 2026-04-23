// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../context/AuthContext';
// import styled from 'styled-components';

// const StatsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 1.5rem;
//   margin-bottom: 2rem;
// `;

// const StatCard = styled.div`
//   background: white;
//   border-radius: 10px;
//   padding: 1.5rem;
//   box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  
//   h3 {
//     font-size: 0.9rem;
//     color: #666;
//     margin-bottom: 0.5rem;
//   }
  
//   .number {
//     font-size: 2rem;
//     font-weight: bold;
//     color: #2c3e50;
//   }
// `;

// const Section = styled.div`
//   background: white;
//   border-radius: 10px;
//   padding: 1.5rem;
//   margin-bottom: 1.5rem;
//   box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  
//   h2 {
//     margin-bottom: 1rem;
//     font-size: 1.2rem;
//   }
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
  
//   th, td {
//     padding: 0.75rem;
//     text-align: left;
//     border-bottom: 1px solid #ddd;
//   }
  
//   th {
//     background: #f5f5f5;
//     font-weight: 600;
//   }
// `;

// function AdminDashboard() {
//   const [stats, setStats] = useState({
//     users: 0,
//     properties: 0,
//     bookings: 0,
//     recentUsers: [],
//     recentProperties: []
//   });
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/admin/stats', {
//         headers: { 'x-auth-token': token }
//       });
//       setStats(response.data);
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading dashboard...</div>;
//   }

//   return (
//     <div>
//       <h1 style={{ marginBottom: '1.5rem' }}>Admin Dashboard</h1>
//       <p style={{ marginBottom: '2rem', color: '#666' }}>
//         Welcome back, <strong>{user?.name}</strong>! Here's what's happening with your platform.
//       </p>
      
//       <StatsGrid>
//         <StatCard>
//           <h3>Total Users</h3>
//           <div className="number">{stats.users}</div>
//         </StatCard>
//         <StatCard>
//           <h3>Total Properties</h3>
//           <div className="number">{stats.properties}</div>
//         </StatCard>
//         <StatCard>
//           <h3>Total Bookings</h3>
//           <div className="number">{stats.bookings}</div>
//         </StatCard>
//       </StatsGrid>
      
//       <Section>
//         <h2>Recent Users</h2>
//         {stats.recentUsers && stats.recentUsers.length > 0 ? (
//           <Table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Joined</th>
//               </tr>
//             </thead>
//             <tbody>
//               {stats.recentUsers.map(user => (
//                 <tr key={user._id}>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>
//                     <span style={{
//                       background: user.role === 'admin' ? '#dc3545' : user.role === 'owner' ? '#28a745' : '#007bff',
//                       color: 'white',
//                       padding: '2px 8px',
//                       borderRadius: '3px',
//                       fontSize: '12px'
//                     }}>
//                       {user.role}
//                     </span>
//                   </td>
//                   <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         ) : (
//           <p>No users found.</p>
//         )}
//       </Section>
      
//       <Section>
//         <h2>Recent Properties</h2>
//         {stats.recentProperties && stats.recentProperties.length > 0 ? (
//           <Table>
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Type</th>
//                 <th>Price</th>
//                 <th>Status</th>
//                 <th>Added</th>
//               </tr>
//             </thead>
//             <tbody>
//               {stats.recentProperties.map(property => (
//                 <tr key={property._id}>
//                   <td>{property.title}</td>
//                   <td>{property.type === 'sale' ? 'For Sale' : 'For Rent'}</td>
//                   <td>₹{property.price.toLocaleString()}</td>
//                   <td>
//                     <span style={{
//                       background: property.status === 'available' ? '#28a745' : '#dc3545',
//                       color: 'white',
//                       padding: '2px 8px',
//                       borderRadius: '3px',
//                       fontSize: '12px'
//                     }}>
//                       {property.status}
//                     </span>
//                   </td>
//                   <td>{new Date(property.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         ) : (
//           <p>No properties found.</p>
//         )}
//       </Section>
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../services/api'

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: #f8fafc;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Header with profile and logout
const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HeaderTitle = styled.div`
  h1 {
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #1e293b 0%, #2d3a4a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.25rem;
  }
  p {
    color: #64748b;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 40px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
`;

const UserInfo = styled.div`
  .name {
    font-weight: 600;
    color: #1e293b;
    font-size: 0.9rem;
  }
  .role {
    font-size: 0.7rem;
    color: #64748b;
  }
`;

const LogoutButton = styled.button`
  background: #fee2e2;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  color: #ef4444;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #fecaca;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const WelcomeCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 300px;
    height: 300px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 1;
  }
  
  p {
    opacity: 0.9;
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    h2 {
      font-size: 1.2rem;
    }
    p {
      font-size: 0.85rem;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.02);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
  }
  
  .stat-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #64748b;
    margin-bottom: 0.5rem;
  }
  
  .number {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }
  
  .trend {
    font-size: 0.75rem;
    color: #10b981;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    .stat-icon {
      width: 36px;
      height: 36px;
    }
    .number {
      font-size: 1.8rem;
    }
  }
`;

const Section = styled.div`
  background: white;
  border-radius: 24px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
    
    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
    }
    
    .view-all {
      color: #667eea;
      font-size: 0.85rem;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
      
      &:hover {
        color: #5a67d8;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
    .section-header h2 {
      font-size: 1rem;
    }
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  
  th, td {
    padding: 1rem 0.75rem;
    text-align: left;
    border-bottom: 1px solid #f1f5f9;
  }
  
  th {
    background: transparent;
    font-weight: 600;
    color: #64748b;
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

  @media (max-width: 768px) {
    th, td {
      padding: 0.75rem 0.5rem;
      font-size: 0.8rem;
    }
  }
`;

const RoleBadge = styled.span`
  background: ${props => 
    props.role === 'admin' ? '#ef4444' : 
    props.role === 'owner' ? '#10b981' : 
    '#3b82f6'
  };
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  display: inline-block;
`;

const StatusBadge = styled.span`
  background: ${props => 
    props.status === 'available' ? '#10b981' : 
    props.status === 'sold' ? '#ef4444' : 
    '#f59e0b'
  };
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  display: inline-block;
`;

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    properties: 0,
    bookings: 0,
    recentUsers: [],
    recentProperties: []
  });
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/admin/stats', {
        headers: { 'x-auth-token': token }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ width: '48px', height: '48px', border: '3px solid #e2e8f0', borderTopColor: '#667eea', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p style={{ color: '#64748b' }}>Loading dashboard...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderBar>
        <HeaderTitle>
          <h1>Admin Dashboard</h1>
          <p>Monitor and manage your platform's performance</p>
        </HeaderTitle>
        <UserProfile>
          <UserAvatar>
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </UserAvatar>
          <UserInfo>
            <div className="name">{user?.name || 'Admin'}</div>
            <div className="role">{user?.role === 'admin' ? 'Administrator' : 'User'}</div>
          </UserInfo>
          <LogoutButton onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </LogoutButton>
        </UserProfile>
      </HeaderBar>

      <WelcomeCard>
        <h2>Welcome back, {user?.name}! 👋</h2>
        <p>Here's what's happening with your platform today.</p>
      </WelcomeCard>

      <StatsGrid>
        <StatCard>
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h3>Total Users</h3>
          <div className="number">{stats.users}</div>
          <div className="trend">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            +12% this month
          </div>
        </StatCard>
        
        <StatCard>
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <h3>Total Properties</h3>
          <div className="number">{stats.properties}</div>
          <div className="trend">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            +8% this month
          </div>
        </StatCard>
        
        <StatCard>
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <h3>Total Bookings</h3>
          <div className="number">{stats.bookings}</div>
          <div className="trend">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            +24% this month
          </div>
        </StatCard>
      </StatsGrid>
      
      <Section>
        <div className="section-header">
          <h2>Recent Users</h2>
          <a href="/admin/users" className="view-all">View All →</a>
        </div>
        {stats.recentUsers && stats.recentUsers.length > 0 ? (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentUsers.map(user => (
                  <tr key={user._id}>
                    <td style={{ fontWeight: '500' }}>{user.name}</td>
                    <td>{user.email}</td>
                    <td><RoleBadge role={user.role}>{user.role}</RoleBadge></td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        ) : (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No users found.</p>
        )}
      </Section>
      
      <Section>
        <div className="section-header">
          <h2>Recent Properties</h2>
          <a href="/admin/properties" className="view-all">View All →</a>
        </div>
        {stats.recentProperties && stats.recentProperties.length > 0 ? (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Added</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentProperties.map(property => (
                  <tr key={property._id}>
                    <td style={{ fontWeight: '500' }}>{property.title}</td>
                    <td>{property.type === 'sale' ? '🏠 For Sale' : '🔑 For Rent'}</td>
                    <td>₹{property.price.toLocaleString()}</td>
                    <td><StatusBadge status={property.status}>{property.status}</StatusBadge></td>
                    <td>{new Date(property.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        ) : (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No properties found.</p>
        )}
      </Section>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  );
}

export default AdminDashboard;