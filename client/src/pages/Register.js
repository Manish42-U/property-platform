


// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//     role: 'user'
//   });

//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     // ✅ validation
//     if (formData.password !== formData.confirmPassword) {
//       return setError('Passwords do not match');
//     }

//     if (formData.password.length < 6) {
//       return setError('Password must be at least 6 characters');
//     }

//     setLoading(true);

//     try {
//       const { confirmPassword, ...userData } = formData;

//       console.log("Sending:", userData); // DEBUG

//       const result = await register(userData);

//       console.log("Response:", result); // DEBUG

//       if (result.success) {
//         navigate('/');
//       } else {
//         setError(result.error || 'Registration failed');
//       }

//     } catch (err) {
//       console.error(err);
//       setError('Something went wrong');
//     }

//     setLoading(false);
//   };

//   const styles = {
//     container: {
//       minHeight: '100vh',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//       position: 'relative',
//       padding: '20px',
//     },
//     background: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       overflow: 'hidden',
//       zIndex: 0,
//     },
//     shape: {
//       position: 'absolute',
//       background: 'rgba(255, 255, 255, 0.1)',
//       borderRadius: '50%',
//       animation: 'float 20s infinite ease-in-out',
//     },
//     shape1: {
//       width: '300px',
//       height: '300px',
//       top: '-150px',
//       right: '-150px',
//       animationDelay: '0s',
//     },
//     shape2: {
//       width: '400px',
//       height: '400px',
//       bottom: '-200px',
//       left: '-200px',
//       animationDelay: '-5s',
//     },
//     shape3: {
//       width: '200px',
//       height: '200px',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       animationDelay: '-10s',
//     },
//     card: {
//       background: 'rgba(255, 255, 255, 0.98)',
//       backdropFilter: 'blur(10px)',
//       borderRadius: '32px',
//       boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
//       width: '100%',
//       maxWidth: '480px',
//       padding: '48px 40px',
//       position: 'relative',
//       zIndex: 1,
//       animation: 'slideUp 0.6s ease-out',
//     },
//     header: {
//       textAlign: 'center',
//       marginBottom: '32px',
//     },
//     title: {
//       fontSize: '32px',
//       fontWeight: '800',
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text',
//       marginBottom: '8px',
//     },
//     subtitle: {
//       color: '#6b7280',
//       fontSize: '14px',
//       fontWeight: '500',
//     },
//     errorMessage: {
//       background: '#fee2e2',
//       borderLeft: '4px solid #ef4444',
//       padding: '12px 16px',
//       borderRadius: '12px',
//       marginBottom: '24px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px',
//       color: '#991b1b',
//       fontSize: '14px',
//       fontWeight: '500',
//       animation: 'shake 0.4s ease-out',
//     },
//     form: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '20px',
//     },
//     formGroup: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '8px',
//     },
//     label: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       fontSize: '14px',
//       fontWeight: '600',
//       color: '#374151',
//       letterSpacing: '0.3px',
//     },
//     labelIcon: {
//       width: '18px',
//       height: '18px',
//       color: '#667eea',
//     },
//     input: {
//       width: '100%',
//       padding: '12px 16px',
//       border: '2px solid #e5e7eb',
//       borderRadius: '12px',
//       fontSize: '14px',
//       fontFamily: 'inherit',
//       transition: 'all 0.3s ease',
//       background: 'white',
//       outline: 'none',
//     },
//     select: {
//       width: '100%',
//       padding: '12px 16px',
//       border: '2px solid #e5e7eb',
//       borderRadius: '12px',
//       fontSize: '14px',
//       fontFamily: 'inherit',
//       transition: 'all 0.3s ease',
//       background: 'white',
//       cursor: 'pointer',
//       appearance: 'none',
//       backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
//       backgroundRepeat: 'no-repeat',
//       backgroundPosition: 'right 16px center',
//       backgroundSize: '20px',
//     },
//     passwordWrapper: {
//       position: 'relative',
//     },
//     passwordToggle: {
//       position: 'absolute',
//       right: '12px',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       background: 'none',
//       border: 'none',
//       cursor: 'pointer',
//       padding: '4px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       color: '#9ca3af',
//       transition: 'color 0.3s ease',
//     },
//     button: {
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//       color: 'white',
//       border: 'none',
//       padding: '14px 24px',
//       borderRadius: '12px',
//       fontSize: '16px',
//       fontWeight: '700',
//       fontFamily: 'inherit',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '8px',
//       marginTop: '8px',
//       position: 'relative',
//       overflow: 'hidden',
//     },
//     buttonDisabled: {
//       opacity: 0.7,
//       cursor: 'not-allowed',
//     },
//     buttonIcon: {
//       width: '20px',
//       height: '20px',
//       transition: 'transform 0.3s ease',
//     },
//     spinner: {
//       width: '20px',
//       height: '20px',
//       animation: 'spin 1s linear infinite',
//     },
//     footer: {
//       marginTop: '24px',
//       textAlign: 'center',
//       paddingTop: '24px',
//       borderTop: '1px solid #e5e7eb',
//     },
//     footerText: {
//       color: '#6b7280',
//       fontSize: '14px',
//     },
//     link: {
//       color: '#667eea',
//       textDecoration: 'none',
//       fontWeight: '600',
//       transition: 'color 0.3s ease',
//       position: 'relative',
//     },
//   };

