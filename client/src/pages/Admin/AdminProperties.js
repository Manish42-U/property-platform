

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import api from '../../services/api'

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
  min-width: 900px;
  
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

const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const StatusBadge = styled.span`
  background: ${props => 
    props.status === 'available' ? '#10b981' : 
    props.status === 'sold' ? '#ef4444' : 
    '#f59e0b'
  };
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
`;

const DeleteButton = styled.button`
  padding: 6px 16px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(239,68,68,0.3);
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 24px;
  
  h3 {
    color: #ef4444;
    margin-bottom: 1rem;
  }
  
  p {
    color: #64748b;
    margin-bottom: 1.5rem;
  }
  
  button {
    padding: 10px 24px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 500;
    
    &:hover {
      background: #5a67d8;
    }
  }
`;

function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProperties = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please login again.');
        setLoading(false);
        return;
      }
      
      const response = await api.get('/admin/properties', {
        headers: { 'x-auth-token': token }
      });
      setProperties(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching properties:', error);
      if (error.response?.status === 403) {
        setError('Access denied. Admin only.');
      } else if (error.response?.status === 401) {
        setError('Please login again.');
      } else {
        setError('Failed to fetch properties');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const deleteProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/admin/properties/${propertyId}`, {
          headers: { 'x-auth-token': token }
        });
        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Failed to delete property');
      }
    }
  };

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ width: '48px', height: '48px', border: '3px solid #e2e8f0', borderTopColor: '#667eea', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <p style={{ color: '#64748b' }}>Loading properties...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer>
          <h3>⚠️ {error}</h3>
          <p>Please make sure you have admin privileges and are logged in.</p>
          <button onClick={fetchProperties}>Retry</button>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>Manage Properties</h1>
        <p>View and manage all property listings</p>
      </Header>
      
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Type</th>
              <th>Price</th>
              <th>Location</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property._id}>
                <td>
                  {property.images && property.images[0] ? (
                    <Image src={property.images[0]} alt={property.title} />
                  ) : (
                    <div style={{ width: '50px', height: '50px', background: '#f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🏠</div>
                  )}
                </td>
                <td style={{ fontWeight: '500' }}>{property.title}</td>
                <td>
                  {property.type === 'sale' ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🏠 Sale</span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🔑 Rent</span>
                  )}
                </td>
                <td>₹{property.price.toLocaleString()}</td>
                <td>{property.location?.city}, {property.location?.state}</td>
                <td><StatusBadge status={property.status}>{property.status}</StatusBadge></td>
                <td>{property.owner?.name || 'Unknown'}</td>
                <td>
                  <DeleteButton onClick={() => deleteProperty(property._id)}>Delete</DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  );
}

export default AdminProperties;