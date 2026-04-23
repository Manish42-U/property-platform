
// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// const FooterContainer = styled.footer`
//   background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
//   color: #e2e8f0;
//   padding: 4rem 0 2rem;
//   margin-top: auto;
//   font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
// `;

// const FooterContent = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 24px;
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//   gap: 2.5rem;
// `;

// const FooterSection = styled.div`
//   h4 {
//     font-size: 1.125rem;
//     font-weight: 600;
//     margin-bottom: 1.25rem;
//     color: #f1f5f9;
//     position: relative;
//     display: inline-block;
//     &:after {
//       content: '';
//       position: absolute;
//       bottom: -8px;
//       left: 0;
//       width: 40px;
//       height: 2px;
//       background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//       border-radius: 2px;
//     }
//   }

//   ul {
//     list-style: none;
//     padding: 0;
//     margin: 0;
//   }

//   li {
//     margin-bottom: 0.75rem;
//   }

//   a {
//     color: #94a3b8;
//     text-decoration: none;
//     transition: all 0.2s ease;
//     font-size: 0.9rem;
//     display: inline-flex;
//     align-items: center;
//     gap: 6px;

//     &:hover {
//       color: #667eea;
//       transform: translateX(4px);
//     }
//   }
// `;

// const FooterBottom = styled.div`
//   text-align: center;
//   padding-top: 2rem;
//   margin-top: 2rem;
//   border-top: 1px solid #334155;
//   font-size: 0.8rem;
//   color: #64748b;
// `;

// // Optional: add social media icons (simple text for now)
// const SocialLinks = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-top: 1rem;
//   a {
//     color: #94a3b8;
//     font-size: 1.2rem;
//     transition: color 0.2s;
//     &:hover {
//       color: #667eea;
//       transform: none;
//     }
//   }
// `;

// const Footer = () => {
//   return (
//     <FooterContainer>
//       <FooterContent>
//         <FooterSection>
//           <h4>PropSpace</h4>
//           <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
//             Find your dream property with India's most trusted real estate platform.
//           </p>
//           <SocialLinks>
//             <a href="#" aria-label="Facebook">📘</a>
//             <a href="#" aria-label="Twitter">🐦</a>
//             <a href="#" aria-label="Instagram">📸</a>
//             <a href="#" aria-label="LinkedIn">🔗</a>
//           </SocialLinks>
//         </FooterSection>

//         <FooterSection>
//           <h4>Company</h4>
//           <ul>
//             <li><Link to="/about">About Us</Link></li>
//             <li><Link to="/contact">Contact</Link></li>
//             <li><Link to="/privacy">Privacy Policy</Link></li>
//             <li><Link to="/terms">Terms of Service</Link></li>
//           </ul>
//         </FooterSection>

//         <FooterSection>
//           <h4>Support</h4>
//           <ul>
//             <li><Link to="/faq">FAQ</Link></li>
//             <li><Link to="/help">Help Center</Link></li>
//             <li><Link to="/report">Report an Issue</Link></li>
//           </ul>
//         </FooterSection>

//         <FooterSection>
//           <h4>Explore</h4>
//           <ul>
//             <li><Link to="/properties">Browse Properties</Link></li>
//             <li><Link to="/add-property">List Your Property</Link></li>
//           </ul>
//         </FooterSection>
//       </FooterContent>

//       <FooterBottom>
//         &copy; {new Date().getFullYear()} PropSpace. All rights reserved.
//       </FooterBottom>
//     </FooterContainer>
//   );
// };

// export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #e2e8f0;
  padding: 3rem 0 1.5rem;
  margin-top: auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  @media (max-width: 768px) {
    padding: 2rem 0 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h4 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
    color: #f1f5f9;
    position: relative;
    display: inline-block;
    
    @media (max-width: 640px) {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    
    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 2px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
      
      @media (max-width: 640px) {
        left: 50%;
        transform: translateX(-50%);
        width: 50px;
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    @media (max-width: 640px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  li {
    margin-bottom: 0.75rem;
    
    @media (max-width: 640px) {
      margin-bottom: 0.6rem;
    }
  }

  a {
    color: #94a3b8;
    text-decoration: none;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    
    @media (max-width: 640px) {
      font-size: 0.85rem;
      justify-content: center;
    }

    &:hover {
      color: #667eea;
      transform: translateX(4px);
      
      @media (max-width: 640px) {
        transform: translateX(0);
      }
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #334155;
  font-size: 0.8rem;
  color: #64748b;
  
  @media (max-width: 768px) {
    padding-top: 1.5rem;
    margin-top: 1.5rem;
    font-size: 0.7rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 640px) {
    justify-content: center;
    gap: 1.2rem;
    margin-top: 0.8rem;
  }
  
  a {
    color: #94a3b8;
    font-size: 1.2rem;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    transition: all 0.3s;
    
    @media (max-width: 640px) {
      width: 36px;
      height: 36px;
      font-size: 1.1rem;
    }
    
    &:hover {
      color: #667eea;
      background: rgba(102, 126, 234, 0.2);
      transform: translateY(-2px);
    }
  }
`;

const BrandDescription = styled.p`
  font-size: 0.85rem;
  color: #94a3b8;
  margin-bottom: 1rem;
  line-height: 1.5;
  
  @media (max-width: 640px) {
    font-size: 0.8rem;
    text-align: center;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h4>PropSpace</h4>
          <BrandDescription>
            Find your dream property with India's most trusted real estate platform.
          </BrandDescription>
          <SocialLinks>
            <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">📘</a>
            <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">🐦</a>
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">📸</a>
            <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">🔗</a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h4>Support</h4>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/report">Report an Issue</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/properties">Browse Properties</Link></li>
            <li><Link to="/add-property">List Your Property</Link></li>
          </ul>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        &copy; {new Date().getFullYear()} PropSpace. All rights reserved.
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;