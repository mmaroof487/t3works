import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import ApplyPage from './pages/ApplyPage';
import RadixPage from './pages/RadixPage';
import LeadershipPage from './pages/LeadershipPage';
import Preloader from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <Preloader
          onComplete={() => {
            setIsLoading(false);
          }}
        />
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="apply" element={<ApplyPage />} />
            {/* Legacy /hire route — redirect to unified apply page */}
            <Route path="hire" element={<Navigate to="/apply" replace />} />
            <Route path="radix" element={<RadixPage />} />
            <Route path="leadership" element={<LeadershipPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
