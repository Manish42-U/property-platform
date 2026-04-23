

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';
// import styled, { keyframes, css } from 'styled-components';

// // ---------- Animations ----------
// const fadeDown = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(-20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const scaleIn = keyframes`
//   from {
//     opacity: 0;
//     transform: scale(0.95);
//   }
//   to {
//     opacity: 1;
//     transform: scale(1);
//   }
// `;

// const slideInRight = keyframes`
//   from {
//     opacity: 0;
//     transform: translateX(30px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// `;

// // ---------- Styled Components ----------
// const NavWrapper = styled.nav`
//   position: fixed;
//   top: 20px;
//   left: 50%;
//   transform: translateX(-50%);
//   width: calc(100% - 40px);
//   max-width: 1400px;
//   z-index: 1100;
//   transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
//   border-radius: 80px;
//   background: rgba(255, 255, 255, 0.7);
//   backdrop-filter: blur(8px);
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02), 0 0 0 1px rgba(0, 0, 0, 0.02);

//   ${({ scrolled }) =>
//     scrolled &&
//     css`
//       top: 0;
//       width: 100%;
//       max-width: 100%;
//       border-radius: 0;
//       background: rgba(255, 255, 255, 0.92);
//       backdrop-filter: blur(16px);
//       box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.03);
//     `}

//   @media (max-width: 768px) {
//     top: 0;
//     width: 100%;
//     border-radius: 0;
//     left: 0;
//     transform: none;
//     background: ${({ scrolled }) =>
//       scrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0.9)'};
//     backdrop-filter: blur(12px);
//   }
// `;

// const NavContainer = styled.div`
//   max-width: 1280px;
//   margin: 0 auto;
//   padding: 0 28px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   height: 70px;

//   @media (max-width: 768px) {
//     height: 64px;
//     padding: 0 20px;
//   }
// `;

// // Logo
// const Logo = styled(Link)`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   text-decoration: none;
//   font-weight: 800;
//   font-size: 1.6rem;
//   letter-spacing: -0.5px;
//   background: linear-gradient(135deg, #6366f1, #a855f7);
//   -webkit-background-clip: text;
//   background-clip: text;
//   color: transparent;
//   transition: transform 0.2s;

//   &:hover {
//     transform: scale(1.02);
//   }

//   svg {
//     color: #6366f1;
//     stroke-width: 1.8;
//   }
// `;

// // Desktop Menu
// const DesktopMenu = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 6px;

//   @media (max-width: 860px) {
//     display: none;
//   }
// `;

// const NavLink = styled(Link)`
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   padding: 8px 18px;
//   text-decoration: none;
//   color: #1e293b;
//   font-weight: 500;
//   font-size: 0.9rem;
//   border-radius: 40px;
//   transition: all 0.2s;
//   position: relative;

//   &:hover {
//     background: rgba(99, 102, 241, 0.08);
//     color: #6366f1;
//     transform: translateY(-1px);
//   }

//   ${({ active }) =>
//     active &&
//     css`
//       background: rgba(99, 102, 241, 0.12);
//       color: #6366f1;
//       font-weight: 600;
//     `}
// `;

// const RegisterBtn = styled(Link)`
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   padding: 8px 24px;
//   background: linear-gradient(135deg, #6366f1, #a855f7);
//   color: white;
//   text-decoration: none;
//   font-weight: 600;
//   font-size: 0.9rem;
//   border-radius: 40px;
//   margin-left: 8px;
//   transition: all 0.3s;
//   box-shadow: 0 2px 5px rgba(99, 102, 241, 0.2);

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
//   }
// `;

// // User Avatar & Dropdown
// const UserMenuWrapper = styled.div`
//   position: relative;
//   margin-left: 12px;
// `;

// const AvatarButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 0;
//   display: flex;
//   align-items: center;
// `;

