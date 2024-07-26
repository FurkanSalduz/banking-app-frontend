import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import NotFoundPage from './pages/NotFoundPage';
import Sidebar from './components/Sidebar';
import { styled } from '@mui/system';
import CardsPage from './pages/CardsPage';

// Styled components
const AppContainer = styled('div')({
  display: 'flex',
});

const MainContent = styled('div')({
  flex: 1,
  padding: '20px',
});

function App() {
  const location = useLocation();
  console.log(location.pathname); // Yolu kontrol etmek için log ekledim

  // Sidebar'ı ana sayfada veya geçersiz rotalarda gizle
  const hideSidebar = location.pathname === '/' || location.pathname === '/404';

  return (
    <AppContainer>
      {!hideSidebar && <Sidebar />}
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/accounts" element={<AccountPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<NotFoundPage />} />
        
        </Routes>
      </MainContent>
    </AppContainer>
  );
}

export default App;
