// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import styled, { keyframes } from 'styled-components';

// // Animations
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const spin = keyframes`
//   to { transform: rotate(360deg); }
// `;

// const slideIn = keyframes`
//   from { transform: translateX(-100%); }
//   to { transform: translateX(0); }
// `;

// // Styled Components
// const Container = styled.div`
//   min-height: 100vh;
//   background: linear-gradient(135deg, #f5f7fa 0%, #e9edf2 100%);
//   font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//   padding: 1rem;
  
//   @media (min-width: 768px) {
//     padding: 2rem;
//   }
// `;

// const ProfileWrapper = styled.div`
//   max-width: 1400px;
//   margin: 0 auto;
//   animation: ${fadeIn} 0.5s ease-out;
// `;

// const Header = styled.div`
//   margin-bottom: 1.5rem;
  
//   h1 {
//     font-size: 1.5rem;
//     font-weight: 700;
//     background: linear-gradient(135deg, #1e293b 0%, #2d3a4a 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     margin-bottom: 0.25rem;
    
//     @media (min-width: 768px) {
//       font-size: 2rem;
//       margin-bottom: 0.5rem;
//     }
//   }
  
//   p {
//     color: #64748b;
//     font-size: 0.875rem;
    
//     @media (min-width: 768px) {
//       font-size: 0.95rem;
//     }
//   }
// `;

// const ProfileGrid = styled.div`
//   display: grid;
//   gap: 1rem;
  
//   @media (min-width: 968px) {
//     grid-template-columns: 320px 1fr;
//     gap: 2rem;
//   }
// `;

// // Sidebar
// const Sidebar = styled.div`
//   background: white;
//   border-radius: 24px;
//   padding: 1.25rem;
//   box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  
//   @media (min-width: 768px) {
//     border-radius: 28px;
//     padding: 1.5rem;
//     position: sticky;
//     top: 2rem;
//     height: fit-content;
//   }
// `;

// const ProfileImageWrapper = styled.div`
//   text-align: center;
//   margin-bottom: 1rem;
  
//   @media (min-width: 768px) {
//     margin-bottom: 1.5rem;
//   }
// `;

// const ProfileImage = styled.div`
//   width: 80px;
//   height: 80px;
//   background: linear-gradient(135deg, #8b5cf6, #6d28d9);
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0 auto 0.75rem;
//   font-size: 2rem;
//   font-weight: 600;
//   color: white;
//   box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.3);
  
//   @media (min-width: 768px) {
//     width: 120px;
//     height: 120px;
//     font-size: 3rem;
//     margin-bottom: 1rem;
//   }
// `;

// const UserName = styled.h3`
//   font-size: 1.125rem;
//   font-weight: 700;
//   color: #0f172a;
//   margin-bottom: 0.25rem;
  
//   @media (min-width: 768px) {
//     font-size: 1.25rem;
//   }
// `;

// const UserEmail = styled.p`
//   font-size: 0.75rem;
//   color: #64748b;
//   margin-bottom: 0.75rem;
//   word-break: break-all;
  
//   @media (min-width: 768px) {
//     font-size: 0.875rem;
//     margin-bottom: 1rem;
//     word-break: normal;
//   }
// `;

// const UserRole = styled.span`
//   display: inline-block;
//   padding: 0.25rem 0.75rem;
//   background: ${props => {
//     switch(props.role) {
//       case 'admin': return '#ef4444';
//       case 'owner': return '#10b981';
//       default: return '#3b82f6';
//     }
//   }};
//   color: white;
//   border-radius: 20px;
//   font-size: 0.7rem;
//   font-weight: 600;
  
//   @media (min-width: 768px) {
//     font-size: 0.75rem;
//   }
// `;

// // Mobile Navigation Toggle
// const MobileNavToggle = styled.button`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0.75rem 1rem;
//   background: #f8fafc;
//   border: 1px solid #e2e8f0;
//   border-radius: 16px;
//   margin-top: 1rem;
//   cursor: pointer;
  
//   span {
//     font-weight: 600;
//     color: #1e293b;
//     font-size: 0.875rem;
//   }
  
//   svg {
//     width: 20px;
//     height: 20px;
//     color: #64748b;
//     transition: transform 0.3s;
//     transform: ${props => props.open ? 'rotate(180deg)' : 'rotate(0)'};
//   }
  
//   @media (min-width: 768px) {
//     display: none;
//   }
// `;

// const NavMenu = styled.div`
//   margin-top: 1rem;
//   border-top: 1px solid #e2e8f0;
//   padding-top: 1rem;
  
//   @media (max-width: 767px) {
//     display: ${props => props.open ? 'block' : 'none'};
//     animation: ${slideIn} 0.3s ease;
//   }
  