// const Avatar = styled.div`
//   width: 42px;
//   height: 42px;
//   border-radius: 50%;
//   background: linear-gradient(135deg, #6366f1, #a855f7);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;
//   font-weight: 700;
//   font-size: 1rem;
//   transition: all 0.2s;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

//   &:hover {
//     transform: scale(1.05);
//     box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
//   }
// `;

// const Dropdown = styled.div`
//   position: absolute;
//   top: 56px;
//   right: 0;
//   width: 280px;
//   background: rgba(255, 255, 255, 0.98);
//   backdrop-filter: blur(20px);
//   border-radius: 28px;
//   box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02);
//   overflow: hidden;
//   animation: ${scaleIn} 0.2s ease-out;
//   z-index: 1200;
// `;

// const DropdownHeader = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 14px;
//   padding: 18px;
//   background: rgba(248, 250, 252, 0.6);
// `;

// const DropdownAvatar = styled.div`
//   width: 48px;
//   height: 48px;
//   border-radius: 50%;
//   background: linear-gradient(135deg, #6366f1, #a855f7);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;
//   font-weight: 700;
//   font-size: 1.2rem;
// `;

// const DropdownInfo = styled.div`
//   flex: 1;
// `;

// const DropdownName = styled.div`
//   font-weight: 700;
//   color: #0f172a;
//   font-size: 0.95rem;
// `;

// const DropdownEmail = styled.div`
//   font-size: 0.75rem;
//   color: #475569;
//   margin-top: 2px;
// `;

// const DropdownRole = styled.div`
//   font-size: 0.7rem;
//   color: #6366f1;
//   margin-top: 4px;
//   font-weight: 500;
// `;

// const Divider = styled.div`
//   height: 1px;
//   background: #eef2ff;
//   margin: 0;
// `;

// const LogoutBtn = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   width: 100%;
//   padding: 14px 18px;
//   background: none;
//   border: none;
//   color: #ef4444;
//   font-weight: 500;
//   font-size: 0.85rem;
//   cursor: pointer;
//   transition: all 0.2s;

//   &:hover {
//     background: #fee2e2;
//   }
// `;

// // Mobile Menu
// const MobileMenuButton = styled.button`
//   display: none;
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 8px;

//   @media (max-width: 860px) {
//     display: block;
//   }
// `;

// const Hamburger = styled.div`
//   width: 26px;
//   height: 20px;
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;

//   span {
//     display: block;
//     height: 2px;
//     background: #1e293b;
//     border-radius: 2px;
//     transition: all 0.3s;
//   }

//   ${({ open }) =>
//     open &&
//     css`
//       span:nth-child(1) {
//         transform: rotate(45deg) translate(6px, 6px);
//       }
//       span:nth-child(2) {
//         opacity: 0;
//         transform: scaleX(0);
//       }
//       span:nth-child(3) {
//         transform: rotate(-45deg) translate(6px, -6px);
//       }
//     `}
// `;

// const MobileMenu = styled.div`
//   position: absolute;
//   top: 70px;
//   left: 0;
//   right: 0;
//   background: rgba(255, 255, 255, 0.98);
//   backdrop-filter: blur(20px);
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
//   animation: ${fadeDown} 0.3s ease;
//   border-bottom-left-radius: 28px;
//   border-bottom-right-radius: 28px;

//   @media (min-width: 861px) {
//     display: none;
//   }
// `;

// const MobileNavLink = styled(Link)`
//   padding: 12px 16px;
//   text-decoration: none;
//   color: #1e293b;
//   font-weight: 500;
//   border-radius: 20px;
//   transition: all 0.2s;

//   &:hover {
//     background: rgba(99, 102, 241, 0.08);
//     color: #6366f1;
//     transform: translateX(5px);
//   }
// `;

// const MobileUserCard = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 14px;
//   padding: 12px 16px;
//   background: #f8fafc;
//   border-radius: 24px;
//   margin: 8px 0;
// `;

