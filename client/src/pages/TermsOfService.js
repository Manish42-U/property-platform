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

const TermsOfService = () => {
  return (
    <Container>
      <Hero>
        <HeroContent>
          <HeroTitle>Terms of Service</HeroTitle>
          <HeroSubtitle>Please read these terms carefully</HeroSubtitle>
        </HeroContent>
      </Hero>
      <Content>
        <Section>
          <SectionTitle>Acceptance of Terms</SectionTitle>
          <Text>By using PropSpace, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</Text>
        </Section>
        <Section>
          <SectionTitle>User Accounts</SectionTitle>
          <Text>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate information during registration.</Text>
        </Section>
        <Section>
          <SectionTitle>Property Listings</SectionTitle>
          <Text>Owners are responsible for the accuracy of their property listings. We reserve the right to remove any listing that violates our policies or is reported as inaccurate.</Text>
        </Section>
        <Section>
          <SectionTitle>Transactions</SectionTitle>
          <Text>We facilitate connections between users but are not a party to any transaction. All agreements are directly between buyers, sellers, or renters. We are not liable for any disputes.</Text>
        </Section>
        <Section>
          <SectionTitle>Limitation of Liability</SectionTitle>
          <Text>PropSpace is not liable for any damages arising from your use of the platform, including but not limited to loss of data or profits.</Text>
        </Section>
      </Content>
    </Container>
  );
};

export default TermsOfService;