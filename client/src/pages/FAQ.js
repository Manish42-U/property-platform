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
  max-width: 800px;
  margin: -40px auto 0;
  padding: 0 24px 60px;
  position: relative;
  z-index: 2;
`;

const FaqItem = styled.div`
  background: white;
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.3s;
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

const Question = styled.div`
  padding: 20px 24px;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background: #f8fafc;
  }
`;

const Answer = styled.div`
  padding: 0 24px 20px 24px;
  font-size: 16px;
  line-height: 1.6;
  color: #475569;
  border-top: 1px solid #e2e8f0;
`;

const Icon = styled.span`
  font-size: 24px;
  color: #667eea;
`;

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: 'How do I list a property?', a: 'Log in as an owner, go to "Add Property" and fill in the details. Make sure to provide accurate information and high-quality images to attract potential buyers or renters.' },
    { q: 'How can I contact a seller?', a: 'On the property details page, you\'ll see the owner\'s contact information after logging in. You can reach out via phone or email directly.' },
    { q: 'Is my information secure?', a: 'Yes, we use industry-standard encryption and security protocols to protect your personal data. We never sell your information to third parties.' },
    { q: 'What payment methods do you accept?', a: 'Currently, we facilitate connections between buyers and sellers but do not process payments directly. You\'ll arrange payments with the property owner.' },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      <Hero>
        <HeroContent>
          <HeroTitle>Frequently Asked Questions</HeroTitle>
          <HeroSubtitle>Find answers to common questions</HeroSubtitle>
        </HeroContent>
      </Hero>
      <Content>
        {faqs.map((faq, idx) => (
          <FaqItem key={idx}>
            <Question onClick={() => toggle(idx)}>
              {faq.q}
              <Icon>{openIndex === idx ? '−' : '+'}</Icon>
            </Question>
            {openIndex === idx && <Answer>{faq.a}</Answer>}
          </FaqItem>
        ))}
      </Content>
    </Container>
  );
};

export default FAQ;