// const MobileAvatar = styled.div`
//   width: 48px;
//   height: 48px;
//   border-radius: 50%;
//   background: linear-gradient(135deg, #6366f1, #a855f7);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;
//   font-weight: 700;
//   font-size: 1.2rem;
// `;

// const MobileUserInfo = styled.div`
//   flex: 1;
// `;

// const MobileUserName = styled.div`
//   font-weight: 700;
//   color: #0f172a;
// `;

// const MobileUserEmail = styled.div`
//   font-size: 0.75rem;
//   color: #475569;
// `;

// const MobileUserRole = styled.div`
//   font-size: 0.7rem;
//   color: #6366f1;
//   margin-top: 2px;
// `;

// const MobileLogout = styled.button`
//   padding: 12px;
//   background: #fee2e2;
//   border: none;
//   border-radius: 20px;
//   color: #ef4444;
//   font-weight: 600;
//   cursor: pointer;
//   transition: background 0.2s;
//   margin-top: 8px;

//   &:hover {
//     background: #fecaca;
//   }
// `;

// const MobileRegisterBtn = styled(Link)`
//   padding: 12px;
//   background: linear-gradient(135deg, #6366f1, #a855f7);
//   color: white;
//   text-align: center;
//   border-radius: 24px;
//   font-weight: 600;
//   text-decoration: none;
//   margin-top: 8px;
// `;

// const NotificationBadge = styled.span`
//   position: absolute;
//   top: -6px;
//   right: -8px;
//   background: #ef4444;
//   color: white;
//   border-radius: 50%;
//   width: 18px;
//   height: 18px;
//   font-size: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: bold;
//   animation: pulse 1s infinite;
// `;

// // ---------- Component ----------
// function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [pendingCount, setPendingCount] = useState(0);

//   // Detect scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setMobileOpen(false);
//     setUserMenuOpen(false);
//   }, [location]);

//   // Fetch pending bookings count for owner
//   useEffect(() => {
//     if (user && user.role === 'owner') {
//       const fetchPending = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           const res = await axios.get('http://localhost:3000/api/bookings/owner-bookings', {
//             headers: { 'x-auth-token': token },
//           });
//           const pending = res.data.filter(b => b.status === 'pending').length;
//           setPendingCount(pending);
//         } catch (err) {
//           console.error('Failed to fetch pending count', err);
//         }
//       };
//       fetchPending();
//       const interval = setInterval(fetchPending, 30000);
//       return () => clearInterval(interval);
//     }
//   }, [user]);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//     setUserMenuOpen(false);
//   };

//   const isActive = (path) => location.pathname === path;
//   const isActivePrefix = (prefix) => location.pathname.startsWith(prefix);

//   return (
//     <NavWrapper scrolled={scrolled}>
//       <NavContainer>
//         {/* Logo */}
//         <Logo to="/">
//           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//             <path d="M3 9L12 3L21 9L12 15L3 9Z" />
//             <path d="M5 12V18L12 21L19 18V12" />
//             <path d="M12 15V21" />
//           </svg>
//           <span>PropSpace</span>
//         </Logo>

//         {/* Desktop Menu */}
//         <DesktopMenu>
//           <NavLink to="/properties" active={isActive('/properties') ? 1 : 0}>
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//               <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//               <line x1="16" y1="2" x2="16" y2="6" />
//               <line x1="8" y1="2" x2="8" y2="6" />
//               <line x1="3" y1="10" x2="21" y2="10" />
//             </svg>
//             Properties
//           </NavLink>

//           {user && (
//             <>
//               {user.role === 'owner' && (
//                 <NavLink to="/add-property" active={isActive('/add-property') ? 1 : 0}>
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                     <circle cx="12" cy="12" r="10" />
//                     <line x1="12" y1="8" x2="12" y2="16" />
//                     <line x1="8" y1="12" x2="16" y2="12" />
//                   </svg>
//                   Add Property
//                 </NavLink>
//               )}