//   @media (min-width: 768px) {
//     display: block !important;
//   }
// `;

// const NavItem = styled.button`
//   width: 100%;
//   padding: 0.75rem 1rem;
//   background: ${props => props.active ? '#f3e8ff' : 'transparent'};
//   color: ${props => props.active ? '#8b5cf6' : '#475569'};
//   border: none;
//   border-radius: 16px;
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   font-size: 0.875rem;
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 0.2s;
//   margin-bottom: 0.5rem;
  
//   &:hover {
//     background: #f8fafc;
//     color: #8b5cf6;
//   }
  
//   svg {
//     width: 18px;
//     height: 18px;
    
//     @media (min-width: 768px) {
//       width: 20px;
//       height: 20px;
//     }
//   }
  
//   @media (min-width: 768px) {
//     padding: 0.875rem 1rem;
//     font-size: 0.95rem;
//   }
// `;

// // Main Content
// const MainContent = styled.div`
//   background: white;
//   border-radius: 24px;
//   padding: 1.25rem;
//   box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  
//   @media (min-width: 768px) {
//     border-radius: 28px;
//     padding: 2rem;
//   }
// `;

// const SectionTitle = styled.h2`
//   font-size: 1.25rem;
//   font-weight: 700;
//   color: #0f172a;
//   margin-bottom: 1rem;
//   padding-bottom: 0.75rem;
//   border-bottom: 2px solid #e2e8f0;
  
//   @media (min-width: 768px) {
//     font-size: 1.5rem;
//     margin-bottom: 1.5rem;
//   }
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
  
//   @media (min-width: 768px) {
//     gap: 1.5rem;
//   }
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const Label = styled.label`
//   font-size: 0.8rem;
//   font-weight: 600;
//   color: #334155;
  
//   @media (min-width: 768px) {
//     font-size: 0.875rem;
//   }
// `;

// const Input = styled.input`
//   padding: 0.75rem 1rem;
//   border: 1px solid #e2e8f0;
//   border-radius: 14px;
//   font-size: 0.875rem;
//   transition: all 0.2s;
//   -webkit-appearance: none;
  
//   &:focus {
//     outline: none;
//     border-color: #8b5cf6;
//     box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
//   }
  
//   &:disabled {
//     background: #f8fafc;
//     cursor: not-allowed;
//   }
  
//   @media (min-width: 768px) {
//     padding: 0.875rem 1rem;
//     border-radius: 16px;
//     font-size: 0.95rem;
//   }
// `;

// const Button = styled.button`
//   padding: 0.75rem 1.25rem;
//   background: linear-gradient(135deg, #8b5cf6, #6d28d9);
//   color: white;
//   border: none;
//   border-radius: 40px;
//   font-size: 0.875rem;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.2s;
//   width: 100%;
  
//   @media (min-width: 768px) {
//     padding: 0.875rem 1.5rem;
//     font-size: 0.95rem;
//     width: auto;
//     min-width: 200px;
//   }
  
//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 10px 20px -5px rgba(139, 92, 246, 0.4);
//   }
  
//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//     transform: none;
//   }
// `;

// const SecondaryButton = styled(Button)`
//   background: #f1f5f9;
//   color: #334155;
//   width: auto;
  
//   &:hover {
//     background: #e2e8f0;
//     box-shadow: none;
//     transform: translateY(-1px);
//   }
// `;

// const Message = styled.div`
//   padding: 0.75rem 1rem;
//   border-radius: 14px;
//   font-size: 0.8rem;
//   margin-bottom: 1rem;
  
//   ${props => props.type === 'success' && `
//     background: #d1fae5;
//     color: #065f46;
//   `}
  
//   ${props => props.type === 'error' && `
//     background: #fee2e2;
//     color: #991b1b;
//   `}
  
//   @media (min-width: 768px) {
//     padding: 0.75rem 1rem;
//     border-radius: 16px;
//     font-size: 0.875rem;
//   }
// `;

// const BookingsGrid = styled.div`
//   display: grid;
//   gap: 0.75rem;
  
//   @media (min-width: 768px) {
//     gap: 1rem;
//   }
// `;

// const BookingCard = styled.div`
//   background: #f8fafc;
//   border-radius: 16px;
//   padding: 0.875rem;
//   display: flex;
//   flex-direction: column;
//   gap: 0.75rem;
  
//   @media (min-width: 640px) {
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//     padding: 1rem;
//     gap: 1rem;
//   }
// `;

// const BookingInfo = styled.div`
//   flex: 1;
  
//   h4 {
//     font-size: 0.9rem;
//     font-weight: 600;
//     color: #0f172a;
//     margin-bottom: 0.25rem;
    
//     @media (min-width: 768px) {
//       font-size: 1rem;
//     }
//   }
  
