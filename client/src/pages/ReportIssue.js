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
  max-width: 600px;
  margin: -40px auto 0;
  padding: 0 24px 60px;
  position: relative;
  z-index: 2;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  animation: fadeIn 0.6s ease-out;

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
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

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  outline: none;

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
  min-height: 120px;
  outline: none;

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

const ReportIssue = () => {
  const [formData, setFormData] = useState({ type: 'bug', description: '', email: '' });
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
      setFormData({ type: 'bug', description: '', email: '' });
      setLoading(false);
      setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  return (
    <Container>
      <Hero>
        <HeroContent>
          <HeroTitle>Report an Issue</HeroTitle>
          <HeroSubtitle>Let us know what went wrong</HeroSubtitle>
        </HeroContent>
      </Hero>
      <Content>
        <FormCard>
          {success && <Success>Thank you! Your report has been submitted. We'll look into it.</Success>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Issue Type</Label>
              <Select name="type" value={formData.type} onChange={handleChange}>
                <option value="bug">Bug / Technical Issue</option>
                <option value="property">Problem with a Property Listing</option>
                <option value="user">User Account Issue</option>
                <option value="other">Other</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Your Email (optional)</Label>
              <Input type="email" name="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label>Description *</Label>
              <Textarea name="description" placeholder="Describe the issue in detail..." value={formData.description} onChange={handleChange} required />
            </FormGroup>
            <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Report'}</Button>
          </Form>
        </FormCard>
      </Content>
    </Container>
  );
};

export default ReportIssue;