//               <NavLink to="/my-properties" active={isActivePrefix('/my-properties') ? 1 : 0}>
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                   <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//                   <line x1="8" y1="2" x2="8" y2="6" />
//                   <line x1="16" y1="2" x2="16" y2="6" />
//                 </svg>
//                 My Properties
//               </NavLink>

//               <NavLink to="/my-bookings" active={isActivePrefix('/my-bookings') ? 1 : 0} style={{ position: 'relative' }}>
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                   <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//                   <line x1="16" y1="2" x2="16" y2="6" />
//                   <line x1="8" y1="2" x2="8" y2="6" />
//                 </svg>
//                 Bookings
//                 {user.role === 'owner' && pendingCount > 0 && (
//                   <NotificationBadge>{pendingCount}</NotificationBadge>
//                 )}
//               </NavLink>

//               <UserMenuWrapper>
//                 <AvatarButton onClick={() => setUserMenuOpen(!userMenuOpen)}>
//                   <Avatar>{user.name?.charAt(0).toUpperCase()}</Avatar>
//                 </AvatarButton>
//                 {userMenuOpen && (
//                   <Dropdown>
//                     <DropdownHeader>
//                       <DropdownAvatar>{user.name?.charAt(0).toUpperCase()}</DropdownAvatar>
//                       <DropdownInfo>
//                         <DropdownName>{user.name}</DropdownName>
//                         <DropdownEmail>{user.email}</DropdownEmail>
//                         <DropdownRole>{user.role === 'owner' ? '🏠 Property Owner' : '👤 User'}</DropdownRole>
//                       </DropdownInfo>
//                     </DropdownHeader>
//                     <Divider />
//                     <LogoutBtn onClick={handleLogout}>
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//                         <polyline points="16 17 21 12 16 7" />
//                         <line x1="21" y1="12" x2="9" y2="12" />
//                       </svg>
//                       Logout
//                     </LogoutBtn>
//                   </Dropdown>
//                 )}
//               </UserMenuWrapper>
//             </>
//           )}

//           {!user && (
//             <>
//               <NavLink to="/login" active={isActive('/login') ? 1 : 0}>
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                   <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
//                   <polyline points="10 17 15 12 10 7" />
//                   <line x1="15" y1="12" x2="3" y2="12" />
//                 </svg>
//                 Login
//               </NavLink>
//               <RegisterBtn to="/register">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                   <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//                   <circle cx="12" cy="7" r="4" />
//                 </svg>
//                 Register
//               </RegisterBtn>
//             </>
//           )}
//         </DesktopMenu>

//         {/* Mobile Menu Toggle */}
//         <MobileMenuButton onClick={() => setMobileOpen(!mobileOpen)}>
//           <Hamburger open={mobileOpen}>
//             <span />
//             <span />
//             <span />
//           </Hamburger>
//         </MobileMenuButton>
//       </NavContainer>