//   p {
//     font-size: 0.75rem;
//     color: #64748b;
//     margin-bottom: 0.25rem;
    
//     @media (min-width: 768px) {
//       font-size: 0.875rem;
//     }
//   }
// `;

// const BookingStatus = styled.span`
//   padding: 0.25rem 0.75rem;
//   border-radius: 20px;
//   font-size: 0.7rem;
//   font-weight: 600;
//   text-align: center;
//   align-self: flex-start;
  
//   @media (min-width: 640px) {
//     align-self: center;
//   }
  
//   background: ${props => {
//     switch(props.status) {
//       case 'confirmed': return '#d1fae5';
//       case 'pending': return '#fef3c7';
//       case 'cancelled': return '#fee2e2';
//       default: return '#e2e8f0';
//     }
//   }};
//   color: ${props => {
//     switch(props.status) {
//       case 'confirmed': return '#065f46';
//       case 'pending': return '#92400e';
//       case 'cancelled': return '#991b1b';
//       default: return '#475569';
//     }
//   }};
// `;

// const BookingPrice = styled.div`
//   font-size: 1rem;
//   font-weight: 700;
//   color: #8b5cf6;
  
//   @media (min-width: 768px) {
//     font-size: 1.125rem;
//   }
// `;

// const HelpCard = styled.div`
//   background: #f8fafc;
//   border-radius: 16px;
//   padding: 1rem;
//   margin-bottom: 0.75rem;
  
//   @media (min-width: 768px) {
//     border-radius: 20px;
//     padding: 1.5rem;
//     margin-bottom: 1rem;
//   }
  
//   h3 {
//     font-size: 1rem;
//     font-weight: 600;
//     color: #0f172a;
//     margin-bottom: 0.5rem;
    
//     @media (min-width: 768px) {
//       font-size: 1.125rem;
//     }
//   }
  
//   p {
//     color: #64748b;
//     margin-bottom: 0.75rem;
//     font-size: 0.8rem;
    
//     @media (min-width: 768px) {
//       font-size: 0.875rem;
//       margin-bottom: 1rem;
//     }
//   }
// `;

// const Loader = styled.div`
//   width: 40px;
//   height: 40px;
//   border: 3px solid #e2e8f0;
//   border-top-color: #8b5cf6;
//   border-radius: 50%;
//   animation: ${spin} 1s linear infinite;
//   margin: 2rem auto;
  
//   @media (min-width: 768px) {
//     width: 48px;
//     height: 48px;
//   }
// `;

// const EmptyState = styled.div`
//   text-align: center;
//   padding: 2rem 1rem;
//   color: #64748b;
  
//   svg {
//     width: 48px;
//     height: 48px;
//     margin-bottom: 1rem;
    
//     @media (min-width: 768px) {
//       width: 64px;
//       height: 64px;
//     }
//   }
  
//   p {
//     font-size: 0.875rem;
//     margin-bottom: 1rem;
    
//     @media (min-width: 768px) {
//       font-size: 1rem;
//     }
//   }
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.75rem;
  
//   @media (min-width: 768px) {
//     flex-direction: row;
//     gap: 1rem;
//   }
// `;

// function UserProfile() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeTab, setActiveTab] = useState('profile');
//   const [mobileNavOpen, setMobileNavOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });
//   const [bookings, setBookings] = useState([]);
//   const [loadingBookings, setLoadingBookings] = useState(false);
  
//   // Form states
//   const [profileForm, setProfileForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//   });
  
//   const [passwordForm, setPasswordForm] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   // Check URL params for tab
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const tab = params.get('tab');
//     if (tab && ['profile', 'bookings', 'security', 'help'].includes(tab)) {
//       setActiveTab(tab);
//     }
//   }, [location]);

//   useEffect(() => {
//     fetchUserProfile();
//     fetchUserBookings();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }
      
//       const response = await axios.get('http://localhost:3000/api/auth/me', {
//         headers: { 'x-auth-token': token }
//       });
      
