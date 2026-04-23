import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Hero = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  padding: 80px 24px;
  text-align: center;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath fill=\'rgba(255,255,255,0.05)\' d=\'M0 0 L100 0 L100 100 L0 100 Z\'/%3E%3C/svg%3E');
    opacity: 0.1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  color: rgba(255,255,255,0.9);
`;

const Content = styled.div`
  max-width: 1200px;
  margin: -40px auto 0;
  padding: 0 24px 60px;
  position: relative;
  z-index: 2;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  animation: fadeIn 0.6s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
`;

const InfoTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ContactItem = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  color: #475569;
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #f1f5f9;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
  font-family: inherit;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
  }
`;

const Textarea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  min-height: 120px;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
  }
`;

const Button = styled.button`
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -10px rgba(102,126,234,0.5);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const Success = styled.div`
  background: #d1fae5;
  color: #065f46;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 20px;
  font-size: 14px;
`;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setLoading(false);
      setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  return (
    <Container>
      <Hero>
        <HeroContent>
          <HeroTitle>Contact Us</HeroTitle>
          <HeroSubtitle>We'd love to hear from you</HeroSubtitle>
        </HeroContent>
      </Hero>
      <Content>
        <Grid>
          <InfoCard>
            <InfoTitle>Get in Touch</InfoTitle>
            <ContactInfo>
              <ContactItem>
                <ContactIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </ContactIcon>
                <div>
                  <strong>Phone</strong>
                  <p>+91 123 456 7890</p>
                </div>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </ContactIcon>
                <div>
                  <strong>Email</strong>
                  <p>support@propspace.com</p>
                </div>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </ContactIcon>
                <div>
                  <strong>Address</strong>
                  <p>123 Property Plaza, Mumbai, India</p>
                </div>
              </ContactItem>
            </ContactInfo>
          </InfoCard>
          <FormCard>
            <FormTitle>Send a Message</FormTitle>
            {success && <Success>Thank you! Your message has been sent.</Success>}
            <Form onSubmit={handleSubmit}>
              <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              <Input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
              <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
              <Button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</Button>
            </Form>
          </FormCard>
        </Grid>
      </Content>
    </Container>
  );
};

export default Contact;