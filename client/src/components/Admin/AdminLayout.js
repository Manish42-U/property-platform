import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const AdminContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 60px);
`;

const Sidebar = styled.div`
  width: 260px;
  background: #2c3e50;
  color: white;
  padding: 2rem 1rem;
  position: sticky;
  top: 0;
  height: calc(100vh - 60px);
  overflow-y: auto;
`;

const SidebarNav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    display: block;
    padding: 0.75rem 1rem;
    color: #ecf0f1;
    text-decoration: none;
    border-radius: 5px;
    transition: all 0.3s;
    
    &:hover {
      background: #34495e;
    }
    
    &.active {
      background: #667eea;
      color: white;
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f5f5f5;
  overflow-x: auto;
`;

const AdminLayout = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/properties', label: 'Properties', icon: '🏠' },
    { path: '/admin/bookings', label: 'Bookings', icon: '📅' },
  ];
  
  return (
    <AdminContainer>
      <Sidebar>
        <h2 style={{ marginBottom: '2rem', fontSize: '1.3rem', textAlign: 'center' }}>
          Admin Panel
        </h2>
        <SidebarNav>
          <ul>
            {navItems.map(item => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </SidebarNav>
      </Sidebar>
      <MainContent>
        <Outlet />
      </MainContent>
    </AdminContainer>
  );
};

export default AdminLayout;