//       const userData = response.data.user || response.data;
//       setUser(userData);
//       setProfileForm({
//         name: userData.name || '',
//         email: userData.email || '',
//         phone: userData.phone || '',
//       });
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       if (error.response?.status === 401) {
//         localStorage.removeItem('token');
//         navigate('/login');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserBookings = async () => {
//     setLoadingBookings(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3000/api/bookings/my-bookings', {
//         headers: { 'x-auth-token': token }
//       });
//       setBookings(response.data.bookings || response.data || []);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//     } finally {
//       setLoadingBookings(false);
//     }
//   };

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     setUpdating(true);
//     setMessage({ type: '', text: '' });
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.put(
//         'http://localhost:3000/api/users/profile',
//         profileForm,
//         { headers: { 'x-auth-token': token } }
//       );
      
//       setUser(response.data.user || response.data);
//       setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
//       setTimeout(() => setMessage({ type: '', text: '' }), 3000);
//     } catch (error) {
//       setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' });
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
    
//     if (passwordForm.newPassword !== passwordForm.confirmPassword) {
//       setMessage({ type: 'error', text: 'New passwords do not match' });
//       return;
//     }
    
//     if (passwordForm.newPassword.length < 6) {
//       setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
//       return;
//     }
    
//     setUpdating(true);
//     setMessage({ type: '', text: '' });
    
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         'http://localhost:3000/api/auth/password',
//         {
//           currentPassword: passwordForm.currentPassword,
//           newPassword: passwordForm.newPassword
//         },
//         { headers: { 'x-auth-token': token } }
//       );
      
//       setMessage({ type: 'success', text: 'Password changed successfully!' });
//       setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
//       setTimeout(() => setMessage({ type: '', text: '' }), 3000);
//     } catch (error) {
//       setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to change password' });
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   if (loading) {
//     return (
//       <Container>
//         <Loader />
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <ProfileWrapper>
//         <Header>
//           <h1>My Profile</h1>
//           <p>Manage your account settings and preferences</p>
//         </Header>
        
//         <ProfileGrid>
//           {/* Sidebar */}
//           <Sidebar>
//             <ProfileImageWrapper>
//               <ProfileImage>
//                 {user?.name?.charAt(0).toUpperCase() || 'U'}
//               </ProfileImage>
//               <UserName>{user?.name}</UserName>
//               <UserEmail>{user?.email}</UserEmail>
//               <UserRole role={user?.role}>
//                 {user?.role === 'admin' ? 'Administrator' : user?.role === 'owner' ? 'Property Owner' : 'Member'}
//               </UserRole>
//             </ProfileImageWrapper>
            
//             {/* Mobile Navigation Toggle */}
//             <MobileNavToggle onClick={() => setMobileNavOpen(!mobileNavOpen)} open={mobileNavOpen}>
//               <span>Menu</span>
//               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <polyline points="6 9 12 15 18 9" />
//               </svg>
//             </MobileNavToggle>
            
//             <NavMenu open={mobileNavOpen}>
//               <NavItem active={activeTab === 'profile'} onClick={() => {
//                 setActiveTab('profile');
//                 setMobileNavOpen(false);
//               }}>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//                   <circle cx="12" cy="7" r="4" />
//                 </svg>
//                 Personal Info
//               </NavItem>
              
//               <NavItem active={activeTab === 'bookings'} onClick={() => {
//                 setActiveTab('bookings');
//                 setMobileNavOpen(false);
//               }}>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//                   <line x1="16" y1="2" x2="16" y2="6" />
//                   <line x1="8" y1="2" x2="8" y2="6" />
//                   <line x1="3" y1="10" x2="21" y2="10" />
//                 </svg>
//                 My Bookings
//               </NavItem>
              
//               <NavItem active={activeTab === 'security'} onClick={() => {
//                 setActiveTab('security');
//                 setMobileNavOpen(false);
//               }}>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//                   <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//                 </svg>
//                 Security
//               </NavItem>
              
//               <NavItem active={activeTab === 'help'} onClick={() => {
//                 setActiveTab('help');
//                 setMobileNavOpen(false);
//               }}>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <circle cx="12" cy="12" r="10" />
//                   <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
//                   <line x1="12" y1="17" x2="12.01" y2="17" />
//                 </svg>
//                 Help & Support
//               </NavItem>
              
//               <NavItem onClick={handleLogout}>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//                   <polyline points="16 17 21 12 16 7" />
//                   <line x1="21" y1="12" x2="9" y2="12" />
//                 </svg>
//                 Logout
//               </NavItem>
//             </NavMenu>
//           </Sidebar>
          
//           {/* Main Content */}
//           <MainContent>
//             {message.text && (
//               <Message type={message.type}>{message.text}</Message>
//             )}
            
//             {/* Profile Tab */}
//             {activeTab === 'profile' && (
//               <>
//                 <SectionTitle>Personal Information</SectionTitle>
//                 <Form onSubmit={handleProfileUpdate}>
//                   <FormGroup>
//                     <Label>Full Name</Label>
//                     <Input
//                       type="text"
//                       value={profileForm.name}
//                       onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
//                       required
//                     />
//                   </FormGroup>
                  
//                   <FormGroup>
//                     <Label>Email Address</Label>
//                     <Input
//                       type="email"
//                       value={profileForm.email}
//                       disabled
//                     />
//                     <small style={{ color: '#64748b', fontSize: '0.7rem' }}>Email cannot be changed</small>
//                   </FormGroup>
                  
//                   <FormGroup>
//                     <Label>Phone Number</Label>
//                     <Input
//                       type="tel"
//                       value={profileForm.phone}
//                       onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
//                       required
//                     />
//                   </FormGroup>
                  
//                   <FormGroup>
//                     <Label>Account Type</Label>
//                     <Input
//                       type="text"
//                       value={user?.role === 'admin' ? 'Administrator' : user?.role === 'owner' ? 'Property Owner' : 'Regular User'}
//                       disabled
//                     />
//                   </FormGroup>
                  
//                   <FormGroup>
//                     <Label>Member Since</Label>
//                     <Input
//                       type="text"
//                       value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//                       disabled
//                     />
//                   </FormGroup>
                  
//                   <Button type="submit" disabled={updating}>
//                     {updating ? 'Updating...' : 'Update Profile'}
//                   </Button>
//                 </Form>
//               </>
//             )}
            
//             {/* Bookings Tab */}
//             {activeTab === 'bookings' && (
//               <>
//                 <SectionTitle>My Bookings</SectionTitle>
//                 {loadingBookings ? (
//                   <Loader />
//                 ) : bookings.length === 0 ? (
//                   <EmptyState>
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
//                       <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//                       <line x1="16" y1="2" x2="16" y2="6" />
//                       <line x1="8" y1="2" x2="8" y2="6" />
//                       <line x1="3" y1="10" x2="21" y2="10" />
//                     </svg>
//                     <p>No bookings yet</p>
//                     <SecondaryButton onClick={() => navigate('/properties')}>
//                       Browse Properties
//                     </SecondaryButton>
//                   </EmptyState>
//                 ) : (
//                   <BookingsGrid>
//                     {bookings.map((booking) => (
//                       <BookingCard key={booking._id}>
//                         <BookingInfo>
//                           <h4>{booking.property?.title || 'Property'}</h4>
//                           <p>
//                             {booking.checkIn && new Date(booking.checkIn).toLocaleDateString()} - 
//                             {booking.checkOut && new Date(booking.checkOut).toLocaleDateString()}
//                           </p>
//                           <p>{booking.guests} guests</p>
//                         </BookingInfo>
//                         <BookingStatus status={booking.status}>
//                           {booking.status?.toUpperCase()}
//                         </BookingStatus>
//                         <BookingPrice>
//                           ₹{booking.totalPrice?.toLocaleString()}
//                         </BookingPrice>
//                       </BookingCard>
//                     ))}
//                   </BookingsGrid>
//                 )}
//               </>
//             )}
            
//             {/* Security Tab */}
//             {activeTab === 'security' && (
//               <>
//                 <SectionTitle>Change Password</SectionTitle>
//                 <Form onSubmit={handlePasswordChange}>
//                   <FormGroup>
//                     <Label>Current Password</Label>
//                     <Input
//                       type="password"
//                       value={passwordForm.currentPassword}
//                       onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
//                       required
//                     />
//                   </FormGroup>
                  
//                   <FormGroup>
//                     <Label>New Password</Label>
//                     <Input
//                       type="password"
//                       value={passwordForm.newPassword}
//                       onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
//                       required
//                     />
//                     <small style={{ color: '#64748b', fontSize: '0.7rem' }}>Minimum 6 characters</small>
//                   </FormGroup>
                  
//                   <FormGroup>
//                     <Label>Confirm New Password</Label>
//                     <Input
//                       type="password"
//                       value={passwordForm.confirmPassword}
//                       onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
//                       required
//                     />
//                   </FormGroup>
                  
//                   <Button type="submit" disabled={updating}>
//                     {updating ? 'Changing...' : 'Change Password'}
//                   </Button>
//                 </Form>
//               </>
//             )}
            
//             {/* Help & Support Tab */}
//             {activeTab === 'help' && (
//               <>
//                 <SectionTitle>Help & Support</SectionTitle>
                
//                 <HelpCard>
//                   <h3>📞 Customer Support</h3>
//                   <p>24/7 support for all your queries</p>
//                   <p><strong>Phone:</strong> +91 1800 123 4567</p>
//                   <p><strong>Email:</strong> support@homestay.com</p>
//                 </HelpCard>
                
//                 <HelpCard>
//                   <h3>📧 Email Support</h3>
//                   <p>Send us an email and we'll respond within 24 hours</p>
//                   <ButtonGroup>
//                     <SecondaryButton onClick={() => window.location.href = 'mailto:support@homestay.com'}>
//                       Send Email
//                     </SecondaryButton>
//                   </ButtonGroup>
//                 </HelpCard>
                
//                 <HelpCard>
//                   <h3>❓ Frequently Asked Questions</h3>
//                   <p>Find answers to common questions about bookings, payments, and properties</p>
//                   <ButtonGroup>
//                     <SecondaryButton onClick={() => navigate('/faq')}>
//                       View FAQs
//                     </SecondaryButton>
//                   </ButtonGroup>
//                 </HelpCard>
                
//                 <HelpCard>
//                   <h3>🏠 Become a Host</h3>
//                   <p>List your property and earn money</p>
//                   {user?.role !== 'owner' && (
//                     <ButtonGroup>
//                       <SecondaryButton onClick={() => navigate('/contact')}>
//                         Apply to Become Owner
//                       </SecondaryButton>
//                     </ButtonGroup>
//                   )}
//                 </HelpCard>
//               </>
//             )}
//           </MainContent>
//         </ProfileGrid>
//       </ProfileWrapper>
//     </Container>
//   );
// }

// export default UserProfile;


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { applyTimestamps } from '../../../server/models/User';
import api from '../services/api'

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9edf2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const ProfileWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
  
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #1e293b 0%, #2d3a4a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.25rem;
    
    @media (min-width: 768px) {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
  }
  
  p {
    color: #64748b;
    font-size: 0.875rem;
    
    @media (min-width: 768px) {
      font-size: 0.95rem;
    }
  }
`;

const ProfileGrid = styled.div`
  display: grid;
  gap: 1rem;
  
  @media (min-width: 968px) {
    grid-template-columns: 320px 1fr;
    gap: 2rem;
  }
`;

// Sidebar
const Sidebar = styled.div`
  background: white;
  border-radius: 24px;
  padding: 1.25rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  
  @media (min-width: 768px) {
    border-radius: 28px;
    padding: 1.5rem;
    position: sticky;
    top: 2rem;
    height: fit-content;
  }
`;

const ProfileImageWrapper = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.75rem;
  font-size: 2rem;
  font-weight: 600;
  color: white;
  box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.3);
  
  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

const UserName = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.25rem;
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const UserEmail = styled.p`
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 0.75rem;
  word-break: break-all;
  
  @media (min-width: 768px) {
    font-size: 0.875rem;
    margin-bottom: 1rem;
    word-break: normal;
  }
`;

const UserRole = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: ${props => {
    switch(props.role) {
      case 'admin': return '#ef4444';
      case 'owner': return '#10b981';
      default: return '#3b82f6';
    }
  }};
  color: white;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  
  @media (min-width: 768px) {
    font-size: 0.75rem;
  }
`;

// Mobile Navigation Toggle
const MobileNavToggle = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  margin-top: 1rem;
  cursor: pointer;
  
  span {
    font-weight: 600;
    color: #1e293b;
    font-size: 0.875rem;
  }
  
  svg {
    width: 20px;
    height: 20px;
    color: #64748b;
    transition: transform 0.3s;
    transform: ${props => props.open ? 'rotate(180deg)' : 'rotate(0)'};
  }
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const NavMenu = styled.div`
  margin-top: 1rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
  
  @media (max-width: 767px) {
    display: ${props => props.open ? 'block' : 'none'};
    animation: ${slideIn} 0.3s ease;
  }
  
  @media (min-width: 768px) {
    display: block !important;
  }
`;

// ✅ FIXED: Use $active instead of active
const NavItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${props => props.$active ? '#f3e8ff' : 'transparent'};
  color: ${props => props.$active ? '#8b5cf6' : '#475569'};
  border: none;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 0.5rem;
  
  &:hover {
    background: #f8fafc;
    color: #8b5cf6;
  }
  
  svg {
    width: 18px;
    height: 18px;
    
    @media (min-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }
  
  @media (min-width: 768px) {
    padding: 0.875rem 1rem;
    font-size: 0.95rem;
  }
`;

// Main Content
const MainContent = styled.div`
  background: white;
  border-radius: 24px;
  padding: 1.25rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  
  @media (min-width: 768px) {
    border-radius: 28px;
    padding: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e2e8f0;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: #334155;
  
  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  font-size: 0.875rem;
  transition: all 0.2s;
  -webkit-appearance: none;
  
  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
  
  &:disabled {
    background: #f8fafc;
    cursor: not-allowed;
  }
  
  @media (min-width: 768px) {
    padding: 0.875rem 1rem;
    border-radius: 16px;
    font-size: 0.95rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
  color: white;
  border: none;
  border-radius: 40px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  
  @media (min-width: 768px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.95rem;
    width: auto;
    min-width: 200px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -5px rgba(139, 92, 246, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled(Button)`
  background: #f1f5f9;
  color: #334155;
  width: auto;
  
  &:hover {
    background: #e2e8f0;
    box-shadow: none;
    transform: translateY(-1px);
  }
`;

const Message = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 14px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  
  ${props => props.type === 'success' && `
    background: #d1fae5;
    color: #065f46;
  `}
  
  ${props => props.type === 'error' && `
    background: #fee2e2;
    color: #991b1b;
  `}
  
  @media (min-width: 768px) {
    padding: 0.75rem 1rem;
    border-radius: 16px;
    font-size: 0.875rem;
  }
`;

const BookingsGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  
  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const BookingCard = styled.div`
  background: #f8fafc;
  border-radius: 16px;
  padding: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
  }
`;

const BookingInfo = styled.div`
  flex: 1;
  
  h4 {
    font-size: 0.9rem;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 0.25rem;
    
    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }
  
  p {
    font-size: 0.75rem;
    color: #64748b;
    margin-bottom: 0.25rem;
    
    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  }
`;

const BookingStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  text-align: center;
  align-self: flex-start;
  
  @media (min-width: 640px) {
    align-self: center;
  }
  
  background: ${props => {
    switch(props.status) {
      case 'confirmed': return '#d1fae5';
      case 'pending': return '#fef3c7';
      case 'cancelled': return '#fee2e2';
      default: return '#e2e8f0';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'confirmed': return '#065f46';
      case 'pending': return '#92400e';
      case 'cancelled': return '#991b1b';
      default: return '#475569';
    }
  }};
`;

const BookingPrice = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #8b5cf6;
  
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const HelpCard = styled.div`
  background: #f8fafc;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  
  @media (min-width: 768px) {
    border-radius: 20px;
    padding: 1.5rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 0.5rem;
    
    @media (min-width: 768px) {
      font-size: 1.125rem;
    }
  }
  
  p {
    color: #64748b;
    margin-bottom: 0.75rem;
    font-size: 0.8rem;
    
    @media (min-width: 768px) {
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }
  }
`;

const Loader = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 2rem auto;
  
  @media (min-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: #64748b;
  
  svg {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
    
    @media (min-width: 768px) {
      width: 64px;
      height: 64px;
    }
  }
  
  p {
    font-size: 0.875rem;
    margin-bottom: 1rem;
    
    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Check URL params for tab
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['profile', 'bookings', 'security', 'help'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  useEffect(() => {
    fetchUserProfile();
    fetchUserBookings();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      
      const response = await api.get('/auth/me', {
        headers: { 'x-auth-token': token }
      });
      
      const userData = response.data.user || response.data;
      setUser(userData);
      setProfileForm({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    setLoadingBookings(true);
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/bookings/my-bookings', {
        headers: { 'x-auth-token': token }
      });
      setBookings(response.data.bookings || response.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoadingBookings(false);
    }
  };

  // ✅ FIXED: Correct API URL - /api/auth/profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage({ type: '', text: '' });
    
    try {
      const token = localStorage.getItem('token');
      
      // ✅ Use correct URL: /api/auth/profile (not /api/users/profile)
      const response = await api.put(
        '/auth/profile',
        {
          name: profileForm.name,
          phone: profileForm.phone
        },
        { 
          headers: { 
            'x-auth-token': token,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      if (response.data.success && response.data.user) {
        setUser(response.data.user);
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to update profile' });
      }
      
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update profile' 
      });
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }
    
    setUpdating(true);
    setMessage({ type: '', text: '' });
    
    try {
      const token = localStorage.getItem('token');
      await applyTimestamps.put(
        '/api/auth/password',
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        },
        { headers: { 'x-auth-token': token } }
      );
      
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to change password' });
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <Container>
      <ProfileWrapper>
        <Header>
          <h1>My Profile</h1>
          <p>Manage your account settings and preferences</p>
        </Header>
        
        <ProfileGrid>
          {/* Sidebar */}
          <Sidebar>
            <ProfileImageWrapper>
              <ProfileImage>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </ProfileImage>
              <UserName>{user?.name}</UserName>
              <UserEmail>{user?.email}</UserEmail>
              <UserRole role={user?.role}>
                {user?.role === 'admin' ? 'Administrator' : user?.role === 'owner' ? 'Property Owner' : 'Member'}
              </UserRole>
            </ProfileImageWrapper>
            
            {/* Mobile Navigation Toggle */}
            <MobileNavToggle onClick={() => setMobileNavOpen(!mobileNavOpen)} open={mobileNavOpen}>
              <span>Menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </MobileNavToggle>
            
            <NavMenu open={mobileNavOpen}>
              <NavItem $active={activeTab === 'profile'} onClick={() => {
                setActiveTab('profile');
                setMobileNavOpen(false);
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Personal Info
              </NavItem>
              
              <NavItem $active={activeTab === 'bookings'} onClick={() => {
                setActiveTab('bookings');
                setMobileNavOpen(false);
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                My Bookings
              </NavItem>
              
              <NavItem $active={activeTab === 'security'} onClick={() => {
                setActiveTab('security');
                setMobileNavOpen(false);
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Security
              </NavItem>
              
              <NavItem $active={activeTab === 'help'} onClick={() => {
                setActiveTab('help');
                setMobileNavOpen(false);
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Help & Support
              </NavItem>
              
              <NavItem onClick={handleLogout}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </NavItem>
            </NavMenu>
          </Sidebar>
          
          {/* Main Content */}
          <MainContent>
            {message.text && (
              <Message type={message.type}>{message.text}</Message>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <>
                <SectionTitle>Personal Information</SectionTitle>
                <Form onSubmit={handleProfileUpdate}>
                  <FormGroup>
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={profileForm.email}
                      disabled
                    />
                    <small style={{ color: '#64748b', fontSize: '0.7rem' }}>Email cannot be changed</small>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Phone Number</Label>
                    <Input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Account Type</Label>
                    <Input
                      type="text"
                      value={user?.role === 'admin' ? 'Administrator' : user?.role === 'owner' ? 'Property Owner' : 'Regular User'}
                      disabled
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Member Since</Label>
                    <Input
                      type="text"
                      value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      disabled
                    />
                  </FormGroup>
                  
                  <Button type="submit" disabled={updating}>
                    {updating ? 'Updating...' : 'Update Profile'}
                  </Button>
                </Form>
              </>
            )}
            
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <>
                <SectionTitle>My Bookings</SectionTitle>
                {loadingBookings ? (
                  <Loader />
                ) : bookings.length === 0 ? (
                  <EmptyState>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <p>No bookings yet</p>
                    <SecondaryButton onClick={() => navigate('/properties')}>
                      Browse Properties
                    </SecondaryButton>
                  </EmptyState>
                ) : (
                  <BookingsGrid>
                    {bookings.map((booking) => (
                      <BookingCard key={booking._id}>
                        <BookingInfo>
                          <h4>{booking.property?.title || 'Property'}</h4>
                          <p>
                            {booking.checkIn && new Date(booking.checkIn).toLocaleDateString()} - 
                            {booking.checkOut && new Date(booking.checkOut).toLocaleDateString()}
                          </p>
                          <p>{booking.guests} guests</p>
                        </BookingInfo>
                        <BookingStatus status={booking.status}>
                          {booking.status?.toUpperCase()}
                        </BookingStatus>
                        <BookingPrice>
                          ₹{booking.totalPrice?.toLocaleString()}
                        </BookingPrice>
                      </BookingCard>
                    ))}
                  </BookingsGrid>
                )}
              </>
            )}
            
            {/* Security Tab */}
            {activeTab === 'security' && (
              <>
                <SectionTitle>Change Password</SectionTitle>
                <Form onSubmit={handlePasswordChange}>
                  <FormGroup>
                    <Label>Current Password</Label>
                    <Input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      required
                    />
                    <small style={{ color: '#64748b', fontSize: '0.7rem' }}>Minimum 6 characters</small>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Confirm New Password</Label>
                    <Input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      required
                    />
                  </FormGroup>
                  
                  <Button type="submit" disabled={updating}>
                    {updating ? 'Changing...' : 'Change Password'}
                  </Button>
                </Form>
              </>
            )}
            
            {/* Help & Support Tab */}
            {activeTab === 'help' && (
              <>
                <SectionTitle>Help & Support</SectionTitle>
                
                <HelpCard>
                  <h3>📞 Customer Support</h3>
                  <p>24/7 support for all your queries</p>
                  <p><strong>Phone:</strong> +91 1800 123 4567</p>
                  <p><strong>Email:</strong> support@homestay.com</p>
                </HelpCard>
                
                <HelpCard>
                  <h3>📧 Email Support</h3>
                  <p>Send us an email and we'll respond within 24 hours</p>
                  <ButtonGroup>
                    <SecondaryButton onClick={() => window.location.href = 'mailto:support@homestay.com'}>
                      Send Email
                    </SecondaryButton>
                  </ButtonGroup>
                </HelpCard>
                
                <HelpCard>
                  <h3>❓ Frequently Asked Questions</h3>
                  <p>Find answers to common questions about bookings, payments, and properties</p>
                  <ButtonGroup>
                    <SecondaryButton onClick={() => navigate('/faq')}>
                      View FAQs
                    </SecondaryButton>
                  </ButtonGroup>
                </HelpCard>
                
                <HelpCard>
                  <h3>🏠 Become a Host</h3>
                  <p>List your property and earn money</p>
                  {user?.role !== 'owner' && (
                    <ButtonGroup>
                      <SecondaryButton onClick={() => navigate('/contact')}>
                        Apply to Become Owner
                      </SecondaryButton>
                    </ButtonGroup>
                  )}
                </HelpCard>
              </>
            )}
          </MainContent>
        </ProfileGrid>
      </ProfileWrapper>
    </Container>
  );
}

export default UserProfile;