//       {/* Mobile Menu Dropdown */}
//       {mobileOpen && (
//         <MobileMenu>
//           <MobileNavLink to="/properties" onClick={() => setMobileOpen(false)}>
//             Properties
//           </MobileNavLink>
//           {user ? (
//             <>
//               {user.role === 'owner' && (
//                 <MobileNavLink to="/add-property" onClick={() => setMobileOpen(false)}>
//                   Add Property
//                 </MobileNavLink>
//               )}
//               <MobileNavLink to="/my-properties" onClick={() => setMobileOpen(false)}>
//                 My Properties
//               </MobileNavLink>
//               <MobileNavLink to="/my-bookings" onClick={() => setMobileOpen(false)}>
//                 My Bookings
//                 {user.role === 'owner' && pendingCount > 0 && (
//                   <span style={{ marginLeft: '8px', background: '#ef4444', color: 'white', borderRadius: '20px', padding: '0 6px', fontSize: '11px' }}>
//                     {pendingCount}
//                   </span>
//                 )}
//               </MobileNavLink>
//               <MobileUserCard>
//                 <MobileAvatar>{user.name?.charAt(0).toUpperCase()}</MobileAvatar>
//                 <MobileUserInfo>
//                   <MobileUserName>{user.name}</MobileUserName>
//                   <MobileUserEmail>{user.email}</MobileUserEmail>
//                   <MobileUserRole>{user.role === 'owner' ? 'Property Owner' : 'User'}</MobileUserRole>
//                 </MobileUserInfo>
//               </MobileUserCard>
//               <MobileLogout onClick={handleLogout}>Logout</MobileLogout>
//             </>
//           ) : (
//             <>
//               <MobileNavLink to="/login" onClick={() => setMobileOpen(false)}>
//                 Login
//               </MobileNavLink>
//               <MobileRegisterBtn to="/register" onClick={() => setMobileOpen(false)}>
//                 Register
//               </MobileRegisterBtn>
//             </>
//           )}
//         </MobileMenu>
//       )}
//     </NavWrapper>
//   );
// }

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import styled, { keyframes, css } from 'styled-components';

// ---------- Animations ----------
const fadeDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// ---------- Styled Components ----------
const NavWrapper = styled.nav`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 1400px;
  z-index: 1100;
  transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  border-radius: 80px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02), 0 0 0 1px rgba(0, 0, 0, 0.02);

  ${({ scrolled }) =>
    scrolled &&
    css`
      top: 0;
      width: 100%;
      max-width: 100%;
      border-radius: 0;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(16px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.03);
    `}

  @media (max-width: 768px) {
    top: 0;
    width: 100%;
    border-radius: 0;
    left: 0;
    transform: none;
    background: ${({ scrolled }) =>
      scrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0.9)'};
    backdrop-filter: blur(12px);
  }
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;

  @media (max-width: 768px) {
    height: 64px;
    padding: 0 20px;
  }
`;

// Logo
const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.6rem;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  svg {
    color: #6366f1;
    stroke-width: 1.8;
  }
`;

// Desktop Menu
const DesktopMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 860px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  text-decoration: none;
  color: #1e293b;
  font-weight: 500;
  font-size: 0.9rem;
  border-radius: 40px;
  transition: all 0.2s;
  position: relative;

  &:hover {
    background: rgba(99, 102, 241, 0.08);
    color: #6366f1;
    transform: translateY(-1px);
  }

  ${({ active }) =>
    active &&
    css`
      background: rgba(99, 102, 241, 0.12);
      color: #6366f1;
      font-weight: 600;
    `}
`;

const RegisterBtn = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 24px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 40px;
  margin-left: 8px;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(99, 102, 241, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
  }
`;

// User Avatar & Dropdown
const UserMenuWrapper = styled.div`
  position: relative;
  margin-left: 12px;
`;

const AvatarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 56px;
  right: 0;
  width: 280px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 28px;
  box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02);
  overflow: hidden;
  animation: ${scaleIn} 0.2s ease-out;
  z-index: 1200;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  background: rgba(248, 250, 252, 0.6);
`;

const DropdownAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
`;

const DropdownInfo = styled.div`
  flex: 1;
`;

const DropdownName = styled.div`
  font-weight: 700;
  color: #0f172a;
  font-size: 0.95rem;
`;

const DropdownEmail = styled.div`
  font-size: 0.75rem;
  color: #475569;
  margin-top: 2px;
`;

const DropdownRole = styled.div`
  font-size: 0.7rem;
  color: #6366f1;
  margin-top: 4px;
  font-weight: 500;
`;

const Divider = styled.div`
  height: 1px;
  background: #eef2ff;
  margin: 0;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  text-decoration: none;
  color: #1e293b;
  font-size: 0.85rem;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(99, 102, 241, 0.08);
    color: #6366f1;
  }
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 18px;
  background: none;
  border: none;
  color: #ef4444;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #fee2e2;
  }
