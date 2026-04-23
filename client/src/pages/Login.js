



// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import styled, { keyframes } from 'styled-components';

// // Animations (same as before)
// const moveBackground = keyframes`
//   0% { transform: translate(0, 0); }
//   100% { transform: translate(50px, 50px); }
// `;

// const slideUp = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(30px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const shake = keyframes`
//   0%, 100% { transform: translateX(0); }
//   25% { transform: translateX(-5px); }
//   75% { transform: translateX(5px); }
// `;

// const pulse = keyframes`
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0.5; }
// `;

// // Styled Components
// const Container = styled.div`
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   padding: 20px;
//   position: relative;
//   overflow: hidden;

//   &::before {
//     content: '';
//     position: absolute;
//     width: 200%;
//     height: 200%;
//     background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
//     background-size: 50px 50px;
//     animation: ${moveBackground} 20s linear infinite;
//     opacity: 0.3;
//   }
// `;

// const Card = styled.div`
//   background: rgba(255, 255, 255, 0.95);
//   backdrop-filter: blur(10px);
//   border-radius: 24px;
//   padding: 40px;
//   width: 100%;
//   max-width: 440px;
//   box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
//   transform: translateY(0);
//   transition: all 0.3s ease;
//   position: relative;
//   z-index: 1;
//   animation: ${slideUp} 0.5s ease-out;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.3);
//   }

//   h2 {
//     text-align: center;
//     margin-bottom: 32px;
//     font-size: 32px;
//     font-weight: 700;
//     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//     letter-spacing: -0.5px;
//   }
// `;

// const FormGroup = styled.div`
//   margin-bottom: 24px;
//   position: relative;

//   label {
//     display: block;
//     margin-bottom: 8px;
//     font-weight: 500;
//     color: #2d3748;
//     font-size: 14px;
//     text-transform: uppercase;
//     letter-spacing: 0.5px;
//   }

//   input {
//     width: 100%;
//     padding: 12px 16px;
//     border: 2px solid #e2e8f0;
//     border-radius: 12px;
//     font-size: 16px;
//     transition: all 0.3s ease;
//     background: white;
//     color: #1a202c;
//     font-family: inherit;

//     &:focus {
//       outline: none;
//       border-color: #667eea;
//       box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
//       transform: translateY(-1px);
//     }

//     &:hover {
//       border-color: #cbd5e0;
//     }

//     &::placeholder {
//       color: #a0aec0;
//       font-size: 14px;
//     }
//   }

//   &:first-of-type input {
//     padding-left: 44px;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23667eea'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'%3E%3C/path%3E%3C/svg%3E");
//     background-repeat: no-repeat;
//     background-position: 16px center;
//     background-size: 20px;
//   }

//   &:nth-of-type(2) input {
//     padding-left: 44px;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23667eea'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 15v2m-6-4h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-10V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v3'%3E%3C/path%3E%3C/svg%3E");
//     background-repeat: no-repeat;
//     background-position: 16px center;
//     background-size: 20px;
//   }
// `;

// const ErrorMessage = styled.div`
//   background: linear-gradient(135deg, #f56565 0%, #ed64a6 100%);
//   color: white;
//   padding: 12px 16px;
//   border-radius: 12px;
//   margin-bottom: 24px;
//   font-size: 14px;
//   text-align: center;
//   animation: ${shake} 0.5s ease-in-out;
// `;

// const SubmitButton = styled.button`
//   width: 100%;
//   padding: 14px;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   color: white;
//   border: none;
//   border-radius: 12px;
//   font-size: 16px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   position: relative;
//   overflow: hidden;
//   margin-top: 8px;
//   font-family: inherit;

//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: -100%;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
//     transition: left 0.5s ease;
//   }

//   &:hover::before {
//     left: 100%;
//   }

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 10px 20px -5px rgba(102, 126, 234, 0.4);
//   }

//   &:active {
//     transform: translateY(0);
//   }

//   &:disabled {
//     opacity: 0.7;
//     cursor: not-allowed;
//     transform: none;
//     animation: ${pulse} 1.5s ease-in-out infinite;
//   }
// `;

// const AuthLink = styled.p`
//   text-align: center;
//   margin-top: 24px;
//   padding-top: 24px;
//   border-top: 1px solid #e2e8f0;
//   color: #4a5568;
//   font-size: 14px;

//   a {
//     color: #667eea;
//     text-decoration: none;
//     font-weight: 600;
//     margin-left: 6px;
//     transition: all 0.3s ease;
//     position: relative;

//     &::after {
//       content: '';
//       position: absolute;
//       bottom: -2px;
//       left: 0;
//       width: 0;
//       height: 2px;
//       background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//       transition: width 0.3s ease;
//     }

//     &:hover::after {
//       width: 100%;
//     }

//     &:hover {
//       color: #764ba2;
//     }
//   }
// `;

// // Component
// function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     console.log('Attempting login with:', formData.email);
    
//     const result = await login(formData.email, formData.password);
    
//     console.log('Login result:', result);
    
//     if (result.success) {
//       console.log('Login successful, redirecting...');
//       // Get user from localStorage to check role
//       const userData = JSON.parse(localStorage.getItem('user'));
//       console.log('User data after login:', userData);
//       console.log('User role:', userData?.role);
      
//       // Redirect based on role
//       if (userData?.role === 'admin') {
//         console.log('Admin user, redirecting to admin dashboard');
//         navigate('/admin/dashboard');
//       } else {
//         console.log('Regular user, redirecting to home');
//         navigate('/');
//       }
//     } else {
//       console.log('Login failed:', result.error);
//       setError(result.error);
//     }
    
//     setLoading(false);
//   };

//   return (
//     <Container>
//       <Card>
//         <h2>Welcome Back</h2>
//         {error && <ErrorMessage>{error}</ErrorMessage>}
//         <form onSubmit={handleSubmit}>
//           <FormGroup>
//             <label>Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               required
//             />
//           </FormGroup>
//           <FormGroup>
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               required
//             />
//           </FormGroup>
//           <SubmitButton type="submit" disabled={loading}>
//             {loading ? 'Logging in...' : 'Login'}
//           </SubmitButton>
//         </form>
//         <AuthLink>
//           Don't have an account? <Link to="/register">Register</Link>
//         </AuthLink>
//       </Card>
//     </Container>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log('Form submitted with email:', formData.email);
  setError('');
  setLoading(true);
  const result = await login(formData.email, formData.password);
    if (result.success) {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } else {
      setError(result.error);
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
      background: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
      pointerEvents: 'none',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      width: '100%',
      maxWidth: '440px',
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
      gap: '24px',
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
                <path d="M12 2v4M12 22v-4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </div>
            <h2 style={styles.title}>Welcome Back</h2>
            <p style={styles.subtitle}>Sign in to your account</p>
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
                  Logging in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div style={styles.footer}>
            <p>
              Don't have an account?{' '}
              <Link to="/register" style={styles.link}>Create account</Link>
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

export default Login;