//   return (
//     <>
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          
//           @keyframes float {
//             0%, 100% { transform: translateY(0) rotate(0deg); }
//             50% { transform: translateY(-20px) rotate(180deg); }
//           }
          
//           @keyframes slideUp {
//             from {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
          
//           @keyframes shake {
//             0%, 100% { transform: translateX(0); }
//             25% { transform: translateX(-5px); }
//             75% { transform: translateX(5px); }
//           }
          
//           @keyframes spin {
//             from { transform: rotate(0deg); }
//             to { transform: rotate(360deg); }
//           }
          
//           input:focus, select:focus {
//             outline: none;
//             border-color: #667eea !important;
//             box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
//             transform: translateY(-1px);
//           }
          
//           input:hover, select:hover {
//             border-color: #9ca3af !important;
//           }
          
//           button:hover svg {
//             transform: translateX(4px);
//           }
          
//           a:hover {
//             color: #5a67d8 !important;
//           }
          
//           a:hover::after {
//             content: '';
//             position: absolute;
//             bottom: -2px;
//             left: 0;
//             width: 100%;
//             height: 2px;
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           }
//         `}
//       </style>
      
//       <div style={styles.container}>
//         <div style={styles.background}>
//           <div style={{...styles.shape, ...styles.shape1}}></div>
//           <div style={{...styles.shape, ...styles.shape2}}></div>
//           <div style={{...styles.shape, ...styles.shape3}}></div>
//         </div>
        
//         <div style={styles.card}>
//           <div style={styles.header}>
//             <h2 style={styles.title}>Create Account</h2>
//             <p style={styles.subtitle}>Join our community today</p>
//           </div>