`;

// Mobile Menu
const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;

  @media (max-width: 860px) {
    display: block;
  }
`;

const Hamburger = styled.div`
  width: 26px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    display: block;
    height: 2px;
    background: #1e293b;
    border-radius: 2px;
    transition: all 0.3s;
  }

  ${({ open }) =>
    open &&
    css`
      span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
      }
      span:nth-child(2) {
        opacity: 0;
        transform: scaleX(0);
      }
      span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
      }
    `}
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  animation: ${fadeDown} 0.3s ease;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;

  @media (min-width: 861px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  padding: 12px 16px;
  text-decoration: none;
  color: #1e293b;
  font-weight: 500;
  border-radius: 20px;
  transition: all 0.2s;

  &:hover {
    background: rgba(99, 102, 241, 0.08);
    color: #6366f1;
    transform: translateX(5px);
  }
`;

const MobileUserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 24px;
  margin: 8px 0;
`;

const MobileAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
`;

const MobileUserInfo = styled.div`
  flex: 1;
`;

const MobileUserName = styled.div`
  font-weight: 700;
  color: #0f172a;
`;

const MobileUserEmail = styled.div`
  font-size: 0.75rem;
  color: #475569;
`;

const MobileUserRole = styled.div`
  font-size: 0.7rem;
  color: #6366f1;
  margin-top: 2px;
`;

const MobileLogout = styled.button`
  padding: 12px;
  background: #fee2e2;
  border: none;
  border-radius: 20px;
  color: #ef4444;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;

  &:hover {
    background: #fecaca;
  }
`;

const MobileRegisterBtn = styled(Link)`
  padding: 12px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
  text-align: center;
  border-radius: 24px;
  font-weight: 600;
  text-decoration: none;
  margin-top: 8px;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -8px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  animation: pulse 1s infinite;
`;

