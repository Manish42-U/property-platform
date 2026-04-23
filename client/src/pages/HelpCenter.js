import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  max-width: 1000px;
  margin: -40px auto 0;
  padding: 0 24px 60px;
  position: relative;
  z-index: 2;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 48px;
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

const SearchInput = styled.input`
  flex: 1;
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

const SearchButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -10px rgba(102,126,234,0.5);
  }
`;

const TopicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
`;

const TopicCard = styled(Link)`
  background: white;
  border-radius: 20px;
  padding: 24px;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: block;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px -5px rgba(0,0,0,0.1);
  }
`;

const TopicTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
`;

const TopicDesc = styled.p`
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
`;

const ContactSupport = styled.div`
  text-align: center;
  background: white;
  border-radius: 24px;
  padding: 48px 24px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
`;

const SupportTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
`;

const SupportText = styled.p`
  font-size: 16px;
  color: #64748b;
  margin-bottom: 24px;
`;

const SupportButton = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -10px rgba(102,126,234,0.5);
  }
`;

const HelpCenter = () => {
  const helpTopics = [
    { title: 'Getting Started', description: 'Learn how to create an account and set up your profile.', link: '/faq' },
    { title: 'Searching Properties', description: 'Tips for finding your dream property.', link: '/faq' },
    { title: 'Listing a Property', description: 'How to list your property on PropSpace.', link: '/faq' },
    { title: 'Booking & Payments', description: 'Understanding the booking process.', link: '/faq' },
    { title: 'Account Settings', description: 'Manage your profile, password, and preferences.', link: '/faq' },
    { title: 'Report an Issue', description: 'Having trouble? Report it here.', link: '/report' },
  ];

  return (
    <Container>
      <Hero>
        <HeroContent>
          <HeroTitle>Help Center</HeroTitle>
          <HeroSubtitle>How can we help you?</HeroSubtitle>
        </HeroContent>
      </Hero>
      <Content>
        <SearchBar>
          <SearchInput type="text" placeholder="Search for help..." />
          <SearchButton>Search</SearchButton>
        </SearchBar>
        <TopicsGrid>
          {helpTopics.map((topic, index) => (
            <TopicCard key={index} to={topic.link}>
              <TopicTitle>{topic.title}</TopicTitle>
              <TopicDesc>{topic.description}</TopicDesc>
            </TopicCard>
          ))}
        </TopicsGrid>
        <ContactSupport>
          <SupportTitle>Still need help?</SupportTitle>
          <SupportText>Contact our support team for personalized assistance.</SupportText>
          <SupportButton to="/contact">Contact Support</SupportButton>
        </ContactSupport>
      </Content>
    </Container>
  );
};

export default HelpCenter;