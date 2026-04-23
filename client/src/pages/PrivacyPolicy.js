import React from 'react';
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
  max-width: 800px;
  margin: -40px auto 0;
  padding: 0 24px 60px;
  position: relative;
  z-index: 2;
`;

const Section = styled.div`
  background: white;
  border-radius: 24px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  animation: fadeIn 0.6s ease-out;

  &:hover {
    transform: translateY(-4px);
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

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #475569;
`;

const PrivacyPolicy = () => {
  return (
    <Container>
      <Hero>
        <HeroContent>
          <HeroTitle>Privacy Policy</HeroTitle>
          <HeroSubtitle>Your privacy matters to us</HeroSubtitle>
        </HeroContent>
      </Hero>
      <Content>
        <Section>
          <SectionTitle>Information We Collect</SectionTitle>
          <Text>We collect personal information you provide when registering, adding properties, or contacting us. This includes name, email, phone, and property details. We also collect usage data to improve our platform.</Text>
        </Section>
        <Section>
          <SectionTitle>How We Use Your Information</SectionTitle>
          <Text>We use your information to facilitate property transactions, communicate with you, and improve our services. We never sell your personal information to third parties.</Text>
        </Section>
        <Section>
          <SectionTitle>Sharing Your Information</SectionTitle>
          <Text>We do not sell your personal data. We may share it with property owners or buyers only as necessary to complete a transaction. We may also disclose information if required by law.</Text>
        </Section>
        <Section>
          <SectionTitle>Security</SectionTitle>
          <Text>We implement industry-standard security measures to protect your data from unauthorized access, alteration, or destruction.</Text>
        </Section>
        <Section>
          <SectionTitle>Contact Us</SectionTitle>
          <Text>If you have any questions about this policy, please contact us at privacy@propspace.com.</Text>
        </Section>
      </Content>
    </Container>
  );
};

export default PrivacyPolicy;