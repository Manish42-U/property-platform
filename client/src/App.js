



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import PropertyList from './pages/PropertyList';
// import PropertyDetails from './pages/PropertyDetails';
// import AddProperty from './pages/AddProperty';
// import MyProperties from './pages/MyProperties';
// import Bookings from './pages/Bookings';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import PrivateRoute from './components/PrivateRoute';
// import AdminRoute from './components/AdminRoute';
// import './App.css';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import PrivacyPolicy from './pages/PrivacyPolicy';
// import FAQ from './pages/FAQ';
// import TermsOfService from './pages/TermsOfService';
// import HelpCenter from './pages/HelpCenter';
// import ReportIssue from './pages/ReportIssue';

// // Admin Components
// import AdminLayout from './components/Admin/AdminLayout';
// import AdminDashboard from './pages/Admin/AdminDashboard';
// import AdminUsers from './pages/Admin/AdminUsers';
// import AdminProperties from './pages/Admin/AdminProperties';
// import AdminBookings from './pages/Admin/AdminBookings';

// // Layout wrapper for public pages
// function PublicLayout({ children }) {
//   const location = useLocation();
//   const hideFooterPaths = ['/login', '/register'];
//   const showFooter = !hideFooterPaths.includes(location.pathname);
  
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <Navbar />
//       <main style={{ flex: 1 }}>
//         {children}
//       </main>
//       {showFooter && <Footer />}
//     </div>
//   );
// }

// // Layout for admin pages (no navbar, no footer)
// function AdminPageLayout({ children }) {
//   return (
//     <div style={{ minHeight: '100vh' }}>
//       {children}
//     </div>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public Routes with Navbar and Footer */}
//           <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
//           <Route path="/properties" element={<PublicLayout><PropertyList /></PublicLayout>} />
//           <Route path="/property/:id" element={<PublicLayout><PropertyDetails /></PublicLayout>} />
//           <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
//           <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
//           <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
//           <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
//           <Route path="/terms" element={<PublicLayout><TermsOfService /></PublicLayout>} />
//           <Route path="/help" element={<PublicLayout><HelpCenter /></PublicLayout>} />
//           <Route path="/report" element={<PublicLayout><ReportIssue /></PublicLayout>} />
          
//           {/* Protected Routes with Navbar and Footer */}
//           <Route path="/add-property" element={
//             <PublicLayout>
//               <PrivateRoute>
//                 <AddProperty />
//               </PrivateRoute>
//             </PublicLayout>
//           } />
//           <Route path="/my-properties" element={
//             <PublicLayout>
//               <PrivateRoute>
//                 <MyProperties />
//               </PrivateRoute>
//             </PublicLayout>
//           } />
//           <Route path="/my-bookings" element={
//             <PublicLayout>
//               <PrivateRoute>
//                 <Bookings />
//               </PrivateRoute>
//             </PublicLayout>
//           } />
          
//           {/* Admin Routes - No Navbar, No Footer */}
//           <Route path="/admin" element={
//             <AdminRoute>
//               <AdminPageLayout>
//                 <AdminLayout />
//               </AdminPageLayout>
//             </AdminRoute>
//           }>
//             <Route index element={<AdminDashboard />} />
//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="users" element={<AdminUsers />} />
//             <Route path="properties" element={<AdminProperties />} />
//             <Route path="bookings" element={<AdminBookings />} />
//           </Route>
          
//           {/* Auth Pages - No Navbar, No Footer */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PropertyList from './pages/PropertyList';
import PropertyDetails from './pages/PropertyDetails';
import AddProperty from './pages/AddProperty';
import MyProperties from './pages/MyProperties';
import Bookings from './pages/Bookings';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import './App.css';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';
import TermsOfService from './pages/TermsOfService';
import HelpCenter from './pages/HelpCenter';
import ReportIssue from './pages/ReportIssue';
import UserProfile from './pages/UserProfile';  // ✅ ADD THIS IMPORT

// Admin Components
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminProperties from './pages/Admin/AdminProperties';
import AdminBookings from './pages/Admin/AdminBookings';

// Layout wrapper for public pages
function PublicLayout({ children }) {
  const location = useLocation();
  const hideFooterPaths = ['/login', '/register', '/profile'];  // ✅ ADD '/profile' to hide footer
  const showFooter = !hideFooterPaths.includes(location.pathname);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

// Layout for admin pages (no navbar, no footer)
function AdminPageLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with Navbar and Footer */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/properties" element={<PublicLayout><PropertyList /></PublicLayout>} />
          <Route path="/property/:id" element={<PublicLayout><PropertyDetails /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
          <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
          <Route path="/terms" element={<PublicLayout><TermsOfService /></PublicLayout>} />
          <Route path="/help" element={<PublicLayout><HelpCenter /></PublicLayout>} />
          <Route path="/report" element={<PublicLayout><ReportIssue /></PublicLayout>} />
          
          {/* ✅ ADD PROFILE ROUTE - Protected */}
          <Route path="/profile" element={
            <PublicLayout>
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            </PublicLayout>
          } />
          
          {/* Protected Routes with Navbar and Footer */}
          <Route path="/add-property" element={
            <PublicLayout>
              <PrivateRoute>
                <AddProperty />
              </PrivateRoute>
            </PublicLayout>
          } />
          <Route path="/my-properties" element={
            <PublicLayout>
              <PrivateRoute>
                <MyProperties />
              </PrivateRoute>
            </PublicLayout>
          } />
          <Route path="/my-bookings" element={
            <PublicLayout>
              <PrivateRoute>
                <Bookings />
              </PrivateRoute>
            </PublicLayout>
          } />
          
          {/* Admin Routes - No Navbar, No Footer */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminPageLayout>
                <AdminLayout />
              </AdminPageLayout>
            </AdminRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="bookings" element={<AdminBookings />} />
          </Route>
          
          {/* Auth Pages - No Navbar, No Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;