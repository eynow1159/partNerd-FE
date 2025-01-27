import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';

function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 기본적으로 로그인되지 않은 상태로 설정
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    setIsFooterVisible(scrollPosition >= documentHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <MainContainer>
      <Navbar isLoggedIn={isLoggedIn} />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer isVisible={isFooterVisible} />
    </MainContainer>
  );
}

export default RootLayout;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Pretendard', sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
`;