// ---------- Component ----------
function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  // Fetch pending bookings count for owner
  useEffect(() => {
    if (user && user.role === 'owner') {
      const fetchPending = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get('http://localhost:3000/api/bookings/owner-bookings', {
            headers: { 'x-auth-token': token },
          });
          const pending = res.data.filter(b => b.status === 'pending').length;
          setPendingCount(pending);
        } catch (err) {
          console.error('Failed to fetch pending count', err);
        }
      };
      fetchPending();
      const interval = setInterval(fetchPending, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;
  const isActivePrefix = (prefix) => location.pathname.startsWith(prefix);

  return (
    <NavWrapper scrolled={scrolled}>
      <NavContainer>
        {/* Logo */}
        <Logo to="/">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9L12 3L21 9L12 15L3 9Z" />
            <path d="M5 12V18L12 21L19 18V12" />
            <path d="M12 15V21" />
          </svg>
          <span>PropSpace</span>
        </Logo>

        {/* Desktop Menu */}
        <DesktopMenu>
          <NavLink to="/properties" active={isActive('/properties') ? 1 : 0}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Properties
          </NavLink>

          {user && (
            <>
              {user.role === 'owner' && (
                <NavLink to="/add-property" active={isActive('/add-property') ? 1 : 0}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  Add Property
                </NavLink>
              )}

              <NavLink to="/my-properties" active={isActivePrefix('/my-properties') ? 1 : 0}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
                My Properties
              </NavLink>

              <NavLink to="/my-bookings" active={isActivePrefix('/my-bookings') ? 1 : 0} style={{ position: 'relative' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                </svg>
                Bookings
                {user.role === 'owner' && pendingCount > 0 && (
                  <NotificationBadge>{pendingCount}</NotificationBadge>
                )}
              </NavLink>

              <UserMenuWrapper>
                <AvatarButton onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <Avatar>{user.name?.charAt(0).toUpperCase()}</Avatar>
                </AvatarButton>
                {userMenuOpen && (
                  <Dropdown>
                    <DropdownHeader>
                      <DropdownAvatar>{user.name?.charAt(0).toUpperCase()}</DropdownAvatar>
                      <DropdownInfo>
                        <DropdownName>{user.name}</DropdownName>
                        <DropdownEmail>{user.email}</DropdownEmail>
                        <DropdownRole>{user.role === 'owner' ? '🏠 Property Owner' : user.role === 'admin' ? '⚡ Admin' : '👤 User'}</DropdownRole>
                      </DropdownInfo>
                    </DropdownHeader>
                    <Divider />
                    
                    {/* ✅ ADDED: Profile Link in Dropdown */}
                    <DropdownItem to="/profile" onClick={() => setUserMenuOpen(false)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      My Profile
                    </DropdownItem>
                    
                    {/* ✅ ADDED: Settings Link */}
                    <DropdownItem to="/profile?tab=security" onClick={() => setUserMenuOpen(false)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      Settings
                    </DropdownItem>
                    
                    <Divider />
                    <LogoutBtn onClick={handleLogout}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Logout
                    </LogoutBtn>
                  </Dropdown>
                )}
              </UserMenuWrapper>
            </>
          )}

          {!user && (
            <>
              <NavLink to="/login" active={isActive('/login') ? 1 : 0}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Login
              </NavLink>
              <RegisterBtn to="/register">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Register
              </RegisterBtn>
            </>
          )}
        </DesktopMenu>

        {/* Mobile Menu Toggle */}
        <MobileMenuButton onClick={() => setMobileOpen(!mobileOpen)}>
          <Hamburger open={mobileOpen}>
            <span />
            <span />
            <span />
          </Hamburger>
        </MobileMenuButton>
      </NavContainer>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <MobileMenu>
          <MobileNavLink to="/properties" onClick={() => setMobileOpen(false)}>
            Properties
          </MobileNavLink>
          {user ? (
            <>
              {user.role === 'owner' && (
                <MobileNavLink to="/add-property" onClick={() => setMobileOpen(false)}>
                  Add Property
                </MobileNavLink>
              )}
              <MobileNavLink to="/my-properties" onClick={() => setMobileOpen(false)}>
                My Properties
              </MobileNavLink>
              <MobileNavLink to="/my-bookings" onClick={() => setMobileOpen(false)}>
                My Bookings
                {user.role === 'owner' && pendingCount > 0 && (
                  <span style={{ marginLeft: '8px', background: '#ef4444', color: 'white', borderRadius: '20px', padding: '0 6px', fontSize: '11px' }}>
                    {pendingCount}
                  </span>
                )}
              </MobileNavLink>
              
              {/* ✅ ADDED: Profile in Mobile Menu */}
              <MobileNavLink to="/profile" onClick={() => setMobileOpen(false)}>
                👤 My Profile
              </MobileNavLink>
              
              <MobileUserCard>
                <MobileAvatar>{user.name?.charAt(0).toUpperCase()}</MobileAvatar>
                <MobileUserInfo>
                  <MobileUserName>{user.name}</MobileUserName>
                  <MobileUserEmail>{user.email}</MobileUserEmail>
                  <MobileUserRole>{user.role === 'owner' ? 'Property Owner' : user.role === 'admin' ? 'Admin' : 'User'}</MobileUserRole>
                </MobileUserInfo>
              </MobileUserCard>
              <MobileLogout onClick={handleLogout}>Logout</MobileLogout>
            </>
          ) : (
            <>
              <MobileNavLink to="/login" onClick={() => setMobileOpen(false)}>
                Login
              </MobileNavLink>
              <MobileRegisterBtn to="/register" onClick={() => setMobileOpen(false)}>
                Register
              </MobileRegisterBtn>
            </>
          )}
        </MobileMenu>
      )}
    </NavWrapper>
  );
}

export default Navbar;