//           {error && (
//             <div style={styles.errorMessage}>
//               <svg style={{width: '20px', height: '20px', flexShrink: 0}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <circle cx="12" cy="12" r="10"/>
//                 <line x1="12" y1="8" x2="12" y2="12"/>
//                 <line x1="12" y1="16" x2="12.01" y2="16"/>
//               </svg>
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} style={styles.form}>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>
//                 <svg style={styles.labelIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//                   <circle cx="12" cy="7" r="4"/>
//                 </svg>
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 style={styles.input}
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="John Doe"
//                 required
//               />
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.label}>
//                 <svg style={styles.labelIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
//                   <polyline points="22,6 12,13 2,6"/>
//                 </svg>
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 style={styles.input}
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="hello@example.com"
//                 required
//               />
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.label}>
//                 <svg style={styles.labelIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
//                 </svg>
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 style={styles.input}
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="+1 234 567 8900"
//                 required
//               />
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.label}>
//                 <svg style={styles.labelIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                   <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                 </svg>
//                 Password
//               </label>
//               <div style={styles.passwordWrapper}>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   style={styles.input}
//                   autoComplete="new-password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="••••••••"
//                   required
//                 />
//                 <button
//                   type="button"
//                   style={styles.passwordToggle}
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <svg style={{width: '20px', height: '20px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                       <circle cx="12" cy="12" r="3"/>
//                     </svg>
//                   ) : (
//                     <svg style={{width: '20px', height: '20px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
//                       <line x1="1" y1="1" x2="23" y2="23"/>
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.label}>
//                 <svg style={styles.labelIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                   <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                 </svg>
//                 Confirm Password
//               </label>
//               <div style={styles.passwordWrapper}>
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   style={styles.input}
//                   autoComplete="new-password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="••••••••"
//                   required
//                 />
//                 <button
//                   type="button"
//                   style={styles.passwordToggle}
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? (
//                     <svg style={{width: '20px', height: '20px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                       <circle cx="12" cy="12" r="3"/>
//                     </svg>
//                   ) : (
//                     <svg style={{width: '20px', height: '20px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
//                       <line x1="1" y1="1" x2="23" y2="23"/>
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.label}>
//                 <svg style={styles.labelIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
//                 </svg>
//                 Account Type
//               </label>
//               <select
//                 name="role"
//                 style={styles.select}
//                 value={formData.role}
//                 onChange={handleChange}
//               >
//                 <option value="user">👤 User (Buyer/Renter)</option>
//                 <option value="owner">🏠 Property Owner</option>
//               </select>
//             </div>

//             <button 
//               type="submit" 
//               style={{
//                 ...styles.button,
//                 ...(loading && styles.buttonDisabled)
//               }}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <svg style={styles.spinner} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <circle cx="12" cy="12" r="10"/>
//                     <path d="M12 2v4M12 22v-4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
//                   </svg>
//                   Creating Account...
//                 </>
//               ) : (
//                 <>
//                   Create Account
//                   <svg style={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <line x1="5" y1="12" x2="19" y2="12"/>
//                     <polyline points="12 5 19 12 12 19"/>
//                   </svg>
//                 </>
//               )}
//             </button>
//           </form>

//           <div style={styles.footer}>
//             <p style={styles.footerText}>
//               Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Register;



import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      const result = await register(userData);

      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong');
    }

    setLoading(false);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
      pointerEvents: 'none',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      width: '100%',
      maxWidth: '480px',
      padding: '40px',
      position: 'relative',
      zIndex: 1,
      animation: 'slideUp 0.5s ease-out',
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px',
    },
    iconWrapper: {
      width: '64px',
      height: '64px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 16px',
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1a202c',
      marginBottom: '8px',
    },
    subtitle: {
      color: '#718096',
      fontSize: '14px',
    },
    error: {
      background: '#fed7d7',
      border: '1px solid #fc8181',
      color: '#c53030',
      padding: '12px',
      borderRadius: '12px',
      marginBottom: '24px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#2d3748',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    inputWrapper: {
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      outline: 'none',
      fontFamily: 'inherit',
    },
    inputFocus: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    },
    passwordToggle: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#a0aec0',
      display: 'flex',
      alignItems: 'center',
      padding: '4px',
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '14px',
      background: 'white',
      cursor: 'pointer',
      outline: 'none',
    },
    button: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      padding: '14px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      marginTop: '8px',
    },
    buttonDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
    footer: {
      marginTop: '24px',
      textAlign: 'center',
      paddingTop: '24px',
      borderTop: '1px solid #e2e8f0',
    },
    link: {
      color: '#667eea',
      textDecoration: 'none',
      fontWeight: '600',
    },
  };

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        input:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
        }
        
        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(102, 126, 234, 0.4);
        }
        
        a:hover {
          color: #5a67d8;
        }
      `}</style>
      
      <div style={styles.container}>
        <div style={styles.overlay} />
        
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.iconWrapper}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h2 style={styles.title}>Create Account</h2>
            <p style={styles.subtitle}>Join our community today</p>
          </div>

          {error && (
            <div style={styles.error}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                style={styles.input}
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                style={styles.input}
                value={formData.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                style={styles.input}
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Password
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  style={styles.input}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  style={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Confirm Password
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  style={styles.input}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  style={styles.passwordToggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                Account Type
              </label>
              <select
                name="role"
                style={styles.select}
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">👤 User (Buyer/Renter)</option>
                <option value="owner">🏠 Property Owner</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                ...styles.button,
                ...(loading && styles.buttonDisabled)
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite', display: 'inline', marginRight: '8px' }}>
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2v4M12 22v-4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div style={styles.footer}>
            <p>
              Already have an account?{' '}
              <Link to="/login" style={styles.link}>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